

  const getAppointmentsForDay = (state, day) => {

  //state.days =>> array for appointments
  let results = [];
  state.days.forEach(element => {
    results = element.name === day ? element.appointments : results;
  });

  //add the appointment object to the results array
  let appointments = [];
  results.forEach(element => {
    appointments.push(state.appointments[element])
  });
  
return appointments;
}


//   const getInterview = (state, interview) => {
//   // console.log(interview.interviewer) //get the interviewer id
//   // console.log(state.interviewers[interview.interviewer]) 
//   let results = {}
//   if(interview === null){
//     return results = null
//   } else {
//     interview.interviewer = state.interviewers[interview.interviewer]
//     results = interview
//     // console.log('results', interview)

//   }
//   return results
// }

  const getInterview = (state, interview) => {
    if(!interview){
      return null
    }

    return {...interview, interviewer: state.interviewers[interview.interviewer]}
  }

 const getInterviewersForDay = (state, day) => {
  const matchedDay = state.days.find((d) => d.name === day);

  if (matchedDay){
   return matchedDay.interviewers.map((id) => state.interviewers[id])
  } else {
    return []
  }
 }





//   const getInterviewersForDay = (state, day) => {

//   //state.days =>> array for appointments
//   let results = [];
//   state.days.forEach(element => {
//     results = element.name === day ? element.appointments : results;
//   });

//   //add the appointment object to the results array
//   let appointments = [];
//   results.forEach(element => {
//     appointments.push(state.appointments[element])
//   });

//   //interviewer to appointments array
//   // console.log(appointments[2].interview.interviewer) // interviewer id
//   let interviewers = [];
//   appointments.forEach(element => {
//     if(element.interview) {
//       interviewers.push(state.interviewers[element.interview.interviewer])
//       // console.log(interviewers)
//     }
//   })

  
// return interviewers;
// }

module.exports ={ getAppointmentsForDay, getInterview, getInterviewersForDay }

