import {
  ModalForm,
  PasswordFormForModalUsedAdmin,
} from "components";
import { RegisterFormForModal } from "components/RegisterFormForModal";
import { Button, Dropdown, Table } from "flowbite-react";
import { useState } from "react";
import { userApi } from "services";
import { useSubscribersDashboard } from "shared/hooks";
import {
  User,
  UserForRegisterForm,
  isApiException,
  typeFieldsLoginForm,
} from "types";
import { SetErrorOfForm } from "types/SetErrorOfForm";

const fieldsUpdateRegistrationForm: typeFieldsLoginForm[] = [
  {
    id: "name",
    label: "Nome",
    type: "text",
    placeholder: "Remando...",
    required: true,
  },
  {
    id: "email",
    label: "email",
    type: "email",
    placeholder: "email@email.com",
    required: true,
  },
  {
    id: "cpf",
    label: "CPF",
    type: "text",
    placeholder: "123.456.789-99",
    required: true,
  },
  {
    id: "address",
    label: "Endereço",
    type: "text",
    placeholder: "...",
    required: false,
  },
  {
    id: "city",
    label: "Cidade",
    type: "text",
    placeholder: "Rio de Janeiro",
    required: false,
  },
  {
    id: "uf",
    label: "UF",
    type: "text",
    placeholder: "RJ",
    required: false,
  },
];

const fieldsRegisterForm: typeFieldsLoginForm[] = [
  {
    id: "name",
    label: "Nome",
    type: "text",
    placeholder: "Remando...",
    required: true,
  },
  {
    id: "email",
    label: "email",
    type: "email",
    placeholder: "email@email.com",
    required: true,
  },
  {
    id: "cpf",
    label: "CPF",
    type: "text",
    placeholder: "123.456.789-99",
    required: true,
  },
  {
    id: "address",
    label: "Endereço",
    type: "text",
    placeholder: "...",
    required: false,
  },
  {
    id: "city",
    label: "Cidade",
    type: "text",
    placeholder: "Rio de Janeiro",
    required: false,
  },
  {
    id: "uf",
    label: "UF",
    type: "text",
    placeholder: "RJ",
    required: false,
  },
  {
    id: "password",
    label: "senha",
    type: "password",
    placeholder: "**********",
    required: true,
  },
  {
    id: "password2",
    label: "Confirme sua senha",
    type: "password",
    placeholder: "**********",
    required: true,
  },
];

