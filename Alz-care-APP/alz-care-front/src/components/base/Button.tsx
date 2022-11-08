import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  /**
   * className
   */
  className: string;

  /**
   * children
   */
  children?: string | React.ReactNode;

  /**
   * Left Icon
   */
  leftIcon?: string;

  /**
   * Right icon
   */
  rightIcon?: string;

  /**
   * Action performed when clicking
   */
  onClick?: () => void;
}

export function Button({
  className,
  children,
  leftIcon,
  rightIcon,
  onClick,
}: ButtonProps) {
  return (
    <motion.button
      className={className}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <i className={leftIcon + " mx-2"} />
      {children}
      <i className={rightIcon + " mx-2"} />
    </motion.button>
  );
}
