import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../utils/Routes";
import { defaultCopy } from "../../utils/dictionary";
import "./CharacterDetailsPage.css";
import Emoji from "../../components/Emoji/Emoji";
import CharacterCardDetails from "../../components/CharacterCardDetails/CharacterCardDetails";
import CommentsList from "../../components/ComentsList/ComentsList";
import CommentBox from "../../components/CommentBox/CommentBox";
import Loader from "../../components/Loader/Loader";
import { useCallApi } from "../../services/Functions/useCallApi";
import { withFirebase } from "../../services/Firebase";
import { doStructuratedJson } from "../../utils/index";

function useGetDatabase(firebase, characterId) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function get() {
      firebase.getComments(characterId).on("value", function (snapshot) {
        setComments(doStructuratedJson(snapshot.val()));
        // console.log(snapshot.val());
        setLoading(false);
      });
    }
    get();
  });
  return { comments, loading };
}

function CharacterDetailsPage(props) {
  const { loading: loadingApi, data, error } = useCallApi(
    `${ROUTES.API_ROUTES.CHARACTERS_ROUTE}${props.match.params.characterId}`
  );
  const { comments, loading } = useGetDatabase(
    props.firebase,
    props.match.params.characterId
  );

  if (loadingApi || loading) {
    return (
      <div className="d-flex justify-content-center">
        <Loader />
      </div>
    );
  }
  if (error != null) {
    return <h1>{`${defaultCopy.tranvsersalButtons.errorButton.label}:`} {error.message}</h1>;
  }

  const handleClick = () => {
    props.firebase.setNewCharacter(props.match.params.characterId);
  };

  const sendNewComment = (commentToSave) => {
    props.firebase.setNewComment(props.match.params.characterId, commentToSave);
  }

  return (
    <React.Fragment>
      <div className="d-flex justify-content-center">
        <CharacterCardDetails data={data} />
      </div>
      <div className="row">
        <div className="col-8 characterCardDetails__Container" />
        <div className="col-4 characterCardDetails__Container">
          <Link to={ROUTES.HOME} className="btn btn-normal">
            &#60; {defaultCopy.tranvsersalButtons.backButton.label}
          </Link>
          <button className="btn btn-special" onClick={handleClick}>
            <Emoji symbol={defaultCopy.pages.characterDetailsPage.symbol} />
            {defaultCopy.pages.characterDetailsPage.favoritesButtonLabel}
          </button>
        </div>
      </div>
      {comments != null && (
        <div className="d-flex justify-content-center">
          <CommentsList
            data={comments}
            characterId={props.match.params.characterId}
          />
        </div>
      )}
      <div className="d-flex justify-content-center">
        <CommentBox characterId={props.match.params.characterId} handleClick={sendNewComment}/>
      </div>
    </React.Fragment>
  );
}

export default withFirebase(CharacterDetailsPage);
