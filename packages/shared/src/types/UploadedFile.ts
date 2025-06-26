export interface UploadedFile {
  name: string;
  originalName: string;
  size: number;
  extname: string;
  mimeType: string;
  meta: {
    dimension?: {
      width: number;
      height: number;
    };
  };
  url: string;
}