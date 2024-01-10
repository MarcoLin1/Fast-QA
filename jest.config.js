module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: ['**/(*.)+test.[jt]s?(x)', '**/(*.)+spec.[jt]s?(x)'],
  moduleNameMapper: {
    axios: 'axios/dist/node/axios.cjs'
  }
};
