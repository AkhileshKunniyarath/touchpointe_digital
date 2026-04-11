# Implementation Plan - Touchpointe Fullstack Website

Build a dynamic, production-ready website for "Touchpointe" using Next.js 14 (App Router) with a integrated admin panel and MongoDB/MinIO storage.

## User Review Required

> [!IMPORTANT]
> The project will be initialized in `d:\touchpointe\New folder\touchpointe_digital`. I will use the credentials found in the existing `.env` file in the sibling directory.

> [!WARNING]
> I will be using `Next.js 14` with the App Router as specified. The UI will follow the "Blue → Purple" gradient theme with a dark mode base.

## Proposed Changes

### 1. Project Initialization & Setup
- Initialize Next.js app with TypeScript, Tailwind, and App Router.
- Configure `tailwind.config.ts` with the Touchpointe color palette.
- Set up `shadcn/ui` components.
- Configure `.env` with MongoDB and MinIO credentials.

### 2. Core Library Setup
- **MongoDB**: Initialize Mongoose connection in `lib/mongodb.ts`.
- **MinIO**: Set up client in `lib/minio.ts`.
- **NextAuth**: Configure admin authentication in `lib/auth.ts` and `app/api/auth/[...nextauth]/route.ts`.
- **Zod**: Create schemas for all content types in `schemas/`.

### 3. Database Models
- Create Mongoose models in `models/`:
  - `User` (Admin)
  - `Blog`
  - `Service`
  - `Product`
  - `CaseStudy`
  - `Insight`

### 4. API Layer (Route Handlers)
- Implement CRUD endpoints in `app/api/[resource]/route.ts` for all models.
- Implement file upload handler in `app/api/upload/route.ts` (MinIO integration).

### 5. Design System & Components
- Implement global styles in `app/globals.css` (Gradients, Glows).
- Build shared components: `Navbar`, `Footer`, `Buttons`, `Cards`, `SectionWrapper`.
- Use `Framer Motion` for smooth entrance and hover animations.

### 6. Admin Panel `/(admin)`
- Implement layout with sidebar.
- Create dashboard with stats.
- Build CRUD pages for all content types.
- Integrate `TipTap` for rich text editing.
- Implement media gallery for MinIO assets.

### 7. Website Pages `/(website)`
- **Home**: Hero section, service highlights, featured blogs.
- **Services/Products/Blogs/Insights/CaseStudies**: Listing pages with filters and search.
- **Detail Pages**: Dynamic routes with SEO metadata.
- **Tech Stack & Working Flow**: Interactive sections.
- **Contact**: Form with validation and API submission.

### 8. SEO & Performance
- Implement `generateMetadata` for dynamic pages.
- Auto-generate `sitemap.xml` and `robots.txt`.
- Integrate Google Analytics 4.
- Configure ISR (Incremental Static Regeneration) for blogs and case studies.

## Open Questions

1. **Authentication**: Do you have a preferred admin email/password for the initial setup, or should I create a seed script?
2. **Logo**: Should I attempt to generate a logo using `generate_image` based on the name "Touchpointe" if I don't have the original?
3. **Draft Mode**: Should I implement a "Draft/Published" toggle for all content types? (Suggested: Yes).

## Verification Plan

### Automated Tests
- Build verification: `npm run build`.
- Linting: `npm run lint`.

### Manual Verification
- Test all CRUD operations in the admin panel.
- Verify image uploads to MinIO.
- Check responsive design across mobile and desktop.
- Verify SEO tags using browser tools.
- Check GA4 tracking events.
