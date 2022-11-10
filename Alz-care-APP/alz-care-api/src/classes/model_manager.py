import numpy as np
import tensorflow as tf

from config.general_config import get_config
from keras.models import load_model

from src.definitions.classes_constanst import ALZHEIMER_GROUPS_LIST


class ModelManager:

    def __init__(self, img_width, img_height):
        self.img_width: int = img_width
        self.img_width: int = img_height

    @staticmethod
    def predict(img):
        model = load_model(get_config().MODEL_PATH)
        predictions = model.predict(img)
        score = tf.nn.softmax(predictions)
        classes_prediction = np.argmax(score, axis=1)
        alzheimer_group_result = ALZHEIMER_GROUPS_LIST[classes_prediction[0]]
        return alzheimer_group_result, score.numpy().tolist()[0]
