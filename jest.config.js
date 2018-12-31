module.exports = {
  roots: [
    '<rootDir>/lib'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.ts',
    '!**/node_modules/**',
    '!mocks/**',
    '!**/*.spec.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 98,
      functions: 98,
      lines: 98,
      statements: 98,
    }
  },
  coverageDirectory: './coverage/',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
};
