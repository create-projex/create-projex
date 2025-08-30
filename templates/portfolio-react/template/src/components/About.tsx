// #if animations
import { motion } from "framer-motion";
// #endif
import { portfolioData } from "../data/portfolio";

export default function About() {
  const { personal } = portfolioData;

  const stats = [
    { label: "Years of Experience", value: "3+" },
    { label: "Projects Completed", value: "20+" },
    { label: "Technologies", value: "15+" },
    { label: "Happy Clients", value: "10+" },
  ];

  return (
    <section id="about" className="section bg-white dark:bg-gray-900">
      <div className="container">
        {/* #if animations */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">About Me</h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  {personal.bio}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  When I'm not coding, you can find me exploring new technologies, contributing to open source projects, 
                  or enjoying outdoor activities. I believe in continuous learning and staying up-to-date with the latest 
                  industry trends.
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  I'm passionate about creating user-friendly applications that solve real-world problems and make 
                  a positive impact on people's lives.
                </p>
              </div>
              
              <div className="mt-8">
                <a
                  href={personal.resume}
                  className="btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Resume
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m-6 8v-3" />
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="card p-6 text-center"
                >
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
        {/* #endif */}
        
        {/* #if !animations */}
        <div>
          <h2 className="section-title">About Me</h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  {personal.bio}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  When I'm not coding, you can find me exploring new technologies, contributing to open source projects, 
                  or enjoying outdoor activities. I believe in continuous learning and staying up-to-date with the latest 
                  industry trends.
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  I'm passionate about creating user-friendly applications that solve real-world problems and make 
                  a positive impact on people's lives.
                </p>
              </div>
              
              <div className="mt-8">
                <a
                  href={personal.resume}
                  className="btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Resume
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m-6 8v-3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="card p-6 text-center">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* #endif */}
      </div>
    </section>
  );
}
