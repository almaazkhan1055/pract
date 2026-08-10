"use client";
import useSearchInput from "../hooks/feature/useSearchInput";

const SearchInput = () => {
  const {
    handleSearchChange,
    suggestions,
    canShowSuggestions,
    shouldShowError,
    error,
    shouldShowLoading,
    isSuggestionsPanelOpen,
    dropdownRef,
    handleKeyChange,
    activeIndex,
  } = useSearchInput();

  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <div ref={dropdownRef}>
        <input
          type="text"
          placeholder="Enter text"
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-55"
          onChange={handleSearchChange}
          onKeyDown={handleKeyChange}
        />

        {isSuggestionsPanelOpen &&
          (canShowSuggestions || shouldShowError || shouldShowLoading) && (
            <div className="mt-2 border border-gray-300 rounded-md w-55 ">
              {canShowSuggestions && (
                <div>
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={suggestion}
                      className={`cursor-pointer truncate px-2 py-1 ${
                        activeIndex === index ? "bg-gray-100" : ""
                      }`}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
              {shouldShowError && (
                <div className="text-red-500 mt-2">Error: {error.message}</div>
              )}
              {shouldShowLoading && (
                <div className="text-blue-500 mt-2 px-2">Loading...</div>
              )}
            </div>
          )}
      </div>
    </div>
  );
};

export default SearchInput;
