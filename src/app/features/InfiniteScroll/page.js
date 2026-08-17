"use client";
import ImageRenderer from "@/app/components/ui/ImageRenderer";
import { useEffect, useState } from "react";

const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products?limit=${limit}&skip=0`,
        );

        const result = await res.json();
        setData(result.products);
      } catch (error) {
        console.error("error", error);
      }
    };

    loadData();
  }, [limit]);

  useEffect(() => {
    if (!data.length) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setLimit((prev) => prev + 10);
      }
    });

    const element = document.querySelector(".img:last-child");

    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [data]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {data?.map((product) => {
        return <ImageRenderer key={product.id} product={product} />;
      })}
    </div>
  );
};

export default InfiniteScroll;
