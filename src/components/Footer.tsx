import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com/GKR5413" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/RAJU5413/" },
    { name: "Email", icon: Mail, href: "mailto:gkr5413@gmail.com" },
  ];

  return (
    <footer className="py-12 bg-stone-50 dark:bg-neutral-900 border-t border-stone-200 dark:border-neutral-800">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Left */}
          <div>
            <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-2">
              Raju Gottumukkala
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-500">
              Software Engineer
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-stone-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-stone-400 dark:text-stone-500">
            © {currentYear} Raju Gottumukkala
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"
          >
            <ArrowUp className="h-4 w-4 mr-1" />
            Back to top
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
