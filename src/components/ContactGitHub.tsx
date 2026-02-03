import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Linkedin, Github, Send, ArrowUpRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { initEmailJS, sendContactEmail } from "@/lib/emailjs-config";
import { motion } from "framer-motion";

const ContactGitHub = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const { toast } = useToast();

  useEffect(() => {
    initEmailJS();
  }, []);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 5) {
      newErrors.subject = "Subject is required";
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = "Message is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await sendContactEmail(formData);
      toast({
        title: "Message sent!",
        description: result.message,
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "gkr5413@gmail.com", href: "mailto:gkr5413@gmail.com" },
    { icon: Phone, label: "Phone", value: "+1 (816) 352-4975", href: "tel:+18163524975" },
    { icon: MapPin, label: "Location", value: "Kansas City, MO", href: null },
  ];

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com/GKR5413" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/RAJU5413/" },
  ];

  return (
    <section id="contact" className="py-24 bg-white dark:bg-neutral-950">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-sm font-medium tracking-widest uppercase text-stone-400 dark:text-stone-500 mb-4">
            Contact
          </h2>
          <p className="text-2xl sm:text-3xl text-stone-900 dark:text-stone-100">
            Let's work together
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Info Items */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0">
                    <info.icon className="h-4 w-4 text-stone-500 dark:text-stone-400" />
                  </div>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <span className="text-sm text-stone-600 dark:text-stone-400">{info.value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-stone-200 dark:border-neutral-800 flex items-center justify-center text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:border-stone-300 dark:hover:border-neutral-700 transition-colors"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-500 pt-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span>Available for opportunities</span>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-stone-200 dark:border-neutral-800 bg-stone-50 dark:bg-neutral-900 shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-xs font-medium text-stone-600 dark:text-stone-400">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        disabled={isSubmitting}
                        className={`bg-white dark:bg-neutral-950 border-stone-200 dark:border-neutral-800 focus:border-stone-400 dark:focus:border-neutral-600 ${errors.name ? 'border-red-400' : ''}`}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs font-medium text-stone-600 dark:text-stone-400">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        disabled={isSubmitting}
                        className={`bg-white dark:bg-neutral-950 border-stone-200 dark:border-neutral-800 focus:border-stone-400 dark:focus:border-neutral-600 ${errors.email ? 'border-red-400' : ''}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="subject" className="text-xs font-medium text-stone-600 dark:text-stone-400">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      disabled={isSubmitting}
                      className={`bg-white dark:bg-neutral-950 border-stone-200 dark:border-neutral-800 focus:border-stone-400 dark:focus:border-neutral-600 ${errors.subject ? 'border-red-400' : ''}`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-xs font-medium text-stone-600 dark:text-stone-400">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your message..."
                      rows={4}
                      disabled={isSubmitting}
                      className={`bg-white dark:bg-neutral-950 border-stone-200 dark:border-neutral-800 focus:border-stone-400 dark:focus:border-neutral-600 resize-none ${errors.message ? 'border-red-400' : ''}`}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactGitHub;
