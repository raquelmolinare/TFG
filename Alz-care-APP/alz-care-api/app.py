from flask import Flask
from flask_smorest import Api

from config.general_config import get_config
from src.services import image_service


def create_app():
    app = Flask(__name__)

    # Setup general config
    app.config.from_object(get_config())

    return app


if __name__ == "__main__":
    # Create the app
    app = create_app()
    api = Api(app)

    # Register local services
    api.register_blueprint(image_service.blp)

    app.run(host='0.0.0.0', port=5000, debug=True)
