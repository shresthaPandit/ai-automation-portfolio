import os
import pinecone
from pinecone import Pinecone
from dotenv import load_dotenv

load_dotenv('.env.local')
api_key = os.getenv("PINECONE_API_KEY")
pc = Pinecone(api_key=api_key)
index_name = "developer-quickstart-py"
index = pc.Index(index_name)

print("Attempting to search...")
try:
    # Try different signatures
    # 1. Standard search_records
    print("Method 1: top_k as kwarg")
    try:
        res = index.search_records(
            namespace="ns1",
            query={"inputs": {"text": "Shreshtha"}},
            top_k=3,
            fields=["chunk_text"]
        )
        print(f"Success 1: {res}")
    except Exception as e:
        print(f"Fail 1: {e}")

    # 2. top_k inside query?
    print("Method 2: top_k inside query")
    try:
        res = index.search_records(
            namespace="ns1",
            query={"inputs": {"text": "Shreshtha"}, "top_k": 3},
            fields=["chunk_text"]
        )
        print(f"Success 2: {res}")
    except Exception as e:
        print(f"Fail 2: {e}")

    # 3. separate fields
    print("Method 3: fields/fields_list")
    try:
        res = index.search_records(
            namespace="ns1",
            query={"inputs": {"text": "Shreshtha"}},
            fields=["chunk_text"]
            # No top_k? default?
        )
        print(f"Success 3: {res}")
    except Exception as e:
        print(f"Fail 3: {e}")

except Exception as e:
    print(f"Global Error: {e}")
