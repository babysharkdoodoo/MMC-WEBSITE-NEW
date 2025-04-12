"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import MathContent from "@/components/math-content"

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<string>("write")

  return (
    <div className="border rounded-md">
      <Tabs defaultValue="write" onValueChange={setActiveTab}>
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <TabsList className="bg-navy/5 p-1">
            <TabsTrigger value="write" className="font-mono text-xs">
              Write
            </TabsTrigger>
            <TabsTrigger value="preview" className="font-mono text-xs">
              Preview
            </TabsTrigger>
          </TabsList>

          <div className="text-xs text-navy/60">Supports Markdown and LaTeX math ($$...$$)</div>
        </div>

        <TabsContent value="write" className="p-0 m-0">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="min-h-[400px] border-0 rounded-none focus-visible:ring-0 resize-y"
          />
        </TabsContent>

        <TabsContent value="preview" className="p-0 m-0">
          <div className="min-h-[400px] p-4 prose max-w-none">
            {value ? (
              <MathContent content={value} />
            ) : (
              <div className="text-navy/40 italic">Nothing to preview yet. Start writing to see a preview.</div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
