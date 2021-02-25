// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'

import 'antd/dist/antd.css'
import '../static/scss/main.scss?20210225'
import { UploadFile } from 'antd/lib/upload/interface'

function FloevFrontApp({ Component, pageProps }: AppProps) {

  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default FloevFrontApp

// 타입 정의
declare global {
  interface User {
    id: string | undefined
    name: string | undefined
    email: string | undefined
    password: string | undefined
    phoneNumber: string | undefined
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
  interface FittingRequest extends FloevRequest { }

  interface Slot {
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