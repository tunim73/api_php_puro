import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productApi } from "services";
import { Product } from "types";

export const useProduct = () => {
  const [product, setproduct] = useState<Product|null>(null);

  const { id } = useParams();

  const fetcher = useCallback(async () => {
    if (!id) return;
    const product = await productApi.findOne(Number(id));
    
    if (!product) return;
    setproduct(product);
    return;
  }, []);

  useEffect(() => {
    fetcher();
  }, []);

  return { product, fetcher };
};
