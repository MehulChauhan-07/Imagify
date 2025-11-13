# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Imagify is a modern AI-powered background removal web application built with a React frontend and Node.js/Express backend. The application uses Clerk for authentication, MongoDB for data storage, and implements a credit-based system for image processing.

## Architecture

### Frontend Structure (React + Vite)
- **Location**: `client/`
- **Framework**: React 19.1.0 with Vite build tool
- **Styling**: TailwindCSS with shadcn/ui components and dark mode support
- **State Management**: React Context API (`AppContext.jsx`)
- **Authentication**: Clerk React integration
- **Key Features**: 
  - Responsive design with dark/light theme toggle
  - Image upload with drag-and-drop interface
  - Before/after image comparison slider
  - Credit-based pricing system

### Backend Structure (Node.js/Express)
- **Location**: `server/`
- **Framework**: Express.js with ES6 modules
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with Clerk webhooks
- **Payment**: Razorpay integration for credit purchases
- **Deployment**: Vercel serverless functions (`api/index.js`)

### Database Schema
- **User Model**: Stores Clerk user data, email, credits balance (default: 5)
- **MongoDB Connection**: Database name `bg-xremoval`

## Development Commands

### Client Development
```bash
cd client
npm install          # Install dependencies
npm run dev          # Start development server (Vite)
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Server Development
```bash
cd server
npm install          # Install dependencies
npm run dev          # Start with nodemon (auto-reload)
npm start           # Start production server
```

## Key Components & Pages

### Frontend Pages
- `Home.jsx` - Landing page with hero section, steps, and CTA
- `Result.jsx` - Image processing results with download functionality  
- `BuyCredit.jsx` - Credit purchase page with pricing plans
- `CustomPlanPage.jsx` - Custom pricing plan configuration

### Layout Components
- `Navbar.jsx` - Navigation with theme toggle and user menu
- `Footer.jsx` - Site footer with links and branding
- `ThemeProvider.tsx` - Dark/light mode theme management

### Backend Controllers
- `userController.js` - Handles Clerk webhook integration (incomplete)
- Database connection in `config/mongodb.js`

## Environment Configuration

### Client (.env)
- Clerk authentication keys
- API base URL configuration

### Server (.env)
- `MONGO_URL` - MongoDB connection string
- `PORT` - Server port (default from process.env)
- Clerk webhook secrets
- Razorpay API keys
- Image processing API credentials

## Styling & UI

### TailwindCSS Configuration
- Custom color scheme with CSS variables
- Dark mode support via class strategy
- shadcn/ui component integration
- Custom gradient backgrounds and animations
- Responsive design breakpoints

### Theme System
- Persistent theme storage with localStorage key `imagify-ui-theme`
- System, light, and dark mode options
- Smooth transitions between themes

## Development Notes

### Build & Deployment
- Frontend: Vite bundler with React plugin
- Backend: Vercel serverless deployment with `vercel.json` configuration
- Development server supports ngrok tunneling for external access

### Credit System Implementation
- Users start with 5 free credits
- Three pricing tiers: Basic (100 credits/$10), Advanced (500 credits/$50), Business (5000 credits/$250)
- Credit balance stored in MongoDB user document

### Authentication Flow
- Clerk handles user authentication
- Webhook integration for user creation/updates (currently incomplete in `userController.js`)
- JWT token validation for API requests

### Image Processing
- Drag-and-drop upload interface
- Before/after comparison with slider
- Download functionality for processed images
- Credit deduction per processing operation

## Common Development Tasks

### Adding New Routes
- Frontend: Add route to `App.jsx` Routes component
- Backend: Create controller and add to Express app

### Database Operations
- Use Mongoose models in `server/models/`
- Connection managed in `config/mongodb.js`

### Styling Updates
- Primary colors use purple-to-pink gradient scheme
- Component styling follows shadcn/ui patterns
- Dark mode variables defined in Tailwind config

### Testing Image Processing
- Use sample images from `client/src/assets/`
- Test credit deduction functionality
- Verify download/share features work correctly
