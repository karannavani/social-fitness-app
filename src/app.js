import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bulma/css/bulma.css'; //Needs to change when Heroku-ing
import './scss/style.scss';

//Components
import Header from './components/Header';
import Footer from './components/Footer';

class App extends React.Component {
  render() {
    return(
      <main>
        <Header />
        <Footer />
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
