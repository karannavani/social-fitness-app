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

//Auth
import AuthLogin from './components/auth/Login';
import AuthRegister from './components/auth/Register';

//dash - tribe
import Dashboard from './components/dashboard/Dashboard.js';
import Tribe from './components/tribe/Tribe';

//user
import UserShow from './components/profile/Show';
import UserEdit from './components/profile/Edit';

//exercise
import ExercisePlanShow from './components/exercisePlans/Show';

class App extends React.Component {
  render() {
    return(
      <main>
        <Header />
        <FlashMessages />
        {/* <Tribe /> */}
        {/* <Switch>
        </Switch> */}
        <Switch>

          <Route exact path='/' component={Home} />
          <Route path='/login' component={AuthLogin} />
          <Route path='/register' component={AuthRegister} />

          <Route path='/tribe/:tribeName' component={Tribe} />

          {/* user */}
          <Route path='/profile/:id' component={UserShow} />
          <Route path='/users/:id/edit' component={UserEdit} />

          {/* exercisePlans */}
          <Route path='/exerciseplan/:id' component={ExercisePlanShow} />

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
