// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import { Provider } from "react-redux";
import { Store } from "./redux/store";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AboutPage from "./components/AboutPage";
import Container from "react-bootstrap/Container";
import SettingsPage from "./components/SettingsPage";
import Header from "./components/common/Header";

const App: React.FC = () => {
  return (
    <Router>
      <Container>
        <Header />
        <Provider store={Store.instance}>
          <Route path="/" exact component={HomePage} />
          <Route path="/settings/" component={SettingsPage} />
          <Route path="/about/" component={AboutPage} />
        </Provider>
      </Container>
    </Router>
  );
};

export default App;
