import { useCallback, useEffect, useState } from "react";
import { userApi } from "services";
import { useAuthContext } from "shared/contexts";
import { Product } from "types";

export const useMyProducts = () => {
  const { user } = useAuthContext();

  const [products, setproducts] = useState<Product[]>([]);

  const fetcher = useCallback(async () => {
    if (!user) return;

    const products = await userApi.myProducts(user.id);
    if (!products) return;
    setproducts(products);
    return;
  }, []);

  useEffect(() => {
    fetcher();
  }, [user]);

  return { products, fetcher };
};
