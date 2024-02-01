import axios from "axios";
import { api, settingAxios } from "services";
import { ApiException, User } from "types";

const connectionWithEndpoints = () => ({
  signin: async (
    email: string,
    password: string
  ): Promise<{ user: User; token: string } | null | ApiException> => {
    try {
      const res = await api.post("/login", {
        email,
        password,
      });
      return res.data.data;
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) return error.response?.data.data;

      return null;
    }
  },
  verifyToken: async () => {
    const settingGeneralAxios = settingAxios();
    if (!settingGeneralAxios) return false;

    try {
      const resposta = await api.get("/auth", settingGeneralAxios);
    return resposta.data.data;

    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) return error.response?.data.data;
      return null;
    }
    
  },
});

export const authApi = connectionWithEndpoints();
