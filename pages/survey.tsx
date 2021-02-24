import React from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic'
import { createApolloClient } from '../lib/apolloClient';
import { GET_PURCHASE_REQUEST_LIST } from '../lib/query'

const DynamicComponent = dynamic(() => import('../components/survey/surveyComp'), {
    ssr: false,
})

function Survey(props: {
    purchaseRequest: PurchaseRequest[]
}) {
    return (<>
        <DynamicComponent purchaseRequest={props.purchaseRequest} />
    </>)
}

export const getServerSideProps: GetServerSideProps = async (context) => { //{ req }: { req: any }
    // const startTime = Date.now();
    const client = createApolloClient(context)
    const { purchaseRequest } = await client.query({ query: GET_PURCHASE_REQUEST_LIST })
        .then(({ data }) => {
            // console.log("Survey Page elapsed time: " + (Date.now() - startTime) + "ms");
            return { purchaseRequest: data.getRequestList };
        })
        .catch((error) => {
            // console.log("Survey Page elapsed time: " + (Date.now() - startTime) + "ms");
            console.error("Request data fetch ERROR :" + error.message)
            return { purchaseRequest: null };
        });
    return {
        props: {
            // this hydrates the clientside Apollo cache in the `withApollo` HOC
            apolloStaticCache: client.cache.extract(),
            purchaseRequest
        },
    }
}

export default Survey