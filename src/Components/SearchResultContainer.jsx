import React from "react";
import SearchResultCard from "./SearchResultCard";

export const SearchResultContainer = ({ searchResult, searchValue }) => {
  return (
    searchValue && (
      <div
        className="bg-black shadow menu dropdown-content z-[1] w-full  min-h-52 mt-12 pb-6 px-5 rounded-md"
        style={{ visibility: "unset" }}
      >
        {searchResult ? (
          searchResult?.length === 0 ? (
            <h1 className="font-semibold text-sm px-2 py-5 text-ascent-2">
              No Result found with this keyword !
            </h1>
          ) : (
            searchResult?.map((curr, index) => {
              return <SearchResultCard user={curr} key={index} />;
            })
          )
        ) : (
          <div className="loader mx-3 my-4"></div>
        )}
      </div>
    )
  );
};
