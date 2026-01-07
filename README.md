## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Backend API running on `http://localhost:8000` (or configure custom URL)

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

### Environment Configuration

Create a `.env.local` file in the frontend directory:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Optional: Other environment variables
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Development Server

```bash
# Start development server
npm run dev

# The app will be available at http://localhost:3000
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

### Linting

```bash
npm run lint
```













