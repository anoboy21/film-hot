import React, { FC, Fragment, useEffect } from "react";
import ReactHlsPlayer from "react-hls-player/dist";
import { Player } from "react-tuby";
import { PROXY, subtitleProxy } from "../../shared/constants";
import { DetailType } from "../../shared/types";
import NavBar from "../NavBar";
import Title from "../Title";
import Similar from "./Similar";

import "react-tuby/css/main.css";
import Skeleton from "../Skeleton";
import MetaData from "./MetaData";
import Comment from "./Comment";

interface WatchViewProps {
  data?: DetailType;
  sources: { quality: number; url: string }[] | undefined;
  subtitles?: { language: string; url: string; lang: string }[] | undefined;
  episodeIndex?: number;
}

const WatchView: FC<WatchViewProps> = ({
  data,
  sources,
  subtitles,
  episodeIndex,
}) => {
  const mediaType = typeof episodeIndex === "undefined" ? "movie" : "tv";
  const playerKey = `${mediaType}-${data?.id}${
    episodeIndex ? `-${episodeIndex}` : ""
  }`;

  useEffect(() => {
    if (!data) return;

    let existing = JSON.parse(
      localStorage.getItem("filmhot-recent") || "[]"
    ) as {
      id: string;
      category: number;
      coverVerticalUrl: string;
      name: string;
    }[];
    if (!Array.isArray(existing)) return;

    existing = existing.filter((item) => item.id !== data.id);
    existing.unshift({
      id: data.id,
      category: data.category,
      coverVerticalUrl: data.coverVerticalUrl,
      name: data.name,
    });

    localStorage.setItem("filmhot-recent", JSON.stringify(existing));
  }, [data]);

  return (
    <Fragment>
      {data && (
        <Title
          value={`Watch ${data.name} ${
            typeof episodeIndex !== "undefined"
              ? `- Episode ${episodeIndex + 1}`
              : ""
          } - FilmHot`}
        />
      )}

      <div className="flex justify-center">
        <div className="mx-[4vw] lg:mx-[6vw] flex-1">
          <NavBar />

          <div className="flex flex-col md:flex-row gap-10 my-7">
            <div className="flex flex-col items-stretch flex-grow">
              <div key={episodeIndex} className="w-full">
                {data && sources && subtitles ? (
                  <Player
                    src={sources}
                    playerKey={playerKey}
                    primaryColor="#0D90F3"
                    subtitles={
                      subtitles?.map((subtitle) => ({
                        ...subtitle,
                        url: subtitleProxy(subtitle.url),
                      })) || []
                    }
                  >
                    {(ref, props) => (
                      <ReactHlsPlayer
                        playerRef={ref}
                        {...props}
                        src={`${PROXY}${props.src}`}
                      />
                    )}
                  </Player>
                ) : (
                  <div className="w-full h-0 pb-[56.25%] relative">
                    <Skeleton className="absolute w-full h-full top-0 left-0" />
                  </div>
                )}
              </div>

              <MetaData data={data!!} episodeIndex={episodeIndex} />

              {data && <Comment data={data!!} episodeIndex={episodeIndex} />}
            </div>

            <Similar data={data} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default WatchView;
