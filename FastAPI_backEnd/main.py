from fastapi import FastAPI
from routes.videoAsk import videoAskRouter
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(videoAskRouter)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# steps:

# python3 -m venv venv
# source venv/bin/activate


# generate requirements.txt:
# pip freeze > requirements.txt

# install requirements.txt:
# pip install -r requirements. txt

