# Portfolio Frontend

This is the public-facing portfolio website built with React. It dynamically fetches and displays content managed via the CMS from the Backend API.

## Features
- **Dynamic Content**: Projects, Skills, Services, and Testimonials are fetched from the API.
- **Responsive Design**: Fully responsive layout using Tailwind CSS.
- **Modern UI**: Smooth animations with Framer Motion and Lucide React icons.
- **Contact Form**: Functional contact form integrated with the backend.

## Technologies Used
- React (Vite)
- Tailwind CSS
- Framer Motion
- Lucide React (Icons)
- React Router DOM

## Prerequisites
- Node.js (v14 or higher)
- The **Backend** server must be running for data to load.

## Setup Instructions

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Configure Environment Variables**
    Copy the example environment file:
    ```bash
    cp .env.example .env
    ```
    Update `.env` with your backend API URL if it differs from the default:
    ```
    VITE_API_BASE_URL=http://localhost:5000/api
    ```

## Running the Application

- **Development Mode**:
  ```bash
  npm run dev
  ```
  The app will typically run at `http://localhost:5173`.

- **Build for Production**:
  ```bash
  npm run build
  ```
  The output will be in the `dist` directory.

- **Preview Production Build**:
  ```bash
  npm run preview
  ```

## Key Components
- `src/sections/`: Individual sections of the landing page (Hero, About, Projects, etc.)
- `src/components/`: Reusable UI components (Navbar, Footer, etc.)
- `src/api/`: API client configuration
