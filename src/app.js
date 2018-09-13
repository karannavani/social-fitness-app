import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bulma/css/bulma.css'; //Needs to change when Heroku-ing
import './scss/style.scss';

//COMPONENTS
//partials
import Home from './components/Home';
import Header from './components/Header';

// import Footer from './components/Footer';
import FlashMessages from './components/common/FlashMessages';
import SecureRoute from './components/common/SecureRoute';

//Auth
import AuthLogin from './components/auth/Login';
import AuthRegister from './components/auth/Register';

//dash - tribe
import Dashboard from './components/dashboard/Dashboard.js';
import Tribe from './components/tribe/Tribe';
import TribesIndex from './components/tribe/Index';

//user
import UserShow from './components/profile/Show';
import UserEdit from './components/profile/Edit';

//exercise
import ExercisePlanShow from './components/exercisePlans/Show';
import ExercisePlanNew from './components/exercisePlans/New';

class App extends React.Component {
  render() {
    return(
      <main>
        <Header />
        <FlashMessages />
        {/* <Tribe /> */}
        <Switch>
          {/* Auth and home */}
          <Route exact path='/' component={Home} />
          <Route path='/login' component={AuthLogin} />
          <Route path='/register' component={AuthRegister} />

          <Route exact path='/tribe' component={TribesIndex} />
          <SecureRoute path='/tribe/:tribeName' component={Tribe} />

          {/* user */}
          {/* <HashRouter exact path='/profile/:id#history' component={UserShow} /> */}
          <SecureRoute path='/profile/:id' component={UserShow} />
          <SecureRoute path='/users/:id/edit' component={UserEdit} />

          {/* exercisePlans */}
          <SecureRoute path='/exerciseplan/new' component={ExercisePlanNew} />
          <SecureRoute path='/exerciseplan/:id' component={ExercisePlanShow} />

          <SecureRoute path='/dashboard' component={Dashboard} />
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
