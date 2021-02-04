import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../layout/DefaultLayout'
import { getDayDate, getMDW } from '../../utils/timeFormat'
import moment from 'moment'
import redirect from '../../lib/redirect'
import { availablePickupFittingRequestTime } from '../../utils/surveyUtils'
import { GetServerSideProps } from 'next'
import { createApolloClient } from '../../lib/apolloClient'
import { CHECKUP_USER, GET_PICKUP_REQUEST_LIST } from '../../lib/query'
import { MAKE_PICKUP_REQUEST } from '../../lib/mutation'
import { LOUNGE } from '../../lib/constants'
import { useMutation } from '@apollo/client'
import { Spin } from 'antd'

const fromToday = getDayDate(6, 0)


const PickupCreate = (props: {
    user: User
    pickupRequest: PickupRequest[]
}) => {
    const router = useRouter()
    // const [loungeCode, setLoungeCode] = useState<number>(LOUNGE.GANGNAM)
    const loungeCode = LOUNGE.GANGNAM
    const [pickupRequestDate, setPickupRequestDate] = useState<string>(moment().format().slice(0, 10))
    const [pickupRequestTime, setPickupRequestTime] = useState<string>('')
    const [makePickUpRequest, { loading }] = useMutation(MAKE_PICKUP_REQUEST, {
        variables: {
            loungeCode: loungeCode,
            requestDate: pickupRequestDate,
            requestTime: pickupRequestTime,
            phoneNumber: props.user.phoneNumber
        },
        onCompleted() {
            alert('픽업예약을 완료했어요!👏🏻')
            router.push('/')
        },
        onError(error) {
            console.error(error.message)
            if (/Duplicated/.test(error.message)) {
                alert('죄송합니다. 이미 예약된 시간입니다.')
            } else {
                alert('서비스 이용내역이 없습니다.')
            }
        }
    });

    // const onChangeLounge = (e: any) => {
    //     setLoungeCode(parseInt(e.target.value))
    // }

    const onChangeDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPickupRequestDate(fromToday[parseInt(e.currentTarget.value)].date)
    }
    const onChangeTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPickupRequestTime(e.currentTarget.value)
    }

    const availableTimes = availablePickupFittingRequestTime(pickupRequestDate, loungeCode, props.pickupRequest)
    return (
        <Layout>
            <div className="">
                <div className="goBackBtnWrap"><div className="goBackBtn" onClick={() => router.back()}></div></div>
                <div className="headroom"></div>
                <div className="pickUpWrap">
                    <h2>강남 라운지 픽업 예약</h2>

                    {/* <p className="inputTit">라운지</p>
                    <div onChange={(e) => onChangeLounge(e)}>
                        <input type="radio" onChange={() => { }} value={LOUNGE.GANGNAM} checked={loungeCode === LOUNGE.GANGNAM} />
                        <label htmlFor="gangnam">강남 라운지</label>

                        <input type="radio" onChange={() => { }} value={LOUNGE.YEUKSAM} checked={loungeCode === LOUNGE.YEUKSAM} />
                        <label htmlFor="yeuksam">라운지 역삼성당</label>
                    </div> */}

                    <p className="inputTit">날짜/시간</p>
                    <select id="" name="date" required onChange={e => onChangeDate(e)}>
                        <option value="" defaultValue="" hidden>방문 날짜를 선택해주세요.</option>
                        {fromToday.map(
                            (item, index) => (
                                <option key={index} id={index.toString()} value={index}>
                                    {getMDW(item.date)}
                                </option>
                            ))}
                    </select>

                    <select id="" name="time" required onChange={e => onChangeTime(e)}>
                        <option value="" defaultValue="" hidden>방문 시간을 선택해주세요.</option>
                        {pickupRequestDate !== null && availableTimes.map(
                            (item: any, index: any) => (
                                <option key={index} value={item.value}>{item.value} </option>
                            ))}
                    </select>

                    {pickupRequestDate && pickupRequestTime ?
                        (!loading ?
                            (<button className="active" type="button" onClick={() => makePickUpRequest()}>픽업예약하기</button>) :
                            (<Spin size="large" tip="잠시만 기다려주세요.." />)) :
                        (<button className="" type="button">픽업예약하기</button>)}
                </div>
            </div>


            <style jsx>{`
                    h2 {text-align:center;font-size:20px}
                    .headroom {height:64px}
                    .pickUpWrap {padding: 0 20px}
                    .inputTit {margin: 20px 0 4px;color:#33343a}
                    input {width:100%;height:40px;border-radius:4px;border:1px solid #d6d7d8;font-size:14px;padding:0 12px;color:#33343a}
                    input::placeholder {color:#bbb}
                    select {width:100%;height:36px;border-radius:4px;border:1px solid #d6d7d8;font-size:14px;padding:0 12px;margin-bottom:4px}
                    input:focus,select:focus {border:1px solid #33343a}
                    button {width:100%;height:48px;background-color:#ccc;color:#fff;font-size:16px;border-radius:4px;margin-top:24px}
                    .active {background-color:#c3512a}
                `}</style>
        </Layout >
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const client = createApolloClient(context)
    const { user } = await client.query({ query: CHECKUP_USER })
        .then(({ data }) => {
            return { user: data.checkUpUser };
        }).catch(() => {
            return { user: null };
        });
    if (!user) {
        redirect(context, "/pickup/inquiry")
    }
    const { pickupRequest } = await client.query({ query: GET_PICKUP_REQUEST_LIST })
        .then(({ data }) => {
            return { pickupRequest: data.getRequestList };
        }).catch(() => {
            return { pickupRequest: null };
        });

    return {
        props: {
            user,
            pickupRequest
        }
    }
}

export default PickupCreate