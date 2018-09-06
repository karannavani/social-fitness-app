import React from 'react';

function FormInput({ name, label, placeholder, handleChange, type, state }){
  return(
    <div className="field">
      <label htmlFor={ name } className='label' >{ label }</label>
      <input
        name={ name }
        type={ type }
        value={ state[ name ] || '' }
        onChange={ handleChange }
        placeholder={ placeholder }
        className='input'/>
      <span
        className='message is-danger'
        style={{color: 'red'}}>{state.errors && state.errors[name]}</span>
    </div>
  );
}

export default FormInput;
