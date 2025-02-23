"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { JsonEditor } from "./json-editor"
import { KeyValueInputs } from "./key-value-inputs"
import { nanoid } from "nanoid"
import { toast } from "sonner"

const httpMethods = ["GET", "POST", "PUT", "DELETE"] as const

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  endpoint: z.string().url("Must be a valid URL"),
  method: z.enum(httpMethods),
  headers: z.array(
    z.object({
      id: z.string(),
      key: z.string().min(1, "Header key is required"),
      value: z.string().min(1, "Header value is required"),
    })
  ),
  requestSchema: z.string()
    .min(1, "Request schema is required")
    .refine(
      (value) => {
        try {
          JSON.parse(value)
          return true
        } catch {
          return false
        }
      },
      "Must be valid JSON"
    ),
  responseSchema: z.string()
    .min(1, "Response schema is required")
    .refine(
      (value) => {
        try {
          JSON.parse(value)
          return true
        } catch {
          return false
        }
      },
      "Must be valid JSON"
    ),
})

type FormValues = z.infer<typeof formSchema>

export function AddApiForm() {
  const router = useRouter()
  const [isTestingApi, setIsTestingApi] = useState(false)
  const [testResponse, setTestResponse] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      endpoint: "",
      method: "GET",
      headers: [{ id: nanoid(), key: "", value: "" }],
      requestSchema: "{\n  \n}",
      responseSchema: "{\n  \n}",
    },
  })

  async function onSubmit(values: FormValues) {
    try {
      // Mocked API response for now
      const mockResponse = {
        id: `mock-${Date.now()}`,
        ...values,
      }
      toast.success("API added successfully")
      router.push(`/data-providers/${mockResponse.id}`)
    } catch (error) {
      console.error("Error adding API:", error)
      toast.error("Failed to add API")
    }
  }

  async function handleTestApi() {
    const values = form.getValues()
    
    try {
      // Validate form before testing
      await form.trigger(["endpoint", "method", "headers", "requestSchema"])
      
      setIsTestingApi(true)
      // Mock test response for now
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const response = {
        status: "success",
        message: "API test successful",
        endpoint: values.endpoint,
        method: values.method,
        headers: values.headers,
      }
      
      setTestResponse(JSON.stringify(response, null, 2))
      toast.success("API test successful")
    } catch (error) {
      console.error("Error testing API:", error)
      setTestResponse(JSON.stringify({ 
        status: "error", 
        message: "API test failed",
        errors: form.formState.errors 
      }, null, 2))
      toast.error("API test failed")
    } finally {
      setIsTestingApi(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* API Metadata Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">API Metadata</h2>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter API name" {...field} />
                </FormControl>
                <FormDescription>A descriptive name for your API</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter API description (optional)"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide additional details about your API
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Endpoint & Method Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Endpoint & Method</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="endpoint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endpoint URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://api.example.com/v1/resource" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>HTTP Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select HTTP method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {httpMethods.map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Headers Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Headers</h2>
          <FormField
            control={form.control}
            name="headers"
            render={({ field }) => (
              <FormItem>
                <KeyValueInputs
                  value={field.value}
                  onChange={field.onChange}
                  addButtonText="Add Header"
                />
                <FormDescription>
                  Define headers like Authorization, Content-Type, etc.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Schema Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">API Schema</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="requestSchema"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Request Schema</FormLabel>
                  <FormControl>
                    <JsonEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Enter request schema"
                    />
                  </FormControl>
                  <FormDescription>
                    Define the structure of API request parameters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="responseSchema"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Response Schema</FormLabel>
                  <FormControl>
                    <JsonEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Enter response schema"
                    />
                  </FormControl>
                  <FormDescription>
                    Define the expected response structure
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Test Response Section */}
        {testResponse && (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Test Response</h2>
            <div className="bg-muted p-4 rounded-md">
              <pre className="whitespace-pre-wrap overflow-auto">{testResponse}</pre>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleTestApi}
            disabled={isTestingApi}
          >
            {isTestingApi ? "Testing..." : "Test API"}
          </Button>
          <Button type="submit">Save & Publish API</Button>
        </div>
      </form>
    </Form>
  )
} 