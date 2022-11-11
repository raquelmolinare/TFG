import React from "react";
import { motion } from "framer-motion";
import { ImgClassification } from "../../models/ImgClassification";

import "./ClassificationOverview.scss";
import { BrainPlaneClassificationCard } from "../brain-plane-classification-card/BrainPlaneClassificationCard";

interface ClassificationOverviewProps {
  /**
   * Classification List
   */
  classificationList: ImgClassification[];
}

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export function ClassificationOverview({
  classificationList,
}: ClassificationOverviewProps) {
  return (
    <div className="row justify-content-center align-content-center">
      <motion.div
        className="row justify-content-center g-5 mh-100"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {classificationList?.map((imageClassification, key) => {
          return (
            <motion.div
              className="col-auto d-flex align-self-stretch"
              key={key}
              variants={item}
            >
              <motion.div whileHover={{ scale: 1.05 }}>
                <BrainPlaneClassificationCard
                  classification={imageClassification}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
