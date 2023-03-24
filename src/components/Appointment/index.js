import "./styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import React from 'react'
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  
  const {mode, transition, back, history} = useVisualMode (
    props.interview ? SHOW : EMPTY
  )
  
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
      />
    }

    {mode === CREATE && 
    <Form 
    interviewers={[]} 
    onCancel={() => transition(EMPTY)} 
    />}
    
   </article>
  );
}

