"""Flask config."""
import os
from os import environ, path
from dotenv import load_dotenv


load_dotenv()

# variables must be set in a .env file (not present in repository)


class BaseConfig:
    """Base config."""
    SECRET_KEY = os.getenv("SECRET_KEY")
    PROPAGATE_EXCEPTIONS = os.getenv("PROPAGATE_EXCEPTIONS")
    DB_APIKEY_SECRET_KEY = os.getenv("DB_APIKEY_SECRET_KEY")




class DevelopmentConfig(BaseConfig):
    FLASK_ENV = 'development'
    DEBUG = True


class ProductionConfig(BaseConfig):
    FLASK_ENV = 'production'
    DEBUG = False
