import axios from "axios";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

export const settingAxios = () => {
  const storeData = localStorage.getItem("authToken");

  if (!storeData) return false;

  return {
    headers: {
      Authorization: "Bearer " + storeData,
    },
    /* validateStatus: (status:any) => {
                return status < 500; // Resolve somente se o código de status for menor que 500
            }  */
  };
};
