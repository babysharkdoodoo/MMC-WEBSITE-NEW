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
  const [formData, setFormData] = useState({
    // Student Information
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

    // Parent Information
    parentName: "",
    email: "",
    phone: "",
    alternatePhone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    heardFrom: "",

    // Emergency Contact
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name: string, date: Date | null) => {
    setFormData((prev) => ({ ...prev, [name]: date }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required agreements:
    if (
      !formData.liabilityWaiver ||
      !formData.eventPolicies ||
      !formData.photoRelease ||
      !formData.finalAgreement
    ) {
      toast({
        title: "Error",
        description: "You must agree to all terms to register",
        variant: "destructive",
      });
      return;
    }

    // Submit form logic:
    console.log("Form submitted:", formData);

    toast({
      title: "Registration Submitted",
      description:
        "Thank you for registering! You’ll receive RSVP links via email for each upcoming event.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Tabs defaultValue="student" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="student">Student Info</TabsTrigger>
          <TabsTrigger value="parent">Parent Info</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
          <TabsTrigger value="agreements">Agreements</TabsTrigger>
        </TabsList>

        {/* ========== STUDENT TAB ========== */}
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

                <div className="space-y-2">
                  <Label htmlFor="studentBirthday">
                    Student Birthday <span className="text-destructive">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
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
                      onValueChange={(value) =>
                        handleSelectChange("studentGrade", value)
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                          (grade) => (
                            <SelectItem key={grade} value={grade.toString()}>
                              Grade {grade}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

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
                    onValueChange={(value) =>
                      handleRadioChange("ethnicity", value)
                    }
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2"
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
                    ].map((ethnicity) => (
                      <div
                        key={ethnicity}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem
                          id={`ethnicity-${ethnicity}`}
                          value={ethnicity}
                        />
                        <Label htmlFor={`ethnicity-${ethnicity}`}>
                          {ethnicity}
                        </Label>
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

                <div className="space-y-2">
                  <Label>
                    Prior Experience with Competition Math{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.priorExperience}
                    onValueChange={(value) =>
                      handleRadioChange("priorExperience", value)
                    }
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="experience-yes" value="Yes" />
                      <Label htmlFor="experience-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="experience-no" value="No" />
                      <Label htmlFor="experience-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

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

                <div className="space-y-2">
                  <Label htmlFor="specialNeeds">
                    Special Needs or Accommodations
                  </Label>
                  <Textarea
                    id="specialNeeds"
                    name="specialNeeds"
                    placeholder="Please list any special needs, accommodations, or allergies we should be aware of."
                    value={formData.specialNeeds}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ========== PARENT TAB ========== */}
        <TabsContent value="parent" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">
                  Parent/Guardian Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentName">
                      Parent/Guardian Name{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="parentName"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Primary Phone Number{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="alternatePhone">
                      Alternate Phone Number
                    </Label>
                    <Input
                      id="alternatePhone"
                      name="alternatePhone"
                      type="tel"
                      value={formData.alternatePhone}
                      onChange={handleChange}
                    />
                  </div>
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
                  <div className="space-y-2">
                    <Label htmlFor="city">
                      City <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">
                      State <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zipCode">
                      ZIP Code <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="heardFrom">How did you hear about us?</Label>
                  <Select
                    name="heardFrom"
                    value={formData.heardFrom}
                    onValueChange={(value) =>
                      handleSelectChange("heardFrom", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="school">School</SelectItem>
                      <SelectItem value="friend">Friend or Family</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="search">Search Engine</SelectItem>
                      <SelectItem value="event">Community Event</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Payment references removed. All events are free. */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ========== EMERGENCY TAB ========== */}
        <TabsContent value="emergency" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">
                  Emergency Contact Information
                </h3>
                <p className="text-sm text-muted-foreground">
                  Please provide an emergency contact different from the
                  parent/guardian listed above.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyName">
                      Emergency Contact Name{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="emergencyName"
                      name="emergencyName"
                      value={formData.emergencyName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyRelationship">
                      Relationship to Student{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="emergencyRelationship"
                      name="emergencyRelationship"
                      value={formData.emergencyRelationship}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">
                      Emergency Contact Phone{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="emergencyPhone"
                      name="emergencyPhone"
                      type="tel"
                      value={formData.emergencyPhone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ========== AGREEMENTS TAB ========== */}
        <TabsContent value="agreements" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <h3 className="text-xl font-bold">Agreements and Waivers</h3>

                {/* Liability Waiver - Original Full Text */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="liabilityWaiver"
                        checked={formData.liabilityWaiver}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(
                            "liabilityWaiver",
                            checked as boolean
                          )
                        }
                      />
                      <div>
                        <Label
                          htmlFor="liabilityWaiver"
                          className="font-medium"
                        >
                          Liability Waiver{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <div className="text-sm text-muted-foreground mt-1 p-4 border rounded-md max-h-40 overflow-y-auto">
                          <p className="mb-2">
                            As parent or legal guardian of the minor, I hereby
                            grant the permission necessary to allow Child to
                            participate in Melbourne Math Circle online or at
                            any physical location where events are held (the
                            "Program").
                          </p>
                          <p className="mb-2">
                            I understand the Program does not guarantee the
                            suitability of the Program for Child's
                            participation. I understand that there are inherent
                            risks involved in participating in the Program, and
                            I realize that participation in the Program is my
                            and the Child's choice.
                          </p>
                          <p className="mb-2">
                            I am aware that, during the program, certain risks
                            and dangers may occur, including, but not limited to
                            accident or illness; the forces of nature; all
                            manner of foreseen and unforeseen bodily and
                            personal injuries, including death; damage to
                            property; and the consequences resulting therefrom.
                          </p>
                          <p className="mb-2">
                            IN CONSIDERATION OF CHILD BEING PERMITTED TO ATTEND
                            AND PARTICIPATE IN THE PROGRAM, I ACKNOWLEDGE AND
                            VOLUNTARILY ASSUME ALL RISKS ASSOCIATED WITH THE
                            PROGRAM.
                          </p>
                          <p>
                            I, on my own behalf, and on behalf of the Child, our
                            heirs, representatives, executors, administrators
                            and assigns, for the sole consideration of Child
                            being allowed to attend and participate in the
                            program, do hereby release, relieve, covenant not to
                            sue and forever discharge, defend, indemnify and
                            hold harmless, Melbourne Math Circle, its officers,
                            agents, employees, students, and volunteers
                            (hereinafter collectively "MMC") of any and from all
                            claims, demands, rights, liabilities, losses,
                            expenses and causes of action (with the exception of
                            gross negligence or willful misconduct) of whatever
                            kind or nature including, but not limited to,
                            negligence, arising from and by reason of any and
                            all known and unknown, foreseen and unforeseen
                            bodily and personal injuries, damage to property,
                            and the consequences thereof, including death,
                            resulting from any participation in or in any way
                            connected with or arising out of the Program.
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          I HAVE READ THIS RELEASE OF LIABILITY IN ITS ENTIRETY
                          AND FULLY UNDERSTAND ITS CONTENTS.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Event Policies - Original Full Text */}
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="eventPolicies"
                        checked={formData.eventPolicies}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(
                            "eventPolicies",
                            checked as boolean
                          )
                        }
                      />
                      <div>
                        <Label htmlFor="eventPolicies" className="font-medium">
                          Online Event Policies{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <div className="text-sm text-muted-foreground mt-1 p-4 border rounded-md">
                          <p>
                            Participants in online events or programs are
                            expected to exhibit good behavior to ensure a
                            positive experience for everyone. At its sole
                            discretion, Melbourne Math Circle may remove a
                            participant from an online event or program for
                            behavioral reasons. If a participant is removed for
                            behavioral reasons, no refund will be issued and the
                            participant may be blocked from future online
                            sessions. Melbourne Math Circle cannot provide
                            refunds, credits, or transfers for any reason.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Photo Release - Original Full Text */}
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="photoRelease"
                        checked={formData.photoRelease}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(
                            "photoRelease",
                            checked as boolean
                          )
                        }
                      />
                      <div>
                        <Label htmlFor="photoRelease" className="font-medium">
                          Photograph Permission and Release{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <div className="text-sm text-muted-foreground mt-1 p-4 border rounded-md">
                          <p className="mb-2">
                            This agreement applies to the
                            Registrant(s)/Participant(s). In consideration of my
                            wish to participate in an online event or program
                            and related activities (collectively the "Event") of
                            the Melbourne Math Circle, I agree:
                          </p>
                          <ol className="list-decimal pl-5 space-y-2">
                            <li>
                              That the Melbourne Math Circle (or its
                              representatives) may take photographs or video of
                              me during my participation in the Event
                              ("Photographs" or "Video");
                            </li>
                            <li>
                              That I irrevocably grant the Melbourne Math Circle
                              (and its licensees and assigns) the worldwide
                              right in perpetuity to use my name, and my
                              likeness as depicted in the Photographs and/or
                              Video in materials related to the Melbourne Math
                              Circle's educational and charitable mission,
                              including the right to reproduce, distribute,
                              modify, and publicly display the Photographs
                              and/or Video in any medium now known or later
                              developed, including, promotion and fundraising
                              for the Melbourne Math Circle;
                            </li>
                            <li>
                              On behalf of myself, my heirs, family members, and
                              executors, I irrevocably release the Melbourne
                              Math Circle from any claim of any nature, known or
                              unknown, that I have or ever may have (including
                              for invasion of privacy, libel, slander,
                              portraying me in a false light, or breach of my
                              right of publicity) based on use of the
                              Photographs and/or Video or my name or likeness as
                              described.
                            </li>
                          </ol>
                          <p className="mt-2">
                            I understand that the Melbourne Math Circle will
                            rely on this release and that I may not revoke my
                            permission or release. These terms are governed by
                            the laws of the State of Florida applicable to
                            releases.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Final Agreement */}
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="finalAgreement"
                        checked={formData.finalAgreement}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(
                            "finalAgreement",
                            checked as boolean
                          )
                        }
                      />
                      <div>
                        <Label htmlFor="finalAgreement" className="font-medium">
                          Final Agreement{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          By checking this box, you acknowledge that you have
                          read and agree to the above for yourself and your
                          child(ren) listed in this form.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="lg" className="w-full md:w-auto">
              Submit Registration
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </form>
  );
}
