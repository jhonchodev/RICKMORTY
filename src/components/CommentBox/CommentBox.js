import React, { useState } from "react";
import Emoji from "../Emoji/Emoji";
import { withFirebase } from "../../services/Firebase";
import { defaultCopy } from "../../utils/dictionary";
import "./CommentBox.css";

function CommentBox(props) {
  const [value, setValue] = useState("");
  const handleClick = () => {
    props.handleClick(value);
    setValue("")
  };
  const handleChange = event => {
    setValue(event.target.value);
  };

  if (props.comment) {
    return (
      <div className="comment">
        <p>{props.comment.message}</p>
      </div>
    );
  } else {
    return (
      <div className="comment">
        <h2>{`${defaultCopy.components.commentBox.action}:`} </h2>
        <div className="d-flex justify-content-center">
          <textarea
            onChange={handleChange}
            value={value}
            className="comment_Textarea"
            placeholder={defaultCopy.components.commentBox.placeholder}
            name="comment"
          />
        </div>
        <div className="d-flex justify-content-end">
          <button className="btn btn-success mt-2" onClick={handleClick}>
            <Emoji symbol={defaultCopy.components.commentBox.buttonIcon} />
            {defaultCopy.components.commentBox.buttonLabel}
          </button>
        </div>
      </div>
    );
  }
}

export default withFirebase(CommentBox);
