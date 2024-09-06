import React from "react";

import { withAuthentication } from "./services/Firebase/Session";
import * as ROUTES from "./utils/Routes";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CharacterDetailsPage from "./pages/CharacterDetailsPage/CharacterDetailsPage";
import FavoriteCharactersPage from "./pages/FavoriteCharactersPage/FavoriteCharactersPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Navbar from "./components/NavBar/NavBar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route
          exact
          path="/CharacterCard/:characterId"
          component={CharacterDetailsPage}
        />
        <Route
          exact
          path={ROUTES.FAVORITES}
          component={FavoriteCharactersPage}
        />
        <Route exact path={ROUTES.LOGIN} component={LoginPage} />
        <Route exact path={ROUTES.SIGNUP} component={SignupPage} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default withAuthentication(App);
