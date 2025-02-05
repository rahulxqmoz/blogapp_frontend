# Blog Platform Frontend

This is the frontend for the Blog Platform application, built with React for a seamless and responsive user experience.

## Features

- **Responsive UI**: View and manage blog posts across all devices.
- **User Authentication**: Secure login and registration using JWT tokens.
- **API Integration**: Communicates with the Django REST Framework backend.
- **Dynamic Data Rendering**: Fetch and display real-time blog content.

## Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** 16 or higher
- **npm** (comes with Node.js) or **yarn**

### Local Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rahulxqmoz/blogapp_frontend
   cd blogapp-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create a `.env` file** in the project root and configure your backend API URL:
   ```plaintext
   REACT_APP_API_URL=http://localhost:8000/api
   ```

4. **Run the development server**:
   ```bash
   npm start
   # or
   yarn start
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000).

## Key Pages

- **Home**: Displays a list of blog posts fetched from the backend.
- **Login**: Allows users to authenticate using their credentials.
- **Register**: Enables new users to sign up.
- **Create/Edit Post**: Forms for authenticated users to create or edit blog posts.

## Backend Setup

To fully utilize the application, ensure the backend is running locally. Follow the setup guide in the [WeatherApp Backend Repository]((https://github.com/rahulxqmoz/blog_app).

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push them to your forked repository.
4. Submit a pull request to merge your changes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

