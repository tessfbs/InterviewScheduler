import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


export default function Form(props) {
  const [student, setStudent] = useState(props.student || " ")
  const [interviewer, setInterviewer] = useState(props.interviewer || null)

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }

  const cancel= () => {
    reset();
    props.onCancel();
  }
  const save = () => {
    props.onSave(student, interviewer)
    console.log('interviewer from form', interviewer)

    // props.onSave(student, interviewer)
  }


 
  return ( 
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList 
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel} >Cancel</Button>
          <Button confirm onClick={save} >Save</Button>
        </section>
      </section>
    </main>
  );
}

// The <Form> component should track the following state:
// student:String
// interviewer:Number

// The <Form> component should have the following actions:
// setStudent:Function
// setInterviewer:Function

// The <Form> component should take the following props:
// student:String
// interviewers:Array
// interviewer:Number
// onSave:Function
// onCancel:Function