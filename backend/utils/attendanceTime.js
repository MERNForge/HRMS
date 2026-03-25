const checkInTime=new Date();
const checkOutTime=new Date();
const diffInHrs=checkOutTime-checkInTime;
const hours=diffInHrs/(1000*60*60).toFixed(2);//fix time upto 2 decimal

module.exports={
  checkInTime,
  checkOutTime,
  hours
}