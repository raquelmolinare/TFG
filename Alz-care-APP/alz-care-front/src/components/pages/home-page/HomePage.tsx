import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../base/Header";
import { Button } from "../../base/Button";
import { Main } from "../../base/Main";
import { motion } from "framer-motion";

import LandingPageAvatar from "../../../assets/img/landing-page.png";

import "./HomePage.scss";

export function HomePage() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/", { replace: true });
  };

  const goToClassificationPage = () => {
    navigate("/classify", { replace: true });
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
        <div className="row overflow-hidden align-items-center main">
          <motion.div
            className="col d-flex justify-content-end p-4"
            initial={{ x: "-100%", opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ stiffness: 200, duration: 1.5 }}
          >
            <div>
              <div className="row app-info-text m-4">
                <h1>Detección de Alzheimer</h1>
                <h2>
                  Obtén una clasificación del deterioro cognitivo y demencia
                  presente en una resonancia magnética
                </h2>
                <div className="col d-flex justify-content-start">
                  <Button
                    className="btn btn-primary text-white m-2"
                    onClick={goToClassificationPage}
                  >
                    Clasificar
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="col d-flex justify-content-center p-4"
            initial={{ x: "100%", opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ stiffness: 200, duration: 1.5 }}
          >
            <img
              className="avatar p-4 "
              src={LandingPageAvatar}
              alt="Landing Page Avatar"
            />
          </motion.div>
        </div>
      </Main>
    </>
  );
}
