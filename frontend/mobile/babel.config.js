module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',

      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@constants': './src/constants',
          '@icons': './src/assets/icons',
          '@images': './src/assets/images',
          '@fonts': './src/assets/fonts',
          '@store': './src/store',
          '@components': './src/components',
          '@navigations': './src/navigations',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@types': './src/types',
        },
      },
    ],
    // react-native-dotenv
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
      },
    ],
    ['react-native-reanimated/plugin'],
  ],
};
