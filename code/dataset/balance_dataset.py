import os
import random
import shutil

def get(source):
    path_list = []

    for dir_name, dirs, files in os.walk(source):
        for file_name in files:
            # File path
            path = dir_name + '/' + file_name
            path_list.append(path)
    return path_list


def copy_images(path, new_path):
    shutil.copy(path, new_path)


if __name__ == '__main__':

    print('Comprobando...')

    val = 800

    SOURCE = ''
    DESTINATION = ''
    REST = ''

    nifti_paths = get(SOURCE)
    print(len(nifti_paths))

    random.shuffle(nifti_paths)

    nifti_paths_T = nifti_paths[:val]
    nifti_paths_R = nifti_paths[val:]
    print(len(nifti_paths_T))
    print(len(nifti_paths_R))

    for path in nifti_paths_T:
        subject = path.split("/")[4]
        nombre = path.split("/")[8]
        new_nombre = DESTINATION + '/' + subject + '/' + nombre

        if not os.path.exists(str(DESTINATION + '/' + subject)):
            os.makedirs(str(DESTINATION + '/' + subject))

        copy_images(path, new_nombre)

    for path in nifti_paths_R:
        subject = path.split("/")[4]
        nombre = path.split("/")[8]
        new_nombre = REST + '/' + nombre

        if not os.path.exists(str(REST + '/' + subject)):
            os.makedirs(str(REST + '/' + subject))

        copy_images(path, new_nombre)

    print('Proceso finalizado.')
