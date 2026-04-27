import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title = 'Jamia Uloom Islamia - Center of Islamic Education',
  description = 'Authentic Islamic education, Fatawa, Quran memorization, Dars-e-Nizami, and online application. Ask questions and get answers from qualified scholars.',
  keywords = 'islamic education, madrasa, fatawa, quran, hifz, dars-e-nizami, islamic university, scholars, fiqh, hadith',
  image = '/og-image.jpg',
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = 'website',
  schema,
  author = 'Jamia Uloom Islamia',
  publishedAt,
  modifiedAt,
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph (Facebook, WhatsApp, LinkedIn) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Jamia Uloom Islamia" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="ur_PK" />
      <meta property="og:locale:alternate" content="ar_SA" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Article Meta */}
      {publishedAt && <meta property="article:published_time" content={publishedAt} />}
      {modifiedAt && <meta property="article:modified_time" content={modifiedAt} />}

      {/* Schema.org Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}