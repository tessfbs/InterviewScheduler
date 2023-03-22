import React from "react";
import classNames from "classnames";
import "./DayListItem.scss";



export default function DayListItem(props) {

  const dayClass = classNames("day-list__item",{
    "day-list__item--selected":props.selected,
    "day-list__item--full":props.spots === 0 && true
  }
  )
  return (
    <li 
    className={dayClass} 
    onClick={() => props.setDay(props.name)}
    selected={props.selected}
    >
      <h2 className="text--regular">{props.name}</h2>
      {props.spots === 0 && <h3 className="text--light"> no spots remaining</h3>}
      {props.spots === 1 && <h3 className="text--light">{props.spots} spot remaining</h3>}
      {props.spots > 1 && <h3 className="text--light">{props.spots} spots remaining</h3>}
      
      
    </li>
  );


}



// name:String the name of the day
// spots:Number the number of spots remaining
// selected:Boolean true or false declaring that this day is selected
// setDay:Function accepts the name of the day eg. "Monday", "Tuesday"

// We use the spots prop for two purposes:

    // 1) To display the text "{props.spots} spots remaining" 
    // 2) to determine if the day is full.

// The DayListItem "knows" what it means to be full (if props.spots is 0, the day is full) but not what it means to be selected. It uses this prop directly to determine which styles to apply.