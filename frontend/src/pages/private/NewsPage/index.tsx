import { ModalForm, NewsFormForModal } from "components";
import { Button } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { newsApi } from "services";
import { useAuthContext } from "shared/contexts";
import { useNews } from "shared/hooks";

export const NewsPage = () => {
  const { news, fetcher } = useNews();

  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  if (!news) return <></>;

  const setCloseModal = () => {
    setOpenModalUpdate(false);
    setOpenModalDelete(false);
  };

  const onClickDelete = async () => {
    const res = await newsApi.delete(news?.id);

    if (!res) return;

    setCloseModal();
    navigate("/noticias/destaques");
  };

  return (
    <div className="w-full h-full lg:px-24 md:px-24 px-3 flex flex-col wrap">
      <section className="flex w-full justify-center items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-700 mt-2 ">{news.title}</h2>
        <div className="flex gap-5 wrap">
          {user?.type === 1 && (
            <>
              <Button
                color="yellow"
                className={""}
                onClick={() => setOpenModalUpdate(true)}
              >
                Atualizar Notícia
              </Button>
              <Button
                color="red"
                className={""}
                onClick={() => setOpenModalDelete(true)}
              >
                Deletar Notícia
              </Button>
            </>
          )}
        </div>
      </section>
      <section className="W-full">
        <p className="mb-3  text-gray-600 dark:text-gray-400">{news.summary}</p>
      </section>
      <figure className="flex justify-center mb-10">
        <img
          className="max-w-lg max-h-[400px] h-auto border-2 border-black "
          src={news.image}
          alt={news.title}
        />
      </figure>
      <section className="W-full">
        <p className="mb-3  text-gray-600 dark:text-gray-400">{news.content}</p>
      </section>

      <ModalForm
        title="Atualizar Notícia"
        openModal={openModalUpdate}
        setOpenModal={setOpenModalUpdate}
      >
        <NewsFormForModal
          setCloseModal={setCloseModal}
          type="update"
          buttonName="Atualizar"
          values={news}
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
            Realmente deseja deletar esta notícia ?
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
    </div>
  );
};
