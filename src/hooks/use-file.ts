import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

import { PreSignedUrl } from '#/types/file';
import { fitFetch, fitFetcher } from '#/utilities';

const FILE_PRE_SIGNED_URL_KEY = '/v1/file/pre-signed-url';

interface PreSignedUrlArgs {
  fileName: string | null;
  fileDomain: 'PROFILE_DEFAULT_IMAGE' | 'PROFILE_IMAGE' | 'PORTFOLIO' | 'CHAT';
}

async function sendPostRequest(url: string, { arg }: { arg: PreSignedUrlArgs }) {
  const { fileName, fileDomain } = arg;
  const requestBody = {
    fileName,
    fileDomain,
  };

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  };

  const response = await fitFetch(url, requestOptions);

  if (!response.ok) {
    throw new Error('Failed to fetch pre-signed URL');
  }

  return (await response.json()) as PreSignedUrl;
}
export function usePreSignedUrl() {
  return useSWRMutation<PreSignedUrl, any, typeof FILE_PRE_SIGNED_URL_KEY, PreSignedUrlArgs>(
    FILE_PRE_SIGNED_URL_KEY,
    sendPostRequest,
    {
      onSuccess: (data) => mutate(FILE_PRE_SIGNED_URL_KEY, data),
    }
  );
}

export function uploadImageToS3(url: string, file: File) {
  return fetch(url, {
    method: 'PUT',
    body: file,
  });
}
