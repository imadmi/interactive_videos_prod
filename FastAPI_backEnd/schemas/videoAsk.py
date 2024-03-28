from models.videoAsk import VideoAsk, Question

# Serialize data to JSON
def serialize_videoask(videoask: VideoAsk) -> dict:
    return videoask.dict()

# Deserialize JSON to Pydantic model object
def deserialize_videoask(json_data: dict) -> VideoAsk:
    return VideoAsk(**json_data)
