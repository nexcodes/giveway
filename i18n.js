module.exports = {
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  pages: {
    '*': ['common'],
    '/[lang]': ['home'],
    '/[lang]/second-page': ['home'],
  },
}