import { VideoAsk } from "../types";

const mockData: VideoAsk[] = [
  {
    id: "video1",
    title: "This is the title 1 الْعَرَبِيَّة",
    url: "/videos/video1.mp4",
    questions: [
      {
        question: "Creating a videoask الْعَرَبِيَّة",
        url : "/audios/audioTest2.mp3",
        next_video_id: "video2",
      },
      {
        question: "Navigating your responses",
        url : "/audios/audioTest.mp3",
        next_video_id: "video3",
      },
      {
        question: "Managing your contacts",
        url : "/audios/audioTest2.mp3",
        next_video_id: "video4",
      },
      {
        question: "Account and org settings",
        url : "/audios/audioTest.mp3",
        next_video_id: "video5",
      },
      {
        question: "I'm ready, go to my dashboard!",
        url : "/audios/audioTest2.mp3",
        next_video_id: null,
      },
    ],
  },

  {
    id: "video2",
    title: "This is the title 2",
    url: "/videos/video2.mp4",
    questions: [
      {
        question: "Navigating your responses",
        url : "",
        next_video_id: "video3",
      },
      {
        question: "Managing your contacts الْعَرَبِيَّة",
        url : "",
        next_video_id: "video4",
      },
      {
        question: "Account and org settings",
        url : "",
        next_video_id: "video5",
      },
      {
        question: "I'm ready, go to my dashboard!",
        url : "",
        next_video_id: null,
      },
    ],
  },

  {
    id: "video3",
    title: "This is the title 3",
    url: "/videos/video3.mp4",
    questions: [
      {
        question: "Creating a videoask",
        url : "",
        next_video_id: "video2",
      },
      {
        question: "Managing your contacts",
        url : "",
        next_video_id: "video4",
      },
      {
        question: "Account and org settings  الْعَرَبِيَّة",
        url : "",
        next_video_id: "video5",
      },
      {
        question: "I'm ready, go to my dashboard!",
        url : "",
        next_video_id: null,
      },
    ],
  },

  {
    id: "video4",
    title: "This is the title 4",
    url: "/videos/video4.mp4",
    questions: [
      {
        question: "Creating a videoask",
        url : "",
        next_video_id: "video2",
      },
      {
        question: "Navigating your responses",
        url : "",
        next_video_id: "video3",
      },
      {
        question: "Account and org settings",
        url : "",
        next_video_id: "video5",
      },
      {
        question: "I'm ready, go to my dashboard!  الْعَرَبِيَّة",
        url : "",
        next_video_id: null,
      },
    ],
  },

  {
    id: "video5",
    title: "This is the title 5",
    url: "/videos/video5.mp4",
    questions: [
      {
        question: "Creating a videoask  الْعَرَبِيَّة",
        url : "",
        next_video_id: "video2",
      },
      {
        question: "Navigating your responses",
        url : "",
        next_video_id: "video3",
      },
      {
        question: "Managing your contacts",
        url : "",
        next_video_id: "video4",
      },
      {
        question: "I'm ready, go to my dashboard!",
        url : "",
        next_video_id: null,
      },
    ],
  },
];

export { mockData };
