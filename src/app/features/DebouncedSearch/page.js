import SearchInput from "@/app/components/ui/SearchInput";
import React from "react";

const DebouncedSearch = () => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-medium">Debounced Search</h1>
      <SearchInput />
    </div>
  );
};

export default DebouncedSearch;
