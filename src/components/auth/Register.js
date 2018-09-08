import React from 'react';
import axios from 'axios';

// Common components
import FormInput from '../common/FormInput';

// Libraries
import Auth from '../../lib/Auth';


export default class AuthRegister extends React.Component{
  state = {
    passwordHidden: true,
    errors: {}
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if(this.state.password !== this.state.passwordConfirmation) {
      const errors = this.state.errors;
      errors.passwordConfirmation = 'Password confirmation does not match password';
      return this.setState({ errors });
    }
    axios.post('/api/register', this.state)
      .then(res => {
        const token = res.data.token;
        Auth.setToken(token);
        this.props.history.push('/profile');
      })
      .catch(err => {
        const errors = {...this.state.errors, ...err.response.data.errors};
        this.setState({ errors });
      });
  }

  handleChange = (event) => {
    const { target: {name, value} } = event;
    const errors = this.state.errors;
    delete errors[name]; // remove the error for this field
    this.setState({[name]: value});
  }

  render() {
    return(
      <section className="container">
        <form onSubmit={ this.handleSubmit }>
          <div className="columns is-centered is-multiline">

            <div className="column is-one-third">
              <FormInput
                name='firstName'
                type='text'
                placeholder='first name'
                state={ this.state }
                handleChange={ this.handleChange }
              />
            </div>

            <div className="column is-one-third">
              <FormInput
                name='surname'
                type='text'
                placeholder='surname'
                state={ this.state }
                handleChange={ this.handleChange }
              />
            </div>


            <div className="column is-one-third">
              <FormInput
                name='username'
                type='username'
                placeholder='username'
                state={ this.state }
                handleChange={ this.handleChange }
              />
            </div>

            <div className="column is-full">
              <FormInput
                name='email'
                type='email'
                placeholder='email'
                state={ this.state }
                handleChange={ this.handleChange }
              />
            </div>

            <div className="column is-half">
              <FormInput
                name='password'
                type='password'
                placeholder='password'
                state={ this.state }
                handleChange={ this.handleChange }
              />
            </div>

            <div className="column is-half">
              <FormInput
                name='passwordConfirmation'
                type='passwordConfirmation'
                placeholder='password confirmation'
                state={ this.state }
                handleChange={ this.handleChange }
              />
            </div>


            <div className="column is-one-quarter">
              <FormInput
                name='age'
                type='number'
                placeholder='age'
                state={ this.state }
                handleChange={ this.handleChange }
              />
            </div>

            <div className="column is-one-quarter">
              <FormInput
                name='height'
                type='number'
                placeholder='height'
                state={ this.state }
                handleChange={ this.handleChange }
              />
            </div>

            <div className="column is-one-quarter">
              <FormInput
                name='weight'
                type='number'
                placeholder='weight'
                state={ this.state }
                handleChange={ this.handleChange }
              />
            </div>

            <div className="column is-one-quarter">
              <select name='tribe'
                state={ this.state }
                handleChange={ this.handleChange }>
                <option value='Gargantuans'>Gargantuans</option>
                <option value='Inbetweeners'>Inbetweeners</option>
                <option value='All Naturals'>All Naturals</option>
              </select>
            </div>

            <div className="column is-full">
              <FormInput
                name='imageUrl'
                type='text'
                placeholder='profile picture (url)'
                state={ this.state }
                handleChange={ this.handleChange }
              />
            </div>
            <button className="button">Register</button>
          </div>
        </form>
      </section>
    );
  }
}
