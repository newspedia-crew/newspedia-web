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
    <div className="relative max-w-6xl mx-auto px-4 lg:px-0">
      <div className="lg:flex lg:space-x-8">
        <article className="prose lg:prose-xl dark:prose-invert lg:w-3/4">
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
        <div className="lg:w-1/4">
          <NewsSidebar sections={news.sections} />
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
