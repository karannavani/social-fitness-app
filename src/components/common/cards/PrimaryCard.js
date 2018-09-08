import React from 'react';

const PrimaryCard = ({programToday, programDay, handleProgramClick}) => {
  return(
    <div>
      <h4 key={programToday.time} className="title is-4 white"><i className="fas fa-stopwatch"></i> {programToday.time} mins</h4>
      <h4 key={programToday.intensity} className="title is-4 white"><i className="fas fa-fire"></i> {programToday.intensity}</h4>
      <footer className="card-footer">
        <a onClick={handleProgramClick} id={`complete ${programDay}`} className="card-footer-item"><i id={`complete ${programDay}`} className="fas fa-check"></i></a>
        <a onClick={handleProgramClick} id={`edit ${programDay}`} className="card-footer-item"><i id={`edit ${programDay}`} className="fas fa-pencil-alt"></i></a>
        <a onClick={handleProgramClick} id={`skip ${programDay}`} className="card-footer-item"><i id={`skip ${programDay}`} className="fas fa-times"></i></a>
      </footer>
    </div>
  );
};

export default PrimaryCard;
