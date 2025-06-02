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

# UI ScreenShots
Login Page
![image](https://github.com/user-attachments/assets/0f8aaa81-75ea-4d65-a9b1-e101f0b11ef7)

Dashboard:
![image](https://github.com/user-attachments/assets/186d6946-f14f-4bab-8f7b-5f6ec764be5b)

Policy Management:
![image](https://github.com/user-attachments/assets/e22e46be-7424-4b89-9da9-e532063968e4)

Tower Directory:
![image](https://github.com/user-attachments/assets/eb1462d2-806a-4d67-aba8-b6f738796957)

Device Inventory:
![image](https://github.com/user-attachments/assets/1d95c100-f870-4598-b2d4-8e6d01b24fa3)

Users:
![image](https://github.com/user-attachments/assets/6270f205-b1f8-4ead-8e2d-da127fc28375)

Mobile Interface:
![image](https://github.com/user-attachments/assets/2180d64e-94d1-45c4-99f2-df50a250b3b1)


# Documentation

Find architectural diagrams, data flow models, and API documentation inside the /documents folder (Word format).
