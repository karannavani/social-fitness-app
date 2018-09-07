import React from 'react';

const RedCard = ({programDay}) => {
  return(
    <div className="card program-card-skipped">
      <div className="card-content">
        <h4 key="0" className="title is-4 white">{programDay} - Skipped 😞</h4>
      </div>
    </div>
  );
};

export default RedCard;
