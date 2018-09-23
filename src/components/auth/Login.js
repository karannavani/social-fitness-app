import React from 'react';
import axios from 'axios';

//components
import FormInput from '../common/FormInput';

//DEPENDANCIES
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

export default class AuthLogin extends React.Component{
  state={
    passwordHidden: true
    // email: 'rnnsea001@gmail.com',
    // password: 'pass'
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/login', this.state)
      .then(res => {
        const token = res.data.token;
        Auth.setToken(token);
        Flash.setMessage('success', `Welcome back ${Auth.currentUsername()}` );
        this.props.history.push('/dashboard');
      })
      .catch(() =>{
        Flash.setMessage('danger', 'Invalid email/password');
        this.props.history.push(this.props.location.pathname);
      });
  }

  togglePasswordShow = () => {
    const passwordHidden = !this.state.passwordHidden;
    this.setState({ passwordHidden});
  }

  handleChange = ({ target: { name, value }}) => {
    this.setState({[name]: value});
  };

  render(){
    return(
      <section>
        <form onSubmit={ this.handleSubmit }>
          <div className="columns is-multiline">
            <div className="column is-5 is-offset-3">

              <h1 className="column page-title-small has-text-centered">Log into your account</h1>

              <div className="column">
                <FormInput
                  className="form-input"
                  name='email'
                  type='email'
                  state={ this.state }
                  handleChange={ this.handleChange }
                  placeholder='example@email.com'
                />
                <hr />
              </div>

              <div className="column">
                <FormInput
                  name='password'
                  type={this.state.passwordHidden ? 'password' : 'text'}
                  state={ this.state }
                  handleChange={ this.handleChange }
                  placeholder='Password'
                />
                <hr />
              </div>

              <div className="columns login-buttons">

                <button className="auth-button has-text-centered column is-rounded is-3 is-offset-1">Log in</button>

                <div className="column is-1 is-offset-1">
                  <a className="" onClick={ this.togglePasswordShow }>show</a>
                </div>

                <div className="auth-button column is-3 has-text-centered is-offset-2"><Link to='/'>Back</Link></div>
              </div>

            </div>
          </div>
        </form>
      </section>
    );
  }
}
