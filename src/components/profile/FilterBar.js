import React from 'react';

const FilterBar = ({ options, handleChange }) => {

  const allTrue = options.every(option => option.active === true);

  return(
    <aside className=''>
      <div className='field'>
        <input
          onChange={ handleChange }
          type='checkbox'
          name='all'
          checked={allTrue}/>
        <label
          className="checkbox"
          htmlFor='all' >Selected All</label>
      </div>
      {options && options.map((option, i) =>
        <div key={i} className='field'>
          <input
            onChange={ handleChange }
            type='checkbox'
            checked={option.active}
            name={option.value}
            className='checkbox'/>
          <label
            className="checkbox"
            htmlFor={ option.value }>{option.label}</label>
        </div>
      )}
    </aside>
  );
};

export default FilterBar;
