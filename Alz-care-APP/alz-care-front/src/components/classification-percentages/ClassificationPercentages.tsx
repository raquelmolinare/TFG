import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./ClassificationPercentages.scss";

import {
  AlzheimerGroupsCode,
  AlzheimerGroupsIndex,
  Prediction,
} from "../../models/ImgClassification";

const buildStylesCN = buildStyles({
  backgroundColor: "#fff",
  textColor: "#3c7682",
  pathColor: "#3c7682",
  trailColor: "transparent",
  textSize: "18px",
});

const buildStylesMCI = buildStyles({
  backgroundColor: "#bbe0dd",
  textColor: "#3c7682",
  pathColor: "#3c7682",
  trailColor: "transparent",
  textSize: "18px",
});

const buildStylesAD = buildStyles({
  backgroundColor: "#3c7682",
  textColor: "#fff",
  pathColor: "#fff",
  trailColor: "transparent",
  textSize: "18px",
});

interface ClassificationPercentagesProps {
  prediction: Prediction;
}

export function ClassificationPercentages({
  prediction,
}: ClassificationPercentagesProps) {
  const [percentageCN, setPercentageCN] = useState<number | undefined>(
    undefined
  );
  const [percentageMCI, setPercentageMCI] = useState<number | undefined>(
    undefined
  );
  const [percentageAD, setPercentageAD] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (prediction.score.length >= 3) {
      setPercentageCN(
        Math.floor(prediction.score[AlzheimerGroupsIndex.CN] * 100 * 100) / 100
      );
      setPercentageMCI(
        Math.floor(prediction.score[AlzheimerGroupsIndex.MCI] * 100 * 100) / 100
      );
      setPercentageAD(
        Math.floor(prediction.score[AlzheimerGroupsIndex.AD] * 100 * 100) / 100
      );
    }
  }, []);

  return (
    <>
      {percentageCN && (
        <div className="card px-sm-4 p-2 m-2">
          <div className="row align-self-center ">
            <div className="col col-4">
              <div className="progress-container-CN">
                <CircularProgressbar
                  value={percentageCN}
                  text={`${percentageCN}%`}
                  background
                  backgroundPadding={6}
                  styles={buildStylesCN}
                />
              </div>
            </div>
            <div className="col col-8 align-self-center text-start">
              <span>{AlzheimerGroupsCode.CN}</span>
            </div>
          </div>
        </div>
      )}
      {percentageMCI && (
        <div className="card px-sm-4 p-2 m-2">
          <div className="row align-self-center ">
            <div className="col col-8 align-self-center text-start">
              <span>{AlzheimerGroupsCode.MCI}</span>
            </div>
            <div className="col col-4">
              <div className="progress-container">
                <CircularProgressbar
                  value={percentageMCI}
                  text={`${percentageMCI}%`}
                  background
                  backgroundPadding={6}
                  styles={buildStylesMCI}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {percentageAD && (
        <div className="card px-sm-4 p-2 m-2">
          <div className="row align-self-center">
            <div className="col col-4">
              <div className="progress-container">
                <CircularProgressbar
                  value={percentageAD}
                  text={`${percentageAD}%`}
                  background
                  backgroundPadding={6}
                  styles={buildStylesAD}
                />
              </div>
            </div>
            <div className="col col-8 align-self-center text-start">
              <span>{AlzheimerGroupsCode.AD}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
