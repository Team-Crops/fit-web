export function getStorageUrl(path: string): string;
export function getStorageUrl(path?: null): null;
export function getStorageUrl(path?: string | null): string | null;
export function getStorageUrl(path?: string | null): string | null {
  return path ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${path}` : null;
}

interface UploadProfileImageArg {
  file: File;
  preSignedUrl: string;
}

export async function uploadFile({ file, preSignedUrl }: UploadProfileImageArg) {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(preSignedUrl, { method: 'PUT', body: formData });
  if (!response.ok) {
    throw new Error('Failed to upload image');
  }
}
