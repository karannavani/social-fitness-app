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
    passwordHidden: true,
    email: 'rnnsea001@gmail.com',
    password: 'pass'
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/login', this.state)
      .then(res => {
        console.log('login response is', res.data);
        const token = res.data.token;
        Auth.setToken(token);
        Flash.setMessage('success', res.data.messages );
        this.props.history.push('/dashboard');
      })
      .catch(err =>{
        console.log('login err is ===>',err.response);
        Flash.setMessage('danger', 'Invalid email/password');
        console.log('flash messages is', Flash.getMessages());
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
        <h1>Please login! Not got a login <Link to='/register'>SIGN UP</Link></h1>
        <form onSubmit={ this.handleSubmit }>

          <div className='columns is-centered'>
            <div className='column is-half'>
              <FormInput
                name='email'
                type='email'
                state={ this.state }
                handleChange={ this.handleChange }
                placeholder='example@email.com'
              />

              <div className='columns'>
                <div className='column is-10'>
                  <FormInput
                    name='password'
                    type={this.state.passwordHidden ? 'password' : 'text'}
                    state={ this.state }
                    handleChange={ this.handleChange }
                    placeholder='Password'
                  />

                </div>
                <div className='column is-2'>
                  <a className='button is-rounded' onClick={ this.togglePasswordShow }>👁</a>
                </div>
              </div>
              <button className='button'>Submit</button>
            </div>
          </div>

        </form>
      </section>
    );
  }
}
