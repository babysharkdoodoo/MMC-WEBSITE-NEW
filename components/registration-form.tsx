"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type React from "react";
import { useState } from "react";

export default function RegistrationForm() {
  const steps = ["student", "parent", "emergency", "agreements"] as const;
  const [stepIdx, setStepIdx] = useState(0);
  const currentStep = steps[stepIdx];

  const [formData, setFormData] = useState({
    // Student
    studentName: "",
    studentSchool: "",
    studentGrade: "",
    studentAge: "",
    studentBirthday: null as Date | null,
    ethnicity: "",
    otherEthnicity: "",
    priorExperience: "",
    mathInterests: "",
    specialNeeds: "",
    // Parent
    parentName: "",
    email: "",
    phone: "",
    alternatePhone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    heardFrom: "",
    // Emergency
    emergencyName: "",
    emergencyRelationship: "",
    emergencyPhone: "",
    // Agreements
    liabilityWaiver: false,
    eventPolicies: false,
    photoRelease: false,
    finalAgreement: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };
  const handleCheckbox = (name: string, v: boolean) =>
    setFormData((p) => ({ ...p, [name]: v }));
  const handleRadio = (name: string, v: string) =>
    setFormData((p) => ({ ...p, [name]: v }));
  const handleSelect = (name: string, v: string) =>
    setFormData((p) => ({ ...p, [name]: v }));
  const handleDateChange = (name: string, d: Date | null) =>
    setFormData((p) => ({ ...p, [name]: d }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // rate‑limit, validations, fetch… (unchanged)
    const last = localStorage.getItem("lastRegisterTime");
    if (last && Date.now() - +last < 60_000) {
      return toast({
        title: "Slow down",
        description: "Please wait a minute before submitting again.",
        variant: "destructive",
      });
    }

    const missing: string[] = [];
    if (!formData.studentName.trim()) missing.push("Student Name");
    if (!formData.studentAge) missing.push("Student Age");
    if (!formData.studentBirthday) missing.push("Student Birthday");
    if (!formData.studentSchool.trim()) missing.push("Student School");
    if (!formData.studentGrade) missing.push("Student Grade");
    if (!formData.ethnicity) missing.push("Ethnicity");
    if (formData.ethnicity === "Other" && !formData.otherEthnicity.trim())
      missing.push("Other Ethnicity");
    if (!formData.priorExperience) missing.push("Prior Experience");

    if (!formData.parentName.trim()) missing.push("Parent Name");
    if (!formData.email.trim()) missing.push("Email");
    if (!formData.phone.trim()) missing.push("Primary Phone");
    if (!formData.address.trim()) missing.push("Street Address");
    if (!formData.city.trim()) missing.push("City");
    if (!formData.state.trim()) missing.push("State");
    if (!formData.zipCode.trim()) missing.push("ZIP Code");

    if (!formData.emergencyName.trim()) missing.push("Emergency Contact Name");
    if (!formData.emergencyRelationship.trim())
      missing.push("Emergency Relationship");
    if (!formData.emergencyPhone.trim())
      missing.push("Emergency Contact Phone");

    if (
      !formData.liabilityWaiver ||
      !formData.eventPolicies ||
      !formData.photoRelease ||
      !formData.finalAgreement
    )
      missing.push("All agreements and waivers");

    if (missing.length) {
      return toast({
        title: "Missing Information",
        description: `Please fill out or accept: ${missing.join(", ")}`,
        variant: "destructive",
      });
    }

    localStorage.setItem("lastRegisterTime", Date.now().toString());

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.result === "Success") {
        toast({
          title: "Registration Submitted",
          description:
            "Thank you! You’ll receive RSVP links via email for upcoming events.",
        });
      } else {
        toast({
          title: "Submission Failed",
          description: result.error || "Please try again later.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Network Error",
        description: "Unable to submit right now. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form space-y-8">
      {/* desktop tabs */}
      <Tabs
        value={currentStep}
        onValueChange={(v) => setStepIdx(steps.findIndex((s) => s === v))}
        className="w-full"
      >
        <TabsList className="registration-tabs hidden sm:grid grid-cols-2 gap-2 h-auto mb-6 w-full">
          {steps.map((s) => (
            <TabsTrigger
              key={s}
              value={s}
              className="min-w-0 whitespace-normal py-3 px-2 leading-snug"
            >
              {
                {
                  student: "Student Info",
                  parent: "Parent Info",
                  emergency: "Emergency Contact",
                  agreements: "Agreements",
                }[s]
              }
            </TabsTrigger>
          ))}
        </TabsList>

        {/* STUDENT */}
        <TabsContent value="student" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Student Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentName">
                      Student Full Name{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="studentName"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentAge">
                      Student Age <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="studentAge"
                      name="studentAge"
                      type="number"
                      min="5"
                      max="18"
                      value={formData.studentAge}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* mobile native date */}
                <div className="space-y-2 sm:hidden">
                  <Label htmlFor="studentBirthdayMobile">
                    Student Date of Birth{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="studentBirthdayMobile"
                    name="studentBirthday"
                    type="date"
                    value={
                      formData.studentBirthday
                        ? format(formData.studentBirthday, "yyyy-MM-dd")
                        : ""
                    }
                    onChange={(e) =>
                      handleDateChange(
                        "studentBirthday",
                        e.target.value ? new Date(e.target.value) : null
                      )
                    }
                    required
                  />
                </div>

                {/* desktop popover calendar */}
                <div className="space-y-2 hidden sm:block">
                  <Label htmlFor="studentBirthday">
                    Student Birthday <span className="text-destructive">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.studentBirthday && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.studentBirthday
                          ? format(formData.studentBirthday, "PPP")
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.studentBirthday || undefined}
                        onSelect={(date) =>
                          handleDateChange("studentBirthday", date)
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* rest of student fields… */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentSchool">
                      Student School <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="studentSchool"
                      name="studentSchool"
                      value={formData.studentSchool}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentGrade">
                      Student Grade <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      name="studentGrade"
                      value={formData.studentGrade}
                      onValueChange={(v) => handleSelect("studentGrade", v)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                          (g) => (
                            <SelectItem key={g} value={g.toString()}>
                              Grade {g}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* ethnicity */}
                <div className="space-y-2">
                  <Label>
                    Ethnicity <span className="text-destructive">*</span>
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    We use this information to track our reach in
                    underrepresented groups.
                  </p>
                  <RadioGroup
                    value={formData.ethnicity}
                    onValueChange={(v) => handleRadio("ethnicity", v)}
                    className="registration-options grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mt-2"
                  >
                    {[
                      "African American/Black",
                      "Hispanic/LatinX",
                      "Alaska Native",
                      "Indigenous/Native American",
                      "Armenian",
                      "Asian",
                      "Caucasian",
                      "Pacific Islander",
                      "Multicultural",
                      "Native Hawaiian",
                      "Unspecified",
                      "Other",
                    ].map((e) => (
                      <div key={e} className="flex items-center space-x-2">
                        <RadioGroupItem id={`eth-${e}`} value={e} />
                        <Label htmlFor={`eth-${e}`}>{e}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {formData.ethnicity === "Other" && (
                    <Input
                      id="otherEthnicity"
                      name="otherEthnicity"
                      placeholder="Please specify"
                      value={formData.otherEthnicity}
                      onChange={handleChange}
                    />
                  )}
                </div>

                {/* prior experience */}
                <div className="space-y-2">
                  <Label>
                    Prior Experience with Competition Math{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.priorExperience}
                    onValueChange={(v) => handleRadio("priorExperience", v)}
                    className="flex space-x-4"
                  >
                    {["Yes", "No"].map((opt) => (
                      <div key={opt} className="flex items-center space-x-2">
                        <RadioGroupItem id={`exp-${opt}`} value={opt} />
                        <Label htmlFor={`exp-${opt}`}>{opt}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* math interests */}
                <div className="space-y-2">
                  <Label htmlFor="mathInterests">Mathematical Interests</Label>
                  <Textarea
                    id="mathInterests"
                    name="mathInterests"
                    placeholder="What areas of mathematics interest your child the most?"
                    value={formData.mathInterests}
                    onChange={handleChange}
                  />
                </div>

                {/* special needs */}
                <div className="space-y-2">
                  <Label htmlFor="specialNeeds">
                    Special Needs or Accommodations
                  </Label>
                  <Textarea
                    id="specialNeeds"
                    name="specialNeeds"
                    placeholder="List any special needs, accommodations, or allergies."
                    value={formData.specialNeeds}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PARENT */}
        <TabsContent value="parent" className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-xl font-bold">Parent/Guardian Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    id: "parentName",
                    label: "Parent/Guardian Name",
                    name: "parentName",
                    required: true,
                    type: "text",
                  },
                  {
                    id: "email",
                    label: "Email Address",
                    name: "email",
                    required: true,
                    type: "email",
                  },
                  {
                    id: "phone",
                    label: "Primary Phone Number",
                    name: "phone",
                    required: true,
                    type: "tel",
                  },
                  {
                    id: "alternatePhone",
                    label: "Alternate Phone Number",
                    name: "alternatePhone",
                    required: false,
                    type: "tel",
                  },
                ].map(({ id, label, name, required, type }) => (
                  <div key={id} className="space-y-2">
                    <Label htmlFor={id}>
                      {label}{" "}
                      {required && <span className="text-destructive">*</span>}
                    </Label>
                    <Input
                      id={id}
                      name={name}
                      type={type}
                      value={(formData as any)[name]}
                      onChange={handleChange}
                      required={required}
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">
                  Street Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["city", "state", "zipCode"].map((fld) => (
                  <div key={fld} className="space-y-2">
                    <Label htmlFor={fld}>
                      {fld.charAt(0).toUpperCase() + fld.slice(1)}{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id={fld}
                      name={fld}
                      value={(formData as any)[fld]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="heardFrom">How did you hear about us?</Label>
                <Select
                  name="heardFrom"
                  value={formData.heardFrom}
                  onValueChange={(v) => handleSelect("heardFrom", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      ["school", "School"],
                      ["friend", "Friend or Family"],
                      ["social", "Social Media"],
                      ["search", "Search Engine"],
                      ["event", "Community Event"],
                      ["other", "Other"],
                    ].map(([val, txt]) => (
                      <SelectItem key={val} value={val}>
                        {txt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* EMERGENCY */}
        <TabsContent value="emergency" className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-xl font-bold">
                Emergency Contact Information
              </h3>
              <p className="text-sm text-muted-foreground">
                Please provide someone other than the parent/guardian above.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    id: "emergencyName",
                    label: "Name",
                    name: "emergencyName",
                    required: true,
                  },
                  {
                    id: "emergencyRelationship",
                    label: "Relationship",
                    name: "emergencyRelationship",
                    required: true,
                  },
                  {
                    id: "emergencyPhone",
                    label: "Phone",
                    name: "emergencyPhone",
                    required: true,
                    type: "tel",
                  },
                ].map(({ id, label, name, required, type = "text" }) => (
                  <div key={id} className="space-y-2">
                    <Label htmlFor={id}>
                      {label}{" "}
                      {required && <span className="text-destructive">*</span>}
                    </Label>
                    <Input
                      id={id}
                      name={name}
                      type={type}
                      value={(formData as any)[name]}
                      onChange={handleChange}
                      required={required}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* ========== AGREEMENTS TAB ========== */}
        <TabsContent value="agreements" className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <h3 className="text-xl font-bold">Agreements and Waivers</h3>

              {[
                {
                  id: "liabilityWaiver",
                  label: "Liability Waiver",
                  body: `
  <p class="mb-2">
    As parent or legal guardian of the minor, I hereby grant the permission necessary to allow Child to participate in Orlando Math Circle online or at any physical location where events are held (the "Program").
  </p>
  <p class="mb-2">
    I understand the Program does not guarantee the suitability of the Program for Child's participation. I understand that there are inherent risks involved in participating in the Program, and I realize that participation in the Program is my and the Child's choice.
  </p>
  <p class="mb-2">
    I am aware that, during the program, certain risks and dangers may occur, including, but not limited to, accident or illness; the forces of nature; all manner of foreseen and unforeseen bodily and personal injuries, including death; damage to property; and the consequences resulting therefrom.
  </p>
  <p class="mb-2">
    IN CONSIDERATION OF CHILD BEING PERMITTED TO ATTEND AND PARTICIPATE IN THE PROGRAM, I ACKNOWLEDGE AND VOLUNTARILY ASSUME ALL RISKS ASSOCIATED WITH THE PROGRAM.
  </p>
  <p>
    I, on my own behalf, and on behalf of the Child, our heirs, representatives, executors, administrators and assigns, for the sole consideration of Child being allowed to attend and participate in the Program, do hereby release, relieve, covenant not to sue and forever discharge, defend, indemnify and hold harmless Orlando Math Circle, its officers, agents, employees, students, and volunteers (hereinafter collectively "OMC") of any and from all claims, demands, rights, liabilities, losses, expenses and causes of action (with the exception of gross negligence or willful misconduct) of whatever kind or nature including, but not limited to, negligence, arising from and by reason of any and all known and unknown, foreseen and unforeseen bodily and personal injuries, damage to property, and the consequences thereof, including death, resulting from any participation in or in any way connected with or arising out of the Program.
  </p>
          `.trim(),
                },
                {
                  id: "eventPolicies",
                  label: "Online Event Policies",
                  body: `
  <p>
    Participants in online events or programs are expected to exhibit good behavior to ensure a positive experience for everyone. At its sole discretion, Orlando Math Circle may remove a participant from an online event or program for behavioral reasons. If a participant is removed for behavioral reasons, no refund will be issued and the participant may be blocked from future online sessions. Orlando Math Circle cannot provide refunds, credits, or transfers for any reason.
  </p>
          `.trim(),
                },
                {
                  id: "photoRelease",
                  label: "Photograph Permission and Release",
                  body: `
  <p class="mb-2">
    This agreement applies to the Registrant(s)/Participant(s). In consideration of my wish to participate in an online event or program and related activities (collectively the "Event") of the Orlando Math Circle, I agree:
  </p>
  <ol class="list-decimal pl-5 space-y-2">
    <li>
      That the Orlando Math Circle (or its representatives) may take photographs or video of me during my participation in the Event ("Photographs" or "Video");
    </li>
    <li>
      That I irrevocably grant the Orlando Math Circle (and its licensees and assigns) the worldwide right in perpetuity to use my name, and my likeness as depicted in the Photographs and/or Video in materials related to the Orlando Math Circle's educational and charitable mission, including the right to reproduce, distribute, modify, and publicly display the Photographs and/or Video in any medium now known or later developed, including, promotion and fundraising for the Orlando Math Circle;
    </li>
    <li>
      On behalf of myself, my heirs, family members, and executors, I irrevocably release the Orlando Math Circle from any claim of any nature, known or unknown, that I have or ever may have (including for invasion of privacy, libel, slander, portraying me in a false light, or breach of my right of publicity) based on use of the Photographs and/or Video or my name or likeness as described.
    </li>
  </ol>
  <p class="mt-2">
    I understand that the Orlando Math Circle will rely on this release and that I may not revoke my permission or release. These terms are governed by the laws of the State of Florida applicable to releases.
  </p>
          `.trim(),
                },
              ].map(({ id, label, body }) => (
                <div key={id} className="registration-agreement">
                  <Checkbox
                    id={id}
                    checked={(formData as any)[id]}
                    onCheckedChange={(v) => handleCheckbox(id, v as boolean)}
                  />
                  <div>
                    <Label htmlFor={id} className="font-medium">
                      {label} <span className="text-destructive">*</span>
                    </Label>
                    <div className="text-sm text-muted-foreground mt-1 p-4 border rounded-md max-h-40 overflow-y-auto">
                      <div dangerouslySetInnerHTML={{ __html: body }} />
                    </div>
                  </div>
                </div>
              ))}

              {/* Final Agreement */}
              <div className="registration-agreement">
                <Checkbox
                  id="finalAgreement"
                  checked={formData.finalAgreement}
                  onCheckedChange={(v) =>
                    handleCheckbox("finalAgreement", v as boolean)
                  }
                />
                <div>
                  <Label htmlFor="finalAgreement" className="font-medium">
                    Final Agreement <span className="text-destructive">*</span>
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    By checking this, I confirm I’ve read & agree to the above.
                  </p>
                </div>
              </div>
            </CardContent>

            {/* desktop submit */}
            <div className="hidden sm:flex justify-end p-6 pt-0">
              <Button type="submit" size="lg" className="w-full md:w-auto">
                Submit Registration
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* MOBILE step indicator + nav */}
      <div className="sm:hidden">
        <div className="text-center mb-4">
          <span className="font-medium">
            Step {stepIdx + 1} of {steps.length}
          </span>
        </div>
        <div className="flex justify-between">
          {stepIdx > 0 ? (
            <Button type="button" variant="outline" onClick={(event) => { event.preventDefault(); setStepIdx((i) => i - 1); }}>
              Back
            </Button>
          ) : (
            <div />
          )}
          {stepIdx < steps.length - 1 ? (
            <Button type="button" onClick={(event) => { event.preventDefault(); setStepIdx((i) => i + 1); }}>Next</Button>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </div>
      </div>
    </form>
  );
}
