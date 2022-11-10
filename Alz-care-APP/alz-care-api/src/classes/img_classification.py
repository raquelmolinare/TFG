class Prediction:
    def __init__(self, result, values):
        self.result: str = result
        self.score: list[float] = values


class ImgClassification:

    def __init__(self, plane, prediction, img=None):
        # Validate data
        self._validate(prediction)
        self.plane: str = plane
        self.prediction = prediction
        self.img = img

    @staticmethod
    def _validate(prediction):
        if not (isinstance(prediction, Prediction)):
            raise TypeError()
