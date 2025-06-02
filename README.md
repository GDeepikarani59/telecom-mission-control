# Telecom Mission Control SaaS Platform

This project is a full-stack telecom SaaS platform that enables enterprises to manage towers, policies, devices, and users in a scalable and secure way. It includes JWT-based authentication, role-based access control, and a11y-friendly responsive frontend built with React + Redux.

# Install Dependencies

cd backend
npm install
cd ..
cd UI
npm install

# Create .env file in backend/

Add MONGO_URI
PORT="5000"
JWT_SECRET
JWT_REFRESH_SECRET
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

# Technologies Used

Frontend: React, Redux, CSS Modules, React Router, Axios

Backend: Node.js, Express, Mongoose, JWT

Database: MongoDB

Dev Tools: ESLint, Prettier, dotenv, nodemon

Security: JWT Access/Refresh, Role-based access control

# Documentation

Find architectural diagrams, data flow models, and API documentation inside the /documents folder (Word format).
