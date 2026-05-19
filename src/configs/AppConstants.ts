const AppConstants = {
  DEFAULT_LANG_CODE: import.meta.env.VITE_APP_DEF_LANG_CODE || 'hi',
  IMG_TYPE: {
    LOGO: 'logo',
    BANNER: 'banner',
  },
  IMG_SIZES: {
    logo: {
      width: '80px',
      height: '80px',
    },
    banner: {
      width: '320px',
      height: 'auto',
    },
  },
};

export default AppConstants;
