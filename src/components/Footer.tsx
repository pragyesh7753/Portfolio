import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { memo } from 'react';

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialLinks = [
  { href: 'https://github.com/pragyesh7753', icon: Github, label: 'GitHub', hover: 'hover:bg-primary hover:text-primary-foreground' },
  { href: 'http://www.linkedin.com/in/pragyesh77', icon: Linkedin, label: 'LinkedIn', hover: 'hover:bg-blue-600 hover:text-white' },
  { href: 'mailto:spragyesh86@gmail.com', icon: Mail, label: 'Email', hover: 'hover:bg-red-500 hover:text-white' },
  { href: 'https://x.com/SethPragyesh', icon: XIcon, label: 'X', hover: 'hover:bg-blue-400 hover:text-white' }
];

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/achievements', label: 'Achievements' },
  { to: '/contact', label: 'Contact' }
];

const services = ['Web Development', 'API Development', 'Consulting'];

const Footer = memo(() => (
  <footer className="bg-background/80 backdrop-blur-md border-t border-border/40">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-500 to-purple-600">
            Pragyesh Kumar Seth
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Full stack developer creating innovative solutions with modern technologies. 
            Building scalable, accessible, and performant web applications.
          </p>
          <div className="flex gap-3">
            {socialLinks.map(({ href, icon: Icon, label, hover }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`flex items-center justify-center w-10 h-10 rounded-full bg-muted ${hover} transition-all duration-300 group`}
                aria-label={label}
              >
                <Icon className="group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-3">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink 
                  to={to} 
                  className={({ isActive }) => 
                    `text-sm transition-all duration-200 hover:translate-x-1 inline-block ${
                      isActive ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Services</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {services.map(service => (
              <li key={service} className="hover:text-foreground transition-colors cursor-pointer">
                {service}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Get In Touch</h3>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-primary" />
              <span>spragyesh86@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-primary" />
              <span>India</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-border/60 mt-12 pt-8 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Pragyesh Kumar Seth. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
));

Footer.displayName = 'Footer';

export default Footer;