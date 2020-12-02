import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Header from './Header/Header';
import Lobby from './Lobby/Lobby';
import Gameplay from './Gameplay/Gameplay';
import Landing from './Landing/Landing';
import Results from './Results/Results';
import Modal from './Modal/Modal';

import RefreshRoute from './RefreshRoute/RefreshRoute';

const App = () => {
  return (
    <>
      <HashRouter>
        <Header />
        <>
          <Switch>
            <Route path="/" exact component={Landing} />
            <RefreshRoute path="/game/lobby" component={Lobby} />
            <RefreshRoute path="/game/gameplay" component={Gameplay} />
            <RefreshRoute path="/game/results" component={Results} />
            <RefreshRoute path="/game/leaveroom" component={Modal} />
          </Switch>
        </>
      </HashRouter>
    </>
  );
};

export default App;
