import { motion } from 'framer-motion';
import { Code2, Server, Globe, Database } from 'lucide-react';

const About = () => {
  const skills = [
    { name: 'Frontend Development', icon: <Code2 className="w-6 h-6" />, description: 'React, TypeScript, Tailwind CSS' },
    { name: 'Backend Development', icon: <Server className="w-6 h-6" />, description: 'Node.js, Express, Python' },
    { name: 'Web Technologies', icon: <Globe className="w-6 h-6" />, description: 'HTML5, CSS3, JavaScript' },
    { name: 'Database', icon: <Database className="w-6 h-6" />, description: 'MongoDB, MySQL, PostgreSQL' }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8">About Me</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="space-y-4">
              <p className="text-gray-300">
                I am a passionate Full Stack Developer with expertise in modern web technologies.
                My journey in web development started with curiosity and has evolved into a
                professional career building robust and scalable applications.
              </p>
              <p className="text-gray-300">
                I specialize in creating responsive web applications using React and Node.js,
                with a strong focus on clean code and optimal user experience. I'm constantly
                learning and adapting to new technologies to stay current in this ever-evolving field.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-gray-800 p-6 rounded-lg"
                >
                  <div className="text-blue-400 mb-3">{skill.icon}</div>
                  <h3 className="font-semibold mb-2">{skill.name}</h3>
                  <p className="text-sm text-gray-400">{skill.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;