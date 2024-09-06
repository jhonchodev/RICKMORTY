import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import "./AuthPages.css";
import { defaultCopy } from "../../utils/dictionary";
import { withFirebase } from "../../services/Firebase";
import * as ROUTES from "../../utils/Routes";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import { useForm } from "../../services/Functions/useForm";

function SignupPage(props) {
  const { values, handleChange, handleSubmit } = useForm(signup);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState({ code: "", message: "" });

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function signup() {
    const { email, password } = values;
    props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(() => props.history.push(ROUTES.HOME))
      .catch(error => {
        setError(error);
        setIsModalOpen(true);
      });
  }

  return (
    <React.Fragment>
      <div className="d-flex justify-content-center p-1">
        <h1>{defaultCopy.pages.singupPage.mainTitle}</h1>
      </div>
      <div className="d-flex justify-content-center">
        <form align="center" className="w-100" onSubmit={handleSubmit}>
          <h2>{`${defaultCopy.pages.singupPage.emailLabel}:`}</h2>
          <input
            value={values.email}
            onChange={handleChange}
            type="email"
            name="email"
            placeholder={defaultCopy.pages.loginPage.emailPlaceholder}
            className="form__Input"
            required
          />
          <br />
          <h2>{`${defaultCopy.pages.singupPage.passwordLabel}:`}</h2>
          <input
            value={values.password}
            onChange={handleChange}
            type="password"
            name="password"
            placeholder={defaultCopy.pages.loginPage.passwordPlaceholder}
            className="form__Input"
            required
          />
          <br />
          <h2>{`${defaultCopy.pages.singupPage.repeatPasswordLabel}:`}</h2>
          <input
            value={values.password2}
            onChange={handleChange}
            type="password"
            name="password2"
            placeholder={defaultCopy.pages.loginPage.passwordPlaceholder}
            className="form__Input"
            required
          />
          <div className="d-flex justify-content-center">
            <button className="btn btn-normal">{defaultCopy.pages.singupPage.signUpButtonLabel}</button>
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
    </React.Fragment>
  );
}

export default withRouter(withFirebase(SignupPage));
