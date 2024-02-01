import { Button, Label, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "shared/contexts";
import { User, UserForRegisterForm, typeFieldsLoginForm } from "types";
import { SetErrorOfForm } from "types/SetErrorOfForm";

type Props = {
  buttonName: string;
  type: "create" | "update";
  values?: User | null;
  fetcher: () => Promise<void>;
  setCloseModal: () => void;
  fields: typeFieldsLoginForm[];
  actionOnSubmit: (data: UserForRegisterForm, setError: SetErrorOfForm) => void;
};

type ValidKeys = keyof UserForRegisterForm

export const RegisterFormForModal = ({
  buttonName,
  type,
  values,
  actionOnSubmit,
  fields,
}: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<UserForRegisterForm>();

  const { user } = useAuthContext();

  useEffect(() => {
    if (type === "create") return;
    if (!values) return;

    Object.entries(values).forEach(([key, value]) => {
      setValue(key as ValidKeys, value);
    });
  }, []);

  const errrorMessage = (item: any): string => {
    const err = errors[item.id as ValidKeys]?.message;

    if (typeof err === "string") return err;
    return "";
  };

  const onSubmit = handleSubmit(async (data) => {
    if (!user) return;
    actionOnSubmit(data, setError as SetErrorOfForm);
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
                  <span>{errrorMessage(item)}</span>
                )
              }
              {...register(item.id as ValidKeys)}
            />
          </div>
        );
      })}

      <div className="w-full mt-4">
        <Button type="submit">{buttonName}</Button>
      </div>
    </form>
  );
};
