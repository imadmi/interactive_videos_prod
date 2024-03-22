"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { useAppContext } from "../AppContext";
import VideoPlayerProgress from "../components/VideoPlayerProgress";
import PauseComponent from "../components/PauseComponent";
import VideoControls from "../components/VideoControllers";
import QuestionList from "../components/VideoQuestios";
import { VideoAsk } from "../types";
import TitleComponent from "./TitleComponent";

type VideoAskComponentProps = {
  mockData?: VideoAsk[];
  routedTo?: string;
  buttonLink?: string;
};

const VideoAskComponent: React.FC<VideoAskComponentProps> = ({
  mockData,
  routedTo = "/dashboard",
  buttonLink,
}) => {
  const context = useAppContext();
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Initializes the video player with the first video from the mockData array upon component mount or when mockData changes
  useEffect(() => {
    if (mockData) {
      context.setVideoAsks(mockData);
      context.setvideoAsk(mockData[0]);
    }
  }, [mockData]);

  // changes the videoAsk based on the question clicked
  const handleQuestionClick = async (nextVideoId: string | null) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (
      nextVideoId &&
      context.videoAsks !== undefined &&
      context.videoAsks.length > 0
    ) {
      const nextVideo = context.videoAsks.find(
        (video) => video.id === nextVideoId
      );
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
        console.error("Video with the specified ID was not found.");
      }
    } else if (nextVideoId === null) {
      router.push(routedTo);
    }
  };

  const toggleMute = () => {
    context.setIsMuted(!context.isMuted);
  };
  const toggleFullscreen = () => {
    context.setisFullscrean(!context.isFullscrean);
  };

  // Updates the video duration in the context when the it loads or changes.
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const UpdateVideoDuration = () => {
        context.setVideoDuration(video.duration);
      };
      // "timeupdate" event fires when the currentTime attribute updates.
      video.addEventListener("timeupdate", UpdateVideoDuration);
      return () => {
        video.removeEventListener("timeupdate", UpdateVideoDuration);
      };
    }
  }, [context.videoAsk]);

  // Updates the video progress in the context when the video is playing.
  useEffect(() => {
    if (context.isPaused) return;
    const currentTime = videoRef.current?.currentTime;

    // use of setTimeout to avoid infinite loop
    let timer = setTimeout(() => {
      if (context.videoDuration != 0 && currentTime != null) {
        // change the video progress onclick
        if (context.videoProgress == currentTime / context.videoDuration) {
          const newTime = context.videoProgress + 0.0000000001;
          context.setVideoProgress(newTime);
        }
        // update the video progress when the video is playing
        else {
          context.setVideoProgress(currentTime / context.videoDuration);
        }
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [
    context.videoAsk,
    context.videoProgress,
    context.videoDuration,
    context.isPaused,
    context.isFullscrean,
  ]);

  // Updates the video currentTime allowing users to jump to different parts of the video
  useEffect(() => {
    if (videoRef.current && context.UpdatedCurrentTime != 0) {
      videoRef.current.currentTime = context.UpdatedCurrentTime;
      context.setVideoProgress(
        context.UpdatedCurrentTime / context.videoDuration
      );
    }
  }, [context.videoAsk, context.UpdatedCurrentTime, context.isFullscrean]);

  const togglePlayPause = async () => {
    const video = videoRef.current;
    if (video) {
      context.setIsPaused(!video.paused);
      // video.play() and video.pause() return a boolean value
      video.paused ? await video.play() : video.pause();
    }
  };

  const PlayVideoAsk = async () => {
    if (videoRef.current) {
      context.setIsPaused(false);
      await videoRef.current.play();
    }
  };

  const PauseVideoAsk = () => {
    if (videoRef.current) {
      context.setIsPaused(true);
      videoRef.current.pause();
    }
  };

  const togglePlaybackSpeed = () => {
    const newSpeed =
      context.playbackSpeed === 2 ? 1 : context.playbackSpeed + 0.5;
    context.setPlaybackSpeed(newSpeed);

    if (videoRef.current) {
      videoRef.current.playbackRate = newSpeed;
    }
  };

  // Formats the time in seconds to a string in the format "mm:ss"
  const formatTime = (timeInSeconds: number | undefined) => {
    if (!timeInSeconds) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const toggleAimation = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    context.setAnimate(true);
    setTimeout(() => {
      context.setAnimate(false);
    }, 400);
  };

  const triggerBlink = () => {
    context.setBlink(true);
    setTimeout(() => {
      context.setBlink(false);
    }, 500);
  };

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.onloadedmetadata = () => {
        context.setisVideoPortrait(video.videoHeight > video.videoWidth);
      };
    }
  }, [context.videoAsk.url]);

  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudioPlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const StartAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const StopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  // Play the video when the component mounts
  useEffect(() => {
    try {
      const playVideo = async () => {
        if (videoRef.current) {
          if (videoRef.current.muted === false) {
            videoRef.current.muted = true;
            await videoRef.current.play();
            // set it to true because the video is paused by the browser
            context.setIsPaused(true);
            videoRef.current.muted = false;
          } else {
            await videoRef.current.play();
            videoRef.current.muted = true;
          }
        }
      };
      playVideo();
    } catch (error) {
      console.error("Error playing video", error);
    }
  }, [context.videoAsks]);

  const divref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("Page mounted");
    const div = divref.current; // Get the current element of the ref
    if (!div) return; // Exit if div is not defined

    let startY = 0; // Store the starting Y position of the touch

    // Define the touch start handler
    const handleTouchStart = (e: any) => {
      startY = e.touches[0].clientY; // Get the Y coordinate of the touch start
    };

    // Define the touch end handler
    const handleTouchEnd = (e: any) => {
      const endY = e.changedTouches[0].clientY;
      document.addEventListener('touchmove', function(e) {
        e.preventDefault();
       }, { passive: false });


       // Get the Y coordinate of the touch end
      if (endY - startY > 0) {
    
        e.stopPropagation();

        const stack = context.previosVideos.copy();
        if (stack.isEmpty()) {
          // router.back();
          return;
        }

        const lastVideo = stack.pop();
        context.setPreviosVideos(stack);
        const videos = context.videoAsks;
        const nextVideo = videos.find((video) => video.id === lastVideo)
        if (nextVideo !== undefined) {
          context.setvideoAsk(nextVideo);
        }
        console.log("Swiped down");
        // Perform actions on swipe down
      }
    };

    // Attach the event listeners
    div.addEventListener("touchstart", handleTouchStart, { passive: true });
    div.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Cleanup function to remove event listeners
    return () => {
      div.removeEventListener("touchstart", handleTouchStart);
      div.removeEventListener("touchend", handleTouchEnd);
    };
  }, [context.videoAsk]);

  return (
    <div
      ref={divref}
      className="w-screen h-dvh flex flex-col items-center 
    justify-center bg-gray-100"
    >
      <PauseComponent
        togglePlayPause={togglePlayPause}
        buttonLink={buttonLink}
      />

      <div
        className={`relative  ${
          context.isFullscrean
            ? "w-screen h-dvh"
            : "mx-0 sm:mx-[10%] h-full sm:h-[60%]  w-full sm:w-[80%] sm:rounded-3xl lg:flex-row"
        }  overflow-hidden  flex justify-center items-center bg-black lg:bg-white `}
        onClick={togglePlayPause}
      >
        <TitleComponent />
        <div
          className={`lg:relative lg:h-full ${
            context.isFullscrean ? "w-full" : "max-w-full lg:w-1/2"
          }  bg-gray-950 flex items-center justify-center`}
        >
          <VideoControls
            videoRef={videoRef}
            toggleFullscreen={toggleFullscreen}
            toggleMute={toggleMute}
            togglePlaybackSpeed={togglePlaybackSpeed}
            formatTime={formatTime}
          />
          <div
            className={`${
              context.isFullscrean ? "w-screen h-dvh" : "lg:w-[60vw]"
            } flex items-center justify-center ${
              context.isVideoPortrait ? "h-full w-auto" : "w-full sm:h-auto"
            }`}
            style={{
              animation: context.animate ? "swipeUp 0.3s ease-in forwards" : ``,
            }}
          >
            <VideoPlayerProgress progress={context.videoProgress} />
            {context.videoAsk && context.videoAsk.url && (
              <video
                src={context.videoAsk.url}
                ref={videoRef}
                loop
                muted={context.isMuted}
                autoPlay
                onPlay={StopAudio}
                className={`h-dvh w-screen
                ${
                  context.isVideoPortrait
                    ? `lg:h-full object-cover sm:object-contain `
                    : "sm:w-full sm:h-auto object-contain "
                }
                `}
              >
                <source src={context.videoAsk.url} />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>

        <QuestionList
          togglePlayPause={togglePlayPause}
          handleQuestionClick={handleQuestionClick}
          toggleAnimation={toggleAimation}
          triggerBlink={triggerBlink}
          toggleAudioPlay={toggleAudioPlay}
        />
        {context.audioUrl !== "" && (
          <audio
            ref={audioRef}
            src={context.audioUrl}
            autoPlay
            onPlay={PauseVideoAsk}
            onEnded={PlayVideoAsk}
          >
            <source src={context.audioUrl} type="audio/mpeg" />
            Your browser does not support the element
          </audio>
        )}
      </div>
      {buttonLink && (
        <Link
          href={buttonLink}
          className={`bg-gray-900 px-6 py-4 rounded-xl mt-10 text-white ${
            context.isFullscrean ? "hidden" : "hidden sm:block"
          } `}
        >
          <div className="inline-block font-semibold">Go to your Dashboard</div>
          <FaArrowRightLong className="inline-block ml-3" />
        </Link>
      )}
    </div>
  );
};

export default VideoAskComponent;
