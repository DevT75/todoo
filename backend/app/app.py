from beanie import init_beanie
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

from backend.app.api.api_v1.router import router
from backend.app.core.config import settings
from backend.app.models.todo_model import Todo
from backend.app.models.user_model import User

origins = ["http://localhost:3000"]

app = FastAPI(
    title="Todo",
    openapi_url="/openapi.json"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World, Successfully Deployed!!!"}

@app.on_event("startup")
async def app_init():
    """
        initialize crucial application services
    """
    
    db_client = AsyncIOMotorClient(settings.MONGO_CONNECTION_STRING).Todo
    
    await init_beanie(
        database=db_client,
        document_models= [
            User,
            Todo
        ]
    )
    
app.include_router(router, prefix=settings.API_V1_STR)
