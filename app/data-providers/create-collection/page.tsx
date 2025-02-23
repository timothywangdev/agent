import { CreateCollectionForm } from "./components/create-collection-form"

export default function CreateCollectionPage() {
  return (
    <div className="container py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Create a New Collection</h1>
      <CreateCollectionForm />
    </div>
  )
} 