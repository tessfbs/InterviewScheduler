import { useState } from "react";

//history of previous modes that the appointment has been in >> 
// ['empty', 'create', 'saving', 'show', 'error, 'error_save]
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //transition --- move to a new mode
  const transition = (value, status) => {
    // Passing "true" to transition(THIRD, true) >> Transition to THIRD by REPLACING SECOND 
    if (status) {
      history.pop();
      setMode(value);
      setHistory([...history, value]);
    } else {
      setMode(value);
      setHistory([...history, value]);
    }
  }

  //back --- move backwards in time
  const back = () => {
    // console.log('history',history)
    if (history.length === 1) {
      setMode(history[0]);
    } else {
      let currentMode = history.pop();
      let prevMode = history.pop();
      // console.log('curr. mode',currentMode)
      // console.log('prev. mode',prevMode)
      setMode(prevMode);

    }
  }

  return { mode, transition, back, history };
}
