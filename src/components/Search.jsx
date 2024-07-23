import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/satellite.css";
import { Hits, InstantSearch, SearchBox, Configure } from "react-instantsearch";
import { Hit } from "./Hit";
import { useNavigate } from "react-router-dom";

const searchClient = algoliasearch(
  "L7WYB1CCJE",
  "33d8985a8c43c9fa5eecf3724380e9d4"
);

export const Search = ({ onSearchClose }) => {
  const navigate = useNavigate();

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = event.target.querySelector('input[type="search"]').value;
    onSearchClose();
    navigate(`/search-results?query=${encodeURIComponent(query)}`);
  };

  return (
    <InstantSearch
      searchClient={searchClient}
      future={{ preserveSharedStateOnUnmount: true }}
      indexName="jewellery-store"
    >
      <Configure hitsPerPage={5} />
      <div className="ais-InstantSearch mx-auto max-w-4xl w-full overflow-hidden">
        <SearchBox
          onSubmit={handleSearchSubmit}
          classNames={{
            root: "mb-4",
            input: "w-full px-4 py-2 border border-gray-300 rounded-md",
          }}
        />
        <Hits
          classNames={{
            list: "flex flex-col mb-4 mt-0 ml-0",
            item: "w-full ml-0",
          }}
          hitComponent={({ hit }) => (
            <div onClick={() => onSearchClose()} className="cursor-pointer">
              <Hit hit={hit} />
            </div>
          )}
        />
      </div>
    </InstantSearch>
  );
};
