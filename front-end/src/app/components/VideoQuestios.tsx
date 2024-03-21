import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../AppContext";
import { Qsts } from "../types";

const QuestionList = ({
  handleQuestionClick,
  toggleAnimation,
  triggerBlink,
  toggleAudioPlay,
}: any) => {
  const context = useAppContext();

  const [ClickIndex, setClickIndex] = useState<number | null>(null);

  const handleClickingQST = (event: any, qst: Qsts, index: number) => {
    event.stopPropagation();
    triggerBlink();
    context.setClickedButtonIndex(index);

    if (qst.redirectUrl !== "" && qst.redirectUrl !== null) {
      window.open(qst.redirectUrl, "_blank");
      return;
    }

    if (ClickIndex !== index && context.isVoiceAssistanceEnabled) {
      setClickIndex(index);
      // context.setaudioUrl("/audios/audioTest2.mp3");
      context.setaudioUrl(qst.audioUrl);
      toggleAudioPlay();
    } else {
      handleQuestionClick(qst.next_video_id);
      context.setIsPaused(false);
      toggleAnimation();
      context.setUpdatedCurrentTime(0);
      context.setPlaybackSpeed(1);
    }
  };

  const [isTheqstInArabic, setisTheqstInArabic] = useState([false]);

  useEffect(() => {
    if (context.videoAsk && context.videoAsk.questions) {
      setisTheqstInArabic(
        context.videoAsk.questions.map((qst) => {
          const arabicLetterRegex = /[\u0600-\u06FF]/;
          return arabicLetterRegex.test(qst.question);
        })
      );
    }
  }, [context.videoAsk]);

  return (
    <div
      className={`${
        context.isFullscrean ? "lg:hidden" : "block"
      } lg:relative lg:w-1/2 absolute bottom-0 w-full lg:max-h-[100%] min-h-0
           max-h-[50%] text-center overflow-y-auto`}
      style={{
        animation: context.animate ? "swipeUp 0.3s ease-in forwards" : "",
      }}
    >
      <div className="flex flex-col items-center mb-4">
        <h3
          className="font-thin font-sans mb-3 lg:font-normal text-gray-300
       lg:text-gray-700 text-md lg:mb-3"
        >
          Choose 1 of {context.videoAsk.questions.length} options
        </h3>
        {context.videoAsk && context.videoAsk.questions && (
          <>
            {context.videoAsk.questions.map((question, index) => (
              <button
                className={`flex flex-row  items-center text-left lg:w-4/6 md:w-3/6 
            w-[90%] mb-2 lg:mb-3 p-3 bg-black bg-opacity-55 lg:text-black 
            lg:bg-opacity-10 lg:border border-2 border-gray-700 border-opacity-5 
            hover:border-opacity-100 hover:border-[#407bff] text-white py-2 
            px-4 rounded-full font-semibold font-sans
            ${isTheqstInArabic[index] && "flex-row-reverse"}
            `}
                key={index}
                onClick={(e) => handleClickingQST(e, question, index)}
                style={{
                  animation:
                    context.blink && context.clickedButtonIndex === index
                      ? "blink 0.5s linear"
                      : "",
                }}
              >
                <div
                  className={`bg-[#407bff] bg-opacity-80 font-mono font-thin 
              text-sm w-8 h-8 rounded-full text-center flex items-center justify-center
              mr-3 lg:text-white
              ${isTheqstInArabic[index] && "mr-0 ml-3"}
              `}
                >
                  {index + 1}
                </div>
                <div className="inline">{question.question}</div>
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionList;
