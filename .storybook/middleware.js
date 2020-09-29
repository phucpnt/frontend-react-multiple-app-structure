const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 *
 * You can customize the storybook server (expressjs) by defining a middleware function here
 */

module.exports = function expressMiddleware(app) {
  console.info('storybook middleware setup...');
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://your-remote-api.com',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    }),
  );
};
