import React from 'react';

const PrimaryCard = ({programToday, handleProgramClick}) => {
  return(
    <div>
      <h4 key={programToday.time} className="title is-4 white"><i className="fas fa-stopwatch"></i> {programToday.time} mins</h4>
      <h4 key={programToday.intensity} className="title is-4 white"><i className="fas fa-fire"></i> {programToday.intensity}</h4>
      <footer className="card-footer">
        <a onClick={handleProgramClick} id="complete" className="card-footer-item"><i id="complete" className="fas fa-check"></i></a>
        <a onClick={handleProgramClick} id="edit" className="card-footer-item"><i id="edit" className="fas fa-pencil-alt"></i></a>
        <a onClick={handleProgramClick} id="skip" className="card-footer-item"><i id="skip" className="fas fa-times"></i></a>
      </footer>
    </div>
  );
};

export default PrimaryCard;
