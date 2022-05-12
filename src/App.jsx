import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import GA from "util/GoogleAnalytics";

import Header from "components/common/Header";
import Home from "components/Home";
import Register from "components/Registration/Register";
import Resources from "components/Resources/Resources";
import Team from "components/Team/Team";
import PageNotFound from "components/PageNotFound";

import "./App.scss";

class App extends Component {
  componentDidMount() {
    const isGAEnabled = GA.init();
    if (isGAEnabled) {
      GA.trackPageView();
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          {/* <Route exact path="/exploretechla2021" component={Register} /> */}
          <Route exact path="/resources" component={Resources} />
          <Route exact path="/our_team" component={Team} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
