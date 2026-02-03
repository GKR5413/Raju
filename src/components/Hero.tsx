import { Button } from "@/components/ui/button";
import { ChevronDown, Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-stone-50 dark:bg-neutral-950" itemScope itemType="https://schema.org/Person">
      {/* Subtle warm gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-stone-50 to-stone-100/50 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900/50" />

      {/* Minimal accent shape */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-stone-100/80 to-transparent dark:from-neutral-900/50 dark:to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 w-full py-20">
        <div className="max-w-3xl">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              <span>Open to work</span>
              <span className="text-stone-300 dark:text-stone-600">—</span>
              <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <span itemProp="addressLocality">Kansas City</span>, <span itemProp="addressRegion">MO</span>
              </span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 leading-[1.1]" itemProp="name">
              <span itemProp="givenName">Raju</span>{" "}
              <span className="text-stone-400 dark:text-stone-500" itemProp="familyName">Gottumukkala</span>
            </h1>
          </motion.div>

          {/* Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <p className="text-xl sm:text-2xl text-stone-600 dark:text-stone-300 font-light" itemProp="jobTitle">
              Software Engineer
            </p>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-10"
          >
            <p className="text-base sm:text-lg text-stone-500 dark:text-stone-400 leading-relaxed max-w-xl" itemProp="description">
              Building enterprise applications with <span className="text-stone-700 dark:text-stone-300">Java</span>, <span className="text-stone-700 dark:text-stone-300">Spring Boot</span>, <span className="text-stone-700 dark:text-stone-300">React</span>, and <span className="text-stone-700 dark:text-stone-300">Cloud technologies</span>. MS in Computer Science from UMKC.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <Magnetic speed={0.2}>
              <Button
                size="lg"
                className="bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 dark:text-stone-900 text-white px-6 py-5 text-sm font-medium rounded-full transition-all duration-300"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get in touch
              </Button>
            </Magnetic>
            <Magnetic speed={0.2}>
              <Button
                variant="ghost"
                size="lg"
                className="group text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 px-6 py-5 text-sm font-medium rounded-full transition-all duration-300"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View projects
                <ArrowUpRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </Magnetic>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-1"
          >
            {[
              { icon: Github, href: 'https://github.com/GKR5413', label: 'GitHub' },
              { icon: Linkedin, href: 'https://linkedin.com/in/RAJU5413/', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:gkr5413@gmail.com', label: 'Email' },
            ].map((social) => (
              <Magnetic key={social.label} speed={0.3}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 rounded-full text-stone-400 hover:text-stone-700 dark:text-stone-500 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800/50 transition-colors duration-200"
                  onClick={() => window.open(social.href, '_blank')}
                >
                  <social.icon className="h-[18px] w-[18px]" />
                </Button>
              </Magnetic>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="cursor-pointer"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ChevronDown className="h-5 w-5 text-stone-300 dark:text-stone-600" />
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute right-12 lg:right-24 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-stone-200 dark:via-stone-800 to-transparent origin-top hidden md:block"
      />
    </section>
  );
};

export default Hero;