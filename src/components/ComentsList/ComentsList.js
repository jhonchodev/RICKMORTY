import React from "react";

import CommentBox from "../CommentBox/CommentBox";

function CommentsList(props) {
  if (Array.isArray(props.data)) {
    return (
      <ul className="list-unstyled">
        {props.data.map(comment => (
          <li key={comment.id}>
            <CommentBox comment={comment} characterId={props.characterId} />
          </li>
        ))}
      </ul>
    );
  } else {
    return (
      <ul className="list-unstyled">
        <li key={props.data.id}>
          <CommentBox comment={props.data} characterId={props.characterId} />
        </li>
      </ul>
    );
  }
}

export default CommentsList;
