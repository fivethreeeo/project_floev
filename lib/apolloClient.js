import { useMemo } from 'react'
import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, from } from '@apollo/client'
import { concatPagination } from '@apollo/client/utilities'
import cookie from 'cookie'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient

const APOLLO_SERVER_URL = process.env.NODE_ENV === "production"
  ? "https://apollo2.floev.com"
  : "https://apollotest.floev.com"
// : "http://localhost:3031"

export function createApolloClient(context) {
  const httpLink = new HttpLink({
    uri: `${APOLLO_SERVER_URL}/graphql`,
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
  })

  const authMiddleware = new ApolloLink((operation, forward) => {
    let token = process.browser ? document.cookie : context.req.headers.cookie
    if (token) {
      token = cookie.parse(token).token
    } else {
      token = ''
    }

    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }));

    return forward(operation);
  })

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          allPosts: concatPagination(),
        },
      },
    },
  })

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([
      authMiddleware,
      httpLink
    ]),
    cache: cache,
  })
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);


    // Get existing cache, loaded during client side data fetching
    // const existingCache = _apolloClient.extract()
    /*
    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    })
    */
    // Restore the cache with the merged data
    // _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo(state), [state])
  return store
}