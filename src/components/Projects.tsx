import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "VelocIDE",
      subtitle: "AI-Powered Code Editor",
      description: "Production-ready web IDE integrating Google Gemini, Claude, and Llama models with autonomous file management. LLMs create, delete, and modify entire codebases with 5ms response time.",
      technologies: ["React", "TypeScript", "Monaco Editor", "Docker", "gRPC", "OAuth 2.0"],
      highlights: [
        "Multi-model AI integration (Gemini, Claude, Llama)",
        "6-service Docker microservices architecture",
        "Sub-10ms response times across services",
        "20+ concurrent users supported"
      ],
      github: "https://github.com/GKR5413/AI-Code-Editor",
    },
    {
      id: 2,
      title: "Resume Builder",
      subtitle: "Sandbox Support for Gemini LLM",
      description: "Containerized platform enabling Gemini 2.5 Pro to autonomously compile files in isolated Docker sandboxes, solving the limitation that LLMs cannot natively execute code.",
      technologies: ["Docker", "Python", "Alpine Linux", "Gemini 2.5 Pro", "Bash"],
      highlights: [
        "Autonomous code execution in isolated containers",
        "15-category command blacklisting for security",
        "Iterative self-correction across 15 cycles",
        "Non-root execution with environment detection"
      ],
      github: "https://github.com/GKR5413/resume-builder",
    }
  ];

  return (
    <section id="projects" className="py-24 bg-white dark:bg-neutral-950">
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
            Projects
          </h2>
          <p className="text-2xl sm:text-3xl text-stone-900 dark:text-stone-100">
            Featured work
          </p>
        </motion.div>

        {/* Projects */}
        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-stone-200 dark:border-neutral-800 bg-stone-50 dark:bg-neutral-900 overflow-hidden">
                <CardContent className="p-6 sm:p-8">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-medium text-stone-900 dark:text-stone-100">
                          {project.title}
                        </h3>
                        <p className="text-sm text-stone-500 dark:text-stone-500">
                          {project.subtitle}
                        </p>
                      </div>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-400 hover:text-stone-700 dark:text-stone-500 dark:hover:text-stone-300 transition-colors"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-6">
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, hIndex) => (
                        <li key={hIndex} className="text-sm text-stone-600 dark:text-stone-400 flex items-start gap-2">
                          <span className="text-stone-400 dark:text-stone-600 mt-1">·</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2.5 py-1 text-xs bg-white dark:bg-neutral-950 text-stone-600 dark:text-stone-400 rounded border border-stone-200 dark:border-neutral-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action */}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                  >
                    View on GitHub
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-stone-500 dark:text-stone-500 text-sm mb-4">
            Interested in collaborating?
          </p>
          <Button
            variant="outline"
            className="border-stone-300 dark:border-neutral-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-neutral-800"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get in touch
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
