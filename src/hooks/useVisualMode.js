import { useState } from "react";

//history of previous modes that the appointment has been in >> 
// ['empty', 'create', 'saving', 'show', 'error, 'error_save]
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //transition --- move to a new mode
  const transition = (newMode, status) => {
    // Passing "true" to transition(THIRD, true) >> Transition to THIRD by REPLACING SECOND 
    if (status) {
      setHistory(prevHistory => {
        const newHistory = [...prevHistory];
        newHistory.pop();
        newHistory.push(newMode);
        return newHistory;
      });
      setMode(newMode);
    } else {
      setHistory(prevHistory => [...prevHistory, newMode]);
      setMode(newMode);
    }
  };

  //back --- move backwards in time
  const back = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
  };

  return { mode, transition, back };
}

