import { useState } from "react";
// #if animations
import { motion } from "framer-motion";
// #endif
import { portfolioData, Project } from "../data/portfolio";

export default function Projects() {
  const { projects } = portfolioData;
  const [filter, setFilter] = useState<'all' | 'featured'>('all');
  
  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.featured);
  
  const ProjectCard = ({ project }: { project: Project }) => {
    const CardContent = () => (
      <div className="card overflow-hidden group">
        {/* Project Image */}
        <div className="relative overflow-hidden">
          <div className="relative w-full h-48 bg-gradient-to-br from-primary-400 to-primary-600 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  const placeholder = parent.querySelector('.placeholder-text');
                  if (placeholder) {
                    placeholder.classList.remove('hidden');
                  }
                }
              }}
            />
            <div className="placeholder-text absolute inset-0 flex items-center justify-center text-white font-semibold text-lg text-center p-4 hidden">
              {project.title}
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-2 left-2 right-2 flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-white text-gray-900 px-2 sm:px-3 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-medium text-center hover:bg-gray-100 transition-colors"
                >
                  Live Demo
                </a>
              )}
              {project.sourceUrl && (
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-primary-600 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-medium text-center hover:bg-primary-700 transition-colors"
                >
                  Source
                </a>
              )}
            </div>
          </div>
        </div>
        
        {/* Project Info */}
        <div className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base line-clamp-2">
            {project.description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs sm:text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );

    // #if animations
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full"
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
    <section id="projects" className="section bg-white dark:bg-gray-900">
      <div className="container">
        {/* #if animations */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Featured Projects</h2>
          
          {/* Filter buttons */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 w-full max-w-sm">
              <button
                onClick={() => setFilter('all')}
                className={`flex-1 px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span className="hidden sm:inline">All Projects ({projects.length})</span>
                <span className="sm:hidden">All ({projects.length})</span>
              </button>
              <button
                onClick={() => setFilter('featured')}
                className={`flex-1 px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  filter === 'featured'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span className="hidden sm:inline">Featured ({projects.filter(p => p.featured).length})</span>
                <span className="sm:hidden">Featured ({projects.filter(p => p.featured).length})</span>
              </button>
            </div>
          </div>
          
          {/* Projects grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No projects found.</p>
            </div>
          )}
        </motion.div>
        {/* #endif */}
        
        {/* #if !animations */}
        <div>
          <h2 className="section-title">Featured Projects</h2>
          
          {/* Filter buttons */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 w-full max-w-sm">
              <button
                onClick={() => setFilter('all')}
                className={`flex-1 px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span className="hidden sm:inline">All Projects ({projects.length})</span>
                <span className="sm:hidden">All ({projects.length})</span>
              </button>
              <button
                onClick={() => setFilter('featured')}
                className={`flex-1 px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  filter === 'featured'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span className="hidden sm:inline">Featured ({projects.filter(p => p.featured).length})</span>
                <span className="sm:hidden">Featured ({projects.filter(p => p.featured).length})</span>
              </button>
            </div>
          </div>
          
          {/* Projects grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No projects found.</p>
            </div>
          )}
        </div>
        {/* #endif */}
      </div>
    </section>
  );
}
