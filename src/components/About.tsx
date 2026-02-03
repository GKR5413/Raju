import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const techStack = {
    "Languages": ["Java", "Python", "JavaScript", "TypeScript"],
    "Frameworks": ["Spring Boot", "React", "Node.js", "Angular"],
    "Cloud": ["AWS", "GCP", "Azure"],
    "DevOps": ["Docker", "Kubernetes", "Terraform", "Jenkins"],
    "Databases": ["PostgreSQL", "MySQL", "Redis", "Kafka"],
    "AI/ML": ["Claude", "GPT-4", "Gemini", "Llama"]
  };

  return (
    <section id="about" className="py-24 bg-white dark:bg-neutral-950">
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
            About
          </h2>
          <p className="text-2xl sm:text-3xl text-stone-900 dark:text-stone-100 leading-relaxed">
            Software Engineer with 2+ years of experience building scalable enterprise applications across fintech, consulting, and AI-integrated platforms.
          </p>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <div className="space-y-4 text-stone-600 dark:text-stone-400 leading-relaxed">
            <p>
              I specialize in creating robust, scalable applications using Java, Spring Boot, React, and cloud-native technologies. My focus is on solving complex problems and building systems that handle real-world scale.
            </p>
            <p>
              I've worked on enterprise fintech platforms where precision, security, and performance are paramount—from payment processing systems to AI-powered platforms.
            </p>
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="border-stone-200 dark:border-neutral-800 bg-stone-50 dark:bg-neutral-900">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-stone-200 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="h-5 w-5 text-stone-600 dark:text-stone-400" />
                </div>
                <div>
                  <h3 className="font-medium text-stone-900 dark:text-stone-100">
                    MS in Computer Science
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">
                    University of Missouri-Kansas City
                  </p>
                  <p className="text-stone-500 dark:text-stone-500 text-sm mt-1">
                    Aug 2023 – May 2025 · GPA: 3.82
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-sm font-medium tracking-widest uppercase text-stone-400 dark:text-stone-500 mb-8">
            Technologies
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
            {Object.entries(techStack).map(([category, skills]) => (
              <div key={category}>
                <h4 className="text-xs font-medium text-stone-500 dark:text-stone-500 uppercase tracking-wider mb-3">
                  {category}
                </h4>
                <ul className="space-y-1.5">
                  {skills.map((skill, index) => (
                    <li key={index} className="text-sm text-stone-700 dark:text-stone-300">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
