import React from "react";
import { Link } from "react-router-dom";
import { defaultCopy } from "../../utils/dictionary";
import { AuthUserContext } from "../../services/Firebase/Session";
import * as ROUTES from "../../utils/Routes";

import LogoutButton from "../LogOutButton/LogOutButton";

import "./NavBar.css";

function Navbar() {
  return (
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <AuthNavbar /> : <NonAuthNavbar />)}
    </AuthUserContext.Consumer>
  );
}

const AuthNavbar = () => (
  <div className="NavBar">
    <Link to={ROUTES.HOME} className="NavBar__ref">
      {defaultCopy.components.navBar.home}
    </Link>
    <Link to={ROUTES.FAVORITES} className="NavBar__ref">
      {defaultCopy.components.navBar.favorites}
    </Link>
    <LogoutButton />
  </div>
);

const NonAuthNavbar = () => (
  <div className="NavBar">
    <Link to={ROUTES.HOME} className="NavBar__ref">
      {defaultCopy.components.navBar.home}
    </Link>
    <Link to={ROUTES.FAVORITES} className="NavBar__ref">
      {defaultCopy.components.navBar.favorites}
    </Link>
    <Link to={ROUTES.LOGIN} className="NavBar__ref font-weight-bold">
      {defaultCopy.components.navBar.login}
    </Link>
  </div>
);

export default Navbar;
