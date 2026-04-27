export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Jamia Uloom Islamia',
  alternateName: ['جامعہ علوم اسلامیہ', 'جامعة العلوم الإسلامية'],
  description: 'Center of Islamic Education providing authentic Islamic knowledge',
  url: 'jamiafrontend-henna.vercel.app',
  logo: 'jamiafrontend-henna.vercel.app/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+92-300-0000000',
    contactType: 'Admissions',
    email: 'info@jamia.edu',
    availableLanguage: ['English', 'Urdu', 'Arabic'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Main Street',
    addressLocality: 'Karachi',
    addressCountry: 'PK',
  },
  sameAs: [
    'https://facebook.com/jamia',
    'https://youtube.com/jamia',
    'https://twitter.com/jamia',
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Jamia Uloom Islamia',
  url: 'jamiafrontend-henna.vercel.app',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'jamiafrontend-henna.vercel.app/qa?search={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export const faqSchema = (questions) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: questions.map((q) => ({
    '@type': 'Question',
    name: q.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: q.answer?.replace(/<[^>]*>/g, '') || '',
    },
  })),
});

export const articleSchema = (article) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.description?.substring(0, 200),
  image: article.image,
  datePublished: article.createdAt,
  dateModified: article.updatedAt || article.createdAt,
  author: {
    '@type': 'Organization',
    name: 'Jamia Uloom Islamia',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Jamia Uloom Islamia',
    logo: { '@type': 'ImageObject', url: 'jamiafrontend-henna.vercel.app/logo.png' },
  },
});

export const courseSchema = (department) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: department.name,
  description: department.description,
  provider: {
    '@type': 'Organization',
    name: 'Jamia Uloom Islamia',
    sameAs: 'jamiafrontend-henna.vercel.app',
  },
});