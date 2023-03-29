import React from "react";


import axios from "axios";

import { render, cleanup, fireEvent, waitForElement, getByText, prettyDOM, getAllByTestId, getByPlaceholderText, getByAltText, queryByText, queryByAltText } from "@testing-library/react";

import Application from "components/Application";
import { debug } from "request";

afterEach(cleanup);

//To skip a test, use xit or test.skip:


// it("renders without crashing", () => {
//   render(<Application />);
// });

// it("defaults to Monday and changes the schedule when a new day is selected", () => {
//   const { getByText } = render(<Application />);

//   return waitForElement(() => getByText("Monday"))
//     .then(() => {
//       fireEvent.click(getByText("Tuesday"));
//       expect(getByText("Leopold Silvers")).toBeInTheDocument();

//     });
// });

describe("Application", () => {


  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    //Render the application and store the container value returned by render. Then console.log the value of container.
    const { container, debug } = render(<Application />);

    //Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // console.log(prettyDOM(container));


    const appointments = getAllByTestId(container, "appointment");
    // console.log(prettyDOM(appointments));

    const appointment = getAllByTestId(container, "appointment")[0];

    //* BOOK AN INTERVIEW *//

    // click the add button, 
    fireEvent.click(getByAltText(appointment, "Add"));

    //change the student name input 
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    //click the interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    //click the save button.
    fireEvent.click(getByText(appointment, "Save"));

    //Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    //Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    debug();

    //Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    ); //before: Add a test id with the value "day" to the <li> in the DayListItem component =>> data-testid="day"
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Add" button on the first empty appointment.
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));


    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });


    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));


    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));


    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();


    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));


    // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();


  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown. message: Are you sure you would like to delete?
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();


    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));


    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();


    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));


    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

    // debug();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {

    //1. Render the Application.
    const { container, debug } = render(<Application />);

    //2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    //3. Click the "Edit" button on the booked appointment
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Edit"));

    //4. Change the name and interviewer.
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    //5. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    //6. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    //7. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    //8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

    // debug();

  })


  it("shows the save error when failing to save an appointment", async () => {

    //1. Render the Application.
    const { container, debug } = render(<Application />);

    //2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    //3. Click the "Add" button on the first empty appointment.
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));

    //4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    //5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    //6. Click the "Save" button on that same appointment.
    axios.put.mockRejectedValueOnce();
    fireEvent.click(getByText(appointment, "Save"));

    //7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    //8. Wait until the element with the text "Error" is displayed.
    await waitForElement(() => getByText(appointment, "Error"));

    //9. Check that the element with the text "Could not save appointment." is displayed.
    expect(getByText(appointment, "Could not save appointment.")).toBeInTheDocument();

    //10. Click the "Close" button on the error.
    fireEvent.click(getByAltText(appointment, "Close"));

    //11. Check that the element with the text "Saving" is not displayed.
    expect(queryByText(appointment, "Saving")).not.toBeInTheDocument();

    //12. Check that the element with the text "Could not save appointment." is not displayed.
    expect(queryByText(appointment, "Could not save appointment.")).not.toBeInTheDocument();

    //13. Check that the element with the text "Archie Cohen" is not displayed.
    expect(queryByText(appointment, "Archie Cohen")).not.toBeInTheDocument();

    // debug();

  });

  it("shows the delete error when failing to delete an existing appointment", async () => {

    //1. Render the Application.
    const { container, debug } = render(<Application />);

    //2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    //3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));

    //4. Check that the element with the text "Are you sure you would like to delete?" is displayed.
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

    //5. Click the "Confirm" button on that same appointment.
    axios.delete.mockRejectedValueOnce();
    fireEvent.click(getByText(appointment, "Confirm"));

    //6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    //7. Wait until the element with the text "Error" is displayed.
    await waitForElement(() => getByText(appointment, "Error"));

    //8. Check that the element with the text "Could not delete appointment." is displayed.
    expect(getByText(appointment, "Could not delete appointment.")).toBeInTheDocument();

    //9. Click the "Close" button on the error.
    fireEvent.click(getByAltText(appointment, "Close"));

    //10. Check that the element with the text "Deleting" is not displayed.
    expect(queryByText(appointment, "Deleting")).not.toBeInTheDocument();

    //11. Check that the element with the text "Archie Cohen" is not displayed.
    expect(queryByText(appointment, "Archie Cohen")).not.toBeInTheDocument();

    debug();


  });






});

