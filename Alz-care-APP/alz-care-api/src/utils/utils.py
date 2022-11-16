import os
import uuid

from config.general_config import get_config


def generate_uuid():
    id = uuid.uuid4()
    path = os.path.join(get_config().UPLOAD_FOLDER, str(id))
    while os.path.isfile(path):
        id = uuid.uuid4()
        path = os.path.join(get_config().UPLOAD_FOLDER, str(id))
    return id
