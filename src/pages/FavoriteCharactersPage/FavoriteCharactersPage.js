import React, { useState, useEffect } from "react";
import { defaultCopy } from "../../utils/dictionary";
import { withAuthorization } from "../../services/Firebase/Session";
import { withFirebase } from "../../services/Firebase";

import CharactersList from "../../components/CharactersList/CharactersList";
import Loader from "../../components/Loader/Loader";
import { API_ROUTES } from "../../utils/Routes";

import "../HomePage/HomePage.css";
import { useCallApiWithInterceptor } from "../../services/Functions/useCallApiInterceptor";

function getFavoriteCharactersUrl(charactersID) {
  let stringFavoritesCharactersId = "";
  charactersID.forEach(element => {
    stringFavoritesCharactersId = stringFavoritesCharactersId + element.toString() + ",";
  });
  return (`${API_ROUTES.CHARACTERS_ROUTE}${stringFavoritesCharactersId.substring(0, stringFavoritesCharactersId.length - 1)}`);
}

function useGetDatabase(firebase) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function get() {
      firebase
        .getFavoriteCharacters()
        .then(function(snapshot) {
          setCharacters(snapshot.val());
          setLoading(false);
        });
    }
    get();
  });
  return { characters, loading };
}

function FavoriteCharactersPage(props) {
  const { characters, loading } = useGetDatabase(props.firebase);
  const { loading: loadingApi, data, error } = useCallApiWithInterceptor(
    getFavoriteCharactersUrl(characters)
  );

  if (loadingApi || loading) {
    return (
      <div className="d-flex justify-content-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <h1>{`${defaultCopy.tranvsersalButtons.errorButton.label}:`} {error.message}</h1>;
  }

  return (
    <React.Fragment>
      <div className="homePage__Hero" />
      <div className="homePage__Title">
        <h1>
          {`${defaultCopy.pages.listOfCharacters.mainTitle}:`}
          <br />
          {defaultCopy.pages.listOfCharacters.favoritesSubtitle}
        </h1>
      </div>
      <div className="homePage__List">
        <CharactersList data={data} />
      </div>
    </React.Fragment>
  );
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(
  withFirebase(FavoriteCharactersPage)
);
