
import { BASE_API_URL } from "@/utils/config";

export interface SiteConfig {
  id: number;
  meta_title: string;
  meta_description: string;
  hero_title: string;
  hero_section_subtitle: string;
  hero_section_image: string;
  about_founder: string;
  message_from_ceo: string;
  our_story: string;
}

const DUMMY_SITE_CONFIG: SiteConfig = {
  id: 1,
  meta_title: "Meta Title Landing Page",
  meta_description: "Meta Description Landing Page",
  hero_title: "Title",
  hero_section_subtitle: "yachu hair oil is a natural hair care product made with traditional ingredients",
  hero_section_image: "./yachu-hero.png",
  about_founder: "dummy_founder",
  message_from_ceo: "dummy_message",
  our_story: "dummy_story",
};

export const siteSettingsAPI = {
  getSiteConfig: async (): Promise<SiteConfig> => {
    try {
      const response = await fetch(`${BASE_API_URL}/site-configs/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 10 },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: SiteConfig[] = await response.json();
      
      // Return the first config or fallback to dummy
      return data.length > 0 ? data[0] : DUMMY_SITE_CONFIG;
    } catch (error) {
      console.error('Error fetching site config:', error);
      // Return dummy data on error
      return DUMMY_SITE_CONFIG;
    }
  },
};