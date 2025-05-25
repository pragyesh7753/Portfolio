import { Github, Linkedin, Mail, Twitter, MapPin } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Separator } from './ui/separator';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background/80 backdrop-blur-md border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="space-y-6 lg:col-span-1">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-500 to-purple-600">
              Pragyesh Kumar Seth
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A passionate full stack developer creating innovative solutions with modern technologies. 
              Focused on building scalable, accessible, and performant web applications.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/pragyesh7753"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                aria-label="GitHub"
              >
                <Github size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="http://www.linkedin.com/in/pragyesh77"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-blue-600 hover:text-white transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="mailto:spragyesh86@gmail.com"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-red-500 hover:text-white transition-all duration-300 group"
                aria-label="Email"
              >
                <Mail size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://x.com/SethPragyesh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-blue-400 hover:text-white transition-all duration-300 group"
                aria-label="Twitter"
              >
                <Twitter size={18} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About' },
                { to: '/projects', label: 'Projects' },
                { to: '/achievements', label: 'Achievements' },
                { to: '/contact', label: 'Contact' }
              ].map(({ to, label }) => (
                <li key={to}>
                  <NavLink 
                    to={to} 
                    className={({ isActive }) => 
                      `text-sm transition-all duration-200 hover:translate-x-1 inline-block ${
                        isActive 
                          ? 'text-primary font-medium' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services/Skills */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Services</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="hover:text-foreground transition-colors cursor-pointer">Web Development</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">API Development</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Consulting</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail size={16} className="text-primary" />
                <span>spragyesh86@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <MapPin size={16} className="text-primary" />
                <span>India</span>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-8 bg-border/60" />
        
        <div className="flex justify-center items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Pragyesh Kumar Seth. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;