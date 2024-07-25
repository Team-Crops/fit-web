import useSWRMutation from 'swr/mutation';

import { PresignedUrl } from '#/types/file';
import { fitFetcher } from '#/utilities';

const FILE_PRESIGNED_URL_KEY = '/v1/file/pre-signed-url';

interface PresignedUrlArg {
  fileName: string | null;
  fileDomain: 'PROFILE_DEFAULT_IMAGE' | 'PROFILE_IMAGE' | 'PORTFOLIO' | 'CHAT';
}

export function usePresignedUrlLazyQuery() {
  return useSWRMutation(
    FILE_PRESIGNED_URL_KEY,
    async (url: string, { arg: { fileName, fileDomain } }: { arg: PresignedUrlArg }) => {
      return fitFetcher<PresignedUrl>(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName, fileDomain }),
      });
    }
  );
}
