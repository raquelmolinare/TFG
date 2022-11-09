import os
import shutil

import nibabel as nib
import numpy as np
import matplotlib.image as nifti_image

from tensorflow.keras.preprocessing import image
from tensorflow.keras.preprocessing.image import load_img
from werkzeug.utils import secure_filename

from config.general_config import get_config
from src.definitions.classes_constanst import ALLOWED_NIFTI_FILE_EXTENSION, \
    ALLOWED_NIFTI_FILE_CONTENT_TYPE, BrainPlanesFileName


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

    @staticmethod
    def __get_middle_axial_slide(img):
        shape = img.shape[:-1]
        return shape[2] // 2

    @staticmethod
    def __get_middle_coronal_slide(img):
        shape = img.shape[:-1]
        return shape[1] // 2

    @staticmethod
    def __get_middle_sagittal_slide(img):
        shape = img.shape[:-1]
        return shape[0] // 2

    @staticmethod
    def __save_axial_image(img, slide, file_path):
        slide = img[:, :, slide, 0]
        nifti_image.imsave(file_path, slide, cmap=get_config().CMAP)

    @staticmethod
    def __save_coronal_image(img, slide, file_path):
        slide = img[:, slide, :, 0]
        nifti_image.imsave(file_path, slide, cmap=get_config().CMAP)

    @staticmethod
    def __save_sagittal_image(img, slide, file_path):
        slide = img[slide, :, :, 0]
        nifti_image.imsave(file_path, slide, cmap=get_config().CMAP)

    @classmethod
    def __save_images_from_nifti_file(cls, nifti_img, path):
        file_path = os.path.join(path, secure_filename(
            BrainPlanesFileName.AXIAL.value))
        cls.__save_axial_image(nifti_img,
                               cls.__get_middle_axial_slide(nifti_img),
                               file_path)

        file_path = os.path.join(path, secure_filename(
            BrainPlanesFileName.CORONAL.value))
        cls.__save_coronal_image(nifti_img,
                                 cls.__get_middle_coronal_slide(nifti_img),
                                 file_path)

        file_path = os.path.join(path, secure_filename(
            BrainPlanesFileName.SAGITTAL.value))
        cls.__save_sagittal_image(nifti_img,
                                  cls.__get_middle_sagittal_slide(nifti_img),
                                  file_path)

    @staticmethod
    def __preprocess_input(x):
        # TODO: related to the model
        return x

    @classmethod
    def __load_image(cls, file_path):
        img = load_img(file_path, target_size=(get_config().IMG_SIZE,
                                               get_config().IMG_SIZE))
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        x = cls.__preprocess_input(x)
        return x

    def __process_nifti_file(self, nifti_file_path):
        img = nib.load(nifti_file_path).get_fdata()
        self.__save_images_from_nifti_file(img, self.uuid_dir_path)
        images = []
        file_path = os.path.join(self.uuid_dir_path, secure_filename(
            BrainPlanesFileName.AXIAL.value))
        axial = self.__load_image(file_path)
        images.append(axial)
        file_path = os.path.join(self.uuid_dir_path, secure_filename(
            BrainPlanesFileName.CORONAL.value))
        coronal = self.__load_image(file_path)
        images.append(coronal)
        file_path = os.path.join(self.uuid_dir_path, secure_filename(
            BrainPlanesFileName.SAGITTAL.value))
        sagittal = self.__load_image(file_path)
        images.append(sagittal)
        return images

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

        # Process nifti_file
        self.__process_nifti_file(nifti_file_path=file_path)

        # Remove temp directory
        self.__delete_temp_dir()

        result = 'OK'
        return result
