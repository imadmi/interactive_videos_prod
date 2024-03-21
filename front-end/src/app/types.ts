export type VideoAsk = {
  id: string;
  title: string;
  url: string;
  questions: Qsts[];
};

export type Qsts = {
  question: string;
  audioUrl : string;
  redirectUrl: string;
  next_video_id: string | null;
};
