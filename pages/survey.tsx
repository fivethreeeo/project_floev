import React from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic'
import { createApolloClient } from '../lib/apolloClient';
import { GET_PURCHASE_REQUEST_LIST } from '../lib/query'

const DynamicComponent = dynamic(() => import('../components/survey/surveyComp_new'), {
    ssr: false,
})

function Survey(props: {
    purchaseRequest: PurchaseRequest[]
}) {
    return (<>
        <DynamicComponent purchaseRequest={props.purchaseRequest} />
    </>)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const client = createApolloClient(context)
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
            purchaseRequest
        },
    }
}

export default Survey