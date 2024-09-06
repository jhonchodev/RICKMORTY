import React from "react";
import { defaultCopy } from "../../utils/dictionary";
import { withFirebase } from "../../services/Firebase";

function LogoutButton(props) {
  return <button className="btn btn-normal" onClick={props.firebase.doSignOut}>
    {defaultCopy.components.logoutButton.buttonLabel}
  </button>;
}

export default withFirebase(LogoutButton);