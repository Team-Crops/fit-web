'use server';

import { Region } from '#/entities/region';
import { fitFetch } from '#/utilities/fetch';

interface GetRegionsResponse {
  regionList: {
    id: number;
    displayName: string;
  }[];
}

export async function getRegions(): Promise<Region[]> {
  const response = await fitFetch(`/v1/region`);
  const json = (await response.json()) as GetRegionsResponse;
  return json.regionList;
}

interface CreateRegionRequest {
  displayName: string;
}

interface CreateRegionResponse {
  id: number;
  displayName: string;
}

export async function createRegion({ displayName }: CreateRegionRequest): Promise<Region> {
  const response = await fitFetch(`/v1/region`, {
    method: 'POST',
    body: JSON.stringify({ displayName }),
  });
  const json = (await response.json()) as CreateRegionResponse;
  return json;
}
