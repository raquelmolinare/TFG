from functools import lru_cache

from pydantic import BaseSettings


class Settings(BaseSettings):
    API_TITLE: str = 'Alz Care API'
    API_BASE_NAME: str = '/api'
    API_VERSION: str = '0.1.0'

    OPENAPI_VERSION: str = '3.0.2'
    OPENAPI_URL_PREFIX: str = 'apidocs'
    OPENAPI_SWAGGER_UI_PATH: str = '/swagger'
    OPENAPI_RAPIDOC_PATH: str = '/rapidoc'
    OPENAPI_REDOC_PATH: str = '/redoc'
    OPENAPI_SWAGGER_UI_URL: str = (
        'https://cdn.jsdelivr.net/npm/swagger-ui-dist/'
    )
    OPENAPI_RAPIDOC_URL: str = (
        'https://unpkg.com/rapidoc/dist/rapidoc-min.js'
    )
    OPENAPI_REDOC_URL: str = (
        'https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js'
    )

    ENVIRONMENT: str = 'D'

    UPLOAD_FOLDER: str = 'static/images'

    CMAP: str = "gray"
    IMG_SIZE: int = 224

    class Config:
        env_file = ".env"


@lru_cache()
def get_config():
    return Settings()
