# Pro Manage
<!-- ## Frontend 
- React
- HTML
- CSS -->


<!-- 
--
## Backend
- Node Express
- bcrypt
- JWT 
-->


# Project Management App - Frontend

This is the frontend of the **Project Management App**, a web-based platform designed for efficient project management. It allows users to create, manage, and collaborate on projects seamlessly.

## Live Demo
[Click here to access the live application](https://project-management-app-drab-beta.vercel.app/auth/login)

## Features
- User Authentication (Login/Register)
- Dashboard with project management tools
- Task assignment and tracking
- Real-time collaboration features
- Responsive design for mobile and desktop devices

## Tech Stack
- **Frontend Framework**: React.js
- **State Management**: Context API
- **Styling**: CSS3
- **Deployment**: Vercel

## Installation and Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/ImKetan1610/projectManagementApp.git
   cd Client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Access the app at `http://localhost:3000`.

## Environment Variables
Create a `.env` file in the project root and configure the following:
```env
REACT_APP_API_URL=<backend-api-url>
REACT_APP_ENV=development
```

## Scripts
- `npm start`: Start the development server.
- `npm run build`: Build the project for production.
- `npm test`: Run tests.

## Folder Structure
```
src/
├── components/       # Reusable components
├── pages/            # Pages for the app
├── styles/           # CSS and Tailwind configurations
├── context/          # State management
└── utils/            # Utility functions
```

## Contributing
1. Fork the repository.
2. Create a new feature branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add your feature description'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.


### Backend `README.md`


# Project Management App - Backend

This is the backend API for the **Project Management App**, providing endpoints for managing user authentication, projects, tasks, and collaboration tools.

## API Base URL
[Click here to access the live API](https://projectmanagementapp-vksm.onrender.com)

## Features
- User Authentication (JWT-based)
- CRUD operations for projects and tasks
- Real-time notifications (WebSocket or Polling)
- Role-based access control

## Tech Stack
- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Deployment**: Render

## Installation and Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/ImKetan1610/projectManagementApp.git
   cd Server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the `.env` file:
   ```env
   PORT=5000
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-secret-key>
   NODE_ENV=development
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. The backend will run at `http://localhost:5000`.

## API Endpoints
| Method | Endpoint               | Description                    |
|--------|------------------------|--------------------------------|
| POST   | `/api/auth/register`   | Register a new user           |
| POST   | `/api/auth/login`      | Login user and get a token     |
| GET    | `/api/projects`        | Get all projects              |
| POST   | `/api/projects`        | Create a new project          |
| PUT    | `/api/projects/:id`    | Update a project              |
| DELETE | `/api/projects/:id`    | Delete a project              |

## Scripts
- `npm start`: Start the server.
- `npm run dev`: Start the development server with hot reload.
- `npm test`: Run tests.

## Folder Structure
```
src/
├── controllers/    # Business logic for routes
├── models/         # Mongoose schemas
├── routes/         # API endpoints
├── middlewares/    # Auth and error handling
└── utils/          # Helper functions
```

## Contributing
1. Fork the repository.
2. Create a new feature branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add your feature description'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.
