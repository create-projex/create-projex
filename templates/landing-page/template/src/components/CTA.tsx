// #if animations
import { motion } from 'framer-motion';
// #endif
import { ArrowRight, Calendar } from 'lucide-react';
import { content } from '../data/content';

export default function CTA() {
  const { cta } = content;

  return (
    <section className="section-padding gradient-bg">
      <div className="container-width">
        {/* #if animations */}
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            {cta.title}
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            {cta.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button className="btn bg-white text-primary-600 hover:bg-gray-50 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 group">
              {cta.primaryButton}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="btn bg-primary-700 text-white hover:bg-primary-800 border border-primary-500 group">
              <Calendar className="mr-2 h-5 w-5" />
              {cta.secondaryButton}
            </button>
          </div>

          <p className="text-primary-200 text-sm">
            {cta.note}
          </p>
        </motion.div>
        {/* #endif */}
        
        {/* #if !animations */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            {cta.title}
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            {cta.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button className="btn bg-white text-primary-600 hover:bg-gray-50 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 group">
              {cta.primaryButton}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="btn bg-primary-700 text-white hover:bg-primary-800 border border-primary-500 group">
              <Calendar className="mr-2 h-5 w-5" />
              {cta.secondaryButton}
            </button>
          </div>

          <p className="text-primary-200 text-sm">
            {cta.note}
          </p>
        </div>
        {/* #endif */}
      </div>

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white opacity-5 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white opacity-5 rounded-full blur-2xl"></div>
      </div>
    </section>
  );
}
