import proxy from 'express-http-proxy'

const authToken = 'Client-ID d2869e557e6f3bc'

export default app => {
  app.use(
    '/api',
    proxy('https://api.imgur.com/', {
      proxyReqOptDecorator(proxyReqOpts) {
        proxyReqOpts.headers['Authorization'] = authToken
        return proxyReqOpts
      },
    })
  )
}
