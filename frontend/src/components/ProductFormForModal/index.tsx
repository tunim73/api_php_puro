import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { categoryApi, productApi } from "services";
import { useAuthContext } from "shared/contexts";
import { Category, Product } from "types";

type Props = {
  buttonName: string;
  type: "create" | "update";
  values?: Product;
  fetcher: () => Promise<void>;
  setCloseModal: () => void;
};

type ValidKeys = keyof Product;

export const ProductFormForModal = ({
  buttonName,
  type,
  values,
  fetcher,
  setCloseModal,
}: Props) => {
  const { register, handleSubmit, setValue } = useForm<Product>();
  const [categories, setCategories] = useState<Category[]>([]);
  const { user } = useAuthContext();
  const [option, setOption] = useState<any>(0);
  const [optionStatus, setOptionStatus] = useState<any>(1);

  useEffect(() => {
    categoryApi.findAll().then((e) => setCategories(e));

    if (type === "create") return;
    if (!values) return;

    Object.entries(values).forEach(([key, value]) => {
      setValue(key as ValidKeys, value);
    });
    setOptionStatus(values.status);
    setOption(values.categoryId);
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (!user) return;

    if (type === "create") {
      data.userId = user?.id;
      const newProduct = await productApi.create(data);

      if (newProduct === true) {
        fetcher();
        setCloseModal();
        return;
      }
      console.error("Erro ao criar produto. ", newProduct);
      return;
    }

    const updatedProduct = await productApi.update(data);

    if (!updatedProduct) {
      console.error("Erro ao atualizar produto. ", updatedProduct);
      return;
    }
    console.log();
    fetcher();
    setCloseModal();
    return;
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-2">
        <div className="mb-1 block">
          <Label htmlFor="select" value="Selecione a categoria" />
        </div>
        <Select
          id="select"
          {...register("categoryId")}
          value={option}
          onChange={(e) => setOption(e.target.value)}
        >
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
      <div className="mb-2">
        <div className="mb-1 block">
          <Label htmlFor="nameProduct" value="Nome" />
        </div>
        <TextInput
          id="nameProduct"
          type="text"
          placeholder="nome do produto"
          required
          {...register("name")}
        />
      </div>

      <div className="mb-2">
        <div className="mb-1 block">
          <Label htmlFor="quantityProduct" value="Quantidade" />
        </div>
        <TextInput
          id="quantityProduct"
          type="number"
          placeholder="20"
          required
          {...register("quantity")}
        />
      </div>

      <div className="mb-2">
        <div className="mb-1 block">
          <Label htmlFor="valueProduct" value="Valor" />
        </div>
        <TextInput
          id="valueProduct"
          type="number"
          placeholder="5000"
          required
          {...register("value")}
        />
      </div>

      <div className="mb-2">
        <div className="mb-1 block">
          <Label htmlFor="image" value="Link da imagem" />
        </div>
        <TextInput
          id="image"
          type="text"
          placeholder="https://...jpg ...png"
          required
          {...register("image")}
        />
      </div>
      <div className="mb-2">
        <div className="mb-1 block">
          <Label htmlFor="description" value="Descrição" />
        </div>
        <Textarea
          id="description"
          placeholder="..."
          required
          {...register("description")}
        />
      </div>
      <div className="mb-2">
        <div className="mb-1 block">
          <Label htmlFor="selectStatus" value="Selecione a categoria" />
        </div>
        <Select
          id="selectStatus"
          {...register("status")}
          value={optionStatus}
          onChange={(e) => setOptionStatus(e.target.value)}
        >
          <option value={1}>Ativo</option>
          <option value={0}>Inativo</option>
        </Select>
      </div>

      <div className="w-full mt-4">
        <Button type="submit">{buttonName}</Button>
      </div>
    </form>
  );
};
