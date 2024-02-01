import {
  ProductCard,
  ModalForm,
  ProductFormForModal,
  CategoryFormForModal,
} from "components";
import { Button } from "flowbite-react";
import { useState } from "react";
import { useAuthContext } from "shared/contexts";
import { useMyProducts } from "shared/hooks";

export const MyProducts = () => {
  const { products, fetcher } = useMyProducts();
  const { user } = useAuthContext();
  const [openModal, setOpenModal] = useState(false);
  const [openModalCategory, setOpenModalCategory] = useState(false);
  const [openModalCategoryDelete, setOpenModalCategoryDelete] = useState(false);

  const setCloseModal = () => {
    setOpenModal(false);
    setOpenModalCategory(false);
    setOpenModalCategoryDelete(false);
  };

  return (
    <div className="w-full h-full lg:px-24 md:px-24 px-3">
      <div className="w-full flex justify-start">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 mt-2 ">
          Meus Produtos
        </h2>
      </div>
      <div className="mb-10 flex gap-4">
        <Button color="green" onClick={() => setOpenModal(true)}>
          Novo Produto
        </Button>
        <Button color="purple" onClick={() => setOpenModalCategory(true)}>
          Nova Categoria
        </Button>
        {user?.type === 1 && (
          <Button color="red" onClick={() => setOpenModalCategoryDelete(true)}>
            Deletar Categoria
          </Button>
        )}
      </div>
      <section className="flex justify-center gap-10 flex-wrap mb-10">
        {products.map((e) => {
          return <ProductCard key={e.cod} item={e} />;
        })}
      </section>
      <ModalForm
        title="Novo Produto"
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        <ProductFormForModal
          setCloseModal={setCloseModal}
          type="create"
          buttonName="Novo"
          fetcher={fetcher}
        />
      </ModalForm>
      <ModalForm
        title="Nova categoria"
        openModal={openModalCategory}
        setOpenModal={setOpenModalCategory}
      >
        <CategoryFormForModal
          setCloseModal={setCloseModal}
          type="create"
          buttonName="Adicionar"
          fetcher={fetcher}
        />
      </ModalForm>
      <ModalForm
        title="Deletar categoria"
        openModal={openModalCategoryDelete}
        setOpenModal={setOpenModalCategoryDelete}
      >
        <CategoryFormForModal
          setCloseModal={setCloseModal}
          type="delete"
          buttonName="Deletar"
          fetcher={fetcher}
        />
      </ModalForm>
    </div>
  );
};
