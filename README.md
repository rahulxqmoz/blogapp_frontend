
# Blog Platform Frontend

This is the frontend for the Blog Platform application, built with React and deployed on [Vercel](https://vercel.com).

**Live Application**: [https://blogapp-frontend-gilt.vercel.app/](https://blogapp-frontend-gilt.vercel.app/)

---

## Features

- **Responsive UI**: Manage and view blog posts across all devices.
- **User Authentication**: Login and registration using JWT tokens.
- **API Integration**: Communicates seamlessly with the Django REST Framework backend.
- **Dynamic Data Rendering**: Fetch and display data in real time.
- **Vercel Deployment**: Deployed for fast and reliable performance.

---

## Installation

### Prerequisites

- **Node.js** 16 or higher.
- A package manager: `npm` or `yarn`.

### Local Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd blogapp-frontend
   
### Install dependencies
npm install
# or
yarn install
Create a .env file: Add the following environment variable to configure your backend API URL:


REACT_APP_API_URL=http://localhost:8000/api
Run the development server:

npm start
# or
yarn start
Open your browser and navigate to http://localhost:3000.

### Deployment
The application is deployed on Vercel. To deploy updates:
Commit and push changes to the main branch of your repository.
Vercel automatically builds and deploys the latest version.

### Key Pages
Home: Displays a list of blog posts fetched from the backend.
Login: Allows users to authenticate using their credentials.
Register: Enables new users to sign up.
Create/Edit Post: Forms for creating or editing blog posts (authenticated users only).



### Contributing
Fork the repository.
Create a new feature branch:

git checkout -b feature-name
Commit your changes and push them to your forked repository.
Create a pull request to merge your changes.

### License
This project is licensed under the MIT License. See the LICENSE file for more details.







