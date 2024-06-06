const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'pnfo19',
  e2e: {
    baseUrl: 'http://localhost:3000', // adjust to your dev server's URL if different
  },
})
