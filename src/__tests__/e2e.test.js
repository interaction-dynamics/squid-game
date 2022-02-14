import puppeteer from 'puppeteer'

describe('App.js', () => {
  let browser
  let page

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true })
    page = await browser.newPage()
  })

  it('contains the title "Squid Game"', async () => {
    await page.goto('http://localhost:3000/squid-game')
    await page.waitForSelector('#root')
    const text = await page.$eval('#root', e => e.textContent)
    expect(text).toContain('Squid Game')
  })

  afterAll(() => browser.close())
})
