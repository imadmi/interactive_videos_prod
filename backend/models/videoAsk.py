from pydantic import BaseModel
from typing import List
from typing import Union

class Question(BaseModel):
    question: str
    audioUrl : str
    next_video_id : Union[str ,  None]

class VideoAsk(BaseModel):
    id: str
    title: str
    url : str
    questions: List[Question]