"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { ControllerRenderProps, UseFormStateReturn, ControllerFieldState } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export function CreateCollectionForm() {
  const router = useRouter()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  async function onSubmit(values: FormValues) {
    try {
      // Mocked API response for now
      const mockResponse = {
        id: `mock-${Date.now()}`,
        ...values,
      }
      router.push(`/data-providers/${mockResponse.id}`)
    } catch (error) {
      console.error("Error creating collection:", error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({
            field,
            fieldState,
            formState,
          }: {
            field: ControllerRenderProps<FormValues, "title">
            fieldState: ControllerFieldState
            formState: UseFormStateReturn<FormValues>
          }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter collection title" {...field} />
              </FormControl>
              <FormDescription>
                A descriptive name for your collection
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({
            field,
            fieldState,
            formState,
          }: {
            field: ControllerRenderProps<FormValues, "description">
            fieldState: ControllerFieldState
            formState: UseFormStateReturn<FormValues>
          }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter collection description (optional)"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide additional details about your collection
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create Collection</Button>
      </form>
    </Form>
  )
} 