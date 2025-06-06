# CheemsWeb - Modern Next.js Commerce Platform

A modern, full-stack e-commerce platform built with Next.js 15, Sanity CMS, and PostgreSQL.

## 🚀 Features

- **🏪 E-commerce Ready** - Complete product catalog, collections, and shopping features
- **📝 Content Management** - Powered by Sanity Studio with custom schemas
- **🔐 API Key Management** - Secure Prisma-based API authentication system
- **🎨 Modern UI** - Beautiful, responsive design with Tailwind CSS
- **⚡ Performance** - Optimized with Next.js 15 and Turbopack
- **📱 Mobile First** - Responsive design that works on all devices
- **🔍 SEO Optimized** - Built-in meta tags, sitemaps, and structured data

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Smooth animations and transitions

### Backend & Database
- **PostgreSQL** - Primary database
- **Prisma** - Modern database ORM
- **Sanity** - Headless CMS for content management

### Deployment & Analytics
- **Vercel** - Optimized hosting platform
- **Vercel Analytics** - Performance monitoring
- **Speed Insights** - Core Web Vitals tracking

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── (main)/            # Main website pages
│   ├── api/               # API routes
│   └── studio/            # Sanity Studio
├── components/            # Reusable React components
│   ├── ui/               # UI components (buttons, cards, etc.)
│   ├── blocks/           # Content blocks
│   └── inputs/           # Custom Sanity inputs
├── lib/                  # Utility functions and configurations
├── prisma/               # Database schema and migrations
├── sanity/               # Sanity CMS configuration
│   ├── schemas/          # Content schemas
│   └── queries/          # GROQ queries
├── docs/                 # Documentation
└── public/               # Static assets
```

## 🔑 API Key Management System

This project includes a secure, production-ready API key management system:

- **🔐 Secure Generation** - Cryptographically secure 256-bit keys
- **🔒 Hash-Only Storage** - Keys are never stored in plain text
- **⚡ Fast Validation** - Optimized database lookups
- **📊 Usage Tracking** - Monitor key usage and activity
- **🛡️ Production Ready** - Built for high-performance environments

[View API Key Documentation](./docs/API_KEY_SYSTEM.md)

### Quick API Usage

```javascript
// Generate an API key
const response = await fetch('/api/keys/generate-api-key', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ label: 'My App' })
});

const { apiKey } = await response.json();

// Validate an API key
const validation = await fetch('/api/keys/validate-api-key', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ apiKey })
});

const { valid } = await validation.json();
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Sanity account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cheemsdev-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Configure the following variables:
   ```env
   # Database
   POSTGRES_URL=postgresql://username:password@host:port/database
   DIRECT_URL=postgresql://username:password@host:port/database

   # API Security
   ENCRYPTION_SECRET=your_32_byte_hex_secret_here

   # Sanity
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_READ_TOKEN=your_read_token
   SANITY_API_WRITE_TOKEN=your_write_token

   # Optional
   NEXT_PUBLIC_VERCEL_URL=your_domain.com
   ```

4. **Set up the database**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Website: http://localhost:3000
   - Sanity Studio: http://localhost:3000/studio

### Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Run production server**
   ```bash
   npm start
   ```

## 📊 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript checking |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:generate` | Generate Prisma client |

## 🧪 Testing

Test the API key management system:

```bash
# Start the development server
npm run dev

# In another terminal, run the test suite
node test-api-system.js
```

## 📝 Content Management

### Sanity Studio

Access the Sanity Studio at `/studio` to manage:

- **Pages** - Website pages and landing pages
- **Products** - E-commerce product catalog
- **Collections** - Product categories and collections
- **Blog Posts** - News and blog content
- **Authors** - Content author profiles
- **FAQs** - Frequently asked questions
- **Testimonials** - Customer reviews and testimonials

### Content Types

The project includes these Sanity schemas:

- `page` - Website pages
- `product` - E-commerce products
- `collection` - Product collections
- `post` - Blog posts
- `author` - Content authors
- `faq` - FAQ items
- `testimonial` - Customer testimonials

## 🎨 Styling

This project uses Tailwind CSS with custom design tokens:

- **Colors** - Custom brand color palette
- **Typography** - Responsive font scales
- **Spacing** - Consistent spacing system
- **Components** - Pre-built UI components

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `POSTGRES_URL` | PostgreSQL connection string | ✅ |
| `DIRECT_URL` | Direct PostgreSQL connection | ✅ |
| `ENCRYPTION_SECRET` | API key encryption secret | ✅ |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID | ✅ |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name | ✅ |
| `SANITY_API_READ_TOKEN` | Sanity read token | ✅ |
| `SANITY_API_WRITE_TOKEN` | Sanity write token | ✅ |

### Database Schema

The Prisma schema includes:

```prisma
model ApiKey {
  id          String   @id @default(cuid())
  label       String
  keyHash     String   @unique
  salt        String
  lookupHash  String   @db.VarChar(16)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  lastUsed    DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([lookupHash])
  @@index([isActive])
  @@map("api_keys")
}
```

## 📚 Documentation

- [API Key System](./docs/API_KEY_SYSTEM.md) - Complete API key management guide
- [Migration Summary](./docs/MIGRATION_SUMMARY.md) - System migration details

## 🔒 Security

- **API Keys** - Secure hash-only storage with salts
- **Environment Variables** - Sensitive data in environment variables
- **HTTPS** - SSL/TLS encryption in production
- **CORS** - Configured for secure cross-origin requests
- **Validation** - Input validation on all API endpoints

## 🚀 Performance

- **Static Generation** - Pre-built pages for optimal performance
- **Image Optimization** - Automatic image optimization with Next.js
- **Code Splitting** - Automatic code splitting for faster loads
- **Caching** - Optimized caching strategies
- **Analytics** - Performance monitoring with Vercel Analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

- [ ] Add user authentication system
- [ ] Implement shopping cart functionality
- [ ] Add payment processing integration
- [ ] Create admin dashboard
- [ ] Add email notifications
- [ ] Implement search functionality
- [ ] Add internationalization (i18n)

## 📞 Support

For support and questions:

- Create an issue on GitHub
- Check the documentation in `/docs`
- Review the test files for usage examples

---

**Built with <3 by CheemsWeb**  
**Last Updated:** June 3, 2025  
**Version:** 2.0.0