import React from "react";
import ContextItem from "./ContextItem";
import ExpandableItems from "./ExpandableItems";
import NewsSidebar from "./NewsSidebar";
import { Element } from "react-scroll";

interface ContextItemType {
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
}

interface NewsDetailProperties {
  news: {
    title: string;
    sections: {
      title: string;
      content: string;
      context: ContextItemType[];
    }[];
  };
}

const NewsDetail: React.FC<NewsDetailProperties> = ({ news }) => {
  return (
    <div className="relative max-w-full mx-auto">
      <div className="flex justify-center">
        <article className="prose lg:prose-xl dark:prose-invert max-w-4xl w-full px-4 lg:px-0">
          <h1 className="text-black dark:text-white">{news.title}</h1>
          {news.sections.map((section, index) => (
            <Element name={`section-${index}`} key={index}>
              <section id={`section-${index}`}>
                <h2 className="text-black dark:text-white">{section.title}</h2>
                <p className="text-black dark:text-white">{section.content}</p>
                <div className="mt-4">
                  <h3 className="text-black dark:text-white">Related Context:</h3>
                  <ExpandableItems context={section.context} />
                </div>
              </section>
            </Element>
          ))}
        </article>
        <div className="hidden xl:block fixed right-0 top-0 w-64 h-full overflow-auto">
          <NewsSidebar sections={news.sections} />
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
