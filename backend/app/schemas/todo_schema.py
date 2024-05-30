from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, Field

class TodoCreate(BaseModel):
    title: str = Field(..., title='Title', max_length=55, min_length=1)
    description: str = Field(..., title='Title', max_length=755, min_length=0)
    status: Optional[bool] = False
    priority: Optional[str] = Field(None, title='Priority', description='Priority level of the todo item', enum=['High', 'Medium', 'Low'])
    due_date: Optional[datetime] = None
    
class TodoUpdate(BaseModel):
    title: Optional[str] = Field(..., title='Title', max_length=55, min_length=1)
    description: Optional[str] = Field(..., title='Title', max_length=755)
    status: Optional[bool] = False
    priority: Optional[str] = Field(None, title='Priority', description='Priority level of the todo item', enum=['High', 'Medium', 'Low'])
    due_date: Optional[datetime] = None
class TodoOut(BaseModel):
    todo_id: UUID
    status: bool
    title: str
    priority: str = None
    due_date: Optional[datetime] = None
    description: str
    created_at: datetime
    updated_at: datetime
    