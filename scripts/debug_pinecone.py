import os
from pinecone import Pinecone
from dotenv import load_dotenv

load_dotenv('.env.local')
api_key = os.getenv("PINECONE_API_KEY")
print(f"API Key found: {'Yes' if api_key else 'No'}")

try:
    pc = Pinecone(api_key=api_key)
    print("Listing indexes...")
    indexes = pc.list_indexes()
    print(f"Indexes: {indexes}")
    
    # Check if we can describe the target index if it's in the list
    for idx in indexes:
        print(f"Index: {idx.name}, Status: {idx.status}")

except Exception as e:
    print(f"Error: {e}")
