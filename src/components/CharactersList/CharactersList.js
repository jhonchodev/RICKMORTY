import React from "react";

import CharacterCard from "../CharacterCard/CharacterCard";

function CharacterList(props) {
  if (Array.isArray(props.data)) {
    return (
      <ul className="row">
        {props.data.map(character => (
          <li className="col-6 col-md-4" key={character.id}>
            <CharacterCard character={character} />
          </li>
        ))}
      </ul>
    );
  } else {
    return (
      <ul className="row">
        <li className="col-6 col-md-4" key={props.data.id}>
          <CharacterCard character={props.data} />
        </li>
      </ul>
    );
  }
}

export default CharacterList;
