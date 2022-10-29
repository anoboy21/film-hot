import React, { FC, Fragment } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import useInfiniteSWR from "swr/infinite";
import { getCategoryItems } from "../../services/category";
import { resizeImage } from "../../shared/constants";
import Error from "../Error";
import Title from "../Title";

interface CategoryResultProps {
  id: string;
  categoryName: string;
}

const CategoryResult: FC<CategoryResultProps> = ({ id, categoryName }) => {
  const getKey = (_: any, previousPageData: any) => {
    if (previousPageData && previousPageData.length === 0) {
      return null;
    }

    return `$id-${previousPageData?.slice(-1)?.[0]?.sort || ""}`;
  };

  const { data, error, setSize } = useInfiniteSWR(getKey, (limit) =>
    getCategoryItems(id, limit.split("-").slice(-1)[0])
  );

  if (error) {
    return <Error />;
  }

  return (
    <Fragment>
      <Title value={`Category ${categoryName} - FilmHot`} />
      <InfiniteScroll
        dataLength={data?.length || 0}
        next={() => setSize((size) => size + 1)}
        hasMore={!error && data?.slice(-1)?.[0].length !== 0}
        loader={
          <div className="flex justify-center w-full">
            <div className="w-10 h-10 border-[3px] border-primary border-t-transparent animate-spin rounded-full my-10"></div>
          </div>
        }
        endMessage={<p className="text-center mt-6">Nothing more to see</p>}
      >
        <div className="flex justify-center mx-[7vw]">
          <div className="w-full grid grid-cols-sm md:grid-cols-lg gap-6">
            {data
              ?.reduce((acc, current) => {
                acc.push(...current);
                return acc;
              }, [])
              .map(
                (item: {
                  name: string | undefined;
                  domainType: any;
                  id: any;
                  coverVerticalUrl: string;
                }) => (
                  <Link
                    title={item.name}
                    to={
                      item.domainType === 0
                        ? `/movie/${item.id}`
                        : `/tv/${item.id}`
                    }
                    key={item.id}
                    className="relative h-0 pb-[163%] bg-dark-lighten rounded overflow-hidden group"
                  >
                    <div className="absolute w-full h-full top-0 left-0 flex flex-col items-stretch">
                      <div className="relative w-full h-0 pb-[140%] flex-shrink-0 group-hover:brightness-[80%] transition duration-300">
                        <LazyLoadImage
                          src={resizeImage(item.coverVerticalUrl, "250")}
                          effect="opacity"
                          className="absolute top-0 left-0 w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-grow items-center">
                        <h1 className="w-full whitespace-nowrap overflow-hidden text-ellipsis px-2 group-hover:text-primary transition duration-300">
                          {item.name}
                        </h1>
                      </div>
                    </div>
                  </Link>
                )
              )}
          </div>
        </div>
      </InfiniteScroll>
    </Fragment>
  );
};

export default CategoryResult;
