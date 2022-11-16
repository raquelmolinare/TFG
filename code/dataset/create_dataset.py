import matplotlib.pyplot as plt
import matplotlib.image as image
import nibabel as nib
import os

from dotenv import load_dotenv

load_dotenv()

AD_SRC_PATH = os.getenv('AD_SRC_PATH')
AD_DST_PATH = os.getenv('AD_DST_PATH')
MCI_SRC_PATH = os.getenv('MCI_SRC_PATH')
MCI_DST_PATH = os.getenv('MCI_DST_PATH')
CN_SRC_PATH = os.getenv('CN_SRC_PATH')
CN_DST_PATH = os.getenv('CN_DST_PATH')
SUBJECT_ID_LEVEL = int(os.getenv('SUBJECT_ID_LEVEL'))


def load_nifti_img(filepath):
    # Load from path
    return nib.load(filepath).get_fdata()


def get_middle_coronal_slide(img):
    shape = img.shape[:-1]
    return shape[1] // 2


def get_middle_axial_slide(img):
    shape = img.shape[:-1]
    return shape[2] // 2


def get_middle_sagittal_slide(img):
    shape = img.shape[:-1]
    return shape[0] // 2


def plot_nifti_coronal_img(img, slide):
    slide = img[:, slide, :, 0]
    plt.imshow(slide, cmap="gray")
    plt.show()


def plot_nifti_sagittal_img(img, slide):
    slide = img[slide, :, :, 0]
    plt.imshow(slide, cmap="gray")
    plt.show()


def plot_nifti_axial_img(img, slide):
    slide = img[:, :, slide, 0]
    plt.imshow(slide, cmap="gray")
    plt.show()


def save_coronal_image(img, slide, file_path):
    slide = img[:, slide, :, 0]
    image.imsave(file_path, slide, cmap="gray")


def save_sagittal_image(img, slide, file_path):
    slide = img[slide, :, :, 0]
    image.imsave(file_path, slide, cmap="gray")


def save_axial_image(img, slide, file_path):
    slide = img[:, :, slide, 0]
    image.imsave(file_path, slide, cmap="gray")


def get_nifti_path_list(source):
    path_list = []
    for dir_name, dirs, files in os.walk(source):
        for file_name in files:
            # File path
            path = dir_name + '/' + file_name
            path_list.append(path)
    return path_list


def save_images(path_list, destination, subject_id_level, class_name):
    for index, nifti_path in enumerate(path_list):
        print(nifti_path)
        nifti_img = load_nifti_img(nifti_path)

        subject_id = nifti_path.split("/")[subject_id_level]
        final_destination = destination + '/' + str(subject_id)
        print(final_destination)

        if not os.path.exists(final_destination):
            os.makedirs(final_destination)

        # file_path = final_destination + '/' + str(class_name) + '-' + str(index) + '-coronal.png'
        # save_coronal_image(nifti_img, get_middle_coronal_slide(nifti_img), file_path)
        #
        file_path = final_destination + '/' + str(class_name) + '-' + str(index) + '-sagittal.png'
        save_sagittal_image(nifti_img, get_middle_sagittal_slide(nifti_img), file_path)

        # file_path = final_destination + '/' + str(class_name) + '-' + str(index) + '-axial.png'
        # save_axial_image(nifti_img, get_middle_axial_slide(nifti_img), file_path)


if __name__ == '__main__':

    print('Generando imágenes a partir de archivos NIfTI, esto podría tardar...')

    # AD
    nifti_files_path_list = get_nifti_path_list(AD_SRC_PATH)
    save_images(nifti_files_path_list, AD_DST_PATH, SUBJECT_ID_LEVEL, "AD")

    # MCI
    nifti_files_path_list = get_nifti_path_list(MCI_SRC_PATH)
    save_images(nifti_files_path_list, MCI_DST_PATH, SUBJECT_ID_LEVEL, "MCI")

    # CN
    nifti_files_path_list = get_nifti_path_list(CN_SRC_PATH)
    save_images(nifti_files_path_list, CN_DST_PATH, SUBJECT_ID_LEVEL, "CN")

    print('Proceso finalizado.')
