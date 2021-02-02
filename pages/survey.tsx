import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic'
import { createApolloClient } from '../lib/apolloClient';
import { UploadFile } from 'antd/lib/upload/interface'
import { GET_PURCHASE_REQUEST_LIST } from '../lib/query'

// 타입 정의
declare global {
    interface User {
        id: string | undefined
        name: string
        email: string | undefined
        password: string | undefined
        phoneNumber: string
        gender: string | undefined
        birth: number | undefined
        status: string | undefined
        clickUpProfileId: string | undefined
        requests: PurchaseRequest[]
    }
    interface FloevRequest {
        [x: string]: any
        id: string
        date: string
        loungeCode: number
        type: number
        status?: string
    }
    interface PurchaseRequest extends FloevRequest { }
    interface PickupRequest extends FloevRequest { }

    interface Slot {
        label: string
        time: string
        loungeCode: number
    }
    // 설문, 예약 답변 양식
    interface Answers {
        customer: number // 0: 본인, 1: 동행, 2: 타인
        birth: number
        gender: string
        hasWorn: number // 1: yes(쓰고 있음), 2: no(쓴적 없음)
        purposes: string[]
        purposeEtc: string
        painDegree: number, painDegreeEtc: string
        painTypes: string[], painTypesEtc: string
        prefer: string
        preferFileList: UploadFile[]
        photoFileList: UploadFile[]
        size: string
        loungeCode: number
        requestDate: string
        requestTime: string
        name: string
        phoneNumber: string
        authNumber: string
    }
}

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
    const startTime = Date.now();
    const client = createApolloClient(context)
    const { purchaseRequest } = await client.query({ query: GET_PURCHASE_REQUEST_LIST })
        .then(({ data }) => {
            console.log("Survey Page elapsed time: " + (Date.now() - startTime) + "ms");
            return { purchaseRequest: data.getPuchaseRequestList };
        })
        .catch((error) => {
            console.log("Survey Page elapsed time: " + (Date.now() - startTime) + "ms");
            console.error("Request data fetch ERROR" + error.message)
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