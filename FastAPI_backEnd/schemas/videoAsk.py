from models.videoAsk import VideoAsk
from fastapi import UploadFile
from config.database import videoAsk_collection
from google.cloud import storage
from bson import ObjectId
from typing import List
import time


def modify_video_id(video_ask : VideoAsk):
    date = int(time.time())
    video_ask.id = f"{video_ask.id}-{date}"
    for question in video_ask.questions:
        if question.next_video_id is not None:
            question.next_video_id = f"{question.next_video_id}-{date}"
    return video_ask.dict()

 
async def upload_blob(file: UploadFile):
    file_buffer = await file.read()
    date = str(time.time()).split('.')[1]
    destination_blob_name = f"{date}-{file.filename}"
    storage_client = storage.Client()
    bucket_name = "storage-video-ask"
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)
    blob.upload_from_string(file_buffer)
    return f"https://storage.googleapis.com/{bucket_name}/{destination_blob_name}"


async def save_VideoAsk_in_db(videoAsks : List[VideoAsk]):
    # data = [modify_video_id(video_ask) for video_ask in videoAsks]
    data = [video_ask.dict() for video_ask in videoAsks]
    videoAsk_collection.insert_one({'videoAsks' : data})


async def get_videos_from_db():
    videoAsks = await videoAsk_collection.find().to_list(1000)
    videoAsk_list = []
    for videoAsk in videoAsks:
        videoAsk['_id'] = str(videoAsk['_id'])
        videoAsk_list.append(videoAsk)
    return videoAsk_list


async def get_video_from_db(id):
    videoAsk = await videoAsk_collection.find_one({"_id": ObjectId(id)})
    if videoAsk is not None:
        videoAsk['_id'] = str(videoAsk['_id'])
    return videoAsk

