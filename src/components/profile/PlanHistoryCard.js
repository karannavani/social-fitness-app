import React from 'react';
import { Link } from 'react-router-dom';

const PlanHistoryCard = ({plan, key}) =>{

  return(
    <Link
      to={`/exerciseplan/${plan._id}`}
      style={plan.activePlan ? {border: '1px solid red'} : null}
      key={key} className='column is-3 box'>

      <div className='columns is-multiline is-mobile'>
        <div>Program Name Goes Here</div>
        <div className='column is-6'>
          {plan.totalGrit &&<p><i className="fas fa-bolt fas-regular"></i>: {plan.totalGrit}</p>}
        </div>
        <div className='column is-6 has-text-right'>
          {plan.exercisePlanAdoptedFrom && <i className="far fa-copy"></i>}
        </div>

        <div className='column is-6'>
          <p><i className="fas fa-fire fas-regular"></i> {plan.intensityAvg}</p>
        </div>
        <div className='column is-6'>
          <p><i className="far fa-calendar-alt"></i> {plan.formattedStartDate}</p>
        </div>

        <div className='column is-6'>
          <p><i className="fas fa-stopwatch fas-regular"></i> {plan.workoutTimeAvg}min/day Average </p>
        </div>
        <div className='column is-6'>
          <p><i className="fas fa-stopwatch fas-regular"></i> {plan.totalTime}min Total</p>
        </div>

        <div className='column is-6'>
          <p>{plan.restDays} Rest Days </p>
        </div>
        <div className='column is-6'>
          <p>{plan.completedDays} Completed Days</p>
        </div>

      </div>

    </Link>
  );

};

export default PlanHistoryCard;
