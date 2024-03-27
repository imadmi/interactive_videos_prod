from fastapi import FastAPI
from routes.videoAsk import videoAskRouter

app = FastAPI()
app.include_router(videoAskRouter)

# generate requirements.txt:
# pip freeze > requirements.txt

# install requirements.txt:
# pip install -r requirements. txt

# steps:

# python3 -m venv venv
# source venv/bin/activate

