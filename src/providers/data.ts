
import type { DataProvider } from "@refinedev/core";

export const dataProvider: DataProvider = {
  getList: async () => {
    throw new Error("Refine dataProvider is not used. Data is fetched via React Query.");
  },
  getOne: async () => {
    throw new Error("Refine dataProvider is not used. Data is fetched via React Query.");
  },
  create: async () => {
    throw new Error("Not implemented");
  },
  update: async () => {
    throw new Error("Not implemented");
  },
  deleteOne: async () => {
    throw new Error("Not implemented");
  },
  getApiUrl: () => "",
};
