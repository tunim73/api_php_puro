import {
  Button,
  Label,
  TextInput,
  Textarea,
  ToggleSwitch,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { newsApi } from "services";
import { useAuthContext } from "shared/contexts";
import { News } from "types";

type Props = {
  buttonName: string;
  type: "create" | "update";
  values?: News;
  fetcher: () => Promise<void>;
  setCloseModal: () => void;
};

type ValidKeys = keyof News;

export const NewsFormForModal = ({
  buttonName,
  type,
  values,
  fetcher,
  setCloseModal,
}: Props) => {
  const { register, handleSubmit, setValue } = useForm<News>();
  const { user } = useAuthContext();
  const [switch1, setSwitch1] = useState(false);
  useEffect(() => {
    if (type === "create") return;
    if (!values) return;

    Object.entries(values).forEach(([key, value]) => {
      setValue(key as ValidKeys, value);
    });

    if (values.highlight === 1) {
      setSwitch1(true);
    }
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (!user) return;

    data.highlight = switch1 ? 1 : 0;

    if (type === "create") {
      const newNews = await newsApi.create(data);

      if (newNews) {
        fetcher();
        setCloseModal();
        return;
      }
      console.error("Erro ao criar notícia. ", newNews);
      return;
    }

    const updatedNews = await newsApi.update(data);

    if (!updatedNews) {
      console.error("Erro ao atualizar produto. ", updatedNews);
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
          <Label htmlFor="titleNews" value="Título" />
        </div>
        <TextInput
          id="titleNews"
          type="text"
          placeholder=""
          required
          {...register("title")}
        />
      </div>
      <div className="mb-2">
        <div className="mb-1 block">
          <Label htmlFor="summaryNews" value="Resumo" />
        </div>
        <Textarea
          id="summaryNews"
          placeholder=""
          required
          {...register("summary")}
        />
      </div>

      <div className="mb-2">
        <div className="mb-1 block">
          <Label htmlFor="contentNews" value="Conteúdo" />
        </div>
        <Textarea
          id="contentNews"
          placeholder=""
          required
          {...register("content")}
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
          <Label htmlFor="noticiaDestaque" value="Notícia Destaque" />
        </div>
        <ToggleSwitch checked={switch1} label="" onChange={setSwitch1} />
      </div>

      <div className="w-full mt-4">
        <Button type="submit">{buttonName}</Button>
      </div>
    </form>
  );
};
