import os
import pinecone
from pinecone import Pinecone
from dotenv import load_dotenv
import traceback

print(f"Pinecone Version: {pinecone.__version__}")

load_dotenv('.env.local')
api_key = os.getenv("PINECONE_API_KEY")
pc = Pinecone(api_key=api_key)
index_name = "developer-quickstart-py"

index = pc.Index(index_name)

print("Attempting to upsert using upsert_records...")
try:
    index.upsert_records(
        namespace="ns1", 
        records=[{"id": "test-1", "text": "This is a test."}]
    )
    print("upsert_records Success!")
except Exception as e:
    with open('upsert_error.txt', 'w') as f:
        f.write(str(e))
        f.write("\n")
        traceback.print_exc(file=f)
    print("upsert_records Failed. Error saved to upsert_error.txt")

print("Attempting to search using search_records/search...")
# Try explicit text search if Method exists
try:
    if hasattr(index, 'search_records'):
        res = index.search_records(
            namespace="ns1",
            query={"inputs": {"text": "test"}},
            top_k=1
        )
        print(f"search_records result: {res}")
    else:
        print("search_records not found.")
except Exception as e:
    print(f"search_records error: {e}")
