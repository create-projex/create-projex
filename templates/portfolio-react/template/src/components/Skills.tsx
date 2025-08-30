// #if animations
import { motion } from "framer-motion";
// #endif
import { portfolioData, Skill } from "../data/portfolio";

export default function Skills() {
  const { skills } = portfolioData;
  
  const skillCategories = {
    frontend: skills.filter(skill => skill.category === 'frontend'),
    backend: skills.filter(skill => skill.category === 'backend'),
    tools: skills.filter(skill => skill.category === 'tools'),
    other: skills.filter(skill => skill.category === 'other'),
  };

  const categoryTitles = {
    frontend: 'Frontend',
    backend: 'Backend',
    tools: 'Tools & Technologies',
    other: 'Other Skills',
  };

  const getSkillColor = (level: number) => {
    switch (level) {
      case 5: return 'bg-green-500';
      case 4: return 'bg-blue-500';
      case 3: return 'bg-yellow-500';
      case 2: return 'bg-orange-500';
      case 1: return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const SkillCard = ({ skill }: { skill: Skill }) => {
    const CardContent = () => (
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h4>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((dot) => (
              <div
                key={dot}
                className={`w-2 h-2 rounded-full ${
                  dot <= skill.level
                    ? getSkillColor(skill.level)
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-1000 ${getSkillColor(skill.level)}`}
            style={{ width: `${skill.level * 20}%` }}
          />
        </div>
      </div>
    );

    // #if animations
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
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
    <section id="skills" className="section bg-gray-50 dark:bg-gray-800">
      <div className="container">
        {/* #if animations */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Skills & Technologies</h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {Object.entries(skillCategories).map(([category, categorySkills]) => (
              categorySkills.length > 0 && (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="card p-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    {categoryTitles[category as keyof typeof categoryTitles]}
                  </h3>
                  <div className="space-y-4">
                    {categorySkills.map((skill) => (
                      <SkillCard
                        key={skill.name}
                        skill={skill}
                      />
                    ))}
                  </div>
                </motion.div>
              )
            ))}
          </div>
          
          {/* Skill level legend */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center space-x-6 bg-white dark:bg-gray-900 px-6 py-3 rounded-lg shadow-sm">
              <span className="text-sm text-gray-600 dark:text-gray-400">Skill Level:</span>
              {[
                { level: 1, label: 'Beginner' },
                { level: 3, label: 'Intermediate' },
                { level: 5, label: 'Advanced' },
              ].map(({ level, label }) => (
                <div key={level} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getSkillColor(level)}`} />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
        {/* #endif */}
        
        {/* #if !animations */}
        <div>
          <h2 className="section-title">Skills & Technologies</h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {Object.entries(skillCategories).map(([category, categorySkills]) => (
              categorySkills.length > 0 && (
                <div key={category} className="card p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    {categoryTitles[category as keyof typeof categoryTitles]}
                  </h3>
                  <div className="space-y-4">
                    {categorySkills.map((skill) => (
                      <SkillCard
                        key={skill.name}
                        skill={skill}
                      />
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
          
          {/* Skill level legend */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-6 bg-white dark:bg-gray-900 px-6 py-3 rounded-lg shadow-sm">
              <span className="text-sm text-gray-600 dark:text-gray-400">Skill Level:</span>
              {[
                { level: 1, label: 'Beginner' },
                { level: 3, label: 'Intermediate' },
                { level: 5, label: 'Advanced' },
              ].map(({ level, label }) => (
                <div key={level} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getSkillColor(level)}`} />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
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
