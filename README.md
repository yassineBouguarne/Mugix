# Mugix - Premium Bottled Water Catalog

A full-stack web application for Mugix, a premium bottled water brand. This is a product catalog with WhatsApp ordering functionality.

## Tech Stack

- **Frontend**: React (Vite) + Tailwind CSS + TypeScript
- **Backend**: Lovable Cloud (PostgreSQL + Edge Functions)
- **UI Components**: shadcn/ui
- **State Management**: TanStack Query

## Features

### Public Site
- 🏠 Home page with hero section and brand story
- 📦 Products page with category filtering
- 📱 Product detail pages
- 💬 WhatsApp ordering with pre-filled messages
- 🚚 Delivery & payment information page
- 📞 Contact page
- 📱 Fully responsive design
- 🔍 SEO optimized with meta tags and structured data

### Admin Dashboard
- 🔐 Secure login system
- ➕ Add new products
- ✏️ Edit existing products
- 🗑️ Delete products
- 📸 Image upload to cloud storage
- 🏷️ Category management
- 🔄 Toggle product availability

## Getting Started

### Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Environment Variables

Environment variables are automatically configured by Lovable Cloud.

## Project Structure

```
src/
├── components/
│   ├── layout/          # Navbar, Footer, Layout
│   ├── products/        # ProductCard
│   └── ui/              # shadcn/ui components
├── hooks/
│   ├── useAuth.ts       # Authentication hook
│   └── useProducts.ts   # Product CRUD hooks
├── pages/
│   ├── admin/           # Admin pages
│   ├── Index.tsx        # Home page
│   ├── Products.tsx     # Products listing
│   ├── ProductDetail.tsx
│   ├── Delivery.tsx
│   └── Contact.tsx
└── integrations/
    └── supabase/        # Auto-generated client
```

## Database Schema

### Tables
- **categories** - Bottle size categories (500ml, 1L, 1.5L, 5L)
- **products** - Product catalog with name, description, price, image
- **user_roles** - Admin role management

### Security
- Row Level Security (RLS) enabled on all tables
- Public read access for products and categories
- Admin-only write access

## Admin Access

To access the admin dashboard:
1. Go to `/admin/login`
2. Sign up with your email
3. Contact the system administrator to grant admin privileges

## WhatsApp Integration

Each product has an "Order on WhatsApp" button that opens WhatsApp with a pre-filled message containing:
- Product name
- Price
- Quantity
- Product page URL
