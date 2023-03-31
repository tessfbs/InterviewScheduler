import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import "./Appointment"
import Appointment from "./Appointment";
import { getInterview, getInterviewersForDay } from "helpers/selectors"
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {

  // Get the state and the functions from the custom hook
  const { state, setDay, cancelInterview, editInterview, dailyAppointments, bookInterview, updateSpots } = useApplicationData();

  // Build the appointment list
  const AppointmentList = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        editInterview={editInterview}
        updateSpots={updateSpots}

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
