interface UploadSignedUrlRequest {
  fileDomain: 'PROFILE_IMAGE' | 'PORTFOLIO' | 'CHAT';
  fileName: string;
}

interface UploadSignedUrlResponse {
  preSignedUrl: string;
  fileKey: string;
}

export async function getUploadSignedUrl({
  fileDomain,
  fileName,
}: UploadSignedUrlRequest): Promise<UploadSignedUrlResponse> {
  const response = await fetch(`/v1/file/pre-signed-url`, {
    method: 'POST',
    body: JSON.stringify({
      fileDomain,
      fileName,
    }),
  });
  const json = (await response.json()) as UploadSignedUrlResponse;
  return json;
}
