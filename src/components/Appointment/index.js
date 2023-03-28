import "./styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import React from 'react'
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const DELETING = "STATUS"
  const SAVING = "SAVING"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"


  
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

    props
      .bookInterview(props.id, interview)
      .then (() => {
        transition(SHOW);
      })
      .catch(error => {
        props.updateSpots(props.id, true)
        transition(ERROR_SAVE,true)
      })
  }

  function OnDelete () {
    transition(CONFIRM) 
  }

  function destroy () {
    transition(DELETING,true) 
    props.cancelInterview(props.id)
     .then(() => {
       props.updateSpots(props.id, false)
      transition(EMPTY) 
    })
      .catch(error => {
        transition(ERROR_DELETE,true)
      })
  }

  function editInterview () {
    props.editInterview(props.id)
    console.log('student and interviewer',props.interview.student, props.interview.interviewer)
    transition(EDIT)
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
        onEdit={editInterview}
      />
    }

    {mode === CREATE && 
    <Form 
    interviewers={props.interviewers} 
    onCancel={back} 
    onSave={save}

    />}

    {mode === CONFIRM && 
    <Confirm 
    message="Are you sure you would like to delete?"
    onConfirm={destroy}
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

    {mode === EDIT && 
    <Form 
    student={props.interview.student}
    interviewer={props.interview.interviewer.id}
    interviewers={props.interviewers}
    onSave={save}
    onCancel={back}
    />}

    {mode === ERROR_DELETE && 
    <Error 
      message="Could not delete appointment."
      onClose={back}

    />}

    {mode === ERROR_SAVE && 
    <Error 
      message="Could not save appointment."
      onClose={back}

    />}
    
   </article>
  );
}

