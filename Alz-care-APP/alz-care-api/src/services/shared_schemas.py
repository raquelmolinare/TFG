import marshmallow as ma

from flask_smorest.fields import Upload
from marshmallow import validate

from src.definitions.classes_constanst import BrainPlanes


class UploadFileSchema(ma.Schema):
    file = Upload()


class PredictionSchema(ma.Schema):
    result = ma.fields.String(description="""#### Alzheimer group result""",
                              required=True)
    score = ma.fields.List(ma.fields.Float(),
                           description="""#### Alzheimer prediction score""",
                           required=True)


class ImgClassificationSchema(ma.Schema):
    plane = ma.fields.Str(description="""#### Brain plane""",
                          validate=validate.OneOf([plane.value for plane
                                                   in BrainPlanes]),
                          enum=[plane.value for plane in BrainPlanes])
    img = ma.fields.String(description="""#### Img content""")
    prediction = ma.fields.Nested(PredictionSchema,
                                  description="""#### Classification result""",
                                  required=True)
