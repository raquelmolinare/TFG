from enum import Enum

ALLOWED_NIFTI_FILE_EXTENSION = {'.nii', '.nii.gz'}
ALLOWED_NIFTI_FILE_CONTENT_TYPE = {'application/octet-stream'}


class BrainPlanesFileName(Enum):
    AXIAL = 'axial.png'
    CORONAL = 'coronal.png'
    SAGITTAL = 'sagittal.png'
