export const SITE = {
  title: '{{blogTitle}}',
  description: '{{blogDescription}}',
  defaultLanguage: 'en_US',
  // #if analytics
  googleAnalyticsId: '{{googleAnalyticsId}}',
  // #endif
  // #if !analytics
  googleAnalyticsId: '',
  // #endif
  author: {
    name: '{{authorName}}',
    email: '{{authorEmail}}',
    bio: '{{authorBio}}',
    social: {
      github: '{{github}}',
      twitter: '{{twitter}}',
      linkedin: '{{linkedin}}',
    },
  },
} as const;

export const FEATURES = {
  // #if darkMode
  darkMode: true,
  // #endif
  // #if !darkMode
  darkMode: false,
  // #endif
  // #if analytics
  analytics: true,
  // #endif
  // #if !analytics
  analytics: false,
  // #endif
  // #if newsletter
  newsletter: true,
  // #endif
  // #if !newsletter
  newsletter: false,
  // #endif
  comments: '{{comments}}',
} as const;



export const BLOG = {
  postsPerPage: 6,
  showReadingTime: true,
  showAuthor: true,
  showDate: true,
  showTags: true,
} as const;
