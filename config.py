import os
from dotenv import load_dotenv

# load .env if present (local dev only)
load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "default-secret")
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
