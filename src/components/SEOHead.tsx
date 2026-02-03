import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Raju Gottumukkala | Software Engineer & AI Developer | Kansas City, MO",
  description = "Raju Gottumukkala - Software Engineer with 2+ years experience building scalable enterprise applications across fintech, consulting, and AI-integrated platforms. MS Computer Science graduate from UMKC. Expert in Java, Spring Boot, React, AWS. Available for full-time opportunities in Kansas City, Missouri.",
  keywords = "Raju Gottumukkala, Raju Gottumukkala Software Engineer, Raju Gottumukkala Kansas City, Raju Gottumukkala UMKC, Raju Gottumukkala Java Developer, Raju Gottumukkala AI Developer, Raju Gottumukkala Portfolio, Software Engineer Kansas City, Java Developer Kansas City, AI Developer Kansas City, Spring Boot Expert, React Developer, Microservices Developer, Fintech Developer, Cloud Native Developer, AWS Expert, Kubernetes Developer, UMKC Computer Science, Full Stack Developer, Backend Engineer, API Developer, DevOps Engineer, Software Developer Kansas City, Tech Professional Kansas City, Raju Gottumukkala Contact, Raju Gottumukkala Resume",
  canonicalUrl = "https://rajugottumukkala.com",
  ogImage = "https://rajugottumukkala.com/profile-2.jpg",
  ogType = "profile",
  structuredData
}) => {
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Raju Gottumukkala",
    "alternateName": ["Raju G", "RG"],
    "jobTitle": "Software Engineer",
    "description": "Raju Gottumukkala - Software Engineer with 2+ years of experience building scalable enterprise applications across fintech, consulting, and AI-integrated platforms. MS Computer Science graduate from UMKC specializing in Java, Spring Boot, React, and AWS.",
    "url": "https://rajugottumukkala.com",
    "image": "https://rajugottumukkala.com/profile-2.jpg",
    "email": "mailto:gkr5413@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kansas City",
      "addressRegion": "MO",
      "addressCountry": "US"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "University of Missouri-Kansas City",
      "url": "https://www.umkc.edu"
    },
    "knowsAbout": [
      "Software Engineering",
      "Java Development",
      "Spring Boot",
      "Microservices",
      "Cloud Computing",
      "Artificial Intelligence",
      "Machine Learning",
      "Fintech",
      "AWS",
      "Kubernetes",
      "DevOps"
    ],
    "sameAs": [
      "https://linkedin.com/in/RAJU5413/",
      "https://github.com/GKR5413",
      "https://twitter.com/Raju_twt_"
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Raju Gottumukkala" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content="Raju Gottumukkala - Software Engineer Portfolio" />
      <meta property="og:site_name" content="Raju Gottumukkala Portfolio" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      <meta property="twitter:image:alt" content="Raju Gottumukkala - Software Engineer Portfolio" />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="revisit-after" content="7 days" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEOHead;
