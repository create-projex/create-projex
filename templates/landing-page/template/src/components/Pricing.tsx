// #if animations
import { motion } from 'framer-motion';
// #endif
import { Check, Star } from 'lucide-react';
import { content } from '../data/content';

export default function Pricing() {
  const { pricing } = content;

  return (
    <section id="pricing" className="section-padding bg-gray-50">
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
            {pricing.title}
          </motion.h2>
          {/* #endif */}
          
          {/* #if !animations */}
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {pricing.title}
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
            {pricing.subtitle}
          </motion.p>
          {/* #endif */}
          
          {/* #if !animations */}
          <p className="text-xl text-gray-600">
            {pricing.subtitle}
          </p>
          {/* #endif */
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricing.plans.map((plan, index) => (
            {/* #if animations */}
            <motion.div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
            {/* #endif */}
            
            {/* #if !animations */}
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''
              }`}
            >
            {/* #endif */
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-primary-500 text-white">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full ${
                  plan.popular ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                {plan.cta}
              </button>
            {/* #if animations */}
            </motion.div>
            {/* #endif */}
            
            {/* #if !animations */}
            </div>
            {/* #endif */
          ))}
        </div>

        {/* Money-back guarantee */}
        {/* #if animations */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600">
            💰 30-day money-back guarantee • 🔒 Secure payment • 📞 24/7 support
          </p>
        </motion.div>
        {/* #endif */}
        
        {/* #if !animations */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            💰 30-day money-back guarantee • 🔒 Secure payment • 📞 24/7 support
          </p>
        </div>
        {/* #endif */
      </div>
    </section>
  );
}
