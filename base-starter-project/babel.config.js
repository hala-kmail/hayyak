module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './',
            '@/base': './base',
            '@/app': './app',
            '@/assets': './assets',
            '@/providers': './providers',
            '@/config': './config',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};

