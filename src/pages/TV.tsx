import React, { FC } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import Error from "../components/Error";
import WatchView from "../components/WatchView";
import { useQueryParams } from "../hooks/useQueryParams";
import { getTVDetail } from "../services/tv";

const TV: FC = () => {
  const { id } = useParams();

  const queryParams = useQueryParams();
  const episodeIndex = Number(queryParams.get("episode")) || 0;

  const { data, error } = useSWR(
    `tv-${id}-${episodeIndex}`,
    () => getTVDetail(id as string, episodeIndex),
    { revalidateOnFocus: false }
  );

  if (error) return <Error />;

  return (
    <WatchView
      data={data?.data}
      sources={data?.sources}
      subtitles={data?.subtitles}
      episodeIndex={episodeIndex}
    />
  );
};

export default TV;
