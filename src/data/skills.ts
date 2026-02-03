export interface Skill {
  id: string;
  name: string;
  level: number; // 1-100
  category: 'frontend' | 'backend' | 'database' | 'cloud' | 'tools' | 'ai';
  description: string;
  experience: string;
  projects?: string[];
  color: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const sampleSkills: Skill[] = [
  {
    id: 'java',
    name: 'Java',
    level: 95,
    category: 'backend',
    description: 'Expert in Java development with Spring Boot, microservices architecture, and enterprise applications.',
    experience: '2+ years',
    projects: ['Fintech Platform', 'Payment Gateway', 'Enterprise Apps'],
    color: { primary: '#007396', secondary: '#f89820', accent: '#5382a1' }
  },
  {
    id: 'spring-boot',
    name: 'Spring Boot',
    level: 90,
    category: 'backend',
    description: 'Advanced Spring Boot development with REST APIs, security, and microservices.',
    experience: '3+ years',
    projects: ['Merchant Portal', 'API Gateway', 'Auth Service'],
    color: { primary: '#6db33f', secondary: '#77bc1f', accent: '#5ca020' }
  },
  {
    id: 'react',
    name: 'React',
    level: 85,
    category: 'frontend',
    description: 'Proficient in React with hooks, context, and modern patterns for building scalable UIs.',
    experience: '3+ years',
    projects: ['Portfolio Site', 'Dashboard', 'E-commerce'],
    color: { primary: '#61dafb', secondary: '#21232a', accent: '#282c34' }
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    level: 80,
    category: 'cloud',
    description: 'Container orchestration, deployment strategies, and cluster management.',
    experience: '2+ years',
    projects: ['Microservices Deploy', 'CI/CD Pipeline'],
    color: { primary: '#326ce5', secondary: '#ffffff', accent: '#f5f5f5' }
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    level: 88,
    category: 'database',
    description: 'Advanced SQL, query optimization, and database design.',
    experience: '2+ years',
    projects: ['Financial DB', 'Analytics DB', 'User Management'],
    color: { primary: '#336791', secondary: '#ffffff', accent: '#8cc8ff' }
  },
  {
    id: 'python',
    name: 'Python',
    level: 82,
    category: 'ai',
    description: 'Machine learning, data analysis, and automation scripting.',
    experience: '2+ years',
    projects: ['ML Pipeline', 'Data Analysis', 'Automation'],
    color: { primary: '#3776ab', secondary: '#ffd343', accent: '#306998' }
  }
];
