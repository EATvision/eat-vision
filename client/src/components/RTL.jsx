import React from 'react'
import { prefixer } from 'stylis'
import rtlPlugin from 'stylis-plugin-rtl'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
})

function RTL({ children }) {
  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>
}

export default RTL
