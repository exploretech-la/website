import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import GA from 'util/GoogleAnalytics';

import Header from 'components/common/Header';
import Home from 'components/Home';
import Register from 'components/Registration/Register';
import PageNotFound from 'components/PageNotFound';

import LiabilityWaiver from 'static/waivers/exploretech.la 2021 Liability Waiver.pdf';
import MultimediaRelease from 'static/waivers/exploretech.la 2021 Multimedia Release Form.pdf';
import StudentVerification from 'static/waivers/exploretech.la 2021 Student Verification Form.pdf';

import './App.scss';

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
        <Header/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
