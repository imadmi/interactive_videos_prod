from fastapi import FastAPI
from routes.videoAsk import videoAskRouter
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(videoAskRouter)

origins = [
    "http://localhost:3000",
    "https://interactive-videos-prod.vercel.app/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Python version : 3.8.10
