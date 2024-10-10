import React, { useState } from "react";
import "./HomePage.css";
import { defaultCopy } from "../../utils/dictionary";
import CharactersList from "../../components/CharactersList/CharactersList";
import MiniLoader from "../../components/MiniLoader/MiniLoader";
import Loader from "../../components/Loader/Loader";
import { useCallApi } from "../../services/Functions/useCallApi";
import { API_ROUTES } from "../../utils/Routes";

let responseDataArray = [];

function HomePage() {
  let data = { information: {}, results: [] };
  const [nextPage, setNextPage] = useState(1);

  const response = useCallApi(
    `${API_ROUTES.CHARACTERS_ROUTE}?page=${nextPage}`,
    responseDataArray
  );

  const loading = response.loading;
  
  data = {
    information: response.data.info,
    results: [].concat(data.results, response.data.results)
  };

  const error = response.error;
  responseDataArray = data.results;

  if (loading && nextPage === 1) {
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
          {defaultCopy.pages.listOfCharacters.homeSubtitle}
        </h1>
      </div>
      {!loading && (
        <div className="d-flex justify-content-between homePage__Buttons">
          <button
            style={{ visibility: data.information.prev ? "visible" : "hidden" }}
            className="btn btn-normal"
            onClick={() => setNextPage(nextPage - 1)}
          >
            &#60; {defaultCopy.tranvsersalButtons.previousButton.label}
          </button>
          <button
            style={{ visibility: data.information.next ? "visible" : "hidden" }}
            className="btn btn-normal"
            onClick={() => setNextPage(nextPage + 1)}
          >
            {defaultCopy.tranvsersalButtons.nextButton.label} &#62;
          </button>
        </div>
      )}
      <div className="homePage__List">
        <CharactersList data={data.results} />
      </div>
      {loading && (
        <div className="d-flex justify-content-center">
          <MiniLoader />
        </div>
      )}
    </React.Fragment>
  );
}

export default HomePage;
