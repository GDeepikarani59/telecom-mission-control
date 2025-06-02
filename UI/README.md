# Telecom Mission Control SaaS Platform

A scalable, a11y-friendly, and secure SaaS platform that enables enterprise-level telecom policy enforcement, device visibility, and carrier-tower mappings. The system supports multiple user roles (admin, user, viewer) with JWT-based authentication, and is designed for both web and mobile users — globally and offline-capable.

---

## Frontend (React + Redux + CSS Modules)

### Features

- Fully responsive and accessible (a11y-compliant)
- Role-based routing (ProtectedRoute)
- Authentication with access and refresh tokens
- Modules:

  - **Dashboard**: Live stats on towers, devices, users, and policies
  - **Towers**: Searchable list of telecom towers with carrier/device info
  - **Devices**: View/edit/delete devices
  - **Users**: Create users, view roles
  - **Policies**: CRUD for enterprise policy enforcement

- Search, edit, delete, and filtering support for Devices and Policies
- Global UI consistency using CSS variables
- Component-based layout with shared navigation

### Folder Structure (Frontend)

```
src/
  components/
  actions/
  reducers/
  locales/
  App.js
  store.js
```

### 🧪 Dev Tools

- React Developer Tools
- Redux DevTools
- ESLint + Prettier

### 🚀 Future Enhancement (Offline Mode)

To enable **offline mode**, we'll use PWA techniques:

- Enable **service workers** using `workbox`
- Use `localForage` or `IndexedDB` to cache:

  - Devices, Towers, Policies
  - User sessions

- Show offline banner + fallback UI
- Background sync on reconnect

## Setup

### Frontend

```bash
cd frontend
npm install
npm start
```

## 🧩 Tech Stack

- **Frontend**: React, Redux, Axios, CSS Modules
- **Backend**: Express.js, MongoDB, Mongoose
- **Auth**: JWT, Bcrypt
- **Testing**: Postman, Jest (extendable)
- **Accessibility**: aria-labels, focus traps, semantic HTML
