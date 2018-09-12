import axios from 'axios';
import moment from 'moment';

const Validate = {};

Validate.startDate = function(userId, chosenStartDate, activePlanStartDate) {
  //get active plan
  const momCST = moment(chosenStartDate);
  // const today = moment();
  let activePlanEndDate;
  // const futurePlans = [];
  axios.get(`/api/exerciseplans/${userId}/active`)
    .then(res =>{
      console.log('the returning data is', res.data[0].startDate)

      activePlanEndDate = moment.unix(res.data[0].startDate).add(6, 'days');

      console.log('activePlanEndDate is', activePlanEndDate)
      console.log('the chosen data as momemnt is', momCST)
      console.log('the cst is after the enddata', momCST.isAfter(moment(activePlanEndDate)))
      if(momCST.isAfter(moment(activePlanEndDate))){
        return
      }
      // return false;
    } );

  //
  // axios.get(`/api/exerciseplans/${userId}/future`)
  //   .then(res => res.data.forEach(plan => futurePlans.push(plan.startDate)))

  //create an array of periods
};


export default Validate;
