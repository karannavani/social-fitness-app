import React from 'react';

const UpcomingCard = ({title, programDetails }) => {
  return(
    <div className="card program-card">
      <div className="card-content">
        <h5 key="1" className="title is-5">{title}</h5>
        <p>
          <span className="title is-5 upcomingDetails"><i className="fas fa-stopwatch fas-regular"></i> {programDetails.time} mins</span>
          <span className="title is-5 upcomingDetails"><i className="fas fa-fire fas-regular"></i> {programDetails.intensity}</span>
        </p>
      </div>
    </div>
  );
};

export default UpcomingCard;
