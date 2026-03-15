from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import os
from datetime import datetime

class Database:
    client: AsyncIOMotorClient = None
    db = None

    @classmethod
    async def connect(cls):
        uri = os.getenv("MONGODB_URI")
        if not uri:
            print("Warning: MONGODB_URI not found. Data will not be persisted.")
            return
        
        try:
            cls.client = AsyncIOMotorClient(uri)
            # Send a ping to confirm a successful connection
            await cls.client.admin.command('ping')
            cls.db = cls.client.research_papers_db
            print("Successfully connected to MongoDB Atlas!")
        except Exception as e:
            print(f"Error connecting to MongoDB: {e}")

    @classmethod
    async def close(cls):
        if cls.client:
            cls.client.close()
            print("MongoDB connection closed.")

# Repository functions
async def save_paper_analysis(analysis_data: dict):
    if Database.db is None:
        return "standalone_" + str(ObjectId())
    
    analysis_data["created_at"] = datetime.utcnow()
    result = await Database.db.papers.insert_one(analysis_data)
    return str(result.inserted_id)

async def get_all_papers():
    if Database.db is None:
        return []
    
    papers = []
    cursor = Database.db.papers.find().sort("created_at", -1)
    async for document in cursor:
        document["_id"] = str(document["_id"])
        papers.append(document)
    return papers

async def save_chat_message(paper_id: str, message: dict):
    if Database.db is None:
        return
    
    message["created_at"] = datetime.utcnow()
    await Database.db.chats.update_one(
        {"paper_id": paper_id},
        {"$push": {"messages": message}, "$set": {"updated_at": datetime.utcnow()}},
        upsert=True
    )

async def get_chat_history(paper_id: str):
    if Database.db is None:
        return []
    
    chat = await Database.db.chats.find_one({"paper_id": paper_id})
    if chat:
        return chat.get("messages", [])
    return []
