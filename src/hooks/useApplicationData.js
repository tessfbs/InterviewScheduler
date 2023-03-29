import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors"


export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day })

  //Requesting data from the API
  useEffect(() => {
    const GET_DAYS = "/api/days"
    const GET_APPOINTMENTS = "/api/appointments"
    const GET_INTERVIEWERS = "/api/interviewers"

    Promise.all([
      axios.get(GET_DAYS),
      axios.get(GET_APPOINTMENTS),
      axios.get(GET_INTERVIEWERS),
    ]).then((all) => {
      // console.log('DAYS', all[0].data);
      // console.log('APPOINTMENTS', all[1].data);
      // console.log('INTERVIEWERS', all[2].data);
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
    /*empty dependency because API request does not depend on the state or props of thus component => never rerun this request */
  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  function updateSpots(state, newAppointments, id) {

    //create a new object to store the dayID, appointments, and remainingSpots
    let spots = {
      dayID: 0,
      appointments: [],
      remainingSpots: 0
    };

    //find the day that contains the appointment
    for (let day of state.days) {
      if (day.appointments.includes(id)) {
        spots.appointments = [...day.appointments];
        spots.dayID = day.id;
      }
    };

    //count the remaining spots
    spots.appointments.forEach(appointmentID => {
      if (newAppointments[appointmentID] && newAppointments[appointmentID].interview === null) {
        spots.remainingSpots++;
      }
    })

    //update the day object
    const updatedDay = {
      ...state.days[spots.dayID - 1],
      spots: spots.remainingSpots
    }

    //update the days array
    const days = [...state.days]
    days[spots.dayID - 1] = updatedDay;

    return days;
  }

  function bookInterview(id, interview) {
    console.log('bookInterview', id, interview);
    console.log('before State', state)

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const newState = {
      ...state,
      appointments
    };


    console.log('bookInterview - appt', appointment)
    console.log('bookInterview - appts', appointments)
    console.log('state', newState)

    //update spots
    const days = updateSpots(state, appointments, id);

    const url = `/api/appointments/${id}`

    return axios.put(url, appointment)
      .then(res => {
        setState({ ...state, days, appointments });
      })
  }

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    console.log('cancel appt', appointment)

    const appointments = {
      ...state.appointments,
      [id]: { ...state.appointments[id], interview: null }
    };

    const newState = {
      ...state,
      appointments
    };
    console.log(newState)

    //update spots
    const days = updateSpots(state, appointments, id);

    // deleting using API request
    const url = `http://localhost:8001/api/appointments/${id}`
    return axios
      .delete(url, appointment)
      .then(() => setState({ ...state, days, appointments }))
  }

  function editInterview(id) {
    const appointment = {
      ...state.appointments[id]
    }

    console.log('editInterview', appointment)

  }


  // function updateSpots(id, counter) {
  //   let appointmentDay = ""
  //   let SpotsAvailable = ""
  //   let newDays = [];

  //   //Find Day and Spots Available By Appointment Id
  //   state.days.forEach(day => {
  //     if (day.appointments.includes(id)) {
  //       appointmentDay = day
  //       SpotsAvailable = day.spots
  //       console.log('appointmentDay', appointmentDay)
  //       console.log('SpotsAvailable', SpotsAvailable)
  //     } else {
  //       newDays.push(day)
  //     }
  //   });

  //   console.log(newDays)

  //   //Update Spots Available
  //   if (counter) {
  //     SpotsAvailable++
  //   } else {
  //     SpotsAvailable--
  //   }

  //   //Update Day
  //   const updateDay = { ...appointmentDay, spots: SpotsAvailable }
  //   console.log('updatedDay', updateDay)

  //   //Update Days
  //   newDays.push(updateDay)

  //   const newDaysSorted = newDays.sort((a, b) => a.id - b.id);
  //   console.log('newDaysSorted', newDaysSorted)

  //   //test newState
  //   const newState = {
  //     ...state,
  //     days: newDays
  //   }
  //   console.log('NewState', newState)

  //   setState({
  //     ...state,
  //     days: newDays
  //   })

  //   // const url = `http://localhost:8001/api/appointments/${id}`

  //   // //axios request to update spots
  //   // return axios.put(url, updateDay)
  //   //   .then(res => {
  //   //     setState({ ...state, days: newDays });
  //   //   })


  // }


  return { state, setDay, cancelInterview, editInterview, dailyAppointments, bookInterview, updateSpots }

}
