module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/test/enzyme.config.ts'],
  testURL: 'http://localhost',
  transformIgnorePatterns: ['<rootDir>/node_modules/']
}
