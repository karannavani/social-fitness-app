import React from 'react';

const GreenCard = ({programDay, grit}) => {
  return(
    <div className="card card-completed">
      <div className="card-content">
        <h4 key="0" className="title is-4">{programDay} - Nailed it</h4>
        <h4 key="1" className="title is-4"><i className="fas fa-bolt fas-regular"></i> You earned {grit} GRIT</h4>
      </div>
    </div>
  );
};

export default GreenCard;
