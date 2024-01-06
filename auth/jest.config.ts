/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'html', 'text'],
  setupFilesAfterEnv: ['./src/test/setup.ts'],
  modulePathIgnorePatterns: [
    './dist',
    './coverage',
    './logs',
    './assets',
    './node_modules',
    'index.ts',
    'app.ts',
    'src/validations',
  ],
  transform: {
    '^.+\\.m?[tj]sx?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.test.json',
      },
    ],
  },
};
