import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bulma/css/bulma.css'; //Needs to change when Heroku-ing
import './scss/style.scss';

//Components
import Header from './components/Header';
import Dashboard from './components/dashboard/Dashboard.js';
import Tribe from './components/tribe/Tribe';
// import Footer from './components/Footer';

import UserShow from './components/profile/Show';
import UserEdit from './components/profile/Edit';

class App extends React.Component {
  render() {
    return(
      <main>
        <Header />
        {/* <Tribe /> */}
        {/* <Switch>
        </Switch> */}
        <Switch>
          <Route path='/tribe/:tribeName' component={Tribe} />

          {/* user */}
          <Route exact path='/profile' component={UserShow} />
          <Route path='/profile/:id' component={UserShow} />
          <Route path='/users/:id/edit' component={UserEdit} />

          <Route path='/dashboard' component={Dashboard} />
        </Switch>
        {/* <Footer /> */}
      </main>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
