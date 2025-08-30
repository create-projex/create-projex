// #if animations
import { motion } from "framer-motion";
// #endif
import { portfolioData } from "../data/portfolio";

export default function Experience() {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="section bg-gray-50 dark:bg-gray-800">
      <div className="container">
        {/* #if animations */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Experience</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-700"></div>
              
              {experience.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white dark:border-gray-800"></div>
                  
                  {/* Content */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="card p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {job.position}
                        </h3>
                        <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                          {job.duration}
                        </span>
                      </div>
                      
                      <div className="text-primary-700 dark:text-primary-300 font-semibold mb-2">
                        {job.company} • {job.location}
                      </div>
                      
                      <ul className="space-y-2">
                        {job.description.map((item, i) => (
                          <li key={i} className="text-gray-600 dark:text-gray-300 flex">
                            <span className="text-primary-500 mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        {/* #endif */}
        
        {/* #if !animations */}
        <div>
          <h2 className="section-title">Experience</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-700"></div>
              
              {experience.map((job, index) => (
                <div
                  key={job.id}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white dark:border-gray-800"></div>
                  
                  {/* Content */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="card p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {job.position}
                        </h3>
                        <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                          {job.duration}
                        </span>
                      </div>
                      
                      <div className="text-primary-700 dark:text-primary-300 font-semibold mb-2">
                        {job.company} • {job.location}
                      </div>
                      
                      <ul className="space-y-2">
                        {job.description.map((item, i) => (
                          <li key={i} className="text-gray-600 dark:text-gray-300 flex">
                            <span className="text-primary-500 mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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
