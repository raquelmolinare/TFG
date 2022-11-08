import React from "react";

interface MainProps {
  /**
   * children
   */
  children?: React.ReactNode;
}/*  */

export function Main({ children }: MainProps) {
  return (
    <div className="container-fluid main">
      <div className="row main align-content-center justify-content-center">
        {children}
      </div>
    </div>
  );
}
