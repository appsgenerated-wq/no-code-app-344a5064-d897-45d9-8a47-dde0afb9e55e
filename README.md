# GorillaTracker App

This is a full-stack application built with React and Manifest for tracking gorillas and their observations.

## Features

- **User Authentication**: Sign up and log in as a 'researcher'. Admins have full control.
- **Gorilla Catalog**: View a list of gorillas, including their photos, species, and biographical information.
- **Log Observations**: Authenticated users can add new observations for any gorilla.
- **Admin Panel**: A complete backend admin interface for managing users, gorillas, and observations, available at `/admin`.

## Getting Started

### Prerequisites

- Node.js
- A Manifest account and project

### Setup

1. **Clone the repository**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory and add your Manifest project's backend URL and App ID:
   ```
   VITE_BACKEND_URL=your-manifest-backend-url
   VITE_APP_ID=your-manifest-app-id
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

### Default Users

- **Admin**: `admin@manifest.build` / `admin` (Access the admin panel to manage all data)
- **Researcher (Demo)**: `researcher@manifest.build` / `password` (Use the 'Researcher Demo Login' button)

You can create new users via the signup feature or directly in the admin panel.
