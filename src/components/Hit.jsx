import { Highlight } from "react-instantsearch";
import { getPropertyByPath } from "instantsearch.js/es/lib/utils";
import { Link } from "react-router-dom";

export const Hit = ({ hit }) => {
  return (
    <Link to={`/product/${hit.item_id}`} className="flex items-center mb-4">
      <img
        src={hit.images_url[0]}
        alt={hit.name}
        className="mr-4 w-16 h-16 object-cover"
      />
      <div>
        <div className="hit-name font-bold text-gray-900 mb-2">
          <Highlight attribute="name" hit={hit} />
        </div>
        <div className="hit-description text-gray-700 mb-2">
          <Highlight attribute="description" hit={hit} />
        </div>
        <div className="hit-price text-gray-800">
          <span>£{getPropertyByPath(hit, "price")}</span>
        </div>
      </div>
    </Link>
  );
};
