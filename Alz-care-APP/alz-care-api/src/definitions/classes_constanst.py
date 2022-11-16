from enum import Enum

ALLOWED_NIFTI_FILE_EXTENSION = {'.nii', '.nii.gz'}
ALLOWED_NIFTI_FILE_CONTENT_TYPE = {'application/octet-stream'}


class BrainPlanes(Enum):
    """
    List of brain planes
    """
    AXIAL = 'AXIAL'
    CORONAL = 'CORONAL'
    SAGITTAL = 'SAGITTAL'


class BrainPlanesFileName(Enum):
    AXIAL = 'axial.png'
    CORONAL = 'coronal.png'
    SAGITTAL = 'sagittal.png'


BRAIN_PLANES_INDEX_LIST = {
    BrainPlanes.AXIAL.value: 0,
    BrainPlanes.CORONAL.value: 1,
    BrainPlanes.SAGITTAL.value: 2
}


class AlzheimerGroups(Enum):
    CN = 'CN'
    MCI = 'MCI'
    AD = 'AD'


ALZHEIMER_GROUPS_LIST = {
    0: AlzheimerGroups.CN.value,
    1: AlzheimerGroups.MCI.value,
    2: AlzheimerGroups.AD.value
}
