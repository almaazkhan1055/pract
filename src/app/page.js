import Link from "next/link";
import React from "react";

const Home = () => {
  const projects = [
    {
      name: "Debounced Search",
      link: "/DebouncedSearch",
    },
    {
      name: "Todo App",
      link: "/TodoList",
    },
    {
      name: "Infinite Scroll",
      link: "/InfiniteScroll",
    },
  ];
  return (
    <div className="flex flex-col gap-2 p-10 w-full">
      {projects?.map((project, index) => (
        <Link
          key={project.link}
          href={`/features/${project.link}`}
          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-300"
        >
          {project.name}
        </Link>
      ))}
    </div>
  );
};

export default Home;
