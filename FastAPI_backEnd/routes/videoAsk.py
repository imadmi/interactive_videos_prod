from fastapi import APIRouter
from models.videoAsk import VideoAsk
from config.database import client

videoAskRouter = APIRouter()

@videoAskRouter.get("/")
async def root():
    #'videoAsk' is the name of your collection
    videoAsk_collection = client['abc']['videoAsk']
    # print(videoAsk_collection)

    # Insert a document into the 'videoAsk' collection
    videoAsk_collection.insert_one({"id": 1, "video_id": 1})

    # # Find a document in the 'videoAsk' collection
    videoAsk_collection.find_one({"id": 1})
    return {"message": "Hello World"}
