"use client";

import React from "react";
import NewsDetail from "@/components/NewsDetail";
import { useParams, useSearchParams } from "next/navigation";
import { scroller } from "react-scroll";

interface IImage {
  contentUrl: string;
  thumbnail: {
    contentUrl: string;
    width: number;
    height: number;
  };
}

interface IProvider {
  name: string;
  image?: {
    thumbnail: {
      contentUrl: string;
    };
  };
}

interface IContextItem {
  name: string;
  url: string;
  description: string;
  provider: IProvider[];
  datePublished: string;
  image?: IImage;
  article?: string;
  score?: number;
}

interface ISection {
  title: string;
  content: string;
  context: IContextItem[];
}

interface INews {
  title: string;
  sections: ISection[];
}

const NewsPage: React.FC = () => {
  const [news, setNews] = React.useState<INews | null>(null);
  const params = useParams();
  const searchParams = useSearchParams();
  const { id } = params;
  const section = searchParams.get("section");

  React.useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch(`/api/news/${id}`);
      const data = await response.json();
      setNews(data);
    };

    fetchNews();
  }, [id]);

  React.useEffect(() => {
    if (news && section) {
      scroller.scrollTo(`section-${section}`, {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    }
  }, [news, section]);

  if (!news) {
    return <div>Loading...</div>;
  }

  return <NewsDetail news={news} />;
};

export default NewsPage;
