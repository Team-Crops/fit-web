import useSWRMutation from 'swr/mutation';

import { fitFetch } from '#/utilities/fetch';

const PRESIGNED_URL_QUERY_KEY = '/v1/file/pre-signed-url';

interface PresignedUrlQueryArgs {
  fileDomain: 'PROFILE_IMAGE' | 'PORTFOLIO' | 'CHAT';
  fileName: string;
}

interface PresignedUrlQueryResponse {
  preSignedUrl: string;
  fileKey: string;
}

async function sendPresignedUrlQueryRequest(url: string, { arg }: { arg: PresignedUrlQueryArgs }) {
  const response = await fitFetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  });
  const json = await response.json();
  return json as PresignedUrlQueryResponse;
}

export function usePresignedUrlQuery() {
  return useSWRMutation<
    PresignedUrlQueryResponse,
    any,
    typeof PRESIGNED_URL_QUERY_KEY,
    PresignedUrlQueryArgs
  >(PRESIGNED_URL_QUERY_KEY, sendPresignedUrlQueryRequest);
}
