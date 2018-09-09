import React from 'react';

const EditProgram = ({programToday, handleEdit, handleEditSubmit, programDay}) => {
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
        <a onClick={handleEditSubmit} id={`complete ${programDay}`} className="card-footer-item"><i id={`complete ${programDay}`} className="fas fa-check"></i></a>
        <a onClick={handleEditSubmit} id={`skip ${programDay}`} className="card-footer-item"><i id={`skip ${programDay}`} className="fas fa-times"></i></a>
      </footer>
    </div>
  );
};

export default EditProgram;
