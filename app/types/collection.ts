export interface UploadedContent {
  id: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  indexingStatus: 'pending' | 'complete';
  size: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  contents: UploadedContent[];
} 