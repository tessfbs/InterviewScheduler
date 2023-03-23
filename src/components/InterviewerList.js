import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";



export default function InterviewerList(props) {


  const interviewerMap = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected= {interviewer.id === props.value}
      setInterviewer={() => props.onChange(interviewer.id)}
      />

    )
  })
 
   return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light"></h4>
      <ul className="interviewers__list">   
      {interviewerMap}
      </ul>
    </section>
   );
 }
