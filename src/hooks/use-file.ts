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
  // 여기에서 필요한 데이터를 request body에 포함시킬 수 있습니다.
  const { fileName, fileDomain } = arg;
  const requestBody = {
    fileName,
    fileDomain,
  };

  // POST 요청을 보내는 방식에 따라 request body를 설정할 수 있습니다.
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // JSON 형식으로 데이터를 보낼 경우에는 Content-Type을 설정합니다.
    },
    body: JSON.stringify(requestBody), // JSON.stringify를 사용하여 객체를 문자열로 변환합니다.
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
