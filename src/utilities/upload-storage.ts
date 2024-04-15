import { getUploadSignedUrl } from '#/actions/file';

export async function uploadProfileImage(image: File) {
  const { preSignedUrl: url, fileKey } = await getUploadSignedUrl({
    fileDomain: 'PROFILE_IMAGE',
    fileName: image.name,
  });

  const formData = new FormData();
  formData.append('file', image);
  const response = await fetch(url, { method: 'PUT', body: formData });
  if (!response.ok) {
    throw new Error('Failed to upload image');
  }

  return { fileKey };
}
