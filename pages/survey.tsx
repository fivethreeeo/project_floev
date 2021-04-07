import React from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic'
import { createApolloClient } from '../lib/apolloClient';
import { CHECKUP_USER_SIMPLE, GET_PURCHASE_REQUEST_LIST } from '../lib/query'

const DynamicComponent = dynamic(() => import('../components/survey/surveyComp'), {
    ssr: false,
})

function Survey(props: {
    user: User
    purchaseRequest: PurchaseRequest[]
}) {
    return (<>
        <DynamicComponent purchaseRequest={props.purchaseRequest} user={props.user} />
    </>)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const client = createApolloClient(context)
    const { user } = await client.query({ query: CHECKUP_USER_SIMPLE })
        .then(({ data }) => {
            return { user: data.checkUpUser };
        }).catch(() => {
            return { user: null };
        });
    const { purchaseRequest } = await client.query({ query: GET_PURCHASE_REQUEST_LIST })
        .then(({ data }) => {
            return { purchaseRequest: data.getRequestList };
        })
        .catch((error) => {
            console.error("Request data fetch ERROR :" + error.message)
            return { purchaseRequest: null };
        });
    return {
        props: {
            apolloStaticCache: client.cache.extract(),
            user,
            purchaseRequest,
        },
    }
}

export default Survey