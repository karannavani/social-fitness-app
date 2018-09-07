import React from 'react';

const EditProgram = ({programToday, handleEdit, handleEditSubmit}) => {
  return(
    <div>
      <form>
        <div className="field">
          <label className="label" htmlFor="time">Duration (minutes)</label>
          <input className="input programEdit title is-4" name="time" value={programToday.time || '' } onChange={handleEdit}/>
        </div>
        <div className="field">
          <label className="label" htmlFor="intensity">Intensity</label>
          <input className="input programEdit title is-4" name="intensity" value={programToday.intensity || '' } onChange={handleEdit}/>
        </div>
      </form>
      <footer className="card-footer">
        <a onClick={handleEditSubmit} id="complete" className="card-footer-item"><i id="complete" className="fas fa-check"></i></a>
        <a onClick={handleEditSubmit} id="skip" className="card-footer-item"><i id="skip" className="fas fa-times"></i></a>
      </footer>
    </div>
  );
};

export default EditProgram;
