import React from 'react';

const UpcomingCard = ({title, programDetails }) => {
  return(
    <div className="card upcoming-tomorrow-and-exercise-show-in-profile">
      <div className="card-content">
        <h5 key="1" className="title is-5 page-title-small">{title}</h5>
        <p>
          <span className="title is-6 upcomingDetails"><i className="fas fa-stopwatch fas-regular"></i> {programDetails.time} mins</span>
          <span className="title is-6 upcomingDetails"><i className="fas fa-fire fas-regular"></i> {programDetails.intensity}</span>
        </p>
      </div>
    </div>
  );
};

export default UpcomingCard;
