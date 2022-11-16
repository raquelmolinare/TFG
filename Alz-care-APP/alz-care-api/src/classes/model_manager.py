import numpy as np
import tensorflow as tf

from config.general_config import get_config
from keras.models import load_model
from tensorflow.keras.applications.efficientnet import preprocess_input

from src.definitions.classes_constanst import ALZHEIMER_GROUPS_LIST, \
    BrainPlanes


class InvalidModelException(Exception):
    def __init__(self, message=None):
        self.error_message = message or "Invalid model selected Exception"


class ModelManager:

    def __init__(self, img_width, img_height):
        self.img_width: int = img_width
        self.img_width: int = img_height

    @staticmethod
    def __get_model_path(MODEL):
        match MODEL:   # noqa
            case BrainPlanes.AXIAL.value:
                path = get_config().AXIAL_MODEL_PATH
            case BrainPlanes.CORONAL.value:
                path = get_config().CORONAL_MODEL_PATH
            case BrainPlanes.SAGITTAL.value:
                path = get_config().SAGITTAL_MODEL_PATH
            case _:
                raise InvalidModelException

        return path

    @classmethod
    def __predict(cls, img, MODEL):
        model = load_model(cls.__get_model_path(MODEL))
        predictions = model.predict(img)
        score = tf.nn.softmax(predictions)
        classes_prediction = np.argmax(score, axis=1)
        alzheimer_group_result = ALZHEIMER_GROUPS_LIST[classes_prediction[0]]
        return alzheimer_group_result, score.numpy().tolist()[0]

    @classmethod
    def predict_axial(cls, axial_img):
        return cls.__predict(axial_img, BrainPlanes.AXIAL.value)

    @classmethod
    def predict_coronal(cls, coronal_image):
        return cls.__predict(coronal_image, BrainPlanes.CORONAL.value)

    @classmethod
    def predict_sagittal(cls, sagittal_image):
        return cls.__predict(sagittal_image, BrainPlanes.SAGITTAL.value)

    def preprocess_input(input):
        return preprocess_input(input)
