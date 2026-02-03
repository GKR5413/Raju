import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const Experience = () => {
  const experiences = [
    {
      company: "DreamStudio",
      logo: "/logos/DreamStudio.png",
      position: "Full-Stack Developer (AI/ML Integration)",
      location: "Atlanta, United States",
      duration: "May 2025 - Present",
      description: "Developing a full-stack web platform using Next.js, Rust REST API, and PostgreSQL, optimizing frontend rendering to achieve under 3-second page load times.",
      achievements: [
        "Automated environmental data ingestion pipelines using Python and SQL, integrating Exiobase and Google DataCommons across 50+ categories",
        "Deployed applications on AWS (EC2, S3, Lambda, RDS) with CI/CD pipelines using GitHub Actions and AWS CodePipeline",
        "Configured Docker containers and managed infrastructure using Terraform and AWS CloudFormation",
        "Created interactive dashboards using React and D3.js to visualize multi-region environmental metrics"
      ],
      technologies: ["Next.js", "Rust", "PostgreSQL", "AWS", "Docker", "Terraform", "React", "D3.js"]
    },
    {
      company: "FIS Global",
      logo: "/logos/fis-global.png",
      position: "Software Engineer",
      location: "Bengaluru, India",
      duration: "Jun 2022 - Jul 2023",
      description: "Contributed to payment processing systems supporting thousands of merchants, helping maintain 99.9% uptime during peak transaction periods.",
      achievements: [
        "Developed microservices with optimized transaction handling and caching, contributing to 15% reduction in API response times",
        "Supported cloud infrastructure using AWS services (Lambda, S3, CloudWatch, SNS) for event-driven processing",
        "Built React components with Material-UI, implementing lazy loading and state management improvements",
        "Increased unit test coverage from 55% to 75% using JUnit and Mockito"
      ],
      technologies: ["Java", "Spring Boot", "React", "AWS", "Jenkins", "Docker", "JUnit"]
    },
    {
      company: "Cognizant",
      logo: "/logos/Cognizant.png",
      position: "Programming Analyst",
      location: "Hyderabad, India",
      duration: "Nov 2021 - Jun 2022",
      description: "Developed full-stack enterprise applications using Java Spring Boot, Angular, and MySQL, supporting internal business operations.",
      achievements: [
        "Built and maintained REST APIs with validation and error handling, improving integration reliability",
        "Optimized backend performance by refactoring legacy code and improving SQL query indexing",
        "Reduced report generation time from 10+ seconds to under 5 seconds",
        "Implemented role-based access controls (RBAC) and data encryption standards"
      ],
      technologies: ["Java", "Spring Boot", "Angular", "MySQL", "Jenkins", "REST APIs"]
    },
  ];

  return (
    <section id="experience" className="py-24 bg-stone-50 dark:bg-neutral-900">
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
            Experience
          </h2>
          <p className="text-2xl sm:text-3xl text-stone-900 dark:text-stone-100">
            Professional journey
          </p>
        </motion.div>

        {/* Experience List */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-stone-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden">
                <CardContent className="p-6 sm:p-8">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        className="w-10 h-10 object-contain rounded"
                      />
                      <div>
                        <h3 className="font-medium text-stone-900 dark:text-stone-100">
                          {exp.position}
                        </h3>
                        <p className="text-stone-600 dark:text-stone-400 text-sm">
                          {exp.company}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-stone-500 dark:text-stone-500 sm:text-right">
                      <p>{exp.duration}</p>
                      <p>{exp.location}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <ul className="space-y-2 mb-6">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="text-sm text-stone-600 dark:text-stone-400 flex items-start gap-2">
                        <span className="text-stone-400 dark:text-stone-600 mt-1.5">·</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2.5 py-1 text-xs bg-stone-100 dark:bg-neutral-800 text-stone-600 dark:text-stone-400 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
