export type DataProviderType = "collection" | "api"

export interface DataProvider {
  id: string
  name: string
  type: DataProviderType
  lastUpdated: string
} 