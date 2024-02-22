import { api } from '#/redux/api';

const storageApi = api.injectEndpoints({
  endpoints: (build) => ({
    getImage: build.query<Blob, string>({
      query: (path) => ({
        baseUrl: 'https://d2ueefa0uvyh4f.cloudfront.net',
        url: path,
        method: 'GET',
        responseHandler: async (response) => response.blob(),
      }),
    }),
  }),
});

export const { useGetImageQuery } = storageApi;
export default storageApi;
