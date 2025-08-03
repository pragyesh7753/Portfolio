import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Instagram, Send, Clock, MessageCircle, Sparkles } from 'lucide-react';

// Custom X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useToast } from './ui/use-toast';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', subject: '', message: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  const formProgress = Object.values(formData).filter(v => v.trim()).length * 25;

  // Auto-save with localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem('contact-form');
      if (saved) setFormData(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const timer = setTimeout(() => {
      if (Object.values(formData).some(v => v.trim())) {
        try {
          localStorage.setItem('contact-form', JSON.stringify(formData));
        } catch {}
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [formData]);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name required';
    if (!formData.email.trim()) newErrors.email = 'Email required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.subject.trim()) newErrors.subject = 'Subject required';
    if (!formData.message.trim()) newErrors.message = 'Message required';
    else if (formData.message.length < 10) newErrors.message = 'Message too short';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Message sent! 🎉",
        description: "I'll get back to you within 24 hours.",
      });
      
      setFormData({ name: '', email: '', subject: '', message: '' });
      localStorage.removeItem('contact-form');
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or email directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      value: "spragyesh86@gmail.com",
      link: "mailto:spragyesh86@gmail.com",
      desc: "Best way to reach me"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Phone",
      value: "+91 7753847898",
      link: "tel:+917753847898",
      desc: "9 AM - 6 PM IST"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Location",
      value: "Jaunpur, U.P., India",
      desc: "UTC +5:30"
    }
  ];

  const socialLinks = [
    { icon: <Github className="w-4 h-4" />, label: "GitHub", url: "https://github.com/pragyesh7753" },
    { icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn", url: "https://linkedin.com/in/pragyesh77" },
    { icon: <XIcon className="w-4 h-4" />, label: "X", url: "https://x.com/SethPragyesh" },
    { icon: <Instagram className="w-4 h-4" />, label: "Instagram", url: "https://instagram.com/geeky_pks" }
  ];

  return (
    <div ref={containerRef} className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative">
      {/* Simplified animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1), transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(255, 107, 107, 0.1), transparent 50%)",
              "radial-gradient(circle at 50% 80%, rgba(78, 205, 196, 0.1), transparent 50%)"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        {/* Floating particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            initial={{ opacity: 0, x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0]
            }}
            transition={{ duration: 6 + i, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div className="mb-2" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <Sparkles className="w-8 h-8 text-primary mx-auto" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold mb-2">
              Let&apos;s <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Connect</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's discuss your project.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <MessageCircle className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Get in Touch</h2>
              </div>
              
              <div className="space-y-4">
                {contactInfo.map((info, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="p-4 rounded-xl bg-card/50 backdrop-blur border hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{info.title}</h3>
                        {info.link ? (
                          <a href={info.link} className="text-muted-foreground hover:text-primary transition-colors">
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{info.value}</p>
                        )}
                        <p className="text-sm text-muted-foreground/70">{info.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="pt-6">
                <h3 className="font-semibold mb-4">Connect on Social</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="p-3 bg-card/50 rounded-lg border hover:border-primary/50 transition-all"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Response Time */}
              <motion.div
                className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Quick Response</h4>
                    <p className="text-sm text-muted-foreground">
                      I typically respond within 24 hours. For urgent matters, feel free to WhatsApp directly.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <Card className="shadow-xl bg-card/80 backdrop-blur border-0">
                <motion.div
                  className="h-1 bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: 0 }}
                  animate={{ width: `${formProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
                
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="w-5 h-5 text-primary" />
                    Send Message
                  </CardTitle>
                  <CardDescription>
                    Share your project details and let&apos;s start the conversation.
                  </CardDescription>
                  <div className="text-sm text-muted-foreground">
                    Progress: {formProgress}%
                  </div>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={errors.name ? "border-destructive" : formData.name ? "border-green-500" : ""}
                          placeholder="Your name"
                        />
                        {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={errors.email ? "border-destructive" : formData.email && !errors.email ? "border-green-500" : ""}
                          placeholder="your@email.com"
                        />
                        {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={errors.subject ? "border-destructive" : formData.subject ? "border-green-500" : ""}
                        placeholder="Project inquiry or question"
                      />
                      {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject}</p>}
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label htmlFor="message">Message *</Label>
                        <span className="text-sm text-muted-foreground">{formData.message.length}/500</span>
                      </div>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className={errors.message ? "border-destructive" : formData.message.length >= 10 ? "border-green-500" : ""}
                        placeholder="Tell me about your project..."
                        rows={5}
                        maxLength={500}
                      />
                      {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        className="w-full h-12 font-semibold"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <motion.div 
                              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            Sending...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Send className="w-4 h-4" />
                            Send Message
                          </div>
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