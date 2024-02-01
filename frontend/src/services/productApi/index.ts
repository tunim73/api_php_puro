import { api, settingAxios } from "services";
import { Product } from "types";

const connectionWithEndpoints = () => ({
  activeProducts: async (): Promise<Product[] | null> => {
    try {
      const res = await api.get("/product");
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  create: async (data: Product) => {
    const settingGeneralAxios = settingAxios();
    if (!settingGeneralAxios) return false;
    try {
      await api.post("/product", data, settingGeneralAxios);
      return true;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  findOne: async (id: number): Promise<Product | null> => {
    try {
      const res = await api.get(`/product/${id}`);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  update: async (data: Product) => {
    const settingGeneralAxios = settingAxios();
    if (!settingGeneralAxios) return false;

    try {
      const res = await api.put(
        `/product/${data.cod}`,
        data,
        settingGeneralAxios
      );
      return res.data.data.product;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  delete: async (id: number) => {
    const settingGeneralAxios = settingAxios();
    if (!settingGeneralAxios) return false;

    try {
      await api.delete(`/product/${id}`, settingGeneralAxios);
      return true;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
});

export const productApi = connectionWithEndpoints();
