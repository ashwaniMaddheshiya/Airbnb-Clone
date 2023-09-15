# Airbnb-Clone

## Description
This project is a full-stack Airbnb clone built using the MERN (MongoDB, Express, React, Node.js) stack. It aims to replicate key features of the Airbnb platform, allowing users to view and book accommodations, manage their own property listings, and more.

## Features
 - User authentication and authorization.
 - Property listing creation and management.
 - Booking accommodations with date selection.
 - Secure file uploads for property images.
 - Interactive google maps to view property locations.

## Technologies
### Frontend:

 - React.js
 - React Router for navigation
 - State management with Context Api
 - Axios for API requests
 - Tailwind CSS for styling
 - Google maps for location
 - JWT for authentication

### Backend:

 - Node.js and Express.js
 - MongoDB as the database
 - Mongoose for database modeling
 - JWT for user authentication
 - Multer for file uploads

## Installation
1) Clone the repository
  ```bash
  git clone https://github.com/ashwaniMaddheshiya/Airbnb-Clone.git
  cd Airbnb-Clone
  ```

2) Install dependencies for both the frontend and backend:
  ```bash
  cd client
  npm install
  cd ../server
  npm install
  ```

3) Create a .env file in the server directory and set your environment variables, including MongoDB connection details and JWT secret.
4) Start the development servers:
  ```bash
  // Frontend
  cd client
  npm start
  
  //Backend
  cd server
  npm start
  ```

5) Open your web browser and navigate to http://localhost:3000 to access the application.

