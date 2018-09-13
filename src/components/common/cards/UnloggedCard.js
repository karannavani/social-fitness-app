import React from 'react';
import PrimaryCard from './PrimaryCard';

const UnloggedCard = ({program, programDay, handleProgramClick }) => {
  return(
    <div className="card card-unlogged">
      <div className="card-content">
        <h3 key="0" className="title is-3 sub-text">{programDay}</h3>
        <PrimaryCard
          programToday = {program}
          programDay = {programDay.replace(' ', '')}
          handleProgramClick = {handleProgramClick}
          editWanted = {false}
        />
      </div>
    </div>
  );
};

export default UnloggedCard;
