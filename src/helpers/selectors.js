const state = {
  days: [ //array
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },
  interviewers: {
    "1": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }

};

export  const getAppointmentsForDay = (state, day) => {

  //state.days =>> array
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

export  const getInterview = (state, interview) => {
  // console.log(interview.interviewer) //get the interviewer id
  // console.log(state.interviewers[interview.interviewer]) 
  let results = {}
  if(interview === null){
    return results = null
  } else {
    interview.interviewer = state.interviewers[interview.interviewer]
    results = interview
    // console.log('results', interview)

  }
  return results
}

console.log(getInterview(state, state.appointments["3"].interview))

