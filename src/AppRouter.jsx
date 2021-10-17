import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from './components/home/Home';
import Timeline from './components/timeline/Timeline';
import GroupsInTheCoup from './components/groups-in-the-coup/GroupsInTheCoup';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/history">
          <Timeline type="HISTORY" />
        </Route>
        <Route exact path="/groups-in-the-coup" component={GroupsInTheCoup} />
        <Route exact path="/coup">
          <Timeline type="COUP" />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
