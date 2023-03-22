import React from "react";
import DayListItem from "./DayListItem";


export default function DayList(props) {
// console.log(props);

  const daysMap = props.days.map((day) => {
    return(
      <DayListItem
          key={day.id} 
          name={day.name} 
          spots={day.spots} 
          selected={day.name === props.value}
          setDay={props.onChange}
      />
    )
  })
 
   return (
    <ul>
      {daysMap}
    </ul> 
   );
 }


//  Our DayList component will take in three props.

    // days:Array a list of day objects (each object includes an id, name, and spots)
    // day:String the currently selected day
    // setDay:Function accepts the name of the day eg. "Monday", "Tuesday"

// The DayList is responsible for rendering a list of DayListItem components. It doesn't have any styles of its own so we don't need a DayList.scss file.