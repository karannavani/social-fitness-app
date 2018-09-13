import axios from 'axios';
import moment from 'moment';
import Auth from './Auth';

const Validate = {};

Validate.startDate = function(chosenStartDate, futurePlans){
  //get active plan
  const momChosenStartDate = moment(chosenStartDate);

  const activePlanStartDate = this.getActivePlanStartDate();
  const activePlanEndDate = moment.unix(activePlanStartDate).add(6, 'days');
  console.log('the active plan is', activePlanEndDate)

  if(!momChosenStartDate.isAfter(activePlanEndDate)) return false;
  return true;

  // const futurePeriods = [];
  // futurePlans.forEach(plan => {
  //   const momStartDate = moment.unix(plan.startDate);
  //   futurePeriods.push({
  //     beforeDate: moment(momStartDate).subtract(7, 'days'),
  //     endDate: moment(momStartDate).add(7, 'days')
  //   });
  // });
  // if(!futurePeriods.length) return true;
  //
  // const validateArray =[];
  // for(let i = 0; i < futurePeriods.length; i++){
  //   if(!moment(momChosenStartDate).isBetween(futurePeriods[i].beforeDate, futurePeriods[i].endDate)){
  //     validateArray.push(true);
  //   }else{
  //     validateArray.push(false);
  //   }
  // }
  //
  // return validateArray.every(item => item);


};

Validate.getActivePlanStartDate = function(){
  axios.get(`/api/exerciseplans/${Auth.currentUserId()}/active`)
    .then(res => {
      return res.data[0].startDate;
    });
};


export default Validate;
