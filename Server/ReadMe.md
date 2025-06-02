## Backend (Node.js + Express + MongoDB)

### Features

- RESTful API design with token-based authentication
- JWT Access/Refresh tokens using `jsonwebtoken`
- Secure password storage using `bcryptjs`
- Scalable structure with routers/controllers/middleware
- Entity Schemas:

  - User (admin/user/viewer)
  - Device (linked to Tower)
  - Policy (based on role)
  - Tower (location, carriers, devices)

### Authentication Flow

- Login issues access/refresh tokens
- `authenticate` middleware verifies JWTs
- `authorizeRoles()` handles role-based access

### Folder Structure (Backend)

```
backend/
  models/
  routes/
  controllers/
  middleware/
  server.js
```

### APIs

| Endpoint           | Method       | Description         |
| ------------------ | ------------ | ------------------- |
| `/api/auth/login`  | POST         | Authenticate user   |
| `/api/devices`     | GET          | List devices        |
| `/api/devices/:id` | PUT          | Update device       |
| `/api/users`       | GET/POST     | List & create users |
| `/api/policies`    | GET/POST/PUT | Manage policies     |
| `/api/towers`      | GET          | List towers         |

---

## High-Level Architecture

```
[ React UI ] <--> [ Redux Store ] <--> [ REST API - Express ] <--> [ MongoDB Atlas ]
                                      ⬆ Authentication (JWT)
                                      ⬇ Role + Policy Authorization
```

---

### Backend

```bash
cd backend
npm install
npm run dev
```

Set environment variables in `.env`:

```
JWT_SECRET=your_secret
MONGODB_URI=your_connection_string
```
