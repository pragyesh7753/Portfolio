import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, Save, Clock, Instagram, Sparkles, Zap, Heart, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useToast } from './ui/use-toast';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [formProgress, setFormProgress] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout | null>(null);

  // Track window size for particles
  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Set initial size
    if (typeof window !== 'undefined') {
      updateWindowSize();
      window.addEventListener('resize', updateWindowSize);
      return () => window.removeEventListener('resize', updateWindowSize);
    }
  }, []);

  // Track mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const x = e.clientX - containerRef.current.getBoundingClientRect().left;
        const y = e.clientY - containerRef.current.getBoundingClientRect().top;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Calculate form completion progress
  useEffect(() => {
    const filledFields = Object.values(formData).filter(value => value.trim() !== '').length;
    const progress = (filledFields / 4) * 100;
    setFormProgress(progress);
  }, [formData]);

  // Auto-save functionality
  useEffect(() => {
    // Only access localStorage on client side
    if (typeof window === 'undefined') return;
    
    try {
      const savedData = localStorage.getItem('contact-form-draft');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
        const savedTime = localStorage.getItem('contact-form-saved-time');
        if (savedTime) {
          setLastSaved(new Date(savedTime));
        }
      }
    } catch (error) {
      console.error('Error loading saved form data:', error);
      // Clear corrupted data
      try {
        localStorage.removeItem('contact-form-draft');
        localStorage.removeItem('contact-form-saved-time');
      } catch (e) {
        console.error('Error clearing corrupted data:', e);
      }
    }
  }, []);

  useEffect(() => {
    // Only access localStorage on client side
    if (typeof window === 'undefined') return;
    
    const hasContent = Object.values(formData).some(value => value.trim() !== '');
    if (hasContent) {
      const timer = setTimeout(() => {
        try {
          localStorage.setItem('contact-form-draft', JSON.stringify(formData));
          localStorage.setItem('contact-form-saved-time', new Date().toISOString());
          setLastSaved(new Date());
        } catch (error) {
          console.error('Error saving form data:', error);
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [formData]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setIsTyping(true);
    
    // Clear previous typing timer
    if (typingTimer) {
      clearTimeout(typingTimer);
    }
    
    // Add haptic feedback for mobile (with error handling)
    try {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(10);
      }
    } catch (error) {
      // Silently fail if vibration is not supported
    }
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }

    // Stop typing indicator after 1 second
    const newTimer = setTimeout(() => setIsTyping(false), 1000);
    setTypingTimer(newTimer);
  }, [errors, typingTimer]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (typingTimer) {
        clearTimeout(typingTimer);
      }
    };
  }, [typingTimer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Message sent successfully! 🎉",
        description: "Thank you for reaching out. I'll get back to you within 24 hours.",
      });
      
      // Clear form and localStorage
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      localStorage.removeItem('contact-form-draft');
      localStorage.removeItem('contact-form-saved-time');
      setLastSaved(null);
    } catch (error) {
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again or reach out via email directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearDraft = useCallback(() => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Only access localStorage on client side
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem('contact-form-draft');
      localStorage.removeItem('contact-form-saved-time');
      setLastSaved(null);
      toast({
        title: "Draft cleared",
        description: "Form has been reset successfully.",
      });
    } catch (error) {
      console.error('Error clearing draft:', error);
      toast({
        title: "Error",
        description: "Could not clear draft. Please try again.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "Email",
      value: "spragyesh86@gmail.com",
      link: "mailto:spragyesh86@gmail.com",
      description: "Best way to reach me",
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20"
    },
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: "Phone",
      value: "+91 7753938370",
      link: "tel:+917753938370",
      description: "Available 9 AM - 6 PM IST",
      gradient: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-950/20"
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: "Location",
      value: "Jaunpur, U.P., India",
      description: "UTC +5:30",
      gradient: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/20"
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      url: "https://github.com/pragyesh7753",
      color: "hover:text-gray-900 dark:hover:text-gray-100",
      bgGradient: "from-gray-600 to-gray-800"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      url: "https://linkedin.com/in/pragyesh77",
      color: "hover:text-blue-600",
      bgGradient: "from-blue-600 to-blue-700"
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      label: "X",
      url: "https://x.com/SethPragyesh",
      color: "hover:text-blue-400",
      bgGradient: "from-sky-400 to-blue-500"
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      label: "Instagram",
      url: "https://instagram.com/geeky_pks",
      color: "hover:text-primary",
      bgGradient: "from-primary to-primary/80"
    }
  ];

  // Floating particles component with proper key handling
  const FloatingParticle = ({ delay, index }: { delay: number; index: number }) => (
    <motion.div
      key={`particle-${index}`}
      className="absolute w-2 h-2 bg-primary/20 rounded-full"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        x: [0, Math.random() * 200 - 100],
        y: [0, Math.random() * 200 - 100],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        repeatDelay: 2,
      }}
    />
  );

  // Enhanced floating particle component
  const EnhancedFloatingParticle = ({ delay }: { delay: number }) => {
    // Use useMemo to prevent recalculation on each render
    const initialX = useMemo(() => Math.random() * windowSize.width, [windowSize.width]);
    const initialY = useMemo(() => Math.random() * windowSize.height, [windowSize.height]);
    const randomScale = useMemo(() => Math.random() * 2 + 1, []);
    const randomDuration = useMemo(() => Math.random() * 10 + 10, []);
    
    return (
      <motion.div
        className="absolute w-1 h-1 bg-primary/40 rounded-full"
        initial={{ 
          opacity: 0, 
          scale: 0,
          x: initialX,
          y: initialY
        }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, randomScale, 0],
          x: [
            initialX,
            initialX + (Math.random() - 0.5) * 400,
            initialX + (Math.random() - 0.5) * 400
          ],
          y: [
            initialY,
            initialY + (Math.random() - 0.5) * 300,
            initialY + (Math.random() - 0.5) * 300
          ],
        }}
        transition={{
          duration: randomDuration,
          delay,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    );
  };

  const messageCharCount = formData.message.length;
  const messageMaxLength = 1000;

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Creative Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        
        {/* Animated radial gradients */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(600px circle at 0% 0%, rgba(120, 119, 198, 0.15), transparent 50%)",
              "radial-gradient(600px circle at 100% 100%, rgba(120, 119, 198, 0.15), transparent 50%)",
              "radial-gradient(600px circle at 0% 100%, rgba(255, 107, 107, 0.1), transparent 50%)",
              "radial-gradient(600px circle at 100% 0%, rgba(78, 205, 196, 0.1), transparent 50%)",
              "radial-gradient(600px circle at 50% 50%, rgba(199, 146, 234, 0.12), transparent 50%)",
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Geometric shapes */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-tr from-secondary/15 to-primary/15 rounded-lg blur-lg"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
            rotate: [0, -180, -360],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
        
        <motion.div
          className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-bl from-purple-400/10 to-pink-400/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        />
        
        {/* Floating geometric elements */}
        <motion.div
          className="absolute top-60 left-1/3 w-4 h-4 bg-primary/30 rotate-45"
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            rotate: [45, 225, 45],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
        />
        
        <motion.div
          className="absolute top-80 right-1/3 w-6 h-6 border-2 border-secondary/40 rounded-full"
          animate={{
            y: [0, -80, 0],
            opacity: [0, 1, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 7, repeat: Infinity, delay: 1.5 }}
        />
        
        <motion.div
          className="absolute bottom-60 right-1/4 w-3 h-8 bg-gradient-to-t from-primary/40 to-transparent"
          animate={{
            y: [0, -60, 0],
            opacity: [0, 0.8, 0],
            scaleY: [1, 1.3, 1],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 2.5 }}
        />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(120, 119, 198, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(120, 119, 198, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Animated mesh gradient */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "conic-gradient(from 0deg at 20% 50%, transparent, rgba(120, 119, 198, 0.1), transparent)",
              "conic-gradient(from 90deg at 80% 50%, transparent, rgba(255, 107, 107, 0.1), transparent)",
              "conic-gradient(from 180deg at 50% 80%, transparent, rgba(78, 205, 196, 0.1), transparent)",
              "conic-gradient(from 270deg at 50% 20%, transparent, rgba(199, 146, 234, 0.1), transparent)",
            ]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        
        {/* Enhanced floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <EnhancedFloatingParticle key={`enhanced-particle-${i}`} delay={i * 0.3} />
        ))}
        
        {/* Floating particles with proper keys - keeping original */}
        {Array.from({ length: 15 }).map((_, i) => (
          <FloatingParticle key={`floating-particle-${i}`} delay={i * 0.5} index={i} />
        ))}
        
        {/* Parallax lines */}
        <motion.div
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 3 }}
        />
        
        <motion.div
          className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent"
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 5 }}
        />
      </div>

      {/* Interactive cursor follow effect */}
      <motion.div
        className="fixed w-6 h-6 rounded-full bg-primary/20 pointer-events-none z-50 mix-blend-difference hidden lg:block"
        style={{ x, y }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Enhanced Header */}
          <div className="text-center mb-16 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="absolute -top-4 left-1/2 transform -translate-x-1/2"
            >
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              Let's <span className="relative bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">Connect
                <motion.span
                  className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              Ready to turn your ideas into reality? I'd love to hear about your project and explore how we can work together.
              <motion.span
                className="inline-block ml-2"
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
              >
                ✨
              </motion.span>
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Enhanced Contact Info */}
            <div className="space-y-8">
              {/* Contact Information Cards */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <MessageCircle className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl md:text-3xl font-bold">Get in Touch</h2>
                </div>
                
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={`contact-info-${index}`}
                      initial={{ opacity: 0, x: -20, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className={`group relative overflow-hidden p-6 rounded-2xl ${info.bgColor} backdrop-blur-sm border border-white/10 cursor-pointer transition-all duration-300`}
                    >
                      {/* Animated gradient background */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${info.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                      />
                      
                      <div className="relative flex items-center space-x-4">
                        <motion.div 
                          className="flex-shrink-0 p-3 bg-white/10 rounded-xl backdrop-blur-sm"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          {info.icon}
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{info.title}</h3>
                          {info.link ? (
                            <motion.a
                              href={info.link}
                              className="text-muted-foreground hover:text-primary transition-colors font-medium text-base mb-1 block"
                              whileHover={{ x: 4 }}
                            >
                              {info.value}
                            </motion.a>
                          ) : (
                            <p className="text-muted-foreground font-medium text-base mb-1">{info.value}</p>
                          )}
                          <p className="text-sm text-muted-foreground/70">{info.description}</p>
                        </div>
                        
                        {/* Hover indicator */}
                        <motion.div
                          className="opacity-0 group-hover:opacity-100"
                          initial={{ x: -10 }}
                          whileHover={{ x: 0 }}
                        >
                          <Zap className="w-4 h-4 text-primary" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <Separator className="my-8" />

              {/* Enhanced Social Links */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8 }}
              >
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Connect on Social
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={`social-link-${index}`}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden flex flex-col items-center space-y-2 p-4 rounded-xl bg-accent/30 backdrop-blur-sm border border-white/10 transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.9 + index * 0.1 }}
                    >
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${social.bgGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                      />
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                      >
                        {social.icon}
                      </motion.div>
                      <span className="font-medium text-sm text-center">{social.label}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Enhanced Response Time Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.9 }}
                className="relative overflow-hidden p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-primary/20 backdrop-blur-sm"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="relative flex items-start space-x-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <Clock className="w-6 h-6 text-primary flex-shrink-0" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Quick Response</h4>
                    <p className="text-muted-foreground">
                      I typically respond to messages within 24 hours. For urgent matters, 
                      feel free to call or text directly.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Enhanced Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <Card className="relative overflow-hidden shadow-2xl border-0 bg-card/80 backdrop-blur-md">
                {/* Progress bar */}
                <motion.div
                  className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: 0 }}
                  animate={{ width: `${formProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
                
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl md:text-3xl flex items-center gap-3">
                        <motion.div
                          animate={{ rotate: isTyping ? 360 : 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Send className="w-6 h-6 text-primary" />
                        </motion.div>
                        Send a Message
                      </CardTitle>
                      <CardDescription className="text-base mt-2">
                        Share your details and let's start the conversation.
                      </CardDescription>
                    </div>
                    {isTyping && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                      >
                        <Badge variant="secondary" className="animate-pulse">
                          <motion.div 
                            className="w-2 h-2 bg-primary rounded-full mr-2"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                          />
                          Typing...
                        </Badge>
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Form progress indicator */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground mt-4">
                    <span>Form completion: {Math.round(formProgress)}%</span>
                    {formProgress > 0 && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-primary font-medium"
                      >
                        {formProgress === 100 ? "Ready to send! 🚀" : "Keep going! 💪"}
                      </motion.span>
                    )}
                  </div>
                  
                  {lastSaved && (
                    <motion.div 
                      className="flex items-center space-x-2 text-sm text-muted-foreground mt-2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Save className="w-4 h-4" />
                      <span>Draft saved {lastSaved.toLocaleTimeString()}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearDraft}
                        className="h-6 px-2 text-xs hover:bg-destructive/10 hover:text-destructive"
                      >
                        Clear
                      </Button>
                    </motion.div>
                  )}
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div 
                        className="space-y-2"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Label htmlFor="name" className="flex items-center gap-2">
                          Name *
                          {formData.name && <span className="text-green-500 text-xs">✓</span>}
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`transition-all duration-300 ${errors.name ? "border-destructive" : formData.name ? "border-green-500" : "focus:border-primary"}`}
                          placeholder="Your full name"
                          autoComplete="name"
                        />
                        {errors.name && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-destructive flex items-center gap-1"
                          >
                            ⚠️ {errors.name}
                          </motion.p>
                        )}
                      </motion.div>
                      
                      <motion.div 
                        className="space-y-2"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Label htmlFor="email" className="flex items-center gap-2">
                          Email *
                          {formData.email && !errors.email && <span className="text-green-500 text-xs">✓</span>}
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`transition-all duration-300 ${errors.email ? "border-destructive" : (formData.email && !errors.email) ? "border-green-500" : "focus:border-primary"}`}
                          placeholder="your.email@example.com"
                          autoComplete="email"
                        />
                        {errors.email && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-destructive flex items-center gap-1"
                          >
                            ⚠️ {errors.email}
                          </motion.p>
                        )}
                      </motion.div>
                    </div>

                    <motion.div 
                      className="space-y-2"
                      whileFocus={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Label htmlFor="subject" className="flex items-center gap-2">
                        Subject *
                        {formData.subject && <span className="text-green-500 text-xs">✓</span>}
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`transition-all duration-300 ${errors.subject ? "border-destructive" : formData.subject ? "border-green-500" : "focus:border-primary"}`}
                        placeholder="Project inquiry, collaboration, or general question"
                      />
                      {errors.subject && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-destructive flex items-center gap-1"
                        >
                          ⚠️ {errors.subject}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div 
                      className="space-y-2"
                      whileFocus={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center justify-between">
                        <Label htmlFor="message" className="flex items-center gap-2">
                          Message *
                          {formData.message && formData.message.length >= 10 && <span className="text-green-500 text-xs">✓</span>}
                        </Label>
                        <motion.span 
                          className={`text-sm ${messageCharCount > messageMaxLength ? 'text-destructive' : messageCharCount > messageMaxLength * 0.8 ? 'text-yellow-500' : 'text-muted-foreground'}`}
                          animate={{ scale: messageCharCount > messageMaxLength ? [1, 1.1, 1] : 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {messageCharCount}/{messageMaxLength}
                        </motion.span>
                      </div>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className={`transition-all duration-300 resize-none ${errors.message ? "border-destructive" : (formData.message && formData.message.length >= 10) ? "border-green-500" : "focus:border-primary"}`}
                        placeholder="Tell me about your project, timeline, budget, and any specific requirements..."
                        rows={6}
                        maxLength={messageMaxLength}
                      />
                      {errors.message && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-destructive flex items-center gap-1"
                        >
                          ⚠️ {errors.message}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        className="w-full h-14 text-lg font-semibold relative overflow-hidden group"
                        disabled={isSubmitting}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        {isSubmitting ? (
                          <div className="flex items-center space-x-2 relative z-10">
                            <motion.div 
                              className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            <span>Sending your message...</span>
                          </div>
                        ) : (
                          <motion.div 
                            className="flex items-center space-x-2 relative z-10"
                            whileHover={{ x: 4 }}
                          >
                            <Send className="w-5 h-5" />
                            <span>Send Message</span>
                            <motion.span
                              animate={{ x: [0, 4, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              ✨
                            </motion.span>
                          </motion.div>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;