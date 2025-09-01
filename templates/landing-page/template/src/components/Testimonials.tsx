// #if animations
import { motion } from 'framer-motion';
// #endif
import { Star, Quote } from 'lucide-react';
import { content } from '../data/content';

export default function Testimonials() {
  const { testimonials } = content;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section id="testimonials" className="section-padding bg-white">
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
            {testimonials.title}
          </motion.h2>
          {/* #endif */}
          
          {/* #if !animations */}
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {testimonials.title}
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
            {testimonials.subtitle}
          </motion.p>
          {/* #endif */}
          
          {/* #if !animations */}
          <p className="text-xl text-gray-600">
            {testimonials.subtitle}
          </p>
          {/* #endif */
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.reviews.map((review, index) => (
            {/* #if animations */}
            <motion.div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
            {/* #endif */}
            
            {/* #if !animations */}
            <div key={index} className="bg-gray-50 rounded-2xl p-8 relative">
            {/* #endif */
              {/* Quote icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <Quote className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex space-x-1 mb-4 mt-4">
                {renderStars(review.rating)}
              </div>

              {/* Review text */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{review.text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary-800 font-semibold text-lg">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{review.name}</div>
                  <div className="text-gray-600 text-sm">
                    {review.role}, {review.company}
                  </div>
                </div>
              </div>
            {/* #if animations */}
            </motion.div>
            {/* #endif */}
            
            {/* #if !animations */}
            </div>
            {/* #endif */
          ))}
        </div>

        {/* Trust indicators */}
        {/* #if animations */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="font-semibold">4.9/5</span>
              <span className="ml-1">average rating</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold">10,000+</span>
              <span className="ml-1">happy customers</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold">99.9%</span>
              <span className="ml-1">uptime guarantee</span>
            </div>
          </div>
        </motion.div>
        {/* #endif */}
        
        {/* #if !animations */}
        <div className="text-center mt-16">
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="font-semibold">4.9/5</span>
              <span className="ml-1">average rating</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold">10,000+</span>
              <span className="ml-1">happy customers</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold">99.9%</span>
              <span className="ml-1">uptime guarantee</span>
            </div>
          </div>
        </div>
        {/* #endif */
      </div>
    </section>
  );
}
