import React from "react";
import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/satellite.css";
import {
  InstantSearch,
  Hits,
  Pagination,
  Configure,
} from "react-instantsearch";
import { useLocation } from "react-router-dom";
import { Hit } from "./Hit";
import Footer from "./Footer";

const searchClient = algoliasearch(
  "L7WYB1CCJE",
  "33d8985a8c43c9fa5eecf3724380e9d4"
);

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pt-32">
      <main className="flex-grow flex flex-col items-center p-8">
        <h1 className="text-3xl font-bold text-gray-800 pb-4">Search Results</h1>
        <InstantSearch
          searchClient={searchClient}
          future={{ preserveSharedStateOnUnmount: true }}
          indexName="jewellery-store"
        >
          <Configure hitsPerPage={6} query={query} />
          <Hits hitComponent={HitComponent} />
          <Pagination />
        </InstantSearch>
      </main>
      <Footer />
    </div>
  );
};

const HitComponent = ({ hit }) => (
  <div className="cursor-pointer border-b py-4">
    <Hit hit={hit} />
  </div>
);

export default SearchResults;
