import React from 'react';

const RestCard = ({programDay}) => {
  return(
    <div>
      <div className="card program-card-rest">
        <div className="card-content">
          <h3 key="0" className="title is-3 white">{programDay}</h3>
          <h4 className="subtitle is-4 white">{'It\'s your rest day, take it easy!'}</h4>
        </div>
      </div>
    </div>
  );
};

export default RestCard;
