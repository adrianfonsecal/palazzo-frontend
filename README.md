# Palazzo Invites - Frontend

Next.js 16 application for wedding invitation management with beautiful, customizable invitation templates.

## 🎨 Features

- **Dynamic Invitation Pages** - Unique URLs for each guest with UUID-based routing
- **Admin Dashboard** - Complete CRM for managing guests and invitations
- **RSVP Forms** - Multi-guest confirmation with dietary restrictions
- **Data Tables** - Advanced guest management with sorting, filtering, and pagination
- **Photo Gallery** - Collaborative wedding album
- **Customizable Themes** - Per-wedding color schemes and styling
- **Responsive Design** - Mobile-first with Tailwind CSS

## 🏗️ Tech Stack

- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - UI library
- **Tailwind CSS 4** - Utility-first CSS framework
- **TanStack React Table 8.21.3** - Powerful data tables
- **Axios 1.13.2** - HTTP client
- **Lucide React 0.562.0** - Icon library
- **js-cookie 3.0.5** - Cookie management for JWT tokens

## 📦 Dependencies

### Core Dependencies

```json
{
  "dependencies": {
    "@tanstack/react-table": "^8.21.3",
    "axios": "^1.13.2",
    "clsx": "^2.1.1",
    "js-cookie": "^3.0.5",
    "lucide-react": "^0.562.0",
    "next": "16.1.1",
    "react": "19.2.3",
    "react-dom": "19.2.3"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/js-cookie": "^3.0.6",
    "babel-plugin-react-compiler": "1.0.0",
    "eslint": "^9",
    "eslint-config-next": "16.1.1",
    "tailwindcss": "^4"
  }
}
```

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

## 📁 Project Structure

```
frontend/
├── package.json
├── next.config.mjs           # Next.js configuration
├── postcss.config.mjs        # PostCSS configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── eslint.config.mjs         # ESLint configuration
├── jsconfig.json             # JavaScript configuration
│
├── public/                   # Static assets
│   └── [images, favicons]
│
└── src/
    ├── middleware.js         # Next.js middleware for auth
    │
    ├── app/                  # App Router directory
    │   ├── globals.css       # Global styles
    │   ├── layout.js         # Root layout
    │   ├── page.js           # Home page
    │   │
    │   ├── (admin)/          # Protected admin routes
    │   │   ├── layout.jsx    # Admin shell with navigation
    │   │   ├── dashboard/
    │   │   │   └── page.jsx  # Wedding dashboard
    │   │   └── guests/
    │   │       ├── page.jsx  # Guest list with data table
    │   │       └── columns.jsx  # Table column definitions
    │   │
    │   ├── (auth)/           # Authentication routes
    │   │   ├── login/
    │   │   │   └── page.jsx  # Login page
    │   │   └── register/
    │   │       └── page.jsx  # Registration page
    │   │
    │   └── (guest)/          # Public guest routes
    │       └── invitacion/
    │           └── [uuid]/
    │               ├── page.jsx     # Invitation viewer
    │               ├── layout.jsx   # Invitation layout
    │               └── components/  # Invitation-specific components
    │
    ├── components/
    │   ├── invite-card.jsx
    │   │
    │   ├── forms/
    │   │   └── create-invitation-form.jsx
    │   │
    │   ├── modals/
    │   │   └── manage-guests-modal.jsx
    │   │
    │   ├── sections/
    │   │   ├── footer.jsx
    │   │   └── nav-bar.jsx
    │   │
    │   ├── templates/
    │   │   └── index.jsx     # Template selector
    │   │
    │   └── ui/
    │       ├── ClassicElegant.jsx       # Classic template
    │       ├── ModernMinimal.jsx        # Modern template
    │       ├── data-table.jsx           # Reusable data table
    │       ├── modal.jsx                # Modal component
    │       └── indeterminate-checkbox.jsx
    │
    ├── lib/
    │   ├── api.js            # Axios API client
    │   ├── auth.js           # Authentication utilities
    │   └── utils.js          # Helper functions
    │
    └── assets/
        └── images/           # Image assets
```

## 🗂️ Route Structure (App Router)

### Route Groups

Next.js 16 uses route groups (parentheses) to organize routes without affecting URLs:

- **(admin)** - Protected routes requiring authentication
- **(auth)** - Public authentication pages
- **(guest)** - Public invitation pages

### Routes

| Route | File | Description | Auth Required |
|-------|------|-------------|---------------|
| `/` | `app/page.js` | Home page | No |
| `/login` | `app/(auth)/login/page.jsx` | Login form | No |
| `/register` | `app/(auth)/register/page.jsx` | Registration form | No |
| `/dashboard` | `app/(admin)/dashboard/page.jsx` | Wedding overview | Yes (JWT) |
| `/guests` | `app/(admin)/guests/page.jsx` | Guest management | Yes (JWT) |
| `/invitacion/[uuid]` | `app/(guest)/invitacion/[uuid]/page.jsx` | Guest invitation view | No (UUID) |

## 🔌 API Integration

### API Client (`lib/api.js`)

Axios instance with JWT token interceptors:

```javascript
import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add JWT token
api.interceptors.request.use((config) => {
  const token = Cookies.get('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If 401 and haven't retried yet, try to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = Cookies.get('refresh_token');
      if (refreshToken) {
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/token/refresh/`,
            { refresh: refreshToken }
          );
          
          Cookies.set('access_token', data.access);
          api.defaults.headers.Authorization = `Bearer ${data.access}`;
          originalRequest.headers.Authorization = `Bearer ${data.access}`;
          
          return api(originalRequest);
        } catch (refreshError) {
          // Refresh failed, redirect to login
          Cookies.remove('access_token');
          Cookies.remove('refresh_token');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
```

### Example API Calls

```javascript
import api from '@/lib/api';

// Get invitation by UUID (public)
const invitation = await api.get(`/invitation/${uuid}/`);

// Update RSVP (public)
await api.patch(`/invitation/${uuid}/`, {
  guests: [
    { id: 1, attendance: 'ACCEPTED', dietary_restrictions: 'Vegetariano' }
  ]
});

// Get all invitations (admin, requires JWT)
const invitations = await api.get('/admin/invitations/');

// Create invitation (admin)
await api.post('/admin/invitations/', {
  family_name: 'Familia García',
  phone_number: '+5215559876543',
  guests: [
    { full_name: 'Pedro García', is_child: false }
  ]
});

// Import CSV (admin)
const formData = new FormData();
formData.append('file', file);
await api.post('/admin/invitations/import_csv/', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

// Send WhatsApp blast (admin)
await api.post('/admin/invitations/send_blast/', {
  invitation_ids: [uuid1, uuid2, uuid3]
});
```

## 🔐 Authentication

### Auth Utilities (`lib/auth.js`)

```javascript
import Cookies from 'js-cookie';
import api from './api';

export const login = async (username, password) => {
  try {
    const response = await api.post('/token/', { username, password });
    const { access, refresh } = response.data;
    
    // Store tokens in cookies
    Cookies.set('access_token', access, { expires: 1/24 }); // 1 hour
    Cookies.set('refresh_token', refresh, { expires: 7 }); // 7 days
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.response?.data };
  }
};

export const logout = () => {
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
  window.location.href = '/login';
};

export const isAuthenticated = () => {
  return !!Cookies.get('access_token');
};

export const register = async (username, password, email, wedding_name) => {
  try {
    const response = await api.post('/register/', {
      username,
      password,
      email,
      wedding_name
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data };
  }
};
```

### Middleware (`middleware.js`)

Protects admin routes:

```javascript
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('access_token');
  
  // Check if route is protected
  if (request.nextUrl.pathname.startsWith('/dashboard') ||
      request.nextUrl.pathname.startsWith('/guests')) {
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/guests/:path*']
};
```

## 🎨 Components

### Data Table (`components/ui/data-table.jsx`)

Powered by TanStack React Table:

```jsx
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

export function DataTable({ columns, data }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // Add more features: sorting, filtering, pagination
  });
  
  return (
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

### Column Definitions (`app/(admin)/guests/columns.jsx`)

```jsx
export const columns = [
  {
    id: 'select',
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  },
  {
    accessorKey: 'family_name',
    header: 'Familia',
  },
  {
    accessorKey: 'phone_number',
    header: 'Teléfono',
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => (
      <span className={`badge ${getStatusColor(row.original.status)}`}>
        {row.original.status}
      </span>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <button onClick={() => handleEdit(row.original)}>
        Editar
      </button>
    ),
  },
];
```

### Invitation Templates

**Classic Elegant** (`components/ui/ClassicElegant.jsx`):
```jsx
export default function ClassicElegant({ invitation }) {
  const { wedding, family_name, guests } = invitation;
  const theme = wedding.theme_config;
  
  return (
    <div className="max-w-4xl mx-auto p-8" 
         style={{ color: theme.primary_color }}>
      <h1 className="text-4xl font-serif text-center">
        {wedding.couple_names}
      </h1>
      <p className="text-center mt-4">
        {new Date(wedding.event_date).toLocaleDateString()}
      </p>
      
      <div className="mt-8">
        <h2>Estimados {family_name}</h2>
        <p>Nos complace invitarles a nuestra boda...</p>
      </div>
      
      {/* RSVP Form */}
      <form className="mt-8">
        {guests.map(guest => (
          <GuestRSVPInput key={guest.id} guest={guest} />
        ))}
        <button type="submit">Confirmar Asistencia</button>
      </form>
    </div>
  );
}
```

**Modern Minimal** (`components/ui/ModernMinimal.jsx`):
```jsx
export default function ModernMinimal({ invitation }) {
  // Similar structure with different styling
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern, clean design */}
    </div>
  );
}
```

## 🎨 Styling

### Tailwind CSS Configuration

The project uses Tailwind CSS 4 for styling:

```javascript
// tailwind.config.js (if needed for customization)
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B9D',
        secondary: '#FFE5EC',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

### Global Styles (`app/globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-white text-gray-900;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }
}
```

## 📱 Responsive Design

All components are mobile-first:

```jsx
<div className="
  grid 
  grid-cols-1     /* Mobile: 1 column */
  md:grid-cols-2  /* Tablet: 2 columns */
  lg:grid-cols-3  /* Desktop: 3 columns */
  gap-4
