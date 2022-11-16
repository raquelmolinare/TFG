import React from "react";
import Logo from "../../assets/img/icon.png";
import Name from "../../assets/img/name.png";

interface PageHeadProps {
  /**
   * Fragment rendered in the buttons' section of the page head
   */
  buttons?: React.ReactNode;
}

export function Header({ buttons }: PageHeadProps) {
  return (
    <nav className="navbar navbar-light bg-light shadow sticky-top">
      <div className="col">
        <img id="logo" className="logo" src={Logo} alt="Alz Care Logo" />
        <img id="name" className="name" src={Name} alt="Alz Care Name" />
      </div>
      {buttons && <div>{buttons}</div>}
    </nav>
  );
}
