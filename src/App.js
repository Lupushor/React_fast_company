import React from "react";
import { Route, Switch } from "react-router-dom";

import NavBar from "./components/navBar";
import Login from "./layout/login";
import Users from "./layout/users";
import Main from "./layout/main";

// import Users from "./components/users";

const App = () => {
  return (
    <div>
      <NavBar />
      <h1>App</h1>
      <Switch>
        <Route path="/users/:userId?/" component={Users} />
        <Route path="/login" component={Login} />

        <Route path="/" exact component={Main} />
      </Switch>
    </div>
  );
};

export default App;
