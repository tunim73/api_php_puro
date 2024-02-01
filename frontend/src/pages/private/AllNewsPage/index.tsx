import { NewsCard } from "components";
import { useEffect, useState } from "react";
import { newsApi } from "services";
import { News } from "types";

export const AllNewsPage = () => {
  const [news, setnews] = useState<News[]>([]);

  useEffect(() => {
    newsApi.findAll().then((e) => setnews(e));
  }, []);

  return (
    <div className="w-full h-full lg:px-24 md:px-24 px-3">
      <div className="w-full flex justify-start">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 mt-2 ">
          {" "}
          Notícias
        </h2>
      </div>
      <section className="flex justify-center gap-10 flex-wrap mb-10">
        {news.map((e) => {
          return <NewsCard key={e.id} item={e} />;
        })}
      </section>
    </div>
  );
};
