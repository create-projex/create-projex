export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  sourceUrl?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string[];
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
  level: 1 | 2 | 3 | 4 | 5;
}

// #if blog
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  readTime: number;
}
// #endif

export const portfolioData = {
  personal: {
    name: "{{fullName}}",
    title: "{{title}}",
    email: "{{email}}",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Passionate {{title}} with 3+ years of experience building scalable web applications. I love creating beautiful, functional software that makes a difference.",
    avatar: "/avatar.jpg",
    resume: "/resume.pdf",
    social: {
      github: "https://github.com/{{github}}",
      linkedin: "https://linkedin.com/in/{{linkedin}}",
      twitter: "https://twitter.com/{{github}}",
      email: "mailto:{{email}}",
    },
  },

  projects: [
    {
      id: "ecommerce-platform",
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with modern payment integration",
      longDescription: "A comprehensive e-commerce platform built with React, Node.js, and PostgreSQL. Features include user authentication, product management, shopping cart, payment processing with Stripe, and admin dashboard.",
      image: "/projects/ecommerce.jpg",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe", "TypeScript"],
      demoUrl: "https://demo-ecommerce.example.com",
      sourceUrl: "https://github.com/{{github}}/ecommerce-platform",
      featured: true,
    },
    {
      id: "task-manager",
      title: "Task Management App",
      description: "Collaborative task management with real-time updates",
      longDescription: "A modern task management application with drag-and-drop functionality, real-time collaboration, and team management features. Built with React, Socket.io, and MongoDB.",
      image: "/projects/taskman.jpg",
      tags: ["React", "Socket.io", "MongoDB", "Express", "Tailwind"],
      demoUrl: "https://taskman.example.com",
      sourceUrl: "https://github.com/{{github}}/task-manager",
      featured: true,
    },
    {
      id: "weather-app",
      title: "Weather Dashboard",
      description: "Beautiful weather app with location-based forecasts",
      longDescription: "A responsive weather dashboard that provides current weather conditions and 7-day forecasts. Features location detection, favorite cities, and detailed weather metrics.",
      image: "/projects/weather.jpg",
      tags: ["React", "OpenWeather API", "Chart.js", "PWA"],
      demoUrl: "https://weather-dash.example.com",
      sourceUrl: "https://github.com/{{github}}/weather-dashboard",
      featured: false,
    },
  ] as Project[],

  experience: [
    {
      id: "senior-dev",
      company: "TechCorp Inc.",
      position: "Senior Full Stack Developer",
      duration: "2022 - Present",
      location: "San Francisco, CA",
      description: [
        "Lead development of customer-facing web applications serving 100K+ users",
        "Architect and implement microservices using Node.js and Docker",
        "Mentor junior developers and conduct code reviews",
        "Collaborate with product team to deliver features on schedule",
      ],
    },
    {
      id: "fullstack-dev",
      company: "StartupXYZ",
      position: "Full Stack Developer",
      duration: "2020 - 2022",
      location: "Remote",
      description: [
        "Built responsive web applications using React and TypeScript",
        "Developed RESTful APIs with Express.js and MongoDB",
        "Implemented automated testing and CI/CD pipelines",
        "Worked directly with clients to gather requirements and deliver solutions",
      ],
    },
    {
      id: "intern",
      company: "DevAgency",
      position: "Software Development Intern",
      duration: "2019 - 2020",
      location: "New York, NY",
      description: [
        "Assisted in developing e-commerce websites using React and WordPress",
        "Created responsive layouts and implemented modern UI components",
        "Participated in agile development processes and daily standups",
        "Learned industry best practices for web development",
      ],
    },
  ] as Experience[],

  skills: [
    // Frontend
    { name: "React", category: "frontend", level: 5 },
    { name: "TypeScript", category: "frontend", level: 4 },
    { name: "JavaScript", category: "frontend", level: 5 },
    { name: "HTML/CSS", category: "frontend", level: 5 },
    { name: "Tailwind CSS", category: "frontend", level: 4 },
    { name: "Next.js", category: "frontend", level: 4 },
    { name: "Vue.js", category: "frontend", level: 3 },
    
    // Backend
    { name: "Node.js", category: "backend", level: 4 },
    { name: "Express.js", category: "backend", level: 4 },
    { name: "PostgreSQL", category: "backend", level: 4 },
    { name: "MongoDB", category: "backend", level: 3 },
    { name: "GraphQL", category: "backend", level: 3 },
    { name: "REST APIs", category: "backend", level: 5 },
    
    // Tools
    { name: "Git", category: "tools", level: 5 },
    { name: "Docker", category: "tools", level: 3 },
    { name: "AWS", category: "tools", level: 3 },
    { name: "Figma", category: "tools", level: 4 },
    { name: "Jest", category: "tools", level: 4 },
  ] as Skill[],

  // #if blog
  blog: [
    {
      id: "react-performance",
      title: "Optimizing React Performance: Tips and Tricks",
      excerpt: "Learn how to make your React applications faster with these proven optimization techniques.",
      content: "# Optimizing React Performance\n\nReact performance is crucial for user experience...",
      date: "2024-01-15",
      tags: ["React", "Performance", "JavaScript"],
      readTime: 8,
    },
    {
      id: "typescript-tips",
      title: "TypeScript Best Practices for 2024",
      excerpt: "Essential TypeScript patterns and practices every developer should know.",
      content: "# TypeScript Best Practices\n\nTypeScript has become essential...",
      date: "2024-01-10",
      tags: ["TypeScript", "Best Practices", "Development"],
      readTime: 6,
    },
  ] as BlogPost[],
  // #endif
};