export const SubscribersDashboard = () => {
  const { users, fetcher } = useSubscribersDashboard();
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdatePassword, setOpenModalUpdatePassword] = useState(false);
  const [openModalUpdateRegister, setOpenModalUpdateRegister] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [currentItem, setCurrentItem] = useState<User | null>(null);

  const setCloseModal = () => {
    setOpenModal(false);
    setOpenModalUpdatePassword(false);
    setOpenModalUpdateRegister(false);
    setOpenModalDelete(false);
  };

  const onAddSubscribers = async (
    data: UserForRegisterForm,
    setError: SetErrorOfForm
  ) => {
    if (!data) return;
    if (data.password !== data.password2) {
      setError("password2", {
        type: "password2 incorreto",
        message: "As senhas devem ser iguais",
      });
      return;
    }

    if (data.cpf?.length !== 14) {
      setError("cpf", {
        type: "cpf inc",
        message: "FORMATO CPF: 123.456.789-11",
      });
      return;
    }

    if (data.uf?.length !== 2) {
      setError("uf", {
        type: "cpf inc",
        message: "FORMATO UF: RJ",
      });
      return;
    }

    const newUser = await userApi.create(data);

    if (!newUser) {
      return;
    }
    if (isApiException(newUser)) {
      console.log("aqui isAPIExcepciont ", newUser);

      if (newUser.message === "Já existe usuário com esse email cadastrado")
        setError("email", {
          type: "user já cadastrado",
          message: "Já existe usuário com esse email cadastrado",
        });

      if (newUser.message === "Já existe usuário com esse cpf cadastrado")
        setError("cpf", {
          type: "user já cadastrado",
          message: "Já existe usuário com esse cpf cadastrado",
        });
      return;
    }
    setCloseModal();
    fetcher();
    return;
  };

  const onUpdateRegister = async (data: User, setError: SetErrorOfForm) => {
    if (!data) return;

    if (data.cpf?.length !== 14) {
      setError("cpf", {
        type: "cpf inc",
        message: "FORMATO CPF: 123.456.789-11",
      });
      return;
    }

    if (data.uf?.length !== 2) {
      setError("uf", {
        type: "cpf inc",
        message: "FORMATO UF: RJ",
      });
      return;
    }

    const newUser = await userApi.update(data);

    if (!newUser) {
      return;
    }
    if (isApiException(newUser)) {
      if (newUser.message === "Já existe usuário com esse email cadastrado")
        setError("email", {
          type: "user já cadastrado",
          message: "Já existe usuário com esse email cadastrado",
        });

      if (newUser.message === "Já existe usuário com esse cpf cadastrado")
        setError("cpf", {
          type: "user já cadastrado",
          message: "Já existe usuário com esse cpf cadastrado",
        });
      return;
    }
    setCloseModal();
    fetcher();
    return;
  };

  const onClickDelete = async () => {
    if (!currentItem) return;
    const res = await userApi.delete(currentItem?.id);

    if (!res) return;
    fetcher();
    setCloseModal();
  };

  return (
    <div className="w-full h-full lg:px-24 md:px-24 px-3">
      <div className="w-full flex justify-start">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 mt-2 ">
          Assinantes
        </h2>
      </div>

      <Button
        color="green"
        className={"mb-10"}
        onClick={() => setOpenModal(true)}
      >
        Novo Assinante
      </Button>
      <section>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Nome</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>UF</Table.HeadCell>
            <Table.HeadCell>tipo</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Editar</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {users.map((item) => {
              return (
                <Table.Row
                  key={item.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white capitalize">
                    {item.name}
                  </Table.Cell>
                  <Table.Cell>{item.email}</Table.Cell>
                  <Table.Cell>{item.uf}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item.type === 1 ? "Admin" : "Assinante"}
                  </Table.Cell>
                  <Table.Cell onClick={() => setCurrentItem(item)}>
                    <Dropdown inline label="Editar" dismissOnClick={false}>
                      <Dropdown.Item
                        onClick={() => setOpenModalUpdateRegister(true)}
                      >
                        Alterar dados cadastrais
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setOpenModalUpdatePassword(true)}
                      >
                        Alterar senha
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setOpenModalDelete(true)}>
                        Deletar usuário
                      </Dropdown.Item>
                    </Dropdown>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </section>

      <ModalForm
        title="Adicionar assinante"
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        <RegisterFormForModal
          actionOnSubmit={onAddSubscribers}
          fields={fieldsRegisterForm}
          setCloseModal={setCloseModal}
          type="create"
          buttonName="Novo"
          fetcher={fetcher}
        />
      </ModalForm>
      <ModalForm
        title="Atualização de dados cadastrais"
        openModal={openModalUpdateRegister}
        setOpenModal={setOpenModalUpdateRegister}
      >
        <RegisterFormForModal
          type="update"
          buttonName="Atualizar"
          values={currentItem}
          fields={fieldsUpdateRegistrationForm}
          actionOnSubmit={onUpdateRegister}
          fetcher={fetcher}
          setCloseModal={setCloseModal}
        />
      </ModalForm>

      <ModalForm
        title="Atualização da senha"
        openModal={openModalUpdatePassword}
        setOpenModal={setOpenModalUpdatePassword}
      >
        {currentItem && (
          <PasswordFormForModalUsedAdmin
            item={currentItem}
            fetcher={fetcher}
            setCloseModal={setCloseModal}
          />
        )}
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
    </div>
  );
};
