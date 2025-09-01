// #if animations
import { motion } from 'framer-motion';
// #endif
import { content } from '../data/content';

export default function Features() {
  const { features } = content;

  return (
    <section id="features" className="section-padding bg-white">
      <div className="container-width">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* #if animations */}
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {features.title}
          </motion.h2>
          {/* #endif */}
          
          {/* #if !animations */}
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {features.title}
          </h2>
          {/* #endif */

          {/* #if animations */}
          <motion.p
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {features.subtitle}
          </motion.p>
          {/* #endif */}
          
          {/* #if !animations */}
          <p className="text-xl text-gray-600">
            {features.subtitle}
          </p>
          {/* #endif */
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.list.map((feature, index) => (
            {/* #if animations */}
            <motion.div
              key={index}
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
            {/* #endif */}
            
            {/* #if !animations */}
            <div key={index} className="text-center group">
            {/* #endif */
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            {/* #if animations */}
            </motion.div>
            {/* #endif */}
            
            {/* #if !animations */}
            </div>
            {/* #endif */
          ))}
        </div>
      </div>
    </section>
  );
}
