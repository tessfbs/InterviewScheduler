import "./styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import React from 'react'



export default function Appointment(props) {

 
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

