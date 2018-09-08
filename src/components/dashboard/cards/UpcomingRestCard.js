import React from 'react';

const UpcomingRestCard = ({title}) => {
  return(
    <div className="card program-card">
      <div className="card-content">
        <h5 key="0" className="title is-5">{title}</h5>
        <h5 key="1" className="title is-5">Well deserved rest</h5>
      </div>
    </div>
  );
};

export default UpcomingRestCard;
