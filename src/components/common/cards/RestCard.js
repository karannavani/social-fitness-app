import React from 'react';

const RestCard = ({title, programDay}) => {
  return(
    <div>
      <div className="card program-card-rest">
        <div className="card-content">
          <h3 key="0" className="title is-3 white">{programDay}</h3>
          <h4 className="subtitle is-4 white">{title}</h4>
        </div>
      </div>
    </div>
  );
};

export default RestCard;
