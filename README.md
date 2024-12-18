# Blog Platform Frontend

This is the frontend for the Blog Platform application, built with React and deployed on [Vercel](https://vercel.com).

**Live Application**: [https://blogapp-frontend-gilt.vercel.app/](https://blogapp-frontend-gilt.vercel.app/)

---

## Features

- Responsive UI for managing blog posts.
- User authentication (Login/Registration) using JWT tokens.
- Integration with the Django REST Framework backend.
- Dynamic data fetching and rendering using API endpoints.
- Deployed and hosted on Vercel for high performance.

---

## Installation

### Prerequisites

- Node.js 16+
- A package manager (npm or yarn)

### Local Setup Instructions

1. **Clone the repository**:
   git clone <repository-url>
   cd blogapp-frontend
Install dependencies:
npm install
# or
yarn install
Create a .env file: Add your API URL (backend endpoint) in the .env file:

env
Copy code
REACT_APP_API_URL=http://localhost:8000/api
Run the development server:


npm start
# or
yarn start
Open your browser and navigate to http://localhost:3000.

Deployment
The application is deployed on Vercel. To deploy updates:

Push your changes to the main branch of your GitHub repository.
Vercel automatically builds and deploys the latest changes.
Environment Variables
This application uses the following environment variables:

Variable	Description	Example
REACT_APP_API_URL	Base URL for the backend API endpoints	https://api.example.com/
Make sure to set these variables in your .env file for local development and in the Vercel dashboard for production.

Folder Structure
bash
Copy code
blogapp-frontend/
├── public/              # Static assets
├── src/                 # Main application source code
│   ├── components/      # Reusable components
│   ├── pages/           # Page-level components (e.g., Home, Login)
│   ├── services/        # API service functions
│   ├── styles/          # Global and modular styles
│   ├── App.js           # Main app component
│   ├── index.js         # Entry point
├── .env                 # Environment variables
├── package.json         # Project dependencies and scripts
Key Pages
Home: Displays a list of blog posts fetched from the backend.
Login: Allows users to authenticate using their credentials.
Register: Allows new users to sign up.
Create/Edit Post: Forms for creating or editing blog posts (for authenticated users).
API Integration
The frontend interacts with the Django REST Framework backend using the following endpoints:

Base API URL: Backend Deployment (replace with the actual backend URL)
Live Application
Visit the live application here: Blog Platform Frontend

Contributing
Fork the repository.
Create a new feature branch:

git checkout -b feature-name
Commit your changes and push them to your forked repository.
Create a pull request to merge your changes.

License
This project is licensed under the MIT License.

