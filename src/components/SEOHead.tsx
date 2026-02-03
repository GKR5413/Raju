import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogType?: string;
  structuredData?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Raju Gottumukkala | Software Engineer | Kansas City, MO",
  description = "Raju Gottumukkala - Software Engineer with 2+ years experience building scalable enterprise applications across fintech, consulting, and AI-integrated platforms. MS Computer Science graduate from UMKC. Expert in Java, Spring Boot, React, AWS.",
  keywords = "Raju Gottumukkala, Software Engineer, Java Developer, Spring Boot, React Developer, AWS, Kansas City, UMKC, Full Stack Developer",
  ogType = "profile",
  structuredData
}) => {
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Raju Gottumukkala",
    "jobTitle": "Software Engineer",
    "description": "Software Engineer with 2+ years of experience building scalable enterprise applications.",
    "email": "mailto:gkr5413@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kansas City",
      "addressRegion": "MO",
      "addressCountry": "US"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "University of Missouri-Kansas City"
    },
    "knowsAbout": ["Software Engineering", "Java", "Spring Boot", "React", "AWS", "Microservices"],
    "sameAs": [
      "https://linkedin.com/in/RAJU5413/",
      "https://github.com/GKR5413"
    ]
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Raju Gottumukkala" />

      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Raju Gottumukkala" />

      <meta property="twitter:card" content="summary" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />

      <meta name="robots" content="index, follow" />

      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEOHead;
