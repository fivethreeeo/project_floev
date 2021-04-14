// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'

import 'antd/dist/antd.css'
import '../public/scss/main.scss?20210409'

function FloevFrontApp({ Component, pageProps }: AppProps) {

  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default FloevFrontApp