import matplotlib.pyplot as plt
import nibabel as nib

NIFTI_PATH = ''


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


if __name__ == '__main__':
    img = load_nifti_img(NIFTI_PATH)

    print(img.shape)
    middle_slice_c = get_middle_coronal_slide(img)
    middle_slice_a = get_middle_axial_slide(img)
    middle_slice_s = get_middle_sagittal_slide(img)

    plot_nifti_coronal_img(img, middle_slice_c)
    plot_nifti_axial_img(img, middle_slice_a)
    plot_nifti_coronal_img(img, middle_slice_s)
