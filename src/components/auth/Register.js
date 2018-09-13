import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Chance from 'chance';
const chance = new Chance();

// Common components
import FormInput from '../common/FormInput';

// Libraries
import Auth from '../../lib/Auth';
import Id from '../../lib/Id';
import Request from '../../lib/Request';

export default class AuthRegister extends React.Component{
  state = {
    passwordHidden: true,
    errors: {},
    email: chance.email(),
    password: 'pass',
    passwordConfirmation: 'pass',
    tribe: 'Inbetweeners',
    weight: 60,
    height: 160,
    firstName: 'Kristi',
    surname: 'Sayer',
    username: 'Mooapples',
    age: 28,
    dailyGrit: [{
      date: moment().unix(),
      grit: 100
    }]
  }

  componentDidMount(){
    const newUserId = Id.create();
    const registerFeedUpdateBody = {
      type: 'register',
      user: newUserId
    };

    this.setState({_id: newUserId, registerFeedUpdateBody: registerFeedUpdateBody});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if(this.state.password !== this.state.passwordConfirmation) {
      const errors = this.state.errors;
      errors.passwordConfirmation = 'Password confirmation does not match password';
      return this.setState({ errors });
    }

    Request.updateFeed( this.state.registerFeedUpdateBody );

    axios.post('/api/register', this.state)
      .then(res => {
        const token = res.data.token;
        Auth.setToken(token);
        this.props.history.push(`/tribe/${this.state.tribe}`);
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
          <div className="columns is-multiline">

            <h1 className="column is-12 page-title-large">Set up your Tribe account</h1>

            <div className="column is-one-third">
              <FormInput
                name='firstName'
                type='text'
                placeholder='first name'
                state={ this.state }
                handleChange={ this.handleChange }
              />
              <hr />
            </div>

            <div className="column is-one-third">
              <FormInput
                name='surname'
                type='text'
                placeholder='surname'
                state={ this.state }
                handleChange={ this.handleChange }
              />
              <hr />
            </div>


            <div className="column is-one-third">
              <FormInput
                name='username'
                type='username'
                placeholder='username'
                state={ this.state }
                handleChange={ this.handleChange }
              />
              <hr />
            </div>

            <div className="column is-full">
              <FormInput
                name='email'
                type='email'
                placeholder='email'
                state={ this.state }
                handleChange={ this.handleChange }
              />
              <hr />
            </div>

            <div className="column is-half">
              <FormInput
                name='password'
                type='password'
                placeholder='password'
                state={ this.state }
                handleChange={ this.handleChange }
              />
              <hr />
            </div>

            <div className="column is-half">
              <FormInput
                name='passwordConfirmation'
                type='password'
                placeholder='password confirmation'
                state={ this.state }
                handleChange={ this.handleChange }
              />
              <hr />
            </div>


            <div className="column is-one-quarter">
              <FormInput
                name='age'
                type='number'
                placeholder='age'
                state={ this.state }
                handleChange={ this.handleChange }
              />
              <hr />
            </div>

            <div className="column is-one-quarter">
              <FormInput
                name='height'
                type='number'
                placeholder='height'
                state={ this.state }
                handleChange={ this.handleChange }
              />
              <hr />
            </div>

            <div className="column is-one-quarter">
              <FormInput
                name='weight'
                type='number'
                placeholder='weight'
                state={ this.state }
                handleChange={ this.handleChange }
              />
              <hr />
            </div>

            <div className="column is-one-quarter">
              <select name='tribe'
                state={ this.state }
                onChange={ this.handleChange }
                defaultValue = {this.state.tribe}>
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
              <hr />
            </div>
            <button className="button column is-info is-rounded is-3 is-offset-2">Register</button>

            <div className="level">
              <p className="white-title">Already got an account?</p><Link to='/login' className="column">Log in</Link>
            </div>

          </div>
        </form>
      </section>
    );
  }
}
