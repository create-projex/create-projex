// #if blog
import { useParams, Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// #if animations
import { motion } from "framer-motion";
// #endif
import { portfolioData } from "../data/portfolio";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const { blog } = portfolioData;
  
  const post = blog?.find(p => p.id === id);
  
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="pt-20">
        <article className="section">
          <div className="container max-w-4xl">
            {/* #if animations */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Back button */}
              <Link
                to="/blog"
                className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-8 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blog
              </Link>
              
              {/* Post header */}
              <header className="mb-12">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-primary-600 dark:text-primary-400 font-medium">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {post.readTime} min read
                  </span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  {post.title}
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </header>
              
              {/* Post content */}
              <div className="card p-8">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ children }) => <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6">{children}</h3>,
                      p: ({ children }) => <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{children}</p>,
                      code: ({ children, className }) => {
                        const isBlock = className?.includes('language-');
                        return isBlock ? (
                          <code className={`${className} block bg-gray-800 text-green-300 p-4 rounded-lg overflow-x-auto`}>
                            {children}
                          </code>
                        ) : (
                          <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                            {children}
                          </code>
                        );
                      },
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-primary-500 pl-4 italic text-gray-600 dark:text-gray-400 my-6">
                          {children}
                        </blockquote>
                      ),
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>
              </div>
              
              {/* Back to blog */}
              <div className="mt-12 text-center">
                <Link
                  to="/blog"
                  className="btn-primary"
                >
                  Read More Posts
                </Link>
              </div>
            </motion.div>
            {/* #endif */}
            
            {/* #if !animations */}
            <div>
              {/* Back button */}
              <Link
                to="/blog"
                className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-8 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blog
              </Link>
              
              {/* Post header */}
              <header className="mb-12">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-primary-600 dark:text-primary-400 font-medium">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {post.readTime} min read
                  </span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  {post.title}
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </header>
              
              {/* Post content */}
              <div className="card p-8">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ children }) => <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6">{children}</h3>,
                      p: ({ children }) => <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{children}</p>,
                      code: ({ children, className }) => {
                        const isBlock = className?.includes('language-');
                        return isBlock ? (
                          <code className={`${className} block bg-gray-800 text-green-300 p-4 rounded-lg overflow-x-auto`}>
                            {children}
                          </code>
                        ) : (
                          <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                            {children}
                          </code>
                        );
                      },
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-primary-500 pl-4 italic text-gray-600 dark:text-gray-400 my-6">
                          {children}
                        </blockquote>
                      ),
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>
              </div>
              
              {/* Back to blog */}
              <div className="mt-12 text-center">
                <Link
                  to="/blog"
                  className="btn-primary"
                >
                  Read More Posts
                </Link>
              </div>
            </div>
            {/* #endif */}
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
}
// #endif

// #if !blog
export default function BlogPostPage() {
  return <div>Blog not enabled</div>;
}
// #endif
