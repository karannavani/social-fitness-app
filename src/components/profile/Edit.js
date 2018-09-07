import React from 'react';

// DEPENDANCIES
import axios from 'axios';
import Flash from '../../lib/Auth';

//components
import FormInput from '../common/FormInput';

export default class UserEdit extends React.Component{
  state={};

  componentDidMount(){
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState(res.data));
  }

  handleChange = ({ target: { name, value } }) => {
    console.log('Handle change is called', value);
    this.setState({[ name ]: value});
  }

  handleSubmit = (event) =>{
    event.preventDefault();
    console.log('form to submit is', this.state);
    //axios to PUT /api/users/:id
    axios.put(`/profile/${this.props.match.params.id}`, this.state)
      .then(res => {
        console.log('update response is', res.data);
        // Flash.setMessage('success', res.data.messages );
        this.props.history.push(`/api/users/${this.props.match.params.id}`);
      })
      .catch(err =>{
        console.log('update err is ===>',err.response);
        // Flash.setMessage('danger', 'Invalid email/password');
        // console.log('flash messages is', Flash.getMessages());
        this.props.history.push(this.props.location.pathname);
      });
  }

  render(){
    return(
      <section className='container'>
        <div className='columns is-centered'>
          <div className='column is-6'>
            <form className='form' onSubmit={this.handleSubmit}>
              
              <FormInput name='email' type='email' state={ this.state } handleChange={ this.handleChange } label='Email' placeholder='example@email.com' />
              <FormInput name='username' type='text' state={ this.state } handleChange={ this.handleChange } label='User Name' placeholder='BigJoe201' />
              <FormInput name='firstName' type='text' state={ this.state } handleChange={ this.handleChange } label='First Name' placeholder='Joe' />
              <FormInput name='surname' type='text' state={ this.state } handleChange={ this.handleChange } label='Surname' placeholder='Blogs' />

              <div className='columns'>
                <div className='column is-4'>
                  <FormInput name='age' type='number' state={ this.state } handleChange={ this.handleChange } label='Age' placeholder='Age' />
                </div>
                <div className='column is-4'>
                  <FormInput name='height' type='number' state={ this.state } handleChange={ this.handleChange } label='Height in centimeters' placeholder="Height in centimeters" />
                </div>
                <div className='column is-4'>
                  <FormInput name='weight' type='number' state={ this.state } handleChange={ this.handleChange } label='Weight in kilograms' placeholder='Weight in kilograms' />
                </div>
              </div>

              <button className='button is-primary'>Submit</button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
