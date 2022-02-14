// cf https://levelup.gitconnected.com/running-puppeteer-with-jest-on-github-actions-for-automated-testing-with-coverage-6cd15bc843b0
const ci = Boolean(process.env.CI || false)
const baseOptions = {
  server: {
    command: 'yarn start',
    port: 3000,
    launchTimeout: 15000,
    debug: true
  }
}
const ciPipelineOptions = {
  launch: {
    executablePath: '/usr/bin/google-chrome-stable',
    headless: true,
    args: ['--ignore-certificate-errors', '--no-sandbox', '--disable-setuid-sandbox', '--disable-accelerated-2d-canvas', '--disable-gpu']
  },
  server: baseOptions.server
}
module.exports = ci ? ciPipelineOptions : baseOptions
