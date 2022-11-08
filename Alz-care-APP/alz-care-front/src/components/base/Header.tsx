import React from "react";
import Logo from "../../assets/img/logo.png";

interface PageHeadProps {

  /**
   * Fragment rendered in the buttons' section of the page head
   */
  buttons?: React.ReactNode;
}

export function Header({buttons }: PageHeadProps) {
  return (
    <nav className="navbar navbar-light bg-light shadow sticky-top">
      <span>
        <img id="logo" className="logo" src={Logo} alt="Alz Care logo" />
        <span className="app-title"> Alz Care </span>
      </span>
      {buttons && <div>{buttons}</div>}
    </nav>
  );
}
