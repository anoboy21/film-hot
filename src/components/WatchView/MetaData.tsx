import React, { FC, Fragment } from "react";
import { Link } from "react-router-dom";
import { DetailType } from "../../shared/types";
import Skeleton from "../Skeleton";

interface MetaDataProps {
  data: DetailType;
  episodeIndex: number | undefined;
}

const MetaData: FC<MetaDataProps> = ({ data, episodeIndex }) => {
  return (
    <Fragment>
      {data ? (
        <div className="flex flex-col gap-[10px]">
          <h1 className="text-3xl mt-5">{data.name}</h1>
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <img src="/star.png" className="w-4 h-4" alt="" />
              <p>{data?.score?.toFixed(1)}</p>
            </div>
            <div className="flex items-center gap-1">
              <img src="/calendar.png" className="w-4 h-4" alt="" />
              <p>{data?.year}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {data.tagList.map((tag) => (
              <Link
                key={tag.id}
                to={`/category/${tag.id}`}
                className="bg-dark-lighten px-3 py-1 rounded-full hover:brightness-125 transition duration-300"
              >
                {tag.name}
              </Link>
            ))}
          </div>

          <p>{data.introduction}</p>

          {data.episodeVo.length > 1 && (
            <Fragment>
              <h1 className="text-xl my-3">Episodes</h1>
              <div className="flex gap-3 overflow-auto max-w-[92vw] md:max-w-[calc(88vw - 300px)]">
                {data.episodeVo.map((_, index) => (
                  <Link
                    key={index}
                    to={`/tv/${data.id}?episode=${index}`}
                    className={`py-2 px-4 bg-dark-lighten rounded hover:brightness-125 transition duration-300 ${
                      index === episodeIndex ? "!bg-primary text-white" : ""
                    }`}
                  >
                    {index + 1}
                  </Link>
                ))}
              </div>
            </Fragment>
          )}
        </div>
      ) : (
        <Fragment>
          <Skeleton className="w-[70%] h-8 mt-6" />
          <Skeleton className="w-[60%] h-8 mt-6" />
        </Fragment>
      )}
    </Fragment>
  );
};

export default MetaData;
