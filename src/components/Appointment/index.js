import "./styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import React from 'react'
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const DELETING = "STATUS"
  const SAVING = "SAVING"
  const CONFIRM = "CONFIRM"

  
  const {mode, transition, back, history} = useVisualMode (
    props.interview ? SHOW : EMPTY
  )

  
  function save(name, interviewer) { //name: student name, interviewer: interviewer id
    console.log('interviewer from Appointment', interviewer)
    console.log('interview', props.interview)

    const interview = {
      student: name,
      interviewer: interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then (() => {
        transition(SHOW);
      })
  }

  function OnDelete () {
    transition(CONFIRM) 
  }

  function cancelInterview () {
    transition(DELETING) 
    props.cancelInterview(props.id)
     .then(() => {
      transition(EMPTY) 
    })
  }

  
  return ( 
   <article 
   className="appointment"
   interview={props.interview}
   >
    <Header 
    time={props.time}
    />
    {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name}/> : <Empty /> } */}
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

    {mode === SHOW && 
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
        onDelete={OnDelete}
      />
    }

    {mode === CREATE && 
    <Form 
    interviewers={props.interviewers} 
    onCancel={() => transition(EMPTY)} 
    onSave={save}

    />}

    {mode === CONFIRM && 
    <Confirm 
    message="Are you sure you would like to delete?"
    onConfirm={cancelInterview}
    onCancel={back}
    />}

    {mode === DELETING && 
    <Status 
      message="Deleting"

    />}
    
    {mode === SAVING && 
    <Status 
      message="Saving"

    />}
    
   </article>
  );
}

