import React from 'react';


const SortSelect = ({ options, handleChange, defaultValue, title }) => {
  return(
    <div className="field">
      <label className='label' >{title}</label>
      <div className="select">
        <select value={defaultValue} onChange= {handleChange }>

          {options.map(option =>
            <option
              key={option.value}
              value={ option.value }>
              { option.label }
            </option>)}


        </select>
      </div>
    </div>
  );
};

export default SortSelect;
