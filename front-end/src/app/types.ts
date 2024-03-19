export type VideoAsk = {
  id: string;
  title: string;
  url: string;
  questions: Qsts[];
};

export type Qsts = {
  // id: string;
  question: string;
  url : string;
  next_video_id: string | null;
};
