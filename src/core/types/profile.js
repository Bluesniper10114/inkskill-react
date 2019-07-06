declare type Gender = 'male' | 'female';
declare type Role = 'artist' | 'enthusiast';
declare type Quote = {
  text: string,
  likes: number,
  comments: number,
  createdAt: string,
};

declare type SocialType = 'fb' | 'tw' | 'gp' | 'ig';

declare type SocialUrls = {
  web: string,
  fb: string,
  tw: string,
  gp: string,
  ig: string,
};

declare type Location = {
  gid: string,
  city: string,
  state?: string,
  country: string,
};

declare interface UserBase {
  _id: string,
  name: string,
  gender: Gender,
  avatarUrls: {
    original: string,
    md: string,
    sm: string,
  },
  username: string,
  role: Role,
}

declare interface ProfileBase {
  name: string,
  bio: string,
  urls: SocialUrls,
  location: Location,
  wallpaperUrl: string,
  isVerified: boolean,
}

declare interface ProfileForm extends ProfileBase {
  suggestions: Object[],
}

declare interface Profile extends UserBase, ProfileBase {
  quote: Quote,
  posts: number,
  followers: number,
  following: number,
  isFollowing?: boolean,
}

declare interface ProfileState {
  data: Profile,
  form: ProfileForm,
}
