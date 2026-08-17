import { useEffect, useMemo, useRef, useState } from "react";
import { useDebouncedSearch } from "../../../hooks/useDebouncedSearch";
import { useFetch } from "../../../hooks/useFetch";

const useSearchInput = () => {
  const dropdownRef = useRef(null);
  const [query, setQuery] = useState("");
  const [isSuggestionsPanelOpen, setIsSuggestionsPanelOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const searchTerm = useDebouncedSearch(query, 500);
  const { data, loading, error } = useFetch(
    `https://dummyjson.com/products/search?q=${searchTerm}`,
  );

  const suggestions = useMemo(() => {
    return data?.products?.map((product) => product.title) ?? [];
  }, [data]);

  const handleSearchChange = (e) => {
    setActiveIndex(-1);
    setQuery(e.target.value);
    setIsSuggestionsPanelOpen(true);
  };

  const handleKeyChange = (e) => {
    if (!suggestions.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();

        setActiveIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0,
        );
        break;

      case "ArrowUp":
        e.preventDefault();

        setActiveIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1,
        );
        break;

      case "Enter":
        if (activeIndex >= 0) {
          e.preventDefault();

          setQuery(suggestions[activeIndex]);
          setIsSuggestionsPanelOpen(false);
          setActiveIndex(-1);
        }
        break;

      case "Escape":
        e.preventDefault();

        setIsSuggestionsPanelOpen(false);
        setActiveIndex(-1);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSuggestionsPanelOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsSuggestionsPanelOpen]);

  const canShowSuggestions =
    query && !loading && !error && suggestions && suggestions.length > 0;
  const shouldShowError = !loading && error;
  const shouldShowLoading = loading && !error;

  return {
    handleSearchChange,
    suggestions,
    canShowSuggestions,
    shouldShowError,
    error,
    shouldShowLoading,
    setIsSuggestionsPanelOpen,
    isSuggestionsPanelOpen,
    dropdownRef,
    handleKeyChange,
    activeIndex,
  };
};

export default useSearchInput;
