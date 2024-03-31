from pymongo.mongo_client import MongoClient
from dotenv import load_dotenv
import os
# import certifi
import pymongo

# ca = certifi.where()

load_dotenv()
uri = os.getenv("MONGO_URI")
print ("uri :" , uri)

print(pymongo.__version__)

client = MongoClient(uri,
    # tlsCAFile=ca,
    )


# for db in client.list_databases():
#     print(db)


mydb = client['abc']
# print(mydb)
# print(client.list_database_names())

videoAsk_collection = mydb['VideoAsk']
print(videoAsk_collection.find_one({}))

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)