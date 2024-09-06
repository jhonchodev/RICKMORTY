import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../utils/Routes";
import { defaultCopy } from "../../utils/dictionary";
import "./PageNotFound.css";
import Emoji from "../../components/Emoji/Emoji";
import NotFoundImage from "../../assets/404.jpg";

function PageNotFound() {
  return (
    <div>
      <div className="PageNotFound col-11">
        <div className="PageNotFound__Text">
          <h1>
            {defaultCopy.pages.pageNotFound.mainTitle} <Emoji symbol={defaultCopy.pages.pageNotFound.symbol} />
          </h1>
          <br />
          <h2>{defaultCopy.pages.pageNotFound.subtitle}</h2>
        </div>
        <figure>
          <img
            className="PageNotFound__Image"
            src={NotFoundImage}
            alt="Página no encontrada"
          />
        </figure>
      </div>
      <div className="PageNotFound__Button">
        <Link to={ROUTES.HOME} className="btn btn-normal">
          &#60; {defaultCopy.tranvsersalButtons.backHomeButton.label}
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
