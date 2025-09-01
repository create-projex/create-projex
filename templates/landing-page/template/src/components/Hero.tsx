// #if animations
import { motion } from 'framer-motion';
// #endif
import { ArrowRight, Play } from 'lucide-react';
import { content } from '../data/content';

export default function Hero() {
  const { hero } = content;

  return (
    <section className="relative overflow-hidden bg-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* #if animations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {hero.headline}
              </h1>
            </motion.div>
            {/* #endif */}
            
            {/* #if !animations */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {hero.headline}
            </h1>
            {/* #endif */

            {/* #if animations */}
            <motion.p
              className="text-xl text-gray-600 max-w-2xl text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {hero.subheadline}
            </motion.p>
            {/* #endif */}
            
            {/* #if !animations */}
            <p className="text-xl text-gray-600 max-w-2xl text-balance">
              {hero.subheadline}
            </p>
            {/* #endif */

            {/* Feature badges */}
            {/* #if animations */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {hero.features.map((feature, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                >
                  {feature}
                </span>
              ))}
            </motion.div>
            {/* #endif */}
            
            {/* #if !animations */}
            <div className="flex flex-wrap gap-4">
              {hero.features.map((feature, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                >
                  {feature}
                </span>
              ))}
            </div>
            {/* #endif */

            {/* CTA Buttons */}
            {/* #if animations */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button className="btn-primary group">
                {hero.ctaPrimary}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="btn-secondary group">
                <Play className="mr-2 h-4 w-4" />
                {hero.ctaSecondary}
              </button>
            </motion.div>
            {/* #endif */}
            
            {/* #if !animations */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary group">
                {hero.ctaPrimary}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="btn-secondary group">
                <Play className="mr-2 h-4 w-4" />
                {hero.ctaSecondary}
              </button>
            </div>
            {/* #endif */
          </div>

          {/* Hero Image */}
          <div className="relative">
            {/* #if animations */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl p-8 shadow-2xl animate-float">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="space-y-4">
                    {/* Mock dashboard/app interface */}
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-primary-200 rounded w-2/3"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-6">
                      <div className="h-16 bg-primary-100 rounded-lg"></div>
                      <div className="h-16 bg-primary-200 rounded-lg"></div>
                      <div className="h-16 bg-primary-300 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* #endif */}
            
            {/* #if !animations */}
            <div className="relative bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl p-8 shadow-2xl animate-float">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="space-y-4">
                  {/* Mock dashboard/app interface */}
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-primary-200 rounded w-2/3"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-6">
                    <div className="h-16 bg-primary-100 rounded-lg"></div>
                    <div className="h-16 bg-primary-200 rounded-lg"></div>
                    <div className="h-16 bg-primary-300 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
            {/* #endif */

            {/* Background decorations */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200 rounded-full opacity-50 animate-bounce-slow"></div>
            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-primary-300 rounded-full opacity-30"></div>
          </div>
        </div>
      </div>

      {/* Background patterns */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary-200 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-primary-300 rounded-full opacity-10 blur-3xl"></div>
      </div>
    </section>
  );
}
