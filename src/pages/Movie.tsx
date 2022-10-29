import React, { FC } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import Error from "../components/Error";
import WatchView from "../components/WatchView";
import { getMovieDetail } from "../services/movie";

const Info: FC = () => {
  const { id } = useParams();

  const { data, error } = useSWR(
    `movie-${id}`,
    () => getMovieDetail(id as string),
    {
      revalidateOnFocus: false,
    }
  );

  if (error) return <Error />;

  return (
    <WatchView
      data={data?.data}
      sources={data?.sources}
      subtitles={data?.subtitles}
    />
  );
};

export default Info;
