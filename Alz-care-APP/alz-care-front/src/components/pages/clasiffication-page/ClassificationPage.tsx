import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../base/Header";
import { Button } from "../../base/Button";
import { Main } from "../../base/Main";
import { motion } from "framer-motion";
import * as ClassificationService from "../../../services/classification.service";
import { ClassificationOverview } from "../../classification-overview/ClassificationOverview";
import { ImgClassification } from "../../../models/ImgClassification";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { ApiError } from "../../../models/ApiError";
import { Loading } from "../../base/Loading";

import "./ClassificationPage.scss";

export function ClassificationPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [selectedFileNifti, setSelectedFileNifti] = useState();

  const [classification, setClassification] = useState<
    ImgClassification[] | undefined
  >();
  const { showSnackbar } = useSnackbar();

  const [imagePath, setImagePath] = useState<string | undefined>(undefined);

  const goToHome = () => {
    navigate("/", { replace: true });
  };

  const goToClassificationPage = () => {
    navigate("/classify", { replace: true });
  };

  const onChangeHandler = (event: any) => {
    setClassification(undefined);
    setSelectedFileNifti(event.target.files[0]);
  };

  const onClickHandler = (event: any) => {
    setClassification(undefined);
    if (selectedFileNifti) {
      const formData = new FormData();
      formData.append("file", selectedFileNifti);
      classify(formData);
    }
  };

  async function classifyRequest(
    formData: FormData
  ): Promise<ImgClassification[] | void> {
    setLoading(true);
    const response = await ClassificationService.brainNiftiFileClassification(
      formData
    );
    if (response instanceof ApiError) {
      setLoading(false);
      showError(response.message);
      throw new Error(response.errorCode.toString());
      return;
    }
    return response;
  }

  const classify = async (formData: FormData) => {
    const classificationPromise = classifyRequest(formData);

    const [classificationResponse] = await Promise.all([classificationPromise]);

    if (classificationResponse) {
      // Update state
      classificationResponse.forEach((element) => {
        element.img = "data:image/png;base64," + element.img;
      });
      setClassification(classificationResponse);
      // setImagePath("data:image/png;base64," + classificationResponse.img);
    }
    setLoading(false);
  };

  /**
   * Show  corresponding message
   * @param errorMessage error message
   */
  const showError = (errorMessage: string) => {
    showSnackbar({
      titleMessage: "ERROR: ",
      message: errorMessage,
    });
  };

  return (
    <>
      <Header
        buttons={
          <>
            <Button
              className="btn btn-light mx-2"
              onClick={goToClassificationPage}
            >
              Clasificar
            </Button>
            <Button className="btn btn-dark mx-2" onClick={goToHome}>
              <i className="bi bi-house-door-fill" />
            </Button>
          </>
        }
      />
      <Main>
        <div className="container">
          <div className="row align-self-start justify-content-center align-items-center pt-2 w-100">
            <div className="row justify-content-center align-items-center select-container">
              <div className="col  col-lg-4 align-self-center justify-content-center">
                <input
                  type="file"
                  className="form-control"
                  id="customFile"
                  onChange={onChangeHandler}
                />
              </div>
              <motion.button
                className="btn btn-outline-dark m-2 rounded-5"
                type="submit"
                onClick={onClickHandler}
                disabled={!selectedFileNifti}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Obtener
              </motion.button>
            </div>
          </div>
          <div className="row text-center h-75">
            {!classification && !loading ? (
              <h1 className="align-self-center no-selection">
                <i className="bi bi-diagram-3"></i>
              </h1>
            ) : (
              <>
                {loading ? (
                  <Loading />
                ) : (
                  <>
                    {classification && (
                      <ClassificationOverview
                        classificationList={classification}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </Main>
    </>
  );
}
