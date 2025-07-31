
'use client';

import { useQuery } from '@tanstack/react-query';
import { siteSettingsAPI, type SiteConfig } from '@/services/api/site-settings';

export const useSiteSettings = () => {
  return useQuery<SiteConfig>({
    queryKey: ['siteSettings'],
    queryFn: siteSettingsAPI.getSiteConfig,
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000, 
    refetchOnWindowFocus: false,
    retry: 2,
  });
};