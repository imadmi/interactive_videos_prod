from fastapi import APIRouter, HTTPException
from models.videoAsk import VideoAsk
from config.database import videoAsk_collection , client
from typing import List

videoAskRouter = APIRouter()

@videoAskRouter.post("/saveVideoAsk")
def save_VideoAsk(videoAsks : List[VideoAsk]):
    try:
        # R = client.abc
        # print(R)
        videoAsks_dict = [videoAsk.dict() for videoAsk in videoAsks]

        result = videoAsk_collection.insert_one({'videoAsks' : videoAsks_dict})
        # result = videoAsk_collection.insert_one({})

        print(f"Inserted document with ID: {result.inserted_id}")
        return {"message": "VideoAsk created successfully."}

    except Exception as e:
        print(str(e))


@videoAskRouter.get("/getVideoAsk")
async def get_VideoAsk()-> List[dict]:
    try:
        videoAsks = videoAsk_collection.find()
        # for videoAsk in videoAsks:
        #     print (videoAsk)

        # videoAsks_list = [doc for doc in videoAsks]
        # return videoAsks_list
    except Exception as e:
        print(str(e))

