import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'

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