import { useEffect, useState } from "react";

export const useDebouncedSearch = (query, delay) => {
  const [searchTerm, setSearchTerm] = useState(query);

  useEffect(() => {
    if (query === "") {
      return;
    }
    const id = setTimeout(() => {
      setSearchTerm(query);
    }, delay);

    return () => clearTimeout(id);
  }, [query, delay]);

  return searchTerm;
};
