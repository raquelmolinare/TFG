import React from "react";
import Logo from "../../assets/img/logo.png";

interface PageHeadProps {
  /**
   * Title of the page
   */
  title?: string;

  /**
   * Fragment rendered in the buttons' section of the page head
   */
  buttons?: React.ReactNode;
}

export function Header({ title, buttons }: PageHeadProps) {
  return (
    <nav className="navbar navbar-light bg-light shadow sticky-top">
      <span>
        <img id="logo" className="logo" src={Logo} alt="Alz Care logo" />
        {title && <span className="app-title"> {title} </span>}
      </span>
      {buttons && <div>{buttons}</div>}
    </nav>
  );
}
