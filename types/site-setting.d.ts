// [
//     {
//         "id": 1,
//         "meta_title": "Meta Title Landing Page",
//         "meta_description": "Meta Description Landing Page",
//         "hero_title": "Title",
//         "hero_section_subtitle": "Discover The Best Hiking Trails And Bee-Watching Spots On Your Next Adventure. Book A Trip Now",
//         "hero_section_image": null,
//         "about_founder": "<p>Hello</p>",
//         "message_from_ceo": "<p>whats up</p>",
//         "our_story": "<p>dsadasd</p>"
//     }
// ]

export type TSiteSetting = {
  id: number;
  meta_title: string;
  meta_description: string;
  hero_title: string;
  hero_section_subtitle: string;
  hero_section_image: string;
  about_founder: string;
  message_from_ceo: string;
  our_story: string;
}[];

