import { Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-cover bg-center bg-no-repeat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Hi, I'm <span className="text-blue-400">Pragyesh Kumar Seth</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Frontend Developer | Web Development Enthusiast
          </p>

          <div className="flex justify-center space-x-6 mb-12">
            <a href="https://github.com/pragyesh7753" target="_blank" rel="noopener noreferrer" 
              className="hover:text-blue-400 transition-colors">
              <Github size={28} />
            </a>
            <a href="http://www.linkedin.com/in/pragyesh77" target="_blank" rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors">
              <Linkedin size={28} />
            </a>
            <a href="mailto:spragyesh86@gmail.com"
              className="hover:text-blue-400 transition-colors">
              <Mail size={28} />
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link to="/contact" 
              className="bg-blue-500 hover:bg-blue-600 hover:text-white text-white px-8 py-3 rounded-full 
                transition-colors inline-block font-semibold">
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;