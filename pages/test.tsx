import React from 'react'
import { gql } from '@apollo/client'
import { GetServerSideProps } from 'next'
import { createApolloClient } from '../lib/apolloClient'

const CHECKUP_USER = gql`
	query checkUpUser{
		checkUpUser{
			name
		}
	}
`

const TestPage = ({ user }: { user: any }) => {
    const userName = user !== null ? user.name : ''
    return (
        <>
            <p>hello world!</p>
            {userName}
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => { //{ req }: { req: any }
    const client = createApolloClient(context)
    const { user } = await client.query({ query: CHECKUP_USER })
        .then(({ data }) => {
            return { user: data.checkUpUser };
        })
        .catch((error) => {
            console.error(error.message)
            // Fail gracefully
            return { user: null };
        });
    console.log('user: ' + JSON.stringify(user))

    return {
        props: {
            // this hydrates the clientside Apollo cache in the `withApollo` HOC
            apolloStaticCache: client.cache.extract(),
            user
        },
    }
}

export default TestPage