import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { newsApi } from "services";
import { News } from "types";

export const useNews = () => {
  const [news, setnews] = useState<News | null>(null);
  const { id } = useParams();

  const fetcher = useCallback(async () => {
    const news = await newsApi.findOne(Number(id));

    if (!news) return;
    setnews(news);
    return;
  }, []);

  useEffect(() => {
    fetcher();
  }, []);

  return { news, fetcher };
};
