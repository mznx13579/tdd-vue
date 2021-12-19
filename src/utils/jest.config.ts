module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['jest-plugin-context/setup'],
  testPathIgnorePatterns: ['/node_modules'],
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
};
