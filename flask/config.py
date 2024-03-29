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
    MONGODB_USER = os.getenv("MONGODB_USER")
    MONGODB_PWD = os.getenv("MONGODB_PWD")




class DevelopmentConfig(BaseConfig):
    FLASK_ENV = 'development'
    DEBUG = True
    MONGODB_URL = os.getenv("MONGODB_URL_DEV")



class ProductionConfig(BaseConfig):
    FLASK_ENV = 'production'
    DEBUG = False
    MONGODB_URL = os.getenv("MONGODB_URL_PROD")
