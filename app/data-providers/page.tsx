import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { DataProvidersTable } from "./components/data-providers-table"
import { DataProvider } from "./types"
import Link from "next/link"

// Mock data for development
const mockDataProviders: DataProvider[] = [
  {
    id: "1a2b3c4d-5e6f-7g8h-9i0j",
    name: "Customer Feedback Dataset",
    type: "collection",
    lastUpdated: "2024-03-20T10:30:00Z",
  },
  {
    id: "2b3c4d5e-6f7g-8h9i-0j1k",
    name: "Product Catalog API",
    type: "api",
    lastUpdated: "2024-03-19T15:45:00Z",
  },
  {
    id: "3c4d5e6f-7g8h-9i0j-1k2l",
    name: "Market Research Documents",
    type: "collection",
    lastUpdated: "2024-03-18T09:15:00Z",
  },
]

export default function DataProvidersPage() {
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Data Providers</h1>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/data-providers/create-collection">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Collection
            </Link>
          </Button>
          <Button asChild>
            <Link href="/data-providers/create-api">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add API
            </Link>
          </Button>
        </div>
      </div>
      
      <DataProvidersTable data={mockDataProviders} />
    </div>
  )
} 