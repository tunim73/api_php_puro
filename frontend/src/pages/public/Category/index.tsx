import { ProductCard } from "components";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { categoryApi } from "services";
import { Product } from "types";

export const CategoryṔage = () => {
  const [products, setproducts] = useState<Product[]>([]);
  const { id } = useParams();

  const fetcher = useCallback(async () => {
    if (!id) return;

    const products = await categoryApi.findOne(Number(id));
    if (!products) return;
    return setproducts(products);
  }, []);

  useEffect(() => {
    fetcher();
  }, []);

  return (
    <div className="w-full h-full">
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
          <h1
            className={`mb-4 text-xl font-extrabold tracking-tight leading-none 
            ${ Number(id) % 3 === 0 ? "text-yellow-300" : Number(id) % 2 === 0 ? "text-red-500": "text-blue-700"
            }    
             md:text-2xl lg:text-3xl`}
          >
            {products[0]?.categoryName}
          </h1>
        </div>
      </section>
      <section className="flex justify-center gap-10 flex-wrap mt-10">
        {products.map((e) => {
          return <ProductCard key={e.cod} item={e} />;
        })}
      </section>
    </div>
  );
};
