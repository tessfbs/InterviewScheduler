import "./styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import React from 'react'
import useVisualMode from "hooks/useVisualMode";



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  
  
  return ( 
   <article 
   className="appointment"
   interview={props.interview}
   >
    <Header time={props.time}/>
    {
    props.interview ? 
    <Show student={props.interview.student} interviewer={props.interview.interviewer.name}/> 
    : 
    <Empty />
    }
   </article>
  );
}

