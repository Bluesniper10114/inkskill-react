// @flow

declare interface BlogPostBase {
  id: number,
  post_title: string,
  slug: string,
  guid: string,
  post_content: string,
  modified: string,
  sub_header: string,
}

declare interface BlogPostPreview {
  id: number,
  slug: string,
  title: string,
  subtitle: string,
  media: string[],
  description: string,
  createdAt: string,
}

declare interface BlogPost extends BlogPostBase {
  media: {
    [key: string]: string
  },
  user_login: string,
  artist: number,
  artist_name: string,
  username: string,
  t_media: string[],
}

declare type Author = {
  user_login: string,
  ID: number,
  first_name: string,
  last_name: string,
  description: string,
  avatar: string,
  nickname: string,
  facebook_url: string,
  twitter_url: string,
  linkedin_url: string,
  pinterest_url: string,
  google_plus_url: string,
  instagram_url: string,
  about_me: string,
  inkskill_profile: string,
  name: string
};

declare type BlogPostInfo = {
  post_title: string,
  post_name: string,
  meta_value?: number,
}

declare type BlogListState = BlogPostPreview[];

declare type BlogInfoState = {
  feature: BlogPostInfo[],
  popular: BlogPostInfo[],
};

declare type BlogDetailsState = {
  blog: BlogPost,
  authordetail: Author,
};

declare type BlogState = {
  list: BlogListState,
  info: BlogInfoState,
  details: BlogDetailsState,
};
