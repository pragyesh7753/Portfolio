import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Instagram, Send, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useToast } from './ui/use-toast';
import emailjs from '@emailjs/browser';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactInfo = [
  {
    icon: <Mail className="w-4 h-4" />,
    title: 'Email',
    value: 'spragyesh86@gmail.com',
    link: 'mailto:spragyesh86@gmail.com',
  },
  {
    icon: <Phone className="w-4 h-4" />,
    title: 'Phone',
    value: '+91 7753847898',
    link: 'tel:+917753847898',
  },
  {
    icon: <MapPin className="w-4 h-4" />,
    title: 'Location',
    value: 'India',
  },
];

const socialLinks = [
  { icon: <Github className="w-4 h-4" />, label: 'GitHub', url: 'https://github.com/pragyesh7753' },
  {
    icon: <Linkedin className="w-4 h-4" />,
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/pragyesh77',
  },
  { icon: <XIcon className="w-4 h-4" />, label: 'X', url: 'https://x.com/SethPragyesh' },
  {
    icon: <Instagram className="w-4 h-4" />,
    label: 'Instagram',
    url: 'https://instagram.com/geeky_pks',
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Load saved form
  useEffect(() => {
    try {
      const saved = localStorage.getItem('contact-form');
      if (saved) setFormData(JSON.parse(saved));
    } catch {
      /* empty */
    }
  }, []);

  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Object.values(formData).some((v) => v.trim())) {
        try {
          localStorage.setItem('contact-form', JSON.stringify(formData));
        } catch {
          /* empty */
        }
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [formData]);

  // GSAP heading
  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = headingRef.current?.querySelectorAll('.ct-char');
      if (chars?.length) {
        gsap.fromTo(
          chars,
          { y: '100%' },
          {
            y: '0%',
            stagger: 0.03,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name required';
    if (!formData.email.trim()) newErrors.email = 'Email required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.subject.trim()) newErrors.subject = 'Subject required';
    if (!formData.message.trim()) newErrors.message = 'Message required';
    else if (formData.message.length < 10) newErrors.message = 'Min 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((p) => ({ ...p, [name]: value }));
      if (errors[name as keyof FormData])
        setErrors((p) => ({ ...p, [name]: undefined }));
    },
    [errors]
  );

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
        title: 'Message sent!',
        description: "I'll get back to you within 24 hours.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      localStorage.removeItem('contact-form');
    } catch {
      toast({
        title: 'Something went wrong',
        description: 'Please try again or email directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Label */}
        <div className="mb-4">
          <span className="text-[10px] font-mono text-cyan-400/60 uppercase tracking-[0.3em]">
            04 — Contact
          </span>
        </div>

        {/* Heading */}
        <div ref={headingRef} className="mb-20">
          <div className="overflow-hidden mb-2">
            <div className="flex flex-wrap">
              {"LET'S".split('').map((char, i) => (
                <span
                  key={`a-${i}`}
                  className="ct-char inline-block leading-[0.85] bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent"
                  style={{
                    fontSize: 'clamp(2.5rem, 7vw, 8rem)',
                    fontWeight: 900,
                    letterSpacing: '-0.04em',
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="flex flex-wrap">
              {'CONNECT'.split('').map((char, i) => (
                <span
                  key={`b-${i}`}
                  className="ct-char inline-block leading-[0.85]"
                  style={{
                    fontSize: 'clamp(2.5rem, 7vw, 8rem)',
                    fontWeight: 900,
                    letterSpacing: '-0.04em',
                    WebkitTextStroke: '1.5px rgba(6,182,212,0.4)',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              Ready to bring your ideas to life? Let's discuss your project and
              create something amazing together.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              {contactInfo.map((info, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl border border-foreground/[0.06] bg-gradient-to-r from-foreground/[0.02] to-cyan-500/[0.015] hover:border-cyan-500/20 hover:shadow-md hover:shadow-cyan-500/5 transition-all duration-300 group"
                >
                  <div className="p-2 rounded-lg bg-foreground/[0.05] text-muted-foreground group-hover:text-foreground transition-colors">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-[11px] text-muted-foreground/50 uppercase tracking-wider font-medium">
                      {info.title}
                    </p>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-sm text-foreground/80">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p className="text-[11px] font-medium text-muted-foreground/50 uppercase tracking-[0.2em] mb-4">
                Socials
              </p>
              <div className="flex gap-2.5">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl border border-foreground/[0.06] bg-foreground/[0.02] text-muted-foreground hover:text-foreground hover:border-indigo-500/20 hover:bg-indigo-500/[0.05] transition-all duration-300"
                    aria-label={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Response time */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-indigo-500/[0.05] border border-indigo-500/[0.08]">
              <Clock className="w-4 h-4 text-indigo-500" />
              <p className="text-xs text-muted-foreground">
                Typically respond within 24 hours
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="p-8 rounded-2xl border border-foreground/[0.05] bg-foreground/[0.015]">
              <div className="flex items-center gap-2.5 mb-2">
                <Send className="w-4 h-4 text-indigo-500" />
                <h3 className="text-lg font-semibold">Send Message</h3>
              </div>
              <p className="text-sm text-muted-foreground/60 mb-8">
                Share your project details and let's start a conversation.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="name" className="text-xs text-muted-foreground/60 uppercase tracking-wider">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={cn(
                        'mt-2 bg-foreground/[0.03] border-foreground/[0.06] focus:border-indigo-500/30',
                        errors.name && 'border-destructive'
                      )}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-destructive mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-xs text-muted-foreground/60 uppercase tracking-wider">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={cn(
                        'mt-2 bg-foreground/[0.03] border-foreground/[0.06] focus:border-indigo-500/30',
                        errors.email && 'border-destructive'
                      )}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-destructive mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject" className="text-xs text-muted-foreground/60 uppercase tracking-wider">
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project inquiry"
                    className={cn(
                      'mt-2 bg-foreground/[0.03] border-foreground/[0.06] focus:border-indigo-500/30',
                      errors.subject && 'border-destructive'
                    )}
                  />
                  {errors.subject && (
                    <p className="text-[11px] text-destructive mt-1">{errors.subject}</p>
                  )}
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="message" className="text-xs text-muted-foreground/60 uppercase tracking-wider">
                      Message *
                    </Label>
                    <span className="text-[10px] text-muted-foreground/40 font-mono">
                      {formData.message.length}/500
                    </span>
                  </div>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={4}
                    maxLength={500}
                    className={cn(
                      'bg-foreground/[0.03] border-foreground/[0.06] focus:border-indigo-500/30 resize-none',
                      errors.message && 'border-destructive'
                    )}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-destructive mt-1">{errors.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-full h-12 font-medium bg-foreground text-background hover:bg-foreground/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" /> Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