">
  {/* Content */}
</div>
```

## 🔧 Configuration

### Next.js Config (`next.config.mjs`)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'palazzoinvites.com'],
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
```

### Environment Variables

```env
# Required
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Optional
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your-google-maps-key
```

## 🧪 Development

### Hot Reload

Next.js automatically hot-reloads changes in development mode:

```bash
npm run dev
```

### Component Development

Create new components in appropriate directories:

```bash
# UI Component
src/components/ui/MyComponent.jsx

# Page Component
src/app/my-route/page.jsx

# Layout Component
src/app/my-route/layout.jsx
```

## 🚀 Deployment

### Production Build

```bash
# Build application
npm run build

# Test production build locally
npm start
```

### Environment Variables

Set production environment variables:

```env
NEXT_PUBLIC_API_URL=https://api.palazzoinvites.com/api
NEXT_PUBLIC_SITE_URL=https://palazzoinvites.com
```

### Hosting Options

**Vercel (Recommended):**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

**Static Export (if applicable):**
```javascript
// next.config.mjs
const nextConfig = {
  output: 'export',
};
```

```bash
npm run build
# Static files in ./out directory
```

## 🐛 Troubleshooting

**API Connection Issues:**
```javascript
// Check API URL
console.log(process.env.NEXT_PUBLIC_API_URL);

// Test API connection
fetch(`${process.env.NEXT_PUBLIC_API_URL}/wedding/test-slug/`)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

**CORS Errors:**
- Ensure backend `CORS_ALLOWED_ORIGINS` includes frontend URL
- Check that credentials are enabled on backend

**Token Issues:**
```javascript
// Check token in cookies
import Cookies from 'js-cookie';
console.log(Cookies.get('access_token'));

// Force refresh token
Cookies.remove('access_token');
// Login again
```

**Build Errors:**
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TanStack Table Documentation](https://tanstack.com/table/latest)
- [Axios Documentation](https://axios-http.com/docs/intro)

## 📝 License

Proprietary - All rights reserved

---

**Last Updated:** January 2026
