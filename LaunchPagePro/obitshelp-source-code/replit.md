# ObitsHelp.com - Guided Obituary Writing Service

## Overview

ObitsHelp.com is a web application designed to help families create meaningful obituaries through a guided writing process. The project is built as a full-stack application with a React frontend and Express backend, featuring a "coming soon" landing page with email signup functionality.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and production builds
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL session store
- **Development**: tsx for TypeScript execution

### Project Structure
```
├── client/          # React frontend application
├── server/          # Express backend API
├── shared/          # Shared TypeScript types and schemas
├── attached_assets/ # Static assets and resources
└── migrations/      # Database migration files
```

## Key Components

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Centralized schema definitions in `shared/schema.ts`
- **Tables**: 
  - `users` - User authentication (prepared for future use)
  - `email_signups` - Email newsletter subscriptions
- **Migrations**: Automated database schema management

### API Layer
- **Email Signup**: `/api/signup` - Handles newsletter subscriptions
- **Admin Endpoint**: `/api/signups` - Retrieves all email signups
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Validation**: Zod schema validation for request/response data

### Frontend Features
- **Landing Page**: Professional "coming soon" page with email capture
- **Form Validation**: Real-time form validation with error messages
- **Toast Notifications**: User feedback for form submissions
- **Responsive Design**: Mobile-first responsive design
- **Loading States**: Proper loading and error states

### Development Tools
- **Hot Reload**: Vite dev server with HMR
- **Type Safety**: Full TypeScript coverage across frontend and backend
- **Code Quality**: ESM modules, strict TypeScript configuration
- **Development Experience**: Runtime error overlays and debugging tools

## Data Flow

1. **User Registration**: Users enter email on landing page
2. **Form Validation**: Client-side validation with Zod schemas
3. **API Request**: Form data sent to `/api/signup` endpoint
4. **Database Storage**: Email stored in PostgreSQL via Drizzle ORM
5. **Response Handling**: Success/error feedback via toast notifications
6. **Admin Access**: Email list accessible via `/api/signups` endpoint

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL hosting
- **Connection**: Database URL configured via environment variables

### UI Framework
- **Radix UI**: Headless UI components for accessibility
- **shadcn/ui**: Pre-built component library
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

### Development
- **Replit Integration**: Cartographer plugin for development environment
- **Vite Plugins**: Runtime error modal and development tools

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: esbuild bundles Express server to `dist/index.js`
3. **Production Assets**: Static files served from build directory

### Environment Configuration
- **Development**: `NODE_ENV=development` with hot reload
- **Production**: `NODE_ENV=production` with optimized builds
- **Database**: `DATABASE_URL` environment variable required

### Hosting Architecture
- **Static Assets**: Frontend served via Express static middleware
- **API Routes**: Backend API routes under `/api` prefix
- **Database**: Serverless PostgreSQL via Neon
- **Session Storage**: PostgreSQL-backed session store

## Recent Changes

- July 06, 2025: Complete landing page redesign
  - Updated to black/white color palette with soft, respectful styling
  - Added animated slate candle with flickering flame
  - Updated headline: "When words are hard to find, we help you find the right ones. Coming soon."
  - Simplified description to focus on core value proposition
  - New reinforcing message: "Born of personal experience, created to bring clarity when it's hardest to find."
  - Integrated PostgreSQL database for persistent email storage
  - Added rounded corners, ample spacing, and large readable text

## User Preferences

Preferred communication style: Simple, everyday language.