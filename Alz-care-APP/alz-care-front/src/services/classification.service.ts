import axios from "axios";
import { ImgClassification } from "../models/ImgClassification";
import { ApiError } from "../models/ApiError";

const classification_url = "/image-classification/complete-classification";

async function brainNiftiFileClassification(
  file: any
): Promise<ImgClassification[] | ApiError> {
  return axios
    .post(`${classification_url}`, file)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      console.log(error);
      // Error handler
      return ApiError.load(error);
    });
}

export { brainNiftiFileClassification };
