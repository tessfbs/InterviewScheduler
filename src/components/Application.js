import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import "./Appointment"
import Appointment from "./Appointment";
// import InterviewerList from "./InterviewerList";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors"


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}

  });

  const setDay = day => setState({ ...state, day })

  //Requesting data from the API
  useEffect(() => {
    const GET_DAYS = "http://localhost:8001/api/days"
    const GET_APPOINTMENTS = "http://localhost:8001/api/appointments"
    const GET_INTERVIEWERS = "http://localhost:8001/api/interviewers"

    Promise.all([
      axios.get(GET_DAYS),
      axios.get(GET_APPOINTMENTS),
      axios.get(GET_INTERVIEWERS),
    ]).then((all) => {
      console.log('DAYS', all[0].data);
      console.log('APPOINTMENTS', all[1].data);
      console.log('INTERVIEWERS', all[2].data);
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
    /*empty dependency because API request does not depend on the state or props of thus component => never rerun this request */
  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

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

    const url = `/api/appointments/${id}`

    return axios.put(url, appointment)
      .then(res => {
        setState({...state, appointments});
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

    // deleting using API request
    const url = `http://localhost:8001/api/appointments/${id}`
    return axios
      .delete(url, appointment)
      .then(() => setState({ ...state, appointments }))


  }

  const AppointmentList = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day)


    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
      //***** */
      // <Appointment 
      //   key={appointment.id} 
      //   {...appointment} 
      // />
      //The ...appointment part expands the appointment object into individual key-value pairs, so the Appointment component will receive props like id={1}, time="12pm", and interview={/* interview object */}.
      //Using the spread syntax can be convenient when you have an object with many properties and you want to pass all of them as props to a component. It can also make the code more concise and easier to read.
    )
  })





  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">
        {AppointmentList}
        <Appointment key="last" time="5pm" />
      </section>

    </main>
  );
}
