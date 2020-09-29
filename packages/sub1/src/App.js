import React from 'react';
import { jss, JssProvider, ThemeProvider } from 'react-jss';
import { initStore } from 'sub1/redux/store';
import reducers from 'sub1/redux/reducers';
import { Provider } from 'react-redux';
import { Pages } from './pages';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

require('./lib/css/base.css');

const store = initStore(reducers, 'Sub1 module');

class AppUI extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Market Module - Sentifi Intelligence</title>
        </Helmet>
        <div>
          <Pages />
        </div>
      </div>
    );
  }
}

const theme = {
  headerHeight: 126,
};

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <JssProvider jss={jss}>
          <ThemeProvider theme={theme}>
            <Router>
              <Route exact path="/" render={() => <Redirect to="/homepage" />} />
              <Route path="/:page" component={AppUI} />
            </Router>
          </ThemeProvider>
        </JssProvider>
      </Provider>
    );
  }
}

export default App;
