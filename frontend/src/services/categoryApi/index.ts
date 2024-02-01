import axios from "axios";
import { api, settingAxios } from "services";
import { ApiException } from "types";

const connectionWithEndpoints = () => ({
  findOne: async (id: number) => {
    try {
      const res = await api.get(`/category/${id}`);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  findAll: async () => {
    try {
      const res = await api.get(`/category`);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  create: async (name: string): Promise<boolean | ApiException> => {
    try {
      const settingGeneralAxios = settingAxios();
      if (!settingGeneralAxios) return false;

      await api.post(`/category`, { name }, settingGeneralAxios);
      return true;
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) return error.response?.data.data;
      return false;
    }
  },
  delete: async (id: number): Promise<boolean | ApiException> => {
    try {
      const settingGeneralAxios = settingAxios();
      if (!settingGeneralAxios) return false;

      await api.delete(`/category/${id}`, settingGeneralAxios);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
});

export const categoryApi = connectionWithEndpoints();
