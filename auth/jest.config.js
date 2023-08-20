/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'html', 'text'],
  modulePathIgnorePatterns: [
    './dist',
    './coverage',
    './logs',
    './assets',
    './node_modules',
    'index.ts',
    'app.ts',
    'src/validations',
    'src/routes'
  ],
  transform: {
    '^.+\\.m?[tj]sx?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.test.json'
      }
    ]
  }
};
