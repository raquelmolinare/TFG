from config.general_config import get_config
from flask import make_response, abort
from flask_smorest import Blueprint
from src.classes.file_controller import NotAllowedFileTypeException, \
    FileController, OSErrorException
from src.services.shared_schemas import UploadFileSchema

from src.utils.utils import generate_uuid

api_url = get_config().API_BASE_NAME + '/image-classification'
api_name = 'Image Classification'
api_description = 'Image Classification service'

blp = Blueprint(api_name, __name__, url_prefix=api_url,
                description=api_description)


@blp.route('/upload', methods=['POST'])
@blp.arguments(UploadFileSchema, location="files")
@blp.response(201)
def get_image(upload_file):
    file = upload_file.get("file")
    try:
        file_controller = FileController(generate_uuid())
        result = file_controller.upload(file)
        return result
    except NotAllowedFileTypeException as e:
        abort(make_response(e.error_message, 400))
    except OSErrorException as e:
        abort(make_response(e.error_message, 400))
