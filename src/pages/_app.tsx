const { default: AbortController } = require('abort-controller')
const { default: fetch, Headers, Request, Response } = require('node-fetch')

Object.assign(globalThis, {
  fetch,
  Headers,
  Request,
  Response,
  AbortController,
})

import type { AppProps } from 'next/app'
import { wrapper } from 'src/store'

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Component {...pageProps} />
  </>
)

export default wrapper.withRedux(App)
