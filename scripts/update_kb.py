import os
import time
from pinecone import Pinecone
from dotenv import load_dotenv

# Load environment variables from .env.local
load_dotenv('.env.local')

api_key = os.getenv("PINECONE_API_KEY")
if not api_key:
    print("Error: PINECONE_API_KEY not found in .env.local")
    exit(1)

pc = Pinecone(api_key=api_key)
index_name = "developer-quickstart-py"

# Check if index exists
existing_indexes = [i.name for i in pc.list_indexes()]
if index_name not in existing_indexes:
    print(f"Creating index {index_name}...")
    try:
        pc.create_index_for_model(
            name=index_name,
            cloud="aws",
            region="us-east-1",
            embed={
                "model": "llama-text-embed-v2",
                "field_map": {"text": "chunk_text"}
            }
        )
        # Wait for index to be ready
        while not pc.describe_index(index_name).status['ready']:
            time.sleep(1)
        print("Index created.")
    except Exception as e:
        print(f"Failed to create index: {e}")
        # If it failed, maybe it exists but wasn't in list? or 409 conflict
        pass
else:
    print(f"Index {index_name} already exists.")


index = pc.Index(index_name)

# Read about.md
try:
    with open('about.md', 'r', encoding='utf-8') as f:
        content = f.read()
except FileNotFoundError:
    print("Error: about.md not found.")
    exit(1)

# Chunk content by sections
sections = []
current_section = []
current_header = "Introduction"

lines = content.split('\n')
for line in lines:
    if line.startswith('## '):
        if current_section:
            sections.append({
                "id": current_header.lower().replace(" ", "-"),
                "text": f"# {current_header}\n\n" + "\n".join(current_section)
            })
        current_header = line.replace('## ', '').strip()
        current_section = []
    else:
        current_section.append(line)

# Add last section
if current_section:
    sections.append({
        "id": current_header.lower().replace(" ", "-"),
        "text": f"# {current_header}\n\n" + "\n".join(current_section)
    })

print(f"Found {len(sections)} sections to upsert.")

# Upsert records
# Using upsert_records for integrated inference
try:
    # Prepare records in the format expected by upsert_records
    # For create_index_for_model with field_map={"text": "chunk_text"}, we send 'text'
    records = []
    for s in sections:
        records.append({
            "_id": s["id"], # pinecone-client might expect _id or id depending on version/method. 
            # upsert_records typically takes list of dicts.
            # Let's try standard format for upsert_records if available
            "id": s["id"],
            "chunk_text": s["text"]
        })
    
    # Check if upsert_records exists
    if hasattr(index, 'upsert_records'):
        print("Upserting using upsert_records...")
        index.upsert_records(namespace="ns1", records=records)
    else:
        # Fallback to upsert if upsert_records is not available (older SDK or different method)
        # However, for integrated models, we MUST send the text.
        # Standard upsert takes vectors. If we don't have vectors, we can't use standard upsert unless the client handles it.
        # IMPORTANT: The Python SDK v3+ with integrated inference might use `index.upsert(vectors=[...])` 
        # but you pass `metadata`? No, that doesn't generate vectors server-side usually.
        # I'll rely on the user instructions "upsert and search with text".
        # If upsert_records is missing, I'll try to print available methods
        print("upsert_records method not found on Index object. Dumping dir(index):")
        print(dir(index))
        # Attempt standard upsert with empty vector if that's a hack, but unlikely.
        # Assuming upsert_records works.
        exit(1)

    print("Upsert complete.")

except Exception as e:
    print(f"Error during upsert: {e}")
    # Print full traceback
    import traceback
    traceback.print_exc()
