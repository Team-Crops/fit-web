import { Region } from '#/entities/region';
import { api } from '#/redux/api';

interface RegionsResponse {
  regionList: Region[];
}

const regionApi = api.injectEndpoints({
  endpoints: (build) => ({
    getRegions: build.query<RegionsResponse, void>({
      query: () => ({
        url: '/v1/region',
        method: 'GET',
      }),
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