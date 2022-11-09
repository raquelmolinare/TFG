import os
import shutil

from werkzeug.utils import secure_filename

from config.general_config import get_config
from src.definitions.classes_constanst import ALLOWED_NIFTI_FILE_EXTENSION, \
    ALLOWED_NIFTI_FILE_CONTENT_TYPE


class NotAllowedFileTypeException(Exception):
    def __init__(self, message=None):
        self.error_message = message or "File type not allowed"


class OSErrorException(Exception):
    def __init__(self, message=None):
        self.error_message = message or "OSError Exception"


class FileController:

    def __init__(self, uuid):
        self.uuid_dir_path = os.path.join(get_config().UPLOAD_FOLDER,
                                          str(uuid))

    @staticmethod
    def validate_nifti_file(file_content_type, file_filename):
        name, extension = os.path.splitext(file_filename)
        if file_content_type not in ALLOWED_NIFTI_FILE_CONTENT_TYPE \
                or extension not in ALLOWED_NIFTI_FILE_EXTENSION:
            raise NotAllowedFileTypeException

    def __generate_temp_dir(self):
        try:
            os.mkdir(self.uuid_dir_path)
        except OSError:
            raise OSErrorException

    def __delete_temp_dir(self):
        try:
            shutil.rmtree(self.uuid_dir_path)
        except Exception:
            raise OSErrorException

    def upload(self, nifti_file):
        # Validate nifti_file
        self.validate_nifti_file(file_content_type=nifti_file.content_type,
                                 file_filename=nifti_file.filename)

        # Generate temp directory
        self.__generate_temp_dir()

        # Save nifti_file
        file_path = os.path.join(self.uuid_dir_path,
                                 secure_filename(nifti_file.filename))
        nifti_file.save(file_path)

        # Remove temp directory
        self.__delete_temp_dir()

        result = 'OK'
        return result
