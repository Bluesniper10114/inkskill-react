declare type TeamMember = {
  id: number,
  name: string,
  image: string,
  designation: string,
}

declare type NewsPost = {
  post_id: number,
  post_title: string,
  post_content: string,
  slug: string,
  sub_header: string,
  modified: number,
  media: {
    [key: string]: string
  },
}

declare type LatestWork = {
  id: number,
  filename: string,
  no_likes: number,
  no_comments: number,
  tattoo_name: string,
  style_id: number,
  unique_id: string
}

declare type SitePage = {
  title: string,
  content: string,
}

declare type AboutState = {
  aboutpage?: SitePage,
  team?: TeamMember[],
};

declare type HomeState = {
  newspost: NewsPost[],
  latestwork?: LatestWork[],
};

declare type SiteState = {
  home: HomeState,
  about: AboutState,
};
