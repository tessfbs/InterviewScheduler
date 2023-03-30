
describe("Appointments", () => {

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
  });

  xit("should book an interview", () => {

    // Clicks on the "Add" button in the second appointment
    cy.get("[alt=Add]")
      .first()
      .click();

    // // Enters their name
    cy.get(".appointment__create-input")
      .type("Lydia Miller-Jones")

    // // Chooses an interviewer
    cy.get("[alt='Sylvia Palmer']")
      .click()

    // // Clicks the save button
    cy.contains("Save")
      .click();

    // Sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  });

  xit("should edit an interview", () => {

    // Clicks the edit button for the existing appointment
    cy.get("[alt=Edit]")
      .click({ force: true })

    // Changes the name and interviewer
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");

    cy.get("[alt='Tori Malcolm']")
      .click()

    // Clicks the save button
    cy.contains("Save")
      .click();


    // Sees the edit to the appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");


  });

  it("should cancel an interview", () => {

    // Clicks the delete button for the existing appointment
    cy.get("[alt=Delete]")
      .click({ force: true })

    // Clicks the confirm button
    cy.contains("button", "Confirm")
      .click()

    // Sees that the appointment slot is empty

    //check that the "Deleting" indicator should exist
    cy.contains("Deleting").should("exist");

    //check that the "Deleting" indicator should not exist
    cy.contains("Deleting").should("not.exist");

    //check that the .appointment__card--show element that contains the text "Archie Cohen" should not exist.
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");



  });


});

