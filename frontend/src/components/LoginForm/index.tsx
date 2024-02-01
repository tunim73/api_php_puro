import { Button, Card, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { typeFieldsLoginForm } from "types";

type props = {
  fields: typeFieldsLoginForm[];
  buttonName: string;
  actionOnSubmit: (data: any, setError: any) => void;
  alternativeLink: {
    link: string;
    name: string;
  };
};

export const LoginForm = ({
  actionOnSubmit,
  fields,
  buttonName,
  alternativeLink,
}: props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const errrorMessage = (item: any): string => {
    const err = errors[item.id]?.message;

    if (typeof err === "string") return err;
    return "";
  };

  const onSubmit = (data: any) => {
    actionOnSubmit(data, setError);
  };

  return (
    <div className="mt-12">
      <Card className="max-w-sm">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
                  color={errors[item.id] ? "failure" : undefined}
                  helperText={
                    typeof errors[item.id]?.message === "string" && (
                      <span>{errrorMessage(item)}</span>
                    )
                  }
                  {...register(item.id)}
                />
              </div>
            );
          })}

          <Button type="submit">{buttonName}</Button>
        </form>
        <NavLink to={alternativeLink.link} className="text-cyan-700">
          {alternativeLink.name}
        </NavLink>
      </Card>
    </div>
  );
};

/* 

*/
