const config = {
  rootDir: './',
  preset: 'jest-puppeteer',
  testRegex: './*\\e2e\\.test\\.js$',
  setupFilesAfterEnv: ['<rootDir>/config/setupTests.e2e.js']

  // collectCoverage: true,
  // collectCoverageFrom: ['src/**/*'],
  // coverageReporters: ['text', 'lcov', 'cobertura'],
  // setupFilesAfterEnv: ['jest-puppeteer-istanbul/lib/setup'],
  // reporters: ['default', 'jest-puppeteer-istanbul/lib/reporter'],
  // coverageDirectory: 'coverage'
}
module.exports = config
