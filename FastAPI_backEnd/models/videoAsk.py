from pydantic import BaseModel
from typing import List
from typing import Union

class Question(BaseModel):
    # id: int
    question: str
    audioUrl : str
    next_video_id : Union[str ,  None]
    # created_at: str

class VideoAsk(BaseModel):
    id: int
    title: str
    url : str
    questions: List[Question]
    # created_at: str
