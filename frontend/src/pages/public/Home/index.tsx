import { ProductCard } from "components";
import { Button } from "flowbite-react";
import { NavLink } from "react-router-dom";
import { useHome } from "shared/hooks/useHome";

export const Home = () => {
  const { products, categories } = useHome();

  return (
    <div className="w-full h-full">
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
          <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-indigo-500 md:text-3xl lg:text-4xl">
            E-on
          </h1>
          <p className="mb-8 text-sm font-normal text-gray-500 md:text-base lg:text-xl sm:px-16 lg:px-48">
            O melhor "E" para você !
          </p>
        </div>
        <div className="w-full flex justify-center flex-wrap gap-4 ">
          {categories.map((e) => {
            if (!e.count || e.count < 0) {
              return "";
            }

            return (
              <NavLink key={e.name} to={`category/${e.id}`}>
                <Button
                  color={
                    e.id % 3 === 0 ? "yellow" : e.id % 2 === 0 ? "red" : "blue"
                  }
                >
                  {e.name}
                </Button>
              </NavLink>
            );
          })}
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
