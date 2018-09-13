import moment from 'moment';

const Validate = {};

Validate.startDate = function(chosenStartDate, activePlanStartDate, futurePlans) {
  const momChosenStartDate = moment(chosenStartDate);
  const activePlanEndDate = moment.unix(activePlanStartDate).add(6, 'days');
  
  if(!activePlanStartDate && !futurePlans.length){
    return true;
  }

  if(!momChosenStartDate.isAfter(activePlanEndDate)) return false;

  const futurePeriods = [];
  futurePlans.forEach(plan => {
    const momStartDate = moment.unix(plan.startDate);
    futurePeriods.push({
      beforeDate: moment(momStartDate).subtract(7, 'days'),
      endDate: moment(momStartDate).add(7, 'days')
    });
  });
  if(!futurePeriods.length) return true;

  const validateArray =[];
  for(let i = 0; i < futurePeriods.length; i++){
    if(!moment(momChosenStartDate).isBetween(futurePeriods[i].beforeDate, futurePeriods[i].endDate)){
      validateArray.push(true);
    }else{
      validateArray.push(false);
    }
  }

  return validateArray.every(item => item);
};


export default Validate;
