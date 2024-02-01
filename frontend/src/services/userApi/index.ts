import axios from "axios";
import { api, settingAxios } from "services";
import { ApiException, Product, User } from "types";

const connectionWithEndpoints = () => ({
  create: async (data: any): Promise<boolean | ApiException> => {
    try {
      await api.post("/user", data);

      return true;
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) return error.response?.data.data;
      return false;
    }
  },

  myProducts: async (id: number): Promise<Product[] | false> => {
    const settingGeneralAxios = settingAxios();
    if (!settingGeneralAxios) return false;

    try {
      const resposta = await api.get(
        `/user/${id}/product`,
        settingGeneralAxios
      );
      return resposta.data.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  updatePassword: async (
    oldPassword: string,
    password: string,
    id: number
  ): Promise<boolean | ApiException> => {
    try {
      const settingGeneralAxios = settingAxios();
      if (!settingGeneralAxios) return false;

      await api.patch(
        `/user/${id}/password`,
        {
          oldPassword,
          password,
        },
        settingGeneralAxios
      );

      return true;
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) return error.response?.data.data;
      return false;
    }
  },

  update: async (data: User): Promise<boolean | ApiException> => {
    try {
      const settingGeneralAxios = settingAxios();
      if (!settingGeneralAxios) return false;

      await api.put(`/user/${data.id}`, data, settingGeneralAxios);

      return true;
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) return error.response?.data.data;
      return false;
    }
  },

  findAllSubscribers: async (): Promise<User[] | false> => {
    try {
      const settingGeneralAxios = settingAxios();
      if (!settingGeneralAxios) return false;

      const res = await api.get(`/users`, settingGeneralAxios);

      return res.data.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  delete: async (id: number): Promise<boolean> => {
    try {
      const settingGeneralAxios = settingAxios();
      if (!settingGeneralAxios) return false;

      await api.delete(`/user/${id}`, settingGeneralAxios);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  updatePasswordByAdmin: async (
    password: string,
    id: number
  ): Promise<boolean | ApiException> => {
    try {
      const settingGeneralAxios = settingAxios();
      if (!settingGeneralAxios) return false;

      await api.patch(
        `/admin/user/${id}/password/`,
        {
          password,
        },
        settingGeneralAxios
      );

      return true;
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) return error.response?.data.data;
      return false;
    }
  },
});

export const userApi = connectionWithEndpoints();
