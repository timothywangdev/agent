"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, X } from "lucide-react"
import { nanoid } from 'nanoid'

interface KeyValue {
  id: string
  key: string
  value: string
}

interface KeyValueInputsProps {
  value: KeyValue[]
  onChange: (value: KeyValue[]) => void
  addButtonText?: string
}

export function KeyValueInputs({
  value,
  onChange,
  addButtonText = "Add Item",
}: KeyValueInputsProps) {
  const handleAdd = () => {
    onChange([...value, { id: nanoid(), key: "", value: "" }])
  }

  const handleRemove = (id: string) => {
    onChange(value.filter(item => item.id !== id))
  }

  const handleChange = (
    id: string,
    field: "key" | "value",
    newValue: string
  ) => {
    const newItems = value.map(item =>
      item.id === id ? { ...item, [field]: newValue } : item
    )
    onChange(newItems)
  }

  return (
    <div className="space-y-2">
      {value.map((item) => (
        <div key={item.id} className="flex gap-2 items-center">
          <Input
            placeholder="Key"
            value={item.key}
            onChange={(e) => handleChange(item.id, "key", e.target.value)}
            className="flex-1"
          />
          <Input
            placeholder="Value"
            value={item.value}
            onChange={(e) => handleChange(item.id, "value", e.target.value)}
            className="flex-1"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => handleRemove(item.id)}
            className="shrink-0 hover:bg-destructive/10"
          >
            <X className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleAdd}
        className="mt-2"
      >
        <Plus className="h-4 w-4 mr-2" />
        {addButtonText}
      </Button>
    </div>
  )
} 