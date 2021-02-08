import React, { useState } from "react"
import { useRouter } from 'next/router'
import Layout from '../../layout/DefaultLayout'
import { getDayDate, getOnlyDate, getMDW, getHour, dayGap } from '../../utils/timeFormat'
import { CHANGE_PICKUP_REQUEST, CANCEL_PICKUP_REQUEST } from '../../lib/mutation'
import { CHECKUP_USER, GET_PICKUP_REQUEST_LIST } from '../../lib/query'
import { availablePickupFittingRequestTime } from '../../utils/surveyUtils'
import moment from 'moment'
import { Modal, Spin } from "antd"
import { GetServerSideProps } from "next"
import { createApolloClient } from "../../lib/apolloClient"
import { useMutation } from "@apollo/client"
import redirect from "../../lib/redirect"
import { LOUNGE, REQUEST } from "../../lib/constants"

const fromToday = getDayDate(6, 0)
const now = new Date(Date.now());

const PickupPageIndex = (props: {
    user: User,
    userPickupRequests: PickupRequest[]
    pickupRequestList: PickupRequest[]
}) => {
    // 유저 정보
    const size = props.userPickupRequests.length
    const tempPR: PickupRequest = {
        id: '',
        date: '',
        loungeCode: 0,
        type: 0
    }
    const [userRequest, setUserRequest] = useState<PickupRequest>(size !== 0 ? props.userPickupRequests[size - 1] : tempPR)

    // 예약 변경용
    const router = useRouter()
    const [loungeCode, setLoungeCode] = useState<number>(LOUNGE.GANGNAM)
    const [requestDate, setRequestDate] = useState<string>(moment().add(15, 'hours').format().slice(0, 10))
    const [requestTime, setRequestTime] = useState<string>('')
    const [feedback, setFeedback] = useState<string>('')

    const [modal1, setModal1] = useState<boolean>(false)
    const [modal2, setModal2] = useState<boolean>(false)
    const [changePickupRequest, { loading: changeLoading }] = useMutation(CHANGE_PICKUP_REQUEST, {
        variables: {
            requestId: userRequest.id,
            loungeCode: loungeCode,
            requestDate: requestDate,
            requestTime: requestTime
        },
        onCompleted(data: any) {
            if (data) {
                setModal1(false)
                setUserRequest(data.changePickupRequest)
                // props.apolloStaticCache.cache.reset().then(() => { redirect({}, '/mypage') })
                alert('픽업예약을 변경했어요!👏🏻')
            }
        },
        onError(error) {
            console.error("error: " + error.message)
            if (error.message === "Duplicated") {
                alert('죄송합니다. 이미 예약된 시간입니다.')
            } else {
                alert('알 수 없는 오류가 발생했어요!')
                router.push('/')
            }
        }
    });
    const [cancelPickupRequest, { loading: cancelLoading }] = useMutation(CANCEL_PICKUP_REQUEST, {
        variables: { requestId: userRequest.id },
        onCompleted() {
            alert('픽업예약을 취소했어요!')
            router.push('/pickup')
        },
        onError(error) {
            console.error(error.message)
            if (error.message === 'request not found') {
                alert('죄송합니다. 예약내역이 없습니다.')
            } else {
                alert('알 수 없는 오류가 발생했어요!')
            }
            router.push('/pickup')
        }
    });

    function handleChangeDate(e: any) {
        const newRequestDate = fromToday[e.currentTarget.id].date
        setRequestDate(newRequestDate)
        setLoungeCode(0)
        setRequestTime('')
    }

    function handleChangeLoungeTime(e: any) {
        const newRequestTime = e.target.value.split(',')[0]
        const newLoungeCode = parseInt(e.target.value.split(',')[1])
        setRequestTime(newRequestTime)
        setLoungeCode(newLoungeCode)
    }

    function handleChangeFeedback(e: any) {
        setFeedback(e.target.value)
    }

    function handleClickChange() {
        changePickupRequest()
    }
    function handleClickCancel() {
        cancelPickupRequest()
    }

    function showModal(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, modal: string) {
        e.preventDefault(); // 修复 Android 上点击穿透
        if (modal === 'modal1') {
            setModal1(true)
        } else if (modal === 'modal2') {
            setModal2(true)
        }
    }
    const availablePickupFittingTimes = availablePickupFittingRequestTime(requestDate, LOUNGE.GANGNAM, props.pickupRequestList)
    return (
        <Layout title="플로브 - 나의 눈을 위한 안경 큐레이션 서비스" name={props.user ? props.user.name : undefined}>
            <div className="mypage">
                <div className="contentWrap">
                    <p className="qDesc3"><strong>{props.user.name}님</strong></p>
                    <p className="qDesc4">{props.user.phoneNumber}</p>

                    <div className="status-card">
                        <div className="inner-content">
                            <a className="mapLink" href={loungeCode === 1 ? "http://naver.me/xH2We7TP" : "http://naver.me/xfa1CFMZ"} target="_blank"><span>라운지 위치보기 &#xE001;</span></a>
                            <p className="booking-info">고객님의 픽업 방문일정은 <strong>라운지 {loungeCode === 1 ? "역삼성당" : "강남"}</strong><br /><strong>{getMDW(userRequest.date)} {getHour(userRequest.date)}</strong> 입니다.</p>
                        </div>
                        <div className="inner-btn-wrap">
                            <button className="btn-change" onClick={(e) => showModal(e, 'modal1')}>일정변경하기</button>
                            <button className="btn-cancel" onClick={(e) => showModal(e, 'modal2')}>예약취소하기</button>
                        </div>
                    </div>
                </div>

            </div>
            {/* 예약 변경 모달 */}
            <Modal className="mypage-modal-outer" visible={modal1} onCancel={() => setModal1(false)} >
                <div className="mypage-modal">
                    <div className="modalWrap">
                        <div className="q-wrap q12">
                            <div className="q-wrap__question-main">변경하실 일정을 선택해주세요.</div>
                            <div className="q-wrap__question-sub">오늘을 포함해 최대 7일 이후까지 예약 가능합니다.</div>
                            <div className="q-wrap__answer-wrap q12__schedule">
                                <div className="q12__day-date">
                                    <div className="q12__day-date-title">날짜 선택</div>
                                    <div className="q12__title-underline"></div>
                                    <ul className="q12__day-date-option-list">
                                        {fromToday.map(
                                            (item: any, index: number) => (
                                                <li className={getOnlyDate(item.date) === String(now.getDate()) ? "q12__day-date-option today" : "q12__day-date-option"} key={index} id={index.toString()} value={getOnlyDate(item.date)} onClick={e => handleChangeDate(e)}>
                                                    <p className={getOnlyDate(item.date) === String(now.getDate()) ? "day today" : "day"}>
                                                        {getOnlyDate(item.date) == String(now.getDate()) ? '오늘' : item.day}
                                                    </p>
                                                    <button className={item.date == requestDate ? "date selected" : "date"}>
                                                        {getOnlyDate(item.date)}
                                                    </button>
                                                </li>)
                                        )}
                                    </ul>
                                </div>
                                <div className="q12__coupon-area">
                                    <div className="q12__coupon"></div>
                                </div>
                                <div className="q12__lounge-time">
                                    <div className="q12__option-lounge">
                                        <div></div>
                                        <div className="lounge-name">라운지 강남</div>
                                        <div className="lounge-caption">강남역 4번출구 도보3분, 주차가능</div>
                                        <ul className="option-list">
                                            {requestDate !== '' && availablePickupFittingTimes.map(
                                                (item: Slot, index: number) => (
                                                    // 오늘 현재시간 4시간 이후부터 예약 가능하나 3시 이후에는 예약 불가능
                                                    (getOnlyDate(requestDate) === String(now.getDate()) &&
                                                        (parseInt(item.time.slice(0, 2)) < (now.getHours() + 4) ||
                                                            now.getHours() >= 15) ? '' :
                                                        (<li key={index} id={index.toString()} onClick={(e) => handleChangeLoungeTime(e)}>
                                                            <button className={item.time === requestTime && item.loungeCode === loungeCode ? "time selected" : "time"} value={item.time + ',' + item.loungeCode} >{item.time}</button>
                                                        </li>))
                                                )
                                            )}
                                        </ul>
                                    </div>

                                </div>
                            </div>

                            {requestDate === "" || loungeCode === 0 || requestTime === "" ? (
                                <button className="q-wrap__btn q-wrap__btn-next q-wrap__btn-next--disabled" type="button"><span>일정변경하기</span></button>) :
                                (!changeLoading ?
                                    (<button className="q-wrap__btn q-wrap__btn-next" type='submit'
                                        onClick={() => handleClickChange()}><span>일정변경하기</span></button>) :
                                    (<Spin size="large" tip="잠시만 기다려주세요.." />))
                            }
                        </div>
                    </div>
                </div>
            </Modal>

            {/* 예약 취소 모달 */}
            <Modal
                className="mypage-modal-outer"
                visible={modal2}
                onCancel={() => setModal2(false)}>
                <div className="mypage-modal">
                    <div className="modalWrap">
                        <div className="q-wrap">
                            <div className="q-wrap__question-main">취소사유를 알려주세요.</div>
                            <div className="q-wrap__question-sub">더 좋은 서비스를 준비하도록 도와주세요.</div>
                        </div>
                        <div className="whyCancel" style={{ padding: '0 20px' }}>
                            <div className="q-wrap__textarea-wrap" style={{ padding: '0 0' }} onChange={e => handleChangeFeedback(e)}>
                                <textarea
                                    className="q-wrap__textarea" value={feedback}
                                    placeholder="예시) 일정이 확실하지 않아요."
                                ></textarea>
                            </div>
                        </div>

                        {(!cancelLoading ?
                            (<button className="q-wrap__btn q-wrap__btn-next" type='submit' style={{ background: "#333" }}
                                onClick={() => handleClickCancel()}><span>일정취소하기</span></button>) :
                            (<Spin size="large" tip="잠시만 기다려주세요.." />))}
                    </div>
                </div>
            </Modal>
        </Layout >
    )
}
export const getServerSideProps: GetServerSideProps = async (context) => { //{req}: { req: any }
    const client = createApolloClient(context)

    // 유저 로그인을 해서 유저가 없으면
    const { user } = await client.query({ query: CHECKUP_USER }) //const {user} =
        .then(({ data }) => {
            return { user: data.checkUpUser };
        }).catch(() => {
            return { user: null };
        });
    let goRedirect = false
    let destination = ''
    let userPickupRequests: PickupRequest[] = []
    if (user === null) {
        goRedirect = true
        destination = "/pickup/inquiry"
    } else {
        user.requests.map((item: PickupRequest) => {
            // 오늘 이후의 픽업예약
            if (dayGap(item.date.slice(0, 10)) >= 0 && item.type === REQUEST.PICKUP && item.status !== 'cancel') {
                userPickupRequests.push(item)
            }
        })
        if (userPickupRequests.length === 0) {
            goRedirect = true
            destination = "/pickup/create"
        }
    }
    if (goRedirect) {
        redirect(context, destination)
        return { props: {} }
    }

    const { pickupRequestList } = await client.query({ query: GET_PICKUP_REQUEST_LIST })
        .then(({ data }) => {
            return { pickupRequestList: data.getRequestList };
        }).catch((error) => {
            console.error(error.message)
            return { pickupRequestList: null };
        });

    return {
        props: {
            user,
            userPickupRequests,
            pickupRequestList
        }
    }
}

export default PickupPageIndex