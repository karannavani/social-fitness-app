import React from 'react';

const RestCard = ({title, programDay}) => {
  return(
    <div>
      <div className="card rest-day-card">
        <div className="card-content">
          <h3 key="0" className="title is-5 black-title page-title-small ">{programDay}</h3>
          <h4 className="upcomingDetails black-title ">{title}</h4>
        </div>
      </div>
    </div>
  );
};

export default RestCard;
