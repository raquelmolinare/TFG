from config.general_config import get_config
from flask import make_response, abort
from flask_smorest import Blueprint
from src.classes.file_controller import NotAllowedFileTypeException, \
    FileController, OSErrorException
from src.services.shared_schemas import UploadFileSchema, \
    ImgClassificationSchema

from src.utils.utils import generate_uuid

api_url = get_config().API_BASE_NAME + '/image-classification'
api_name = 'Image Classification'
api_description = 'Image Classification service'

blp = Blueprint(api_name, __name__, url_prefix=api_url,
                description=api_description)


@blp.route('/complete-classification', methods=['POST'])
@blp.arguments(UploadFileSchema, location="files")
@blp.response(201, ImgClassificationSchema(many=True))
def get_image_complete_classification(upload_file):
    file = upload_file.get("file")
    file_controller = FileController(generate_uuid())
    try:
        result = file_controller.classify_nifti_file(file,
                                                     include_images=True)
        return result
    except NotAllowedFileTypeException as e:
        abort(make_response(e.error_message, 400))
    except OSErrorException as e:
        abort(make_response(e.error_message, 500))
    except Exception as e:
        file_controller.delete_temp_dir()
        abort(make_response(str(e), 500))


@blp.route('/basic-classification', methods=['POST'])
@blp.arguments(UploadFileSchema, location="files")
@blp.response(201, ImgClassificationSchema(many=True))
def get_image_basic_classification(upload_file):
    file = upload_file.get("file")
    file_controller = FileController(generate_uuid())
    try:
        result = file_controller.classify_nifti_file(file,
                                                     include_images=False)
        return result
    except NotAllowedFileTypeException as e:
        abort(make_response(e.error_message, 400))
    except OSErrorException as e:
        abort(make_response(e.error_message, 500))
    except Exception as e:
        file_controller.delete_temp_dir()
        abort(make_response(str(e), 500))
