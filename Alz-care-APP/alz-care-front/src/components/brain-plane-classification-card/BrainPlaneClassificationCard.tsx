import React from "react";

import { BrainPlanes, ImgClassification } from "../../models/ImgClassification";
import { Card } from "../base/Card";
import { BrainPlaneIcon } from "../brain-plane-icon/BrainPlaneIcon";
import { ClassificationPercentages } from "../classification-percentages/ClassificationPercentages";

interface BrainPlaneClassificationCardProps {
  classification: ImgClassification;
}

export function BrainPlaneClassificationCard({
  classification,
}: BrainPlaneClassificationCardProps) {

  const plane = () => {
    switch (classification.plane) {
      case BrainPlanes.AXIAL:
        return "AXIAL";
      case BrainPlanes.CORONAL:
        return "CORONAL";
      case BrainPlanes.SAGITTAL:
        return "SAGITAL";
      default:
        return "";
    }
  };

  return (
    <Card
      title={plane()}
      iconTitle={<BrainPlaneIcon plane={classification.plane} />}
      body={
        classification.img && (
          <img className="img-brain-plane" src={classification.img} alt="" />
        )
      }
      bottom={
        <ClassificationPercentages prediction={classification.prediction} />
      }
    />
  );
}
