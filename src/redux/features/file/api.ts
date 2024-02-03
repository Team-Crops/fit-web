import { api } from '#/redux/api';

interface PresignedUrlRequest {
  filename: string;
}

interface PresignedUrlResponse {
  preSignedUrl: string;
  fileKey: string;
}

const fileApi = api.injectEndpoints({
  endpoints: (build) => ({
    presignedProfileImageUploadUrl: build.mutation<PresignedUrlResponse, PresignedUrlRequest>({
      query: ({ filename }) => ({
        url: '/v1/file/pre-signed-url',
        method: 'POST',
        body: {
          fileDomain: 'PROFILE_IMAGE',
          fileName: filename,
        },
      }),
    }),
  }),
});

export const { usePresignedProfileImageUploadUrlMutation } = fileApi;
export default fileApi;
