'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Collection } from '@/app/types/collection';
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Eye, Trash2 } from 'lucide-react';

// Mock data - replace with actual API call
const mockCollection: Collection = {
  id: '1',
  name: 'Sample Collection',
  description: 'A sample collection for testing',
  createdAt: '2024-02-23T00:00:00Z',
  updatedAt: '2024-02-23T00:00:00Z',
  contents: [
    {
      id: '1',
      fileName: 'document1.pdf',
      fileType: 'PDF',
      uploadDate: '2024-02-23T00:00:00Z',
      indexingStatus: 'complete',
      size: '1.2 MB'
    },
    {
      id: '2',
      fileName: 'document2.md',
      fileType: 'Markdown',
      uploadDate: '2024-02-23T00:00:00Z',
      indexingStatus: 'pending',
      size: '256 KB'
    }
  ]
};

export default function DataProviderDetails() {
  const router = useRouter();
  const params = useParams();
  const [collection, setCollection] = useState<Collection>(mockCollection);

  useEffect(() => {
    // Replace with actual API call
    // fetchDataProvider(params.data_provider_uuid)
  }, [params.data_provider_uuid]);

  const handleUpload = () => {
    router.push(`/data-providers/${params.data_provider_uuid}/upload`);
  };

  const handleViewFile = (fileId: string) => {
    // Implement file view logic
    console.log('Viewing file:', fileId);
  };

  const handleDeleteFile = (fileId: string) => {
    // Implement file deletion logic
    console.log('Deleting file:', fileId);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">{collection.name}</h1>
          <p className="text-gray-500 mt-2">{collection.description}</p>
        </div>
        <Button onClick={handleUpload}>Upload Content</Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {collection.contents.map((content) => (
              <TableRow key={content.id}>
                <TableCell>{content.fileName}</TableCell>
                <TableCell>{content.fileType}</TableCell>
                <TableCell>{content.size}</TableCell>
                <TableCell>
                  {new Date(content.uploadDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={content.indexingStatus === 'complete' ? 'default' : 'secondary'}
                  >
                    {content.indexingStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewFile(content.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteFile(content.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 