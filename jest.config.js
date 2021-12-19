module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  setupFilesAfterEnv: ['jest-plugin-context/setup'],
  testPathIgnorePatterns: ['/node_modules'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
};
