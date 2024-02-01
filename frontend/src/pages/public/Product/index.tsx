import { ModalForm, ProductFormForModal } from "components";
import { Button } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { productApi } from "services";
import { useAuthContext } from "shared/contexts";
import { useProduct } from "shared/hooks";

export const Product = () => {
  const { product, fetcher } = useProduct();

  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);


  if (!product) return <></>;

  const setCloseModal = () => {
    setOpenModalUpdate(false);
    setOpenModalDelete(false);
  };

  const onClickDelete = async () => {
    console.log("delete");
    const res = await productApi.delete(product?.cod);

    if (!res) return;

    setCloseModal();
    navigate("/meus-produtos");
  };

  return (
    <div className="w-full h-full lg:px-24 md:px-24 px-3">
      <div className="w-full flex justify-between gap-2 items-center">
        <h2 className="text-2xl font-bold text-gray-700 mt-2 ">
          {product.name}
        </h2>
        <div className="flex gap-5">
          {user?.type !== null && (user?.id === product.userId) && (
            <>
              <Button
                color="yellow"
                className={""}
                onClick={() => setOpenModalUpdate(true)}
              >
                Atualizar Produto
              </Button>
              <Button
                color="red"
                className={""}
                onClick={() => setOpenModalDelete(true)}
              >
                Deletar Produto
              </Button>
            </>
          )}
        </div>
      </div>
      <div className={`flex gap-10 flex-wrap`}>
        <div className="">
          <figure>
            <img
              className="max-w-lg max-h-[400px] h-auto border-2 border-black "
              src={product.image}
              alt={product.name}
            />
          </figure>
        </div>
        <div className="ml-1 mb-8">
          <p className="font-normal text-sm text-gray-700 dark:text-gray-400 max-w-[34rem] break-words">
            <span className="font-bold text-gray-700 dark:text-gray-400">
              Valor:{"  "}
            </span>
            R${product.value}
          </p>
          <p className="font-normal text-sm text-gray-700 dark:text-gray-400 max-w-[34rem] break-words">
            <span className="font-bold text-gray-700 dark:text-gray-400">
              Quantidade:{" "}
            </span>
            {product.quantity}
          </p>
          <p className="font-normal text-sm text-gray-700 dark:text-gray-400">
            <span className="font-bold text-gray-700 dark:text-gray-400">
              Categoria:{" "}
            </span>
            {` ${product.categoryName}`}
          </p>
          <p className="font-normal text-sm text-gray-700 dark:text-gray-400 max-w-[34rem] break-words">
            <span className="font-bold text-gray-700 dark:text-gray-400">
              Descrição:{" "}
            </span>
            {product.description}
          </p>
        </div>
      </div>
      <ModalForm
        title="Atualizar Produto"
        openModal={openModalUpdate}
        setOpenModal={setOpenModalUpdate}
      >
        <ProductFormForModal
          setCloseModal={setCloseModal}
          type="update"
          buttonName="Atualizar"
          values={product}
          fetcher={fetcher}
        />
      </ModalForm>

      <ModalForm
        title="Atenção !"
        openModal={openModalDelete}
        setOpenModal={setOpenModalDelete}
      >
        <div className="text-center">
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Realmente deseja deletar o produto isso ?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={onClickDelete}>
              {"Sim, deletar"}
            </Button>
            <Button color="gray" onClick={setCloseModal}>
              cancelar
            </Button>
          </div>
        </div>
      </ModalForm>

      <section className="flex flex-col w-full justify-center items-center gap-8"></section>
    </div>
  );
};

/* 



*/
