import { Region } from '#/entities/region';
import { api } from '#/redux/api';

interface RegionsResponse {
  regionList: Region[];
}

const regionApi = api.injectEndpoints({
  endpoints: (build) => ({
    getRegions: build.query<Region[], void>({
      query: () => ({
        url: '/v1/region',
        method: 'GET',
      }),
      transformResponse: (response: RegionsResponse) => response.regionList,
    }),
    createRegion: build.mutation<Region, Omit<Region, 'id'>>({
      query: (region) => ({
        url: '/v1/region',
        method: 'POST',
        body: region,
      }),
    }),
  }),
});

export const { useGetRegionsQuery, useCreateRegionMutation } = regionApi;
export default regionApi;
