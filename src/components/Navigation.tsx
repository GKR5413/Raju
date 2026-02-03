import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun, Eye, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCustomTheme } from "@/App";
import ResumeModal from "./ResumeModal";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [shouldHide, setShouldHide] = useState(false);
  const { theme, triggerThemeTransition } = useCustomTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      setShouldHide(scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    triggerThemeTransition(x, y);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const navItems = [
    { name: "Home", sectionId: "home" },
    { name: "About", sectionId: "about" },
    { name: "Experience", sectionId: "experience" },
    { name: "Projects", sectionId: "projects" },
    { name: "Contact", sectionId: "contact" },
  ];

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-[150] transition-all duration-300 ease-out",
        scrolled ? "bg-stone-50/90 dark:bg-neutral-950/90 backdrop-blur-sm border-b border-stone-200/50 dark:border-neutral-800/50" : "bg-transparent",
        shouldHide ? "opacity-0 pointer-events-none -translate-y-full" : "opacity-100 translate-y-0"
      )}>
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-16 w-full">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('home')}
              className="text-lg font-semibold text-stone-900 dark:text-stone-100 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
            >
              RG
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 px-4 py-2 text-sm transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="w-9 h-9 rounded-full text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-neutral-800"
              >
                {mounted && theme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
                onClick={() => setResumeModalOpen(true)}
              >
                Resume
              </Button>
              <Button
                size="sm"
                className="text-sm bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 rounded-full px-4"
                onClick={() => window.open('mailto:gkr5413@gmail.com', '_blank')}
              >
                Contact
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="w-9 h-9 rounded-full text-stone-500 dark:text-stone-400"
              >
                {mounted && theme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="w-9 h-9 rounded-full text-stone-600 dark:text-stone-400"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={cn(
            "md:hidden transition-all duration-300 ease-out overflow-hidden",
            isOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
          )}>
            <div className="py-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="block w-full text-left px-4 py-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 text-sm transition-colors"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 mt-4 border-t border-stone-200 dark:border-neutral-800 space-y-2 px-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center text-sm border-stone-300 dark:border-neutral-700"
                  onClick={() => setResumeModalOpen(true)}
                >
                  View Resume
                </Button>
                <Button
                  size="sm"
                  className="w-full justify-center text-sm bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
                  onClick={() => window.open('mailto:gkr5413@gmail.com', '_blank')}
                >
                  Contact
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Floating theme toggle when nav is hidden */}
      <div className={cn(
        "fixed top-4 right-4 z-[160] transition-all duration-300 hidden md:block",
        shouldHide ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          className="w-10 h-10 rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border border-stone-200 dark:border-neutral-800 text-stone-600 dark:text-stone-400 shadow-sm"
        >
          {mounted && theme === 'dark' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
      </div>

      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </>
  );
};

export default Navigation;
