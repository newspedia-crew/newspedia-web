"use client";

import React from "react";
import NewsDetail from "@/components/NewsDetail";
import { useParams } from "next/navigation";

interface NewsType {
  title: string;
  sections: {
    title: string;
    content: string;
    context: {
      name: string;
      url: string;
      description: string;
      provider: {
        name: string;
        image?: {
          thumbnail: {
            contentUrl: string;
          };
        };
      }[];
      datePublished: string;
      image?: {
        contentUrl: string;
        thumbnail: {
          contentUrl: string;
          width: number;
          height: number;
        };
      };
      article?: string;
      score?: number;
    }[];
  }[];
}

const NewsPage = () => {
  const [news, setNews] = React.useState<NewsType | null>(null);
  const params = useParams();
  const { id } = params;

  React.useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch(`/api/news/${id}`);
      const data = await response.json();
      setNews(data);
    };

    fetchNews();
  }, [id]);

  if (!news) {
    return <div>Loading...</div>;
  }

  return <NewsDetail news={news} />;
};

export default NewsPage;
