import React from 'react';

const GreenCard = ({programDay}) => {
  return(
    <div className="card program-card-completed">
      <div className="card-content">
        <h4 key="0" className="title is-4">{programDay} - Nailed it</h4>
      </div>
    </div>
  );
};

export default GreenCard;
