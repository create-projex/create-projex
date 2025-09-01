# {{blogTitle}}

{{blogDescription}}

Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com).

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── content/         # Blog posts and content
│   │   └── blog/        # Blog post markdown files
│   ├── layouts/         # Page layouts
│   ├── pages/           # File-based routing
│   ├── styles/          # Global styles
│   └── utils/           # Utility functions
├── astro.config.mjs     # Astro configuration
└── tailwind.config.mjs  # Tailwind CSS configuration
```

## ✍️ Writing Blog Posts

Create new blog posts in `src/content/blog/` with the following frontmatter:

```markdown
---
title: "Your Post Title"
description: "A brief description of your post"
pubDate: 2024-01-01
heroImage: "/path-to-image.jpg" # Optional
heroImageAlt: "Alt text for image" # Optional
tags: ["tag1", "tag2"]
categories: ["category1"]
draft: false # Set to true to hide from production
featured: false # Set to true to feature on homepage
---

Your post content here...
```

## 🎨 Customization

### Site Configuration

Edit `src/config.ts` to customize your site settings:

- Site title and description
- Author information
- Social media links
- Feature toggles

### Styling

The site uses Tailwind CSS for styling. You can:

- Modify the color scheme in `tailwind.config.mjs`
- Add custom styles in `src/styles/global.css`
- Customize component styles directly in `.astro` files

### Adding New Pages

Create new pages in the `src/pages/` directory. Astro uses file-based routing:

- `src/pages/about.astro` → `/about`
- `src/pages/contact.astro` → `/contact`
- `src/pages/blog/[...slug].astro` → `/blog/post-slug`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run check` - Run Astro type checking

## 📊 Features

- ✅ **SEO Optimized** - Meta tags, Open Graph, structured data
- ✅ **Fast Performance** - Astro's zero-JS architecture
- ✅ **Responsive Design** - Mobile-first Tailwind CSS
<!-- #if darkMode -->
- ✅ **Dark Mode** - Toggle between light and dark themes
<!-- #endif -->
- ✅ **RSS Feed** - Automatically generated at `/rss.xml`
- ✅ **Sitemap** - Automatically generated
- ✅ **Blog Features** - Tags, categories, pagination
- ✅ **MDX Support** - Write posts in Markdown with JSX components
- ✅ **Reading Time** - Automatic reading time calculation
<!-- #if analytics -->
- ✅ **Analytics Ready** - Google Analytics integration
<!-- #endif -->
<!-- #if comments -->
- ✅ **Comments** - Giscus integration for blog comments
<!-- #endif -->

## 🚀 Deployment

This blog can be deployed to various platforms:

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Use GitHub Actions to deploy dist/ folder
```

## 📝 Content Management

### Adding Images

1. Add images to the `public/` directory
2. Reference them in your posts: `![Alt text](/image.jpg)`
3. For hero images, use the full path: `heroImage: "/blog/my-image.jpg"`

### Tags and Categories

- Tags are displayed on post cards and have dedicated pages
- Categories can be used for broader organization
- Both support automatic page generation

### Draft Posts

Set `draft: true` in the frontmatter to hide posts from production while keeping them in development.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using [Astro](https://astro.build)
