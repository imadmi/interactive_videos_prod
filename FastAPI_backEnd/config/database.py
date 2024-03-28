from pymongo.mongo_client import MongoClient
from dotenv import load_dotenv
import os
import certifi
ca = certifi.where()

load_dotenv()
uri = os.getenv("MONGO_URI")

client = MongoClient(uri,
    tlsCAFile=ca)

videoAsk_collection = client['abc']['videoAsk']