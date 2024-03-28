from fastapi import APIRouter, HTTPException
from models.videoAsk import VideoAsk
from config.database import videoAsk_collection
from typing import List

videoAskRouter = APIRouter()

@videoAskRouter.post("/saveVideoAsk")
async def save_VideoAsk(videoAsks : List[VideoAsk]):
    try:
        print (videoAsks)
    # Insert a document into the 'videoAsk' collection
        # videoAsk_collection.insert_one(List[videoAsk])
        # for videoAsk in videoAsks:
        #     videoAsk_collection.insert_one(videoAsk.dict())

        await videoAsk_collection.insert_one(List[videoAsks])

        # videoAsk_collection.find_one({"id": 1})
        return {"message": "Hello World"}
    except Exception as e:
        print(str(e))


@videoAskRouter.get("/getVideoAsk")
async def get_VideoAsk()-> List[dict]:
    try:
        videoAsks = videoAsk_collection.find()
        for videoAsk in videoAsks:
            print (videoAsk)

        videoAsks_list = [doc for doc in videoAsks]
        return videoAsks_list
    except Exception as e:
        print(str(e))

