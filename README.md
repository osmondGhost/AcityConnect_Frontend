# ACity Connect Frontend

HTML + Tailwind CSS frontend for the ACity Connect Smart Campus Marketplace.

## Project Structure

```
frontend/
├── index.html           # Home page
├── auth.html           # Login & Register page
├── marketplace.html    # Items marketplace
├── create-item.html    # Post new item form
├── skills.html         # Skill exchange page
├── create-skill.html   # Post skill exchange form
├── profile.html        # User profile page
├── js/
│   ├── api.js         # API utilities
│   ├── auth.js        # Authentication logic
│   ├── marketplace.js # Marketplace logic
│   ├── create-item.js # Item creation logic
│   ├── skills.js      # Skills logic
│   ├── create-skill.js # Skill creation logic
│   ├── profile.js     # Profile logic
│   └── main.js        # General utilities
└── Overview.jpg / Tech stack.jpg  # Assignment docs
```

## Features

### Pages
- **Home** - Landing page with feature overview
- **Auth** - Login & registration with academic email verification
- **Marketplace** - Browse, filter, and search items
- **Post Item** - Create new marketplace listings
- **Skills** - View and exchange skills
- **Profile** - Manage profile, items, skills, and messages

### Key Functionality
✅ User authentication (Login/Register)
✅ Browse marketplace items with filters
✅ Post items for sale
✅ Skill exchange system
✅ User profiles with activity tracking
✅ Message system (ready for API integration)
✅ Responsive design with Tailwind CSS

## Setup

### No Build Required!
This is a plain HTML + JavaScript frontend with Tailwind CDN.

1. **Open in Browser** - Simply open `index.html` in your browser
2. **Or use Live Server** - Install "Live Server" VS Code extension:
   - Right-click `index.html` → "Open with Live Server"
   - This avoids CORS issues during development

### API Configuration
The frontend will use `http://localhost:5000/api` on local machines.

To point it at Render, set the base URL once in the browser console or through your page bootstrap code:
```javascript
window.setAcityConnectApiBaseUrl('https://your-render-service.onrender.com/api');
```

You can also define `window.__ACITY_API_BASE_URL__` before loading `js/api.js` if you want the value baked into the page.

## Running Locally

### Option 1: Live Server (Recommended)
```bash
# Install VS Code extension "Live Server"
# Right-click index.html → Open with Live Server
# Runs on http://127.0.0.1:5500
```

### Option 2: Simple HTTP Server
```bash
# Python 3
python -m http.server 8000

# Or Node.js
npx http-server
```

Then open `http://localhost:8000` in browser.

## Integration with Backend

The frontend communicates with the backend API through `js/api.js`, which defaults to `http://localhost:5000/api` locally and can be switched to your Render URL.

**Required Backend Endpoints:**
- `POST /api/users/login`
- `POST /api/users/register`
- `GET /api/items`
- `POST /api/items`
- `GET /api/users/profile/:id`
- `GET /api/users/:id/skills`
- And others (see backend README)

### To test locally:

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `Live Server` or `http-server`
3. Open `http://localhost:8000` (or 5500)
4. Try: Register → Post Item → Browse Marketplace

## Technology Stack

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS (via CDN)
- **Vanilla JavaScript** - No framework, lightweight
- **Fetch API** - AJAX requests

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge).

## Next Steps

- Add real-time messaging (Socket.io)
- Item detail pages with reviews
- Admin dashboard
- Deploy frontend to GitHub Pages
- Deploy backend to Render

## Notes

- Tokens stored in `localStorage` after login
- All API calls include JWT authentication header
- Responsive design - works on mobile & desktop
- Simple error handling with user feedback
