import React from 'react';
import EditProgram from './EditProgram';
import PrimaryCard from './PrimaryCard';

const TodayCard = ({editProgram, programToday, programDay, handleEdit, handleEditSubmit, handleProgramClick }) => {
  return(
    <div className="card program-card">
      <div className="card-content">
        <h3 key="0" className="title is-3 white">{programDay}</h3>
        {/* <h4 className="title is-4 white">{'Today\'s Plan:'}</h4> */}

        {editProgram ?
          <EditProgram
            programToday = {programToday}
            handleEdit = {handleEdit}
            handleEditSubmit = {handleEditSubmit}
          />
          :
          <PrimaryCard
            programToday = {programToday}
            handleProgramClick = {handleProgramClick}
          />
        }
      </div>
    </div>
  );
};

export default TodayCard;
