const {
  SITE_URL,
  IMAGES_URL,
  API_KEY,
  API_BASE_URL,
  FB_APP_ID,
  GOOGLE_ID,
  INSTAGRAM_ID,
  BLOG_SITE_URL,
  GOOGLE_ANALYTICS,
} = (process.env.NODE_ENV === 'development')
  ? require('./development')
  : (process.env.NODE_ENV === 'production' ? require('./production') : require('./staging'));

export {
  SITE_URL,
  IMAGES_URL,
  API_KEY,
  API_BASE_URL,
  FB_APP_ID,
  GOOGLE_ID,
  INSTAGRAM_ID,
  BLOG_SITE_URL,
  GOOGLE_ANALYTICS,
};
