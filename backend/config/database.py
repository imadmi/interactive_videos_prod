from motor.motor_asyncio import AsyncIOMotorClient # type: ignore
from dotenv import load_dotenv
import os


load_dotenv()
uri = os.getenv("MONGO_URI")
client = AsyncIOMotorClient(uri)
mydb = client['abc']
videoAsk_collection = mydb['VideoAsk']


try:
    client.admin.command('ping')
    print("Pinged. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
