import { motion, useAnimation, useInView } from 'framer-motion';
import { Mail, MapPin, Send, Loader2, MessageCircle, User, Clock, CheckCircle, Star, Sparkles, Heart } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

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

const ContactEnhanced = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  // Contact information with enhanced styling
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Address",
      content: "spragyesh86@gmail.com",
      href: "mailto:spragyesh86@gmail.com",
      description: "Send me an email anytime",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      content: "Jaunpur, U.P., India",
      href: "https://maps.google.com/?q=Jaunpur,UP,India",
      description: "Available for remote work",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Response Time",
      content: "Within 24 hours",
      description: "I'll get back to you quickly",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10"
    }
  ];

  // Fun facts about collaboration
  const collaborationStats = [
    { label: "Response Rate", value: "100%", icon: "⚡" },
    { label: "Average Response", value: "< 24h", icon: "⏰" },
    { label: "Project Success", value: "100%", icon: "🎯" },
    { label: "Client Satisfaction", value: "5/5", icon: "⭐" }
  ];

  // Floating particles for background effect
  const [particles] = useState(Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    duration: 15 + Math.random() * 25
  })));

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
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
    } else if (formData.subject.length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      // Use the Email.js service to send emails
      const emailjs = await import('@emailjs/browser');
      
      // Make sure we're using the correct environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('Email service not configured properly');
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'Pragyesh Kumar Seth',
        },
        publicKey
      );

      toast({
        title: "Message sent successfully! ✨",
        description: "Thank you for reaching out. I'll get back to you within 24 hours.",
        duration: 5000,
      });

      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Failed to send message",
        description: "Something went wrong. Please try again or contact me directly at spragyesh86@gmail.com",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/10 to-blue-500/5 rounded-full blur-[120px] opacity-60 animate-pulse" />
      <div className="absolute -bottom-20 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-500/5 to-primary/10 rounded-full blur-[100px] opacity-60 animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Dynamic mouse-following gradient */}
      <motion.div 
        className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle, rgba(var(--primary-rgb, 59 130 246), 0.03) 0%, transparent 70%)`,
          left: mousePosition.x - 250,
          top: mousePosition.y - 250,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut"
        }}
      />
      
      {/* Floating particles */}
      {particles.map(particle => (
        <motion.div 
          key={particle.id}
          className="absolute rounded-full bg-primary/5 dark:bg-primary/10 pointer-events-none"
          style={{
            top: `${particle.y}%`,
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: ['-20%', '20%'],
            x: ['10%', '-10%'],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{
            repeat: Infinity,
            duration: particle.duration,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeatType: "reverse",
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-16"
        >
          {/* Enhanced header section */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <div className="flex items-center justify-center mb-6">
              <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-primary/70 mr-4 rounded-full"></div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-600">
                  Let's Connect
                </h2>
                <motion.div 
                  className="absolute -top-2 -right-2"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 8,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="w-6 h-6 text-primary/60" />
                </motion.div>
              </motion.div>
              <div className="h-0.5 w-12 bg-gradient-to-l from-transparent to-primary/70 ml-4 rounded-full"></div>
            </div>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              Ready to bring your ideas to life? I'm excited to hear about your project and explore how we can create something amazing together.
            </motion.p>

            {/* Collaboration stats */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
            >
              {collaborationStats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center p-4 rounded-xl bg-card/30 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all group"
                >
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="font-bold text-lg group-hover:text-primary transition-colors">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <MessageCircle className="w-6 h-6 mr-3 text-primary" />
                  Get in Touch
                </h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <motion.div
                      key={info.title}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="group"
                    >
                      {info.href ? (
                        <a 
                          href={info.href}
                          target={info.href.startsWith('http') ? '_blank' : undefined}
                          rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="block"
                        >
                          <Card className="p-6 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border-primary/10 hover:border-primary/30 bg-card/50 backdrop-blur-sm">
                            <div className="flex items-center space-x-4">
                              <div className={cn(
                                "p-3 rounded-lg transition-all duration-300 group-hover:scale-110",
                                info.bgColor
                              )}>
                                <div className={cn("bg-gradient-to-r bg-clip-text text-transparent", info.color)}>
                                  {info.icon}
                                </div>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">{info.title}</h4>
                                <p className="text-muted-foreground group-hover:text-foreground transition-colors">{info.content}</p>
                                <p className="text-sm text-muted-foreground/80">{info.description}</p>
                              </div>
                              <motion.div
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                whileHover={{ x: 5 }}
                              >
                                <Send className="w-4 h-4 text-primary" />
                              </motion.div>
                            </div>
                          </Card>
                        </a>
                      ) : (
                        <Card className="p-6 border-primary/10 bg-card/50 backdrop-blur-sm">
                          <div className="flex items-center space-x-4">
                            <div className={cn(
                              "p-3 rounded-lg",
                              info.bgColor
                            )}>
                              <div className={cn("bg-gradient-to-r bg-clip-text text-transparent", info.color)}>
                                {info.icon}
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg">{info.title}</h4>
                              <p className="text-muted-foreground">{info.content}</p>
                              <p className="text-sm text-muted-foreground/80">{info.description}</p>
                            </div>
                          </div>
                        </Card>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Why work with me section */}
              <motion.div variants={itemVariants}>
                <h4 className="text-xl font-semibold mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-500" />
                  Why Work With Me?
                </h4>
                <div className="space-y-3">
                  {[
                    "💡 Creative problem-solving approach",
                    "🚀 Fast turnaround times",
                    "📱 Mobile-first responsive design",
                    "🔧 Modern technologies and best practices",
                    "💬 Clear communication throughout",
                    "🎯 Focus on your business goals"
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Enhanced Contact Form */}
            <motion.div variants={itemVariants}>
              <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all shadow-lg hover:shadow-xl hover:shadow-primary/10">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl flex items-center">
                    <User className="w-6 h-6 mr-3 text-primary" />
                    Send Me a Message
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Fill out the form below and I'll get back to you as soon as possible.
                  </p>
                </CardHeader>
                
                <CardContent className="px-0 pb-0">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          Full Name
                        </Label>
                        <div className="relative">
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            className={cn(
                              "transition-all duration-300",
                              focusedField === 'name' && "ring-2 ring-primary/20 border-primary/40",
                              errors.name && "border-red-500 focus:border-red-500 focus:ring-red-200"
                            )}
                            placeholder="Your full name"
                          />
                          {focusedField === 'name' && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                              <Star className="w-4 h-4 text-primary" />
                            </motion.div>
                          )}
                        </div>
                        {errors.name && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-red-500 flex items-center"
                          >
                            <span className="mr-1">⚠️</span>
                            {errors.name}
                          </motion.p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          Email Address
                        </Label>
                        <div className="relative">
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            className={cn(
                              "transition-all duration-300",
                              focusedField === 'email' && "ring-2 ring-primary/20 border-primary/40",
                              errors.email && "border-red-500 focus:border-red-500 focus:ring-red-200"
                            )}
                            placeholder="your.email@example.com"
                          />
                          {focusedField === 'email' && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            </motion.div>
                          )}
                        </div>
                        {errors.email && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-red-500 flex items-center"
                          >
                            <span className="mr-1">⚠️</span>
                            {errors.email}
                          </motion.p>
                        )}
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm font-medium flex items-center">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Subject
                      </Label>
                      <div className="relative">
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          value={formData.subject}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('subject')}
                          onBlur={() => setFocusedField(null)}
                          className={cn(
                            "transition-all duration-300",
                            focusedField === 'subject' && "ring-2 ring-primary/20 border-primary/40",
                            errors.subject && "border-red-500 focus:border-red-500 focus:ring-red-200"
                          )}
                          placeholder="What's this about?"
                        />
                        {focusedField === 'subject' && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            <Sparkles className="w-4 h-4 text-purple-500" />
                          </motion.div>
                        )}
                      </div>
                      {errors.subject && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-500 flex items-center"
                        >
                          <span className="mr-1">⚠️</span>
                          {errors.subject}
                        </motion.p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium flex items-center">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {formData.message.length}/500
                        </Badge>
                      </Label>
                      <div className="relative">
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          className={cn(
                            "min-h-[120px] resize-none transition-all duration-300",
                            focusedField === 'message' && "ring-2 ring-primary/20 border-primary/40",
                            errors.message && "border-red-500 focus:border-red-500 focus:ring-red-200"
                          )}
                          placeholder="Tell me about your project, ideas, or just say hello!"
                          maxLength={500}
                        />
                        {focusedField === 'message' && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute right-3 top-3"
                          >
                            <Heart className="w-4 h-4 text-red-500" />
                          </motion.div>
                        )}
                      </div>
                      {errors.message && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-500 flex items-center"
                        >
                          <span className="mr-1">⚠️</span>
                          {errors.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/25"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Sending Message...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Send className="mr-2 h-5 w-5" />
                            Send Message
                            <motion.span
                              className="ml-2"
                              animate={{ x: [0, 5, 0] }}
                              transition={{ 
                                repeat: Infinity, 
                                duration: 1.5,
                                ease: "easeInOut"
                              }}
                            >
                              ✨
                            </motion.span>
                          </div>
                        )}
                      </Button>
                    </motion.div>

                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-sm text-muted-foreground text-center mt-4"
                    >
                      🔒 Your information is secure and will never be shared with third parties.
                    </motion.p>
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

export default ContactEnhanced;
