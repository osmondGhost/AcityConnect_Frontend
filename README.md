# ACity Connect Frontend

A City Connect frontend for the Smart Campus Marketplace. This project provides the user interface for browsing items, posting listings, exchanging skills, and managing profiles using plain HTML, Tailwind CSS, and Vanilla JavaScript.

## Overview

This frontend is designed as a student-focused marketplace for campus life. It includes:

- User authentication (login/register)
- Item marketplace browsing and posting
- Skill exchange posting and discovery
- User profile management
- Responsive UI for desktop and mobile

The frontend connects to a backend API for authentication, item management, and user profile data.

## Project Structure

```
frontend/
├── index.html           # Home page
├── auth.html            # Login & registration page
├── marketplace.html     # Marketplace listings and filters
├── create-item.html     # Add a new marketplace item
├── skills.html          # Skill exchange page
├── create-skill.html    # Add a new skill listing
├── profile.html         # User profile and activity
├── js/                  # Frontend JavaScript logic
│   ├── api.js
│   ├── auth.js
│   ├── marketplace.js
│   ├── create-item.js
│   ├── skills.js
│   ├── create-skill.js
│   ├── profile.js
│   └── main.js
├── css/                 # Custom styles
├── README.md
├── package-lock.json    # Node dependency lockfile for local tooling
├── Overview.jpg         # Project design or assignment diagram
└── Tech stack.jpg       # Technology overview image
```

## Features

- **Authentication**: Login and registration with academic email support
- **Marketplace**: Browse available items, search, and filter results
- **Post Items**: Add new item listings with details
- **Skills Exchange**: Share and request skills among campus users
- **Profile**: View and manage user profile and posted content
- **Responsive Layout**: Works across modern desktop and mobile browsers

## Setup

This frontend is a static HTML/JS project and does not require a build step.

### Option 1: Open directly

1. Open `index.html` in your browser.

### Option 2: Use Live Server

1. Install the VS Code extension `Live Server`
2. Right-click `index.html` → `Open with Live Server`

### Option 3: Use a local HTTP server

```powershell
# Python 3
python -m http.server 8000

# Or Node.js
npx http-server
```

Then open `http://localhost:8000`.

## API Configuration

The frontend expects the backend API at:

```text
http://localhost:5000/api
```

If you need to use a deployed backend, update the base URL in `js/api.js` or set it globally before page load.

## Running Locally

1. Start the backend application
2. Launch the frontend with Live Server or a local web server
3. Open the app in your browser
4. Register, login, and interact with marketplace and skills

## Technology Stack

- HTML5
- Tailwind CSS
- Vanilla JavaScript
- Fetch API

## Notes

- User tokens are stored in `localStorage`
- The frontend uses `js/api.js` to call backend routes
- The project is built for modern browsers
- No frontend framework is required

## Next Improvements

- Add item detail pages
- Implement real-time messaging
- Add admin dashboard tools
- Deploy frontend to GitHub Pages
- Improve error handling and form validation
