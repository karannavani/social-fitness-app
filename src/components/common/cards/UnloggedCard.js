import React from 'react';
import PrimaryCard from './PrimaryCard';

const UnloggedCard = ({program, programDay, handleProgramClick }) => {
  return(
    <div className="card program-card-unlogged">
      <div className="card-content">
        <h3 key="0" className="title is-3 white">{programDay}</h3>
        <PrimaryCard
          programToday = {program}
          handleProgramClick = {handleProgramClick}
          editWanted = {false}
        />
      </div>
    </div>
  );
};

export default UnloggedCard;
