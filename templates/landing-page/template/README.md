# {{companyName}} Landing Page

A modern, responsive landing page built with React, TypeScript, and Tailwind CSS. Perfect for startup product launches with all the essential sections you need.

## ✨ Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Performance Optimized**: Fast loading with optimized images and code splitting
- **SEO Ready**: Meta tags, structured data, and semantic HTML
- **Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation

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
src/
├── components/          # React components
│   ├── Hero.tsx        # Hero section with CTA
│   ├── Features.tsx    # Features showcase
│   ├── Pricing.tsx     # Pricing table
│   ├── Testimonials.tsx # Customer testimonials
│   ├── CTA.tsx         # Call-to-action section
│   ├── Navbar.tsx      # Navigation header
│   └── Footer.tsx      # Site footer
├── data/
│   └── content.ts      # Site content and configuration
├── styles/
│   └── index.css       # Global styles and Tailwind
└── App.tsx             # Main app component
```

## 🎨 Customization

### Content
Edit `src/data/content.ts` to customize:
- Company and product information
- Hero section content
- Pricing plans
- Testimonials
- Features list
- Contact information

### Styling
The template uses Tailwind CSS with custom CSS variables for colors. You can customize:
- Primary brand colors in `src/styles/index.css`
- Component styles in individual component files
- Global styles and animations

### Components
All components are modular and can be easily:
- Reordered in `App.tsx`
- Modified or extended
- Removed if not needed

## 🛠️ Built With

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Vite** - Build tool and dev server
- **Framer Motion** - Animations (optional)
- **Lucide React** - Icons

## 📱 Responsive Design

The landing page is fully responsive with:
- Mobile-first approach
- Flexible grid layouts
- Optimized typography scaling
- Touch-friendly interactions

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

### Environment Variables

Create a `.env` file for environment-specific settings:
```
VITE_GOOGLE_ANALYTICS_ID=your_ga_id
VITE_API_URL=your_api_url
```

## 🚀 Deployment

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
npm run deploy
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

Need help? Contact us at {{contactEmail}}

---

Made with ❤️ by {{companyName}}
