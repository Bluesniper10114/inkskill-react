declare type RootState = {
  auth: AuthState,
  site: SiteState,
  blog: BlogState,
  profile: ProfileState,
};

declare interface AuthState extends Profile {

}
