'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Upload, FileIcon } from 'lucide-react';

interface FileWithPreview extends File {
  preview?: string;
}

export default function UploadContent() {
  const router = useRouter();
  const params = useParams();
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [
      ...prev,
      ...acceptedFiles.map((file) => 
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    ]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/markdown': ['.md'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    }
  });

  const removeFile = (name: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== name));
  };

  const handleUpload = async () => {
    try {
      // Implement actual file upload logic here
      console.log('Uploading files:', files);
      
      // Redirect back to data provider details page
      router.push(`/data-providers/${params.data_provider_uuid}`);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Upload Content</h1>
        <p className="text-gray-500 mt-2">
          Upload files to add to your collection
        </p>
      </div>

      <Card className="p-8">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300'}`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-sm text-gray-600">
            Drag & drop files here, or click to select files
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Supported formats: PDF, Markdown, DOCX
          </p>
        </div>

        {files.length > 0 && (
          <div className="mt-8">
            <h3 className="font-semibold mb-4">Selected Files</h3>
            <div className="space-y-2">
              {files.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <FileIcon className="h-5 w-5 text-gray-500" />
                    <span className="text-sm">{file.name}</span>
                    <span className="text-xs text-gray-500">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(file.name)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => router.push(`/data-providers/${params.data_provider_uuid}`)}
              >
                Cancel
              </Button>
              <Button onClick={handleUpload} disabled={files.length === 0}>
                Upload Files
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
} 