import React, { FC, Fragment } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { searchWithKeyword } from "../../services/search";
import { resizeImage } from "../../shared/constants";
import Error from "../Error";
import Skeleton from "../Skeleton";

interface SearchResultProps {
  query: string;
}

const SearchResult: FC<SearchResultProps> = ({ query }) => {
  const { data, error } = useSWR(`search-${query}`, () =>
    searchWithKeyword(query)
  );

  if (error) {
    return <Error />;
  }

  return (
    <div className="grid grid-cols-sm md:grid-cols-lg gap-6">
      {!data ? (
        <Fragment>
          {[...new Array(20)].map((_, index) => (
            <div key={index} className="relative h-0 pb-[163%]">
              <Skeleton className="absolute w-full h-full top-0 left-0 rounded" />
            </div>
          ))}
        </Fragment>
      ) : data.length === 0 ? (
        <div>No result found</div>
      ) : (
        <Fragment>
          {data.map((item) => (
            <Link
              key={item.id}
              title={item.name}
              to={
                item.domainType === 0 ? `/movie/${item.id}` : `/tv/${item.id}`
              }
              className="relative h-0 pb-[163%] bg-dark-lighten rounded overflow-hidden group"
            >
              <div className="absolute w-full h-full top-0 left-0 flex flex-col items-stretch">
                <div className="relative w-full h-0 pb-[140%] flex-shrink-0 group-hover:brightness-[80%] transition duration-300">
                  <LazyLoadImage
                    src={resizeImage(item.coverVerticalUrl, "250")}
                    className="absolute w-full h-full top-0 left-0 object-cover"
                    effect="opacity"
                    alt=""
                  />
                </div>

                <div className="flex flex-grow items-center">
                  <h1 className="w-full whitespace-nowrap overflow-hidden text-ellipsis px-2 group-hover:text-primary transition duration-300">
                    {item.name}
                  </h1>
                </div>
              </div>
            </Link>
          ))}
        </Fragment>
      )}
    </div>
  );
};

export default SearchResult;
