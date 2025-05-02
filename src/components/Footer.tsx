import { Github, Linkedin, Mail } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Separator } from './ui/separator';

const Footer = () => {
  return (
    <footer className="bg-background/50 backdrop-blur-sm border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
              Pragyesh Kumar Seth
            </h2>
            <p className="text-muted-foreground max-w-xs">
              A full stack developer focused on building responsive, accessible, and performant web applications.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/pragyesh7753"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="http://www.linkedin.com/in/pragyesh77"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:spragyesh86@gmail.com"
                className="hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Quick Links</h3>
            <ul className="space-y-2 md:space-y-0 md:flex md:space-x-6">
              <li>
                <NavLink to="/" className={({ isActive }) => 
                  `${isActive ? 'text-primary' : 'text-muted-foreground'} hover:text-primary transition-colors`
                }>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={({ isActive }) => 
                  `${isActive ? 'text-primary' : 'text-muted-foreground'} hover:text-primary transition-colors`
                }>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/projects" className={({ isActive }) => 
                  `${isActive ? 'text-primary' : 'text-muted-foreground'} hover:text-primary transition-colors`
                }>
                  Projects
                </NavLink>
              </li>
              <li>
                <NavLink to="/achievements" className={({ isActive }) => 
                  `${isActive ? 'text-primary' : 'text-muted-foreground'} hover:text-primary transition-colors`
                }>
                  Achievements
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={({ isActive }) => 
                  `${isActive ? 'text-primary' : 'text-muted-foreground'} hover:text-primary transition-colors`
                }>
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Pragyesh Kumar Seth. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;