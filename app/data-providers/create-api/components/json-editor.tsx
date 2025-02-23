"use client"

import { useEffect, useRef } from "react"
import { Textarea } from "@/components/ui/textarea"

interface JsonEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function JsonEditor({ value, onChange, placeholder }: JsonEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "200px"
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
    try {
      // Try to format the JSON if it's valid
      const parsed = JSON.parse(e.target.value)
      onChange(JSON.stringify(parsed, null, 2))
    } catch {
      // If JSON is invalid, keep the raw input
    }
  }

  return (
    <div className="relative">
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="font-mono text-sm"
      />
    </div>
  )
} 