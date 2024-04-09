from fastapi import APIRouter, UploadFile, File
from models.videoAsk import VideoAsk
from schemas.videoAsk import save_VideoAsk_in_db, get_videos_from_db, get_video_from_db, upload_blob
from typing import List


videoAskRouter = APIRouter(tags=["videoAsk"])


@videoAskRouter.post("/saveVideoAsk")
async def save_VideoAsk(videoAsks : List[VideoAsk]):
    try:
        await save_VideoAsk_in_db(videoAsks)
        return {"success": "true"}
    except Exception as e:
        return { "success": "false", "error": str(e) }


@videoAskRouter.get("/getVideoAsks")
async def get_VideoAsk():
    try:
        videoAsk_list = await get_videos_from_db()
        return {"success": True, "videoAsks": videoAsk_list}
    except Exception as e:
        return {"success": False, "error": str(e)}


@videoAskRouter.get("/getVideoAsk/{id}")
async def get_VideoAsk_by_id(id: str):
    try:
        videoAsk = await get_video_from_db(id)
        return {"success": True, "videoAsk": videoAsk}
    except Exception as e:
        return {"success": False, "error": str(e)}


@videoAskRouter.post("/uploadfile")
async def upload_file(file: UploadFile = File(...)):
    try:
        url = await upload_blob(file)
        return {"success": True, "url": url}
    except Exception as e:
        return {"success": False, "error": str(e)}
    

from config.database import videoAsk_collection
@videoAskRouter.delete("/deleteAllVideoAsks")
async def delete_all_files():
    try:
        videoAsk_collection.delete_many({})
        return {"success": True}
    except Exception as e:
        return {"success": False, "error": str(e)}