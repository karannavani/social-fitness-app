import React from 'react';

const UpcomingCard = ({programTomorrow}) => {
  return(
    <div className="card program-card">
      <div className="card-content">
        <h5 key="1" className="title is-5">Upcoming tomorrow:</h5>
        <p>
          <span className="title is-5 upcomingDetails"><i className="fas fa-stopwatch fas-regular"></i> {programTomorrow.time} mins</span>
          <span className="title is-5 upcomingDetails"><i className="fas fa-fire fas-regular"></i> {programTomorrow.intensity}</span>
        </p>
      </div>
    </div>
  );
};

export default UpcomingCard;
