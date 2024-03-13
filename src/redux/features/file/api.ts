import { api } from '#/redux/api';

interface UploadSignedUrlRequest {
  fileDomain: 'PROFILE_IMAGE' | 'PORTFOLIO' | 'CHAT';
  fileName: string;
}

interface UploadSignedUrlResponse {
  preSignedUrl: string;
  fileKey: string;
}

const fileApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUploadSignedUrl: build.query<UploadSignedUrlResponse, UploadSignedUrlRequest>({
      query: ({ fileDomain, fileName }) => ({
        url: '/v1/file/pre-signed-url',
        method: 'POST',
        body: {
          fileDomain,
          fileName,
        },
      }),
    }),
  }),
});

export const { useGetUploadSignedUrlQuery, useLazyGetUploadSignedUrlQuery } = fileApi;
export default fileApi;
