// #if blog
import { Link } from "react-router-dom";
// #if animations
import { motion } from "framer-motion";
// #endif
import { portfolioData } from "../data/portfolio";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BlogPage() {
  const { blog } = portfolioData;

  const BlogCard = ({ post, index }: { post: typeof blog[0]; index: number }) => {
    const CardContent = () => (
      <Link
        to={`/blog/${post.id}`}
        className="card p-6 block hover:shadow-xl transition-all duration-300"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {post.readTime} min read
          </span>
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {post.title}
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    );

    // #if animations
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <CardContent />
      </motion.div>
    );
    // #endif
    
    // #if !animations
    return <CardContent />;
    // #endif
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="pt-20">
        <section className="section">
          <div className="container">
            {/* #if animations */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  Blog
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Thoughts, tutorials, and insights about web development, technology, and life.
                </p>
              </div>
              
              {blog && blog.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {blog.map((post, index) => (
                    <BlogCard key={post.id} post={post} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Coming Soon
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    I'm working on some great content. Check back soon!
                  </p>
                </div>
              )}
            </motion.div>
            {/* #endif */}
            
            {/* #if !animations */}
            <div>
              <div className="text-center mb-12">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  Blog
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Thoughts, tutorials, and insights about web development, technology, and life.
                </p>
              </div>
              
              {blog && blog.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {blog.map((post, index) => (
                    <BlogCard key={post.id} post={post} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Coming Soon
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    I'm working on some great content. Check back soon!
                  </p>
                </div>
              )}
            </div>
            {/* #endif */}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
// #endif

// #if !blog
export default function BlogPage() {
  return <div>Blog not enabled</div>;
}
// #endif
