import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import NavBar from "./components/ui/navBar";
import Login from "./layout/login";
import Users from "./layout/users";
import Main from "./layout/main";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQuality";
import AuthProvider from "./hooks/useAuth";

// import Users from "./components/users";

const App = () => {
  return (
    <main className="container">
      <AuthProvider>
        <NavBar />
        <QualityProvider>
          <ProfessionProvider>
            <Switch>
              <Route path="/users/:userId?/:edit?" component={Users} />
              <Route path="/login/:type?" component={Login} />
              <Route path="/" exact component={Main} />
              <Redirect to="/" />
            </Switch>
          </ProfessionProvider>
        </QualityProvider>
      </AuthProvider>
      <ToastContainer />
    </main>
  );
};

export default App;
