import React, { FC } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import CategoryResult from "../components/Category/CategoryResult";
import Error from "../components/Error";
import NavBar from "../components/NavBar";
import { getSearchConfig } from "../services/explore";

const Category: FC = () => {
  const { id } = useParams() as { id: string };

  const { data: searchConfig, error } = useSWR("search-config", () =>
    getSearchConfig()
  );

  if (error) {
    return <Error />;
  }

  if (!searchConfig) {
    return (
      <div className="flex flex-grow justify-center items-center">
        <div className="w-10 h-10 border-[3px] border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const categoryName = searchConfig[0].screeningItems
    .find((item) => item.id === 5)
    ?.items.find((item) => item.params === id)?.name;

  if (!categoryName) {
    return <Error />;
  }

  return (
    <div>
      <div className="mx-[7vw]">
        <NavBar />
        <h1 className="text-2xl my-6">Category "{categoryName}"</h1>
      </div>
      <CategoryResult id={id} categoryName={categoryName} />
    </div>
  );
};

export default Category;
