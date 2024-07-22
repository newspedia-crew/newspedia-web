import React from "react";
import { Link, Events, scrollSpy } from "react-scroll";

interface NewsSidebarProps {
  sections: { title: string }[];
}
//sidebar
const NewsSidebar: React.FC<NewsSidebarProps> = ({ sections }) => {
  React.useEffect(() => {
    const handleScrollEvent = (...args: unknown[]) => {
      console.log("Scroll event:", args);
    };

    Events.scrollEvent.register("begin", handleScrollEvent);
    Events.scrollEvent.register("end", handleScrollEvent);

    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  return (
    <nav className="fixed top-1/2 transform -translate-y-1/2 ml-4 max-w-[200px] hidden lg:block">
      <div className="relative">
        <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-700"></div>
        <ul className="space-y-4">
          {sections.map((section, index) => (
            <li key={index} className="relative">
              <Link
                activeClass="font-bold"
                to={`section-${index}`}
                spy={true}
                smooth={true}
                duration={500}
                className="block pl-6 cursor-pointer transition-colors hover:text-blue-500 dark:hover:text-blue-400"
              >
                <span className="absolute left-0 top-3 transform -translate-y-1/2 w-4 h-4 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-full"></span>
                <span className="inline-block">{section.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NewsSidebar;
