import { GetServerSideProps } from "next";
import { createApolloClient } from '../lib/apolloClient'
import { gql } from '@apollo/client'

const CompletePage = (props: {
    user: any
}) => {

    return (<>
        {props.user !== null ? props.user.name : ''}
    </>)
}

const CHECKUP_USER = gql`
	query checkUpUser{
		checkUpUser{
			name
		}
	}
`

export const getServerSideProps: GetServerSideProps = async (context) => { //{ req }: { req: any }
    const client = createApolloClient(context)
    const { user } = await client.query({ query: CHECKUP_USER })
        .then(({ data }) => {
            return { user: data.checkUpUser };
        })
        .catch(() => {
            // Fail gracefully
            return { user: null };
        });

    return {
        props: {
            // this hydrates the clientside Apollo cache in the `withApollo` HOC
            apolloStaticCache: client.cache.extract(),
            user
        },
    }
}

export default CompletePage