export const content = {
  company: {
    name: "{{companyName}}",
    tagline: "{{tagline}}",
    email: "{{contactEmail}}",
    product: "{{productName}}"
  },
  
  hero: {
    headline: "Transform Your Business with {{productName}}",
    subheadline: "{{tagline}} - Join thousands of satisfied customers who've already made the switch.",
    ctaPrimary: "Get Started Free",
    ctaSecondary: "Watch Demo",
    heroImage: "/hero-image.jpg",
    features: [
      "✨ Easy to use",
      "🚀 Lightning fast",
      "🔒 Secure & reliable",
      "📱 Mobile ready"
    ]
  },
  
  pricing: {
    title: "Simple, Transparent Pricing",
    subtitle: "Choose the perfect plan for your needs. Upgrade or downgrade at any time.",
    plans: [
      {
        name: "Starter",
        price: "$9",
        period: "/month",
        description: "Perfect for individuals and small projects",
        features: [
          "Up to 5 projects",
          "Basic analytics",
          "Email support",
          "1GB storage"
        ],
        popular: false,
        cta: "Start Free Trial"
      },
      {
        name: "Professional",
        price: "$29",
        period: "/month",
        description: "Ideal for growing teams and businesses",
        features: [
          "Unlimited projects",
          "Advanced analytics",
          "Priority support",
          "10GB storage",
          "Team collaboration",
          "Custom integrations"
        ],
        popular: true,
        cta: "Get Started"
      },
      {
        name: "Enterprise",
        price: "$99",
        period: "/month",
        description: "For large organizations with advanced needs",
        features: [
          "Everything in Professional",
          "Dedicated account manager",
          "Custom deployment",
          "Unlimited storage",
          "Advanced security",
          "SLA guarantee"
        ],
        popular: false,
        cta: "Contact Sales"
      }
    ]
  },
  
  testimonials: {
    title: "What Our Customers Say",
    subtitle: "Don't just take our word for it - hear from some of our satisfied customers.",
    reviews: [
      {
        name: "Sarah Johnson",
        role: "CEO, TechStart",
        company: "TechStart",
        avatar: "/avatars/sarah.jpg",
        rating: 5,
        text: "{{productName}} has completely transformed how we operate. The ease of use and powerful features have saved us countless hours."
      },
      {
        name: "Michael Chen",
        role: "Product Manager",
        company: "InnovateCorp",
        avatar: "/avatars/michael.jpg",
        rating: 5,
        text: "The best investment we've made this year. Our productivity has increased by 300% since implementing {{productName}}."
      },
      {
        name: "Emily Rodriguez",
        role: "Founder",
        company: "StartupXYZ",
        avatar: "/avatars/emily.jpg",
        rating: 5,
        text: "Outstanding support and incredible features. {{companyName}} truly cares about their customers' success."
      }
    ]
  },
  
  features: {
    title: "Everything You Need to Succeed",
    subtitle: "Powerful features designed to help you achieve more",
    list: [
      {
        icon: "⚡",
        title: "Lightning Fast",
        description: "Optimized for speed and performance, delivering results in milliseconds."
      },
      {
        icon: "🔒",
        title: "Secure & Private",
        description: "Enterprise-grade security with end-to-end encryption and privacy controls."
      },
      {
        icon: "📊",
        title: "Advanced Analytics",
        description: "Detailed insights and reporting to help you make data-driven decisions."
      },
      {
        icon: "🔧",
        title: "Easy Integration",
        description: "Seamlessly integrate with your existing tools and workflows."
      },
      {
        icon: "📱",
        title: "Mobile Ready",
        description: "Full mobile support with native apps for iOS and Android."
      },
      {
        icon: "🎯",
        title: "Goal Tracking",
        description: "Set and track your goals with our intelligent progress monitoring."
      }
    ]
  },
  
  cta: {
    title: "Ready to Get Started?",
    subtitle: "Join thousands of satisfied customers and transform your business today.",
    primaryButton: "Start Your Free Trial",
    secondaryButton: "Schedule a Demo",
    note: "No credit card required • 14-day free trial"
  },
  
  footer: {
    copyright: `© ${new Date().getFullYear()} {{companyName}}. All rights reserved.`,
    links: {
      product: [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "Testimonials", href: "#testimonials" }
      ],
      company: [
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" }
      ],
      support: [
        { name: "Help Center", href: "/help" },
        { name: "Contact", href: "/contact" },
        { name: "Status", href: "/status" }
      ],
      legal: [
        { name: "Privacy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
        { name: "Security", href: "/security" }
      ]
    }
  }
};
