import { LoginForm } from "components";
import { useNavigate } from "react-router-dom";
import { userApi } from "services";
import { FieldsRegister, isApiException, typeFieldsLoginForm } from "types";
import { SetErrorOfForm } from "types/SetErrorOfForm";

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

const alternativeLink = {
  link: "/login",
  name: "Fazer login",
};

export const Register = () => {
  const navigate = useNavigate();

  const actionOnSubmit = async (
    data: FieldsRegister,
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

    if (data.cpf.length !== 14) {
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
    console.log("newUser: ", newUser);
    navigate("/login");
    return;
  };

  return (
    <div>
      <LoginForm
        fields={fieldsRegisterForm}
        buttonName={"Cadastre-se"}
        alternativeLink={alternativeLink}
        actionOnSubmit={actionOnSubmit}
      />
    </div>
  );
};
