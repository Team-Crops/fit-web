import useSWRMutation from 'swr/mutation';

import type { PresignedUrl } from '#/types';
import { fitFetcher } from '#/utilities';

const PRESIGNED_URL_QUERY_KEY = '/v1/file/pre-signed-url';

interface PresignedUrlQueryArg {
  fileDomain: string;
  fileName: string;
}

interface PresignedUrlQueryResponse {
  preSignedUrl: string;
  fileKey: string;
}

export function usePresignedUrlQuery() {
  return useSWRMutation(
    PRESIGNED_URL_QUERY_KEY,
    async (url: string, { arg }: { arg: PresignedUrlQueryArg }) => {
      const response = await fitFetcher<PresignedUrlQueryResponse>(url, {
        method: 'POST',
        body: JSON.stringify(arg),
      });
      return response as PresignedUrl;
    }
  );
}
