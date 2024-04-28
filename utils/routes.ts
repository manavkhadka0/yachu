export const Routes = {
  survey: {
    root: "/survey",
    add: "/survey/add",
    edit: "/survey/edit/:id",
    view: "/survey/view/:id",
  },
  home: {
    root: "/",
  },
  notFound: {
    root: "/404",
  },
  blog: {
    root: "/blog",
    detail: (slug: string) => `/blog/${slug}`,
  },
};
