import React from 'react';
import EditProgram from './EditProgram';
import PrimaryCard from './PrimaryCard';

const UnloggedCard = ({editProgram, program, programDay, handleEdit, handleEditSubmit, handleProgramClick }) => {
  return(
    <div className="card program-card-unlogged">
      <div className="card-content">
        <h3 key="0" className="title is-3 white">{programDay}</h3>

        {editProgram ?
          <EditProgram
            programToday = {program}
            handleEdit = {handleEdit}
            handleEditSubmit = {handleEditSubmit}
          />
          :
          <PrimaryCard
            programToday = {program}
            handleProgramClick = {handleProgramClick}
          />
        }
      </div>
    </div>
  );
};

export default UnloggedCard;
