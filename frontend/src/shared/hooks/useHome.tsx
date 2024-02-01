import { useCallback, useEffect, useState } from "react";
import { categoryApi, productApi } from "services";
import { Category, Product } from "types";

export const useHome = () => {
  const [products, setproducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const fetcher = useCallback(async () => {
    const products = await productApi.activeProducts();
    const categories = await categoryApi.findAll();

    if (!products || !categories) return;
    setproducts(products);
    setCategories(categories);
    return;
  }, []);

  useEffect(() => {
    fetcher();
  }, []);

  return { categories, products, fetcher };
};
