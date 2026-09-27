#  B14-A6-Fit Log

FitLog is a responsive workout library and planning website built with Next.js and Tailwind CSS. Users can explore workouts, view workout details, add workouts to today's plan, save workouts for later, and track completed workouts.

##  Live Link

Will be added after deployment.

##  GitHub Repository

Will be added after GitHub repository setup.

##  Technologies Used

- Next.js
- React
- JavaScript
- Tailwind CSS
- REST API
- LocalStorage
- Git & GitHub
- Vercel

##  Key Features

- Responsive design for mobile, tablet, and desktop
- Workout library with workout cards
- Workout details page
- Add workouts to Today's Plan
- Maximum 5 workouts allowed in Today's Plan
- Save workouts for later
- Plan and Saved counters in the navbar
- My Plan page with Exercises, Minutes, and Calories
- Mark workouts as Done
- Remove workouts from the plan
- Remove saved workouts
- Sort workouts by Duration, Calories, and Rating
- Loading animation while workout data is loading
- Custom 404 page
- Toast notifications
- LocalStorage persistence

##  Workout Library

The Home page displays workouts from the FitLog API in a responsive grid.

Each workout card includes:

- Workout image
- Category
- Workout name
- Equipment
- Duration
- Calories
- Rating
- View Details button

## Workout Details

Each workout has a dedicated details page with:

- Workout image
- Workout name
- Description
- Category
- Equipment
- Difficulty
- Sets
- Reps
- Duration
- Calories
- Rating
- Workout instructions
- Add to Today's Plan button
- Save for Later button

##  My Plan

The My Plan page allows users to:

- View Today's Plan
- View Saved workouts
- See total exercises
- See total minutes
- See total calories
- View workout details
- Mark workouts as Done
- Remove workouts
- Receive toast notifications

Today's Plan has a maximum limit of 5 workouts.

## Sorting

The workout library can be sorted by:

- Duration
- Calories
- Rating

Duration is selected by default.

##  LocalStorage

FitLog uses LocalStorage to keep user data after a page reload.

The following data is stored:

- Today's Plan
- Saved Workouts
- Completed Workouts

##  API

### All Workout Data

https://api.abcz.workers.dev/api/fitlog

### Single Workout Data

https://api.abcz.workers.dev/api/fitlog/:id

##  Responsive Design

The website is designed for:

- Mobile
- Tablet
- Desktop

The navigation, hero section, workout library, workout details, and My Plan page adapt to different screen sizes.

## Project Structure

```text
app/
  layout.js
├── page.js
├── loading.js
├── not-found.js
├── my-plan/
├── saved/
└── workout/

components/
├── Navbar.jsx
├── Footer.jsx
├── Hero.jsx
├── WorkoutCard.jsx
├── WorkoutLibrary.jsx
└── WorkoutDetails.jsx
