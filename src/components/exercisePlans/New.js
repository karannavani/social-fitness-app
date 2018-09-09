import React from 'react';
import FormInput from '../common/FormInput';

export default class ExercisePlanNew extends React.Component {
state = {}

  // handleChange = (event) => {
  //   const { target: {name, value} } = event;
  //   const errors = this.state.errors;
  //   delete errors[name]; // remove the error for this field
  //   this.setState({[name]: value});
  // }

  render() {
    return(
      <section>
        <p>Form</p>
        <FormInput
          name = 'name'
          type='text'
          state = {this.state}
        />
      </section>
    );
  }
}
