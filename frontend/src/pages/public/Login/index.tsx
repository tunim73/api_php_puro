import { LoginForm } from "components";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "shared/contexts";
import { FieldsLogin, typeFieldsLoginForm } from "types";
import { SetErrorOfForm } from "types/SetErrorOfForm";

const fieldsLoginForm: typeFieldsLoginForm[] = [
  {
    id: "email",
    label: "Seu email",
    type: "email",
    placeholder: "email@email.com",
    required: true,
  },
  {
    id: "password",
    label: "Sua senha",
    type: "password",
    placeholder: "**********",
    required: true,
  },
];

const alternativeLink = {
  link: "/register",
  name: "cadastrar-se",
};

export const Login = () => {
  const { signin } = useAuthContext();
  const navigate = useNavigate();

  const actionOnSubmit = async (
    data: FieldsLogin,
    setError: SetErrorOfForm
  ) => {
    if (!data) return;

    const response = await signin(data.email, data.password);
    if (response === true) {
      navigate("/noticias/destaques");
      return;
    }

    if (response === "user not found") {
      setError("email", {
        type: "user not found",
        message: "usuário não localizado",
      });
      return;
    }

    if (response === "incorrect password") {
      setError("password", {
        type: "incorrect password",
        message: "senha incorreta",
      });
      return;
    }
  };

  return (
    <div className="">
      <LoginForm
        fields={fieldsLoginForm}
        buttonName={"Entrar"}
        alternativeLink={alternativeLink}
        actionOnSubmit={actionOnSubmit}
      />
    </div>
  );
};
