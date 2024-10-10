import React from "react";
import "./HomePage.css";
import { defaultCopy } from "../../utils/dictionary";
import CharactersList from "../../components/CharactersList/CharactersList";
import MiniLoader from "../../components/MiniLoader/MiniLoader";
import Loader from "../../components/Loader/Loader";

function NewHomePage() {
    // Utiliza el recurso correspondiente
    
    if (loading && nextPage === 1) {
        return (
            <div className="d-flex justify-content-center">
                <Loader />
            </div>
        );
    }

    if (error) {
        return <h1>{`${defaultCopy.tranvsersalButtons.errorButton.label}:`} {error}</h1>;
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
                        style={{ visibility: nextPage > 1 ? "visible" : "hidden" }}
                        className="btn btn-normal"
                        onClick={() => setNextPage(nextPage - 1)}
                    >
                        &#60; {defaultCopy.tranvsersalButtons.previousButton.label}
                    </button>
                    <button
                        style={{ visibility: "visible" }}
                        className="btn btn-normal"
                        onClick={() => setNextPage(nextPage + 1)}
                    >
                        {defaultCopy.tranvsersalButtons.nextButton.label} &#62;
                    </button>
                </div>
            )}
            <div className="homePage__List">
                <CharactersList data={characters} />
            </div>
            {loading && (
                <div className="d-flex justify-content-center">
                    <MiniLoader />
                </div>
            )}
        </React.Fragment>
    );
}

export default NewHomePage;
