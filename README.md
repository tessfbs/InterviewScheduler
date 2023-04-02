# Interview Scheduler

Interview Scheduler is a Single Page Application (SPA) built using React. The application allows users to book, edit, and cancel interviews. It uses an API server to persist data in a PostgreSQL database.

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

### Running Jest Test Framework

```sh
npm test
```

### Running Cypress

```sh
npm run cypress
```

## API Server

Open up a new terminal window and follow these steps:

1. Clone the API server repository by running the following command:
```sh
git clone https://github.com/lighthouse-labs/scheduler-api
```
2. Read the instructions outlined in the `README.md` file to continue with the setup process.


## How to Use

1. Start by selecting a day from the list of available days.
2. Scroll through the list of interview appointments and find an empty time slot.
3. Click on the plus icon to create a new interview.
4. Enter your name and select an interviewer from the list.
5. Click the "Save" button to save your interview appointment.
6. To edit or delete an existing appointment, click on the appointment to reveal the options to edit or delete.
7. To cancel an existing appointment, click on the appointment and confirm the cancellation.
8. The list of days informs the user how many slots are available for each day.
9. The expected day updates the number of spots available when an interview is booked or canceled.
10. If an error occurs, the user will be shown an error message with instructions on how to proceed.


## DEMO VIDEO

<img src="https://github.com/tessfbs/InterviewScheduler/blob/master/public/images/Video/Screen%20Recording%202023-03-30%20at%209.05.02%20PM.gif?raw=true"/>










