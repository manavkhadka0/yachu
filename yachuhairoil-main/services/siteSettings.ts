import { fetcher } from "@/lib/api";
import type { TSiteSetting, TSiteSettingList } from "@/types";

export const siteSettingsApi = {
  getSiteConfig: (): Promise<TSiteSetting | null> =>
    fetcher<TSiteSettingList>("/site-configs/").then((data) =>
      data.length > 0 ? data[0] : null
    ),
};
