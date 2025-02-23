"use client"

import { DataProvider } from "../types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useRouter } from "next/navigation"
import { format } from "date-fns"

interface DataProvidersTableProps {
  data: DataProvider[]
}

export function DataProvidersTable({ data }: DataProvidersTableProps) {
  const router = useRouter()

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((provider) => (
            <TableRow
              key={provider.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => router.push(`/data-providers/${provider.id}`)}
            >
              <TableCell className="font-medium">{provider.name}</TableCell>
              <TableCell className="capitalize">{provider.type}</TableCell>
              <TableCell>
                {format(new Date(provider.lastUpdated), "PPp")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 