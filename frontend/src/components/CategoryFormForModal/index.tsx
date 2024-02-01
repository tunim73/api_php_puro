import { Button, Label, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { categoryApi } from "services";
import { Category, isApiException } from "types";

type Props = {
  buttonName: string;
  type: "create" | "delete";
  fetcher: () => Promise<void>;
  setCloseModal: () => void;
};

export const CategoryFormForModal = ({
  buttonName,
  type,
  fetcher,
  setCloseModal,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Category>();

  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    if (type === "create") return;
    categoryApi.findAll().then((e) => setCategories(e));
  }, []);

  const onSubmitCreate = handleSubmit(async (data) => {
    const newCategory = await categoryApi.create(data.name);

    if (!newCategory) {
      return;
    }
    if (isApiException(newCategory)) {
      if (
        newCategory.message === "Já existe categoria com esse name cadastrada"
      )
        setError("name", {
          type: "unique",
          message: "Já existe essa categoria",
        });
      return;
    }
    fetcher();
    setCloseModal();

    return;
  });

  const onSubmitDelete = handleSubmit(async (data) => {
    const oldCategory = await categoryApi.delete(data.id);

    if (!oldCategory) {
      console.error("Erro ao deletar produto.");
      return;
    }

    fetcher();
    setCloseModal();
    return;
  });

  if (type === "create") {
    return (
      <form onSubmit={onSubmitCreate}>
        <div className="mb-2">
          <div className="mb-1 block">
            <Label htmlFor="nameProduct" value="Nome" />
          </div>
          <TextInput
            id="nameProduct"
            type="text"
            autoFocus
            required
            color={errors.name ? "failure" : undefined}
            helperText={
              typeof errors.name?.message === "string" && (
                <span>{errors.name.message} </span>
              )
            }
            {...register("name")}
          />
        </div>
        <div className="w-full mt-4">
          <Button type="submit">{buttonName}</Button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={onSubmitDelete}>
      <div className="mb-2">
        <div className="mb-1 block">
          <Label htmlFor="select" value="Selecione a categoria" />
        </div>
        <Select id="select" defaultValue={0} {...register("id")}>
          <option disabled value={0}>
            Selecione uma opção
          </option>
          {categories.map((e) => {
            return (
              <option value={e.id} key={e.id}>
                {e.name}
              </option>
            );
          })}
        </Select>
      </div>

      <div className="w-full mt-4">
        <Button type="submit">{buttonName}</Button>
      </div>
    </form>
  );
};
