import React from 'react';

const FilterBar = ({ options, handleChange }) => {

  const allTrue = options.every(option => option.active === true);

  return(
    <aside className=''>
      <span className='field'>
        <input
          onChange={ handleChange }
          type='checkbox'
          name='all'
          checked={allTrue}/>
        <label
          className="checkbox has-padding-5  input-text"
          htmlFor='all' >Selected All</label>
      </span>
      {options && options.map((option, i) =>
        <span key={i} className='field'>
          <input
            onChange={ handleChange }
            type='checkbox'
            checked={option.active}
            name={option.value}
            className='checkbox'/>
          <label
            className="checkbox has-padding-5 input-text"
            htmlFor={ option.value }>{option.label}</label>
        </span>
      )}
    </aside>
  );
};

export default FilterBar;
