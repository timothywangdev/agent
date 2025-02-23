import { NextResponse } from "next/server"
import { z } from "zod"

const createCollectionSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = createCollectionSchema.parse(body)

    // TODO: Replace with actual database call
    // For now, we'll just return a mock response
    const mockCollection = {
      id: crypto.randomUUID(),
      ...validatedData,
      type: "collection" as const,
      lastUpdated: new Date().toISOString(),
    }

    return NextResponse.json(mockCollection, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 })
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
} 