import { GetCampaignsApiResponse } from "src/services/tryberApi";

type Item = NonNullable<GetCampaignsApiResponse["items"]>[number];

type Must<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};
export type Campaign = Must<Item>;
