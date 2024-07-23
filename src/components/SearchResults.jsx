import React, { useEffect, useState } from "react";
import { InstantSearch, SearchBox, Hits, Configure } from "react-instantsearch";
import algoliasearch from "algoliasearch/lite";
import { Hit } from "./Hit";
import { useLocation } from "react-router-dom";

const searchClient = algoliasearch(
  "L7WYB1CCJE",
  "33d8985a8c43c9fa5eecf3724380e9d4"
);

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const query = useQuery().get('query') || '';
  const [searchState, setSearchState] = useState({ query });

  useEffect(() => {
    setSearchState({ query });
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pt-32">
      <InstantSearch
        searchClient={searchClient}
        indexName="jewellery-store"
        searchState={searchState}
        onSearchStateChange={setSearchState}
        
      >
        <Configure hitsPerPage={10} />
        <main className="flex-grow flex flex-col items-center p-8">
          <SearchBox
            defaultRefinement={query}
            classNames={{
              root: "mb-4",
              input: "w-full px-4 py-2 border border-gray-300 rounded-md",
            }}
          />
          <Hits hitComponent={Hit} />
        </main>
      </InstantSearch>
    </div>
  );
};

export default SearchResults;
