import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { defaultCopy } from "../../utils/dictionary";
import { withFirebase } from "../../services/Firebase";
import * as ROUTES from "../../utils/Routes";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import { useForm } from "../../services/Functions/useForm";
import rickAndMortyLogo from "../../assets/rickAndMortyLogo.png";

function LoginPage(props) {
  const { values, handleChange, handleSubmit } = useForm(login);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState({ code: "", message: "" });

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function login() {
    props.firebase
      .doSignInWithEmailAndPassword(values.email, values.password)
      .then(() => props.history.push(ROUTES.HOME))
      .catch(error => {
        setError(error);
        setIsModalOpen(true);
      });
  }

  return (
    <React.Fragment>
      <div className="d-flex justify-content-center p-1">
        <img src={rickAndMortyLogo} alt="" />
      </div>
      <div className="d-flex flex-column align-items-center">
        <h1>{defaultCopy.pages.loginPage.mainParagraph}</h1>
        <form align="center" onSubmit={handleSubmit}>
          <h1>{`${defaultCopy.pages.loginPage.emailLabel}:`}</h1>
          <input
            value={values.email}
            onChange={handleChange}
            type="email"
            name="email"
            placeholder={defaultCopy.pages.loginPage.emailPlaceholder}
            className="form__Input"
          />
          <br />
          <h1>{`${defaultCopy.pages.loginPage.passwordLabel}:`}</h1>
          <input
            value={values.password}
            onChange={handleChange}
            type="password"
            name="password"
            placeholder={defaultCopy.pages.loginPage.passwordPlaceholder}
            className="form__Input"
          />
          <div className="d-flex justify-content-center">
            <button className="btn btn-normal">{defaultCopy.pages.loginPage.loginButtonLabel}</button>
          </div>
        </form>
        <ErrorModal
          error={error}
          isOpen={isModalOpen}
          onClose={() => {
            handleCloseModal();
          }}
        />
      </div>
      <Link to={ROUTES.SIGNUP} className="d-flex justify-content-center mb-4">
      {defaultCopy.pages.loginPage.signupButtonLabel}
      </Link>
    </React.Fragment>
  );
}

export default withRouter(withFirebase(LoginPage));
