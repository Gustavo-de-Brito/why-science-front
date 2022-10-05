const { defineConfig } = require('cypress');
const axios = require('axios');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    env: {
      API_SERVER: 'http://localhost:4442'
    },
    setupNodeEvents(on, config) {
      on('task', {
        async 'db:reset'() {
          const { data } = await axios.post('http://localhost:4442/reset-db', {});

          return data;
        }
      })
    },
  },
});
