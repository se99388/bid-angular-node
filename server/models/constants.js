
const convertHoursToMilisecond=(timeInHours)=>{
 return timeInHours * 60 * 60 * 1000
}

module.exports = {
    MY_SQL_TABLE: 'bid',
    INTERVAL_UPDATE_IN_HOURS: convertHoursToMilisecond(14)
  };