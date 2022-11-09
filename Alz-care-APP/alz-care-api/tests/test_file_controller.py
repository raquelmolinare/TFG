import pytest
from src.classes.file_controller import FileController, NotAllowedFileTypeException


class TestFileController(object):
    def test_validate_png_file(self):
        with pytest.raises(NotAllowedFileTypeException):
            file_controller = FileController(1)
            file_controller.validate_nifti_file('image/png', 'test.png')

    def test_validate_nifti_file(self):
        file_controller = FileController(1)
        file_controller.validate_nifti_file('application/octet-stream', 'test.nii')
