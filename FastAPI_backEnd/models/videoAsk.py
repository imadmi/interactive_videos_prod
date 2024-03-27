from pydantic import BaseModel

class VideoAsk(BaseModel):
    id: int
    video_id: int