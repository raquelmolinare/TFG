import marshmallow as ma

from flask_smorest.fields import Upload


class UploadFileSchema(ma.Schema):
    file = Upload()
