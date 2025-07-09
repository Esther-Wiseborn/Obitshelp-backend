# Build Prompt: ObitsHelp.com Pre-Launch Landing Page

## Project Overview
Create a respectful, empathetic pre-launch landing page for ObitsHelp.com, a grief support tool that helps families write meaningful obituaries. The page should feature a black and white design with a symbolic animated candle element.

## Core Requirements

### Visual Design
- **Color Palette**: Black and white theme with soft contrasts
- **Typography**: Large, readable text with ample spacing
- **Layout**: Clean, minimalist design with rounded corners
- **Responsive**: Mobile-first responsive design
- **Tone**: Respectful, empathetic, and professional

### Key Visual Element
- **Animated Candle**: 
  - Slate-colored candle body for contrast
  - Gentle flickering flame animation using SVG
  - Warm, respectful flame - not aggressive or cartoonish
  - Multiple animation layers (main flame, inner flame, core, glow)
  - Slow, peaceful timing (3-5 second cycles)
  - Use SVG native animations (`<animate>` and `<animateTransform>`)

### Content & Messaging
- **Headline**: "When words are hard to find, we help you find the right ones. Coming soon."
- **Description**: Focus on core value proposition - helping families during difficult times
- **Reinforcing Message**: "Born of personal experience, created to bring clarity when it's hardest to find."
- **Call to Action**: Email signup for launch notifications

### Technical Stack
- **Frontend**: React 18 with TypeScript
- **Backend**: Node.js with Express
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Vite
- **State Management**: TanStack Query
- **Forms**: React Hook Form with Zod validation

## Detailed Implementation

### 1. Project Structure
```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/         # shadcn/ui components
│   │   │   └── Candle.tsx  # Animated candle component
│   │   ├── pages/
│   │   │   └── landing.tsx # Main landing page
│   │   ├── lib/
│   │   │   ├── utils.ts
│   │   │   └── queryClient.ts
│   │   ├── hooks/
│   │   │   └── use-toast.ts
│   │   ├── App.tsx
│   │   ├── index.css      # Custom styles and animations
│   │   └── main.tsx
│   └── index.html
├── server/          # Express backend
│   ├── index.ts
│   ├── routes.ts    # API endpoints
│   ├── db.ts        # Database connection
│   └── storage.ts   # Database operations
├── shared/
│   └── schema.ts    # Database schema and types
└── Configuration files
```

### 2. Database Schema
```typescript
// Email signups table
export const emailSignups = pgTable("email_signups", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// Validation schemas
export const insertEmailSignupSchema = createInsertSchema(emailSignups).pick({
  email: true,
});
```

### 3. Animated Candle Component
```typescript
// Key features:
- SVG-based candle with flame animation
- Multiple flame layers with different timing
- Slate-colored candle body (#64748b)
- Gradients for realistic flame colors
- Native SVG animations for cross-browser compatibility
- Transform origins set correctly for natural movement
```

### 4. Landing Page Features
- Email collection form with validation
- Toast notifications for user feedback
- Loading states during form submission
- Duplicate email prevention
- Error handling and user-friendly messages
- Responsive design for all devices

### 5. API Endpoints
```typescript
POST /api/signup     // Email signup with validation
GET /api/signups     // Admin endpoint for email list
GET /download/source // Source code download
```

### 6. Styling Requirements
```css
/* Custom CSS variables for theme */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
}

/* Animation keyframes for smooth effects */
@keyframes gentleFlicker { ... }
@keyframes innerFlicker { ... }
@keyframes coreFlicker { ... }
```

## Implementation Steps

### Phase 1: Project Setup
1. Initialize React + TypeScript project with Vite
2. Install and configure Tailwind CSS
3. Set up shadcn/ui components
4. Configure Express backend with TypeScript
5. Set up PostgreSQL database with Drizzle ORM

### Phase 2: Core Components
1. Create animated candle SVG component
2. Build landing page layout with responsive design
3. Implement email signup form with validation
4. Add toast notifications for user feedback

### Phase 3: Backend Integration
1. Create database schema and migrations
2. Implement API endpoints for email signup
3. Add duplicate email prevention
4. Set up error handling and logging

### Phase 4: Polish & Testing
1. Fine-tune animations and transitions
2. Test responsive design across devices
3. Validate form handling and error states
4. Optimize performance and accessibility

## Key Design Principles

### Empathy-First Design
- Soft, non-aggressive visual elements
- Respectful color choices (black/white)
- Gentle animations that don't distract
- Clear, supportive messaging

### Technical Excellence
- Type-safe development with TypeScript
- Proper error handling and validation
- Accessible design patterns
- Performance optimization
- Clean, maintainable code structure

### User Experience
- Simple, focused interface
- Clear call-to-action
- Immediate feedback on interactions
- Mobile-optimized design
- Fast loading times

## Environment Setup
```bash
# Install dependencies
npm install

# Set up database
npm run db:push

# Start development server
npm run dev
```

## Required Environment Variables
```
DATABASE_URL=postgresql://...
NODE_ENV=development
```

## Success Criteria
- ✅ Respectful, empathetic design that resonates with grieving families
- ✅ Smooth, gentle candle flame animation
- ✅ Functional email signup with database persistence
- ✅ Responsive design working on all devices
- ✅ Professional, polished visual appearance
- ✅ Fast, accessible, and user-friendly experience

This prompt provides a complete blueprint for recreating the ObitsHelp.com pre-launch landing page with all technical specifications, design requirements, and implementation details.