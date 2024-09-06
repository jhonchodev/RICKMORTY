import React from "react";

import "./CharacterCardDetails.css";
import { CHARACTER_STATUS, CHARACTER_GENDER} from "../../utils/appParameters";
import { defaultCopy } from "../../utils/dictionary";
import Emoji from "../Emoji/Emoji";

function characterStatus(status) {
  switch (status) {
    case CHARACTER_STATUS.alive.title:
      return CHARACTER_STATUS.alive.icon;
    case CHARACTER_STATUS.dead.title:
      return CHARACTER_STATUS.dead.icon;
    case CHARACTER_STATUS.unknown:
      return CHARACTER_STATUS.unknown.icon;
    default:
      return CHARACTER_STATUS.default.icon;
  }
}

function characterGender(gender) {
  switch (gender) {
    case CHARACTER_GENDER.male.gender:
      return CHARACTER_GENDER.male.icon;
    case CHARACTER_GENDER.female.gender:
      return CHARACTER_GENDER.female.icon;
    case CHARACTER_GENDER.genderless.gender:
      return CHARACTER_GENDER.genderless.icon;
    case CHARACTER_GENDER.default.gender:
      return CHARACTER_GENDER.default.icon;
    default:
      return "🤷‍♀️";
  }
}

function CharacterCard(props) {
  const character = props.data;
  const gender = character.gender;
  const status = character.status;
  return (
    <React.Fragment>
      <div className="characterCardDetails">
        <img
          src={character.image}
          className="characterCardDetails__Image"
          alt="Character"
        />
        <div className="row characterCardDetails__Row">
          <div className="col characterCardDetails__Info">
            <h4>{`${defaultCopy.components.characterCardDetail.name}:`}</h4>
            <p>{character.name}</p>
            <h4>{`${defaultCopy.components.characterCardDetail.specie}:`}</h4>
            <p>{character.species}</p>
            <h4>{`${defaultCopy.components.characterCardDetail.origin}:`}</h4>
            <p>{character.origin.name}</p>
          </div>
          <div className="col characterCardDetails__Info">
            <h4>{`${defaultCopy.components.characterCardDetail.status}:`}</h4>
            <p title={status}>
              <Emoji symbol={characterStatus(status)} />
            </p>
            <br />
            <h4>{`${defaultCopy.components.characterCardDetail.gender}:`}</h4>
            <p title={gender}>
              <Emoji symbol={characterGender(gender)} />
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CharacterCard;
