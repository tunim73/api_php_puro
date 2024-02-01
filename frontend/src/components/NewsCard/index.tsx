/* import { ModalForm } from "components"; */
import { Card } from "flowbite-react";
/* import { useState } from "react"; */
import { NavLink } from "react-router-dom";
/* import { useAuthContext } from "shared/contexts"; */
import { News } from "types";

type Props = {
  item: News;
};

export const NewsCard = ({ item }: Props) => {
/*   const { user } = useAuthContext();
  const [openModal, setOpenModal] = useState(false);

  const onClickForOpenModal = () => {
    setOpenModal(true);
  }; */

  return (
    <div className="md:min-h-[300px]  md:w-[600px] sm:w-[450px] sm:h-auto">
      <Card className="w-full h-full" imgSrc={item.image} horizontal>
        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {item.title}
        </h5>
        <p className="font-sm text-gray-700 dark:text-gray-400">
            {`${ item.createdAt}`}
        </p>
        <p className="font-sm text-gray-700 dark:text-gray-400">
          {`${item.summary}`}
        </p>
        <NavLink
          to={`/noticia/${item.id}`}
          className={"inline-flex items-center text-blue-600 hover:underline"}
        >
          {"-> Saiba mais <-"}
        </NavLink>
      </Card>
    </div>
  );
};

/* 
<Card className="max-w-xl w-full flex justify-center">
      <div className="flex justify-between">
        <div className="flex justify-items-start">
          <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
            {item.title}
          </h5>
        </div>
      </div>
      <div className="w-full flex justify-center ">
        <p className="font-normal capitalize text-gray-700 dark:text-gray-400">
          Resumo: {item.summary}
        </p>
      </div>
      <div className="w-full flex justify-center ">
        <figure>
          <img
            className="h-auto max-w-full"
            src="https://s2-oglobo.glbimg.com/XHyW30Z5zgLoCt7u8ZLCgijxrpo=/0x0:845x477/1000x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2024/A/O/kcWUYnTIyUL6Rc6WSAtA/whatsapp-image-2024-01-12-at-21.27.14-1-.jpeg"
            alt="image description"
          />
        </figure>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-normal capitalize text-gray-700 dark:text-gray-400">
          Resumo: {item.summary}
        </p>
        {user?.type === 1 && (
          <UpdateButton actionOnClick={onClickForOpenModal} />
        )}

        <ModalForm
          title="Atualizar Aula"
          openModal={openModal}
          setOpenModal={setOpenModal}
        ></ModalForm>
      </div>
    </Card>

 */

