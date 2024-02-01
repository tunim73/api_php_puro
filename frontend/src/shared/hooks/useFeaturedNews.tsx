import { useCallback, useEffect, useState } from "react";
import { newsApi } from "services";
import { News } from "types";

export const useHighlightedNews = () => {
  const [news, setnews] = useState<News[]>([]);

  const fetcher = useCallback(async () => {
    const news = await newsApi.findHighlightedNews();

    if (!news) return;
    setnews(news);
    return;
  }, []);

  useEffect(() => {
    fetcher();
  }, []);

  return { news, fetcher };
};
