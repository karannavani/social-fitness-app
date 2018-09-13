import React from 'react';
import EditProgram from './EditProgram';
import PrimaryCard from './PrimaryCard';

const TodayCard = ({editProgram, programToday, programDay, handleEdit, handleEditSubmit, handleProgramClick }) => {
  return(
    <div className="card aside-program-card">
      <div className="card-content">
        <h3 key="0" className="title is-3 sub-text">{programDay}</h3>
        {/* <h4 className="title is-4 white">{'Today\'s Plan:'}</h4> */}

        {editProgram ?
          <EditProgram
            programDay = {programDay.replace(' ', '')}
            programToday = {programToday}
            handleEdit = {handleEdit}
            handleEditSubmit = {handleEditSubmit}
          />
          :
          <PrimaryCard
            editWanted = {true}
            programDay = {programDay.replace(' ', '')}
            programToday = {programToday}
            handleProgramClick = {handleProgramClick}
          />
        }
      </div>
    </div>
  );
};

export default TodayCard;
