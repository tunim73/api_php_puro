import { Button, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { userApi } from "services";
import { User } from "types";

const fields = [
  {
    id: "password",
    label: "Nova senha",
    type: "password",
    placeholder: "**********",
    required: true,
  },
];

type UpdatePassword = {
  password: string;
};

type ValidKeys = keyof UpdatePassword;

type Props = {
  item: User;
  fetcher: () => Promise<void>;
  setCloseModal: () => void;
};

export const PasswordFormForModalUsedAdmin = ({
  item,
  fetcher,
  setCloseModal,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePassword>();
  const onSubmit = handleSubmit(async (data) => {
    const res = await userApi.updatePasswordByAdmin(data.password, item.id);
    if (!res) return;

    fetcher();
    setCloseModal();
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
