import React from 'react';

const calculateGrit = (intensity, time) => {
  switch (intensity.toLowerCase()) {
    case 'low':
      return Math.floor((time/20)) * 5;
    case 'medium':
      return Math.floor((time/20)) * 10;
    case 'high':
      return Math.floor((time/20)) * 15;
  }
};

const PrimaryCard = ({editWanted, programToday, programDay, handleProgramClick}) => {
  return(
    <div>
      {programToday.intensity &&
      <div>
        <h4 key={programToday.time} className="title is-4 white-title"><i className="fas fa-stopwatch"></i> {programToday.time} mins</h4>
        <h4 key={programToday.intensity} className="title is-4 white-title"><i className="fas fa-fire"></i> {programToday.intensity}</h4>
        <h4 className="title is-4 white-title"><i className="fas fa-bolt"></i> {calculateGrit(programToday.intensity, programToday.time)}</h4>

        <footer className="card-footer">
          <a onClick={handleProgramClick} id={`complete ${programDay} ${calculateGrit(programToday.intensity, programToday.time)}`} className="card-footer-item">
            <i id={`complete ${programDay} ${calculateGrit(programToday.intensity, programToday.time)}`} className="fas fa-check">

            </i></a>

          {editWanted &&
            <a onClick={handleProgramClick} id={`edit ${programDay} ${calculateGrit(programToday.intensity, programToday.time)}`} className="card-footer-item">
              <i id={`edit ${programDay}`} className="fas fa-pencil-alt"></i></a>}

          <a onClick={handleProgramClick} id={`skip ${programDay} ${calculateGrit(programToday.intensity, programToday.time)}`} className="card-footer-item"><i id={`skip ${programDay}`} className="fas fa-times"></i></a>
        </footer>
      </div>
      }
    </div>

  );
};

export default PrimaryCard;
