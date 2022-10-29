import React, { FC, Fragment, useState } from "react";
import useSWR from "swr";
import Error from "../components/Error";
import ExploreConfig from "../components/Explore/ExploreConfig";
import NavBar from "../components/NavBar";
import Title from "../components/Title";
import { getSearchConfig } from "../services/explore";

const Explore: FC = () => {
  const { data: searchConfig, error } = useSWR("search-config", () =>
    getSearchConfig()
  );

  const [sectionIndex, setSectionIndex] = useState(0);

  if (error) {
    return <Error />;
  }

  return (
    <Fragment>
      <Title value="Explore - FilmHot" />
      <div className="flex flex-col items-stretch min-h-screen mx-[7vw]">
        <NavBar />

        {!searchConfig ? (
          <div className="flex flex-grow justify-center items-center">
            <div className="w-10 h-10 border-[3px] border-t-transparent border-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="mb-6">
            <div className="flex gap-3">
              {searchConfig.map((config, index) => (
                <button
                  key={index}
                  className={`transition relative after:absolute after:top-[110%] after:left-0 after:w-full after:h-[2px] after:bg-transparent after:rounded after:transition ${
                    sectionIndex === index
                      ? "text-primary after:bg-primary"
                      : ""
                  }`}
                  onClick={() => {
                    setSectionIndex(index);
                  }}
                >
                  {config.name}
                </button>
              ))}
            </div>
            <ExploreConfig
              config={searchConfig[sectionIndex]}
              sectionIndex={sectionIndex}
            />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Explore;
