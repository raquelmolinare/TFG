import React from "react";
import { motion } from "framer-motion";

/**
 * Snackbar props
 */
export interface SnackbarInfo {
  /**
   * Title Message
   */
  titleMessage?: string;

  /**
   * Message
   */
  message: string;
}

export interface SnackbarProps extends SnackbarInfo {
  duration: number;
}

export function Snackbar({ titleMessage, message, duration }: SnackbarProps) {
  return (
    <div className="d-flex justify-content-center fixed-bottom ">
      <motion.div
        className={`alert snackbar px-4 m-2`}
        role="alert"
        animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 1] }}
        transition={{ duration: duration, times: [0, 0.05, 0.95, 1] }}
      >
        <h4>
          <span className="toast-title-message">{titleMessage}</span>
          <span className="toast-message">{message}</span>
        </h4>
      </motion.div>
    </div>
  );
}
