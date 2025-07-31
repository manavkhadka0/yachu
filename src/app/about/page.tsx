import { Metadata } from 'next';
import { siteSettingsAPI } from '@/services/api/site-settings';
import AboutPage from "./about-page";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const siteConfig = await siteSettingsAPI.getSiteConfig();
    
    return {
      title: `About Us - ${siteConfig.meta_title}`,
      description: `Learn about our story, founder, and mission. ${siteConfig.meta_description}`,
      keywords: ['about us', 'founder story', 'company history', 'yachu hair oil', 'natural hair care'],
      openGraph: {
        title: `About Us - ${siteConfig.meta_title}`,
        description: `Learn about our story, founder, and mission. ${siteConfig.meta_description}`,
        type: 'website',
        images: [
          {
            url: siteConfig.hero_section_image,
            width: 1200,
            height: 630,
            alt: 'About Yachu Hair Oil',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `About Us - ${siteConfig.meta_title}`,
        description: `Learn about our story, founder, and mission. ${siteConfig.meta_description}`,
        images: [siteConfig.hero_section_image],
      },
      alternates: {
        canonical: '/about',
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'About Us - Natural Hair Care',
      description: 'Learn about our story, founder, and mission behind our natural hair care products.',
    };
  }
}

export default function Page() {
  return <AboutPage />;
}