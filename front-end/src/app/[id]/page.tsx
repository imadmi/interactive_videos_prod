"use client";

import { useAppContext } from "@/app/AppContext";
import VideoAskComponent from "@/app/components/VideoAskComponent";
import { VideoAsk } from "@/app/types";
import { use, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { mockData } from "@/app/get-started/mockData";
import { useSearchParams } from "next/navigation";

const Page = (param: any) => {
  const context = useAppContext();
  const searchParams = useSearchParams();
  const start = searchParams.get("start");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}:3001/getVideoAsks`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // if (!response.ok) {
        //   console.error("Fetching error:", response);
        //   return;
        // }
        // const data: VideoAsk[] = await response.json();

        const data: VideoAsk[] = mockData; // testing with mock data

        let nextVideo = null;
        if (start !== null && start !== "" && start !== undefined) {
          nextVideo = data.find((video) => video.id === start);
        } else {
          nextVideo = data.find((video) => video.id === param.params.id);
        }

        if (nextVideo !== undefined) {
          context.setvideoAsk(nextVideo);
        } else {
          const emptyVideoAsk = {
            id: "",
            title: "",
            url: "",
            questions: [],
          };
          context.setvideoAsk(emptyVideoAsk);
          toast.error("Video with the specified ID was not found.", {
            id: "404video",
          });
        }

        context.setVideoAsks(data);
      } catch (error) {
        const message = "An error occurred while fetching the data." + error;
        toast.error(message, {
          id: "fetching",
        });
        console.error("Fetchingerror:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <VideoAskComponent
        // mockData={context.videoAsks}
        routedTo="/dashboard"
      />
    </>
  );
};

export default Page;
