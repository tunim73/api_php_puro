import { Button, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { userApi } from "services";
import { useAuthContext } from "shared/contexts";
import { isApiException } from "types";

const fields = [
  {
    id: "oldPassword",
    label: "Senha anterior",
    type: "password",
    placeholder: "**********",
    required: true,
  },
  {
    id: "password",
    label: "Nova senha",
    type: "password",
    placeholder: "**********",
    required: true,
  },
  {
    id: "password2",
    label: "Confirme sua nova senha",
    type: "password",
    placeholder: "**********",
    required: true,
  },
];

type UpdatePassword = {
  oldPassword: string;
  password: string;
  password2: string;
};

type ValidKeys = keyof UpdatePassword;

export const PasswordFormForModal = () => {
  const { user, signout } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UpdatePassword>();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data) => {
    if (!user) return;

    if (data.password !== data.password2) {
      setError("password2", {
        type: "password2 incorreto",
        message: "As novas senhas devem ser iguais",
      });
      return;
    }

    const res = await userApi.updatePassword(
      data.oldPassword,
      data.password,
      user.id
    );
    if (!res) return;

    if (isApiException(res)) {
      if (res.message === "incorrect password") {
        setError("oldPassword", {
          type: "incorrect password",
          message: "Senha incorreta",
        });
        return;
      }
    }
    signout();
    navigate("/login");
    return;
  });

  return (
    <form onSubmit={onSubmit}>
      {fields.map((item) => {
        return (
          <div key={item.id}>
            <div className="mb-2 block">
              <Label htmlFor={item.id} value={item.label} />
            </div>
            <TextInput
              id={item.id}
              type={item.type}
              placeholder={item.placeholder}
              required={item.required}
              color={errors[item.id as ValidKeys] ? "failure" : undefined}
              helperText={
                typeof errors[item.id as ValidKeys]?.message === "string" && (
                  <span>{errors[item.id as ValidKeys]?.message || ""}</span>
                )
              }
              {...register(item.id as ValidKeys)}
            />
          </div>
        );
      })}

      <div className="w-full mt-4">
        <Button type="submit">Atulizar</Button>
      </div>
    </form>
  );
};
