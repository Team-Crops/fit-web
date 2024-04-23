export function getStorageUrl(path: string): string {
  const url = `https://d2ueefa0uvyh4f.cloudfront.net/${path}`;
  return url;
}

interface UploadProfileImageArgs {
  imageFile: File;
  preSignedUrl: string;
}

export async function uploadProfileImage({ imageFile, preSignedUrl }: UploadProfileImageArgs) {
  const formData = new FormData();
  formData.append('file', imageFile);
  const response = await fetch(preSignedUrl, { method: 'PUT', body: formData });
  if (!response.ok) {
    throw new Error('Failed to upload image');
  }
}
