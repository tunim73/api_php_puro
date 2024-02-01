import { Card } from "flowbite-react";
import { NavLink } from "react-router-dom";
import { Product } from "types";

type Props = {
  item: Product
}


export const ProductCard = ({item}: Props) => {
  return (
    <div className="md:h-52 md:w-[580px] sm:w-[450px] sm:h-auto">
      <Card className="w-full h-full" imgSrc={item.image} horizontal>
        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {item.name}
        </h5>

        <p className="font-normal text-gray-700 dark:text-gray-400">
          <span className="font-bold text-gray-700 dark:text-gray-400">
            Valor: R${` ${item.value}`} 
          </span>
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          <span className="font-bold text-gray-700 dark:text-gray-400">
          Quantidade:{` ${item.quantity }`} 
          </span>
        </p>

        <NavLink
          to={`/produto/${item.cod}`}
          className={"inline-flex items-center text-blue-600 hover:underline"}
        >
          {"-> Saiba mais <-"}
        </NavLink>
      </Card>
    </div>
  );
};
