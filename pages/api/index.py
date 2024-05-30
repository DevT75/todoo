# from fastapi import FastAPI

# app = FastAPI()

# @app.get("/api")
# async def home():
#     return {"Response" : "Hello World!!!"}

import uvicorn
from os import getenv
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[2]))
# from backend.app.app import app


if __name__ == '__main__':
    uvicorn.run(
        'backend.app.app:app',
        host=getenv('HOST', '127.0.0.1'),
        port=int(getenv('PORT', 8000)),
        reload=True
    )