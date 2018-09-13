import React from 'react';
import { Link } from 'react-router-dom';

const PlanHistoryCard = ({plan, keyId}) =>{

  return(
    <Link
      to={`/exerciseplan/${plan._id}`}
      key={keyId}
      className={`column is-3 historic-plans  ${plan.activePlan ? 'active-plan-glow' : ''}`}>

      <div className='columns is-centered is-multiline is-mobile'>
        <div>{plan.name}</div>
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
