import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'

// import 'antd-mobile/dist/antd-mobile.min.css'
import 'antd/dist/antd.css'
import '../static/scss/main.scss'

function FloevFrontApp({ Component, pageProps }) {

  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default FloevFrontApp