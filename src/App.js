import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import NavBar from "./components/ui/navBar";
import Login from "./layout/login";
import Users from "./layout/users";
import Main from "./layout/main";

// import Users from "./components/users";

const App = () => {
  return (
    <main className="container">
      <NavBar />
      <Switch>
        <Route path="/users/:userId?/" component={Users} />
        <Route path="/login/:type?" component={Login} />
        <Route path="/" exact component={Main} />
        <Redirect to="/" />
      </Switch>
    </main>
  );
};

export default App;
