import React, { useState } from "react"
import { useRouter } from 'next/router'
import Layout from '../../layout/DefaultLayout'
import { getDayDate, getOnlyDate, getMDW, getHour, getWeekday } from '../../utils/timeFormat'
import { CHANGE_PURCHASE_REQUEST, CANCEL_PURCHASE_REQUEST } from '../../lib/mutation'
import { CHECKUP_USER, GET_PICKUP_REQUEST_LIST } from '../../lib/query'
import { availablePurchaseRequestTime } from '../../utils/surveyUtils'
import moment from 'moment'
import { Modal, Spin } from "antd"
import { GetServerSideProps } from "next"
import { createApolloClient } from "../../lib/apolloClient"
import { useMutation } from "@apollo/client"
import redirect from "../../lib/redirect"

const fromToday = getDayDate(7, 1)
const now = new Date(Date.now());

const PickupPageIndex = (props: {
    user: User
    purchaseRequestList: PurchaseRequest[]
}) => {
    // 유저 정보
    const size = props.user.requests.length
    const tempPR: PurchaseRequest = {
        id: '',
        date: '',
        loungeCode: 0,
        type: 0
    }
    const [userRequest, setUserRequest] = useState<PurchaseRequest>(size !== 0 ? props.user.requests[size - 1] : tempPR)

    // 예약 변경용
    const router = useRouter()
    const [loungeCode, setLoungeCode] = useState<number>(0)
    const [requestDate, setRequestDate] = useState<string>(moment().add(15, 'hours').format().slice(0, 10))
    const [requestTime, setRequestTime] = useState<string>('')

    const [modal1, setModal1] = useState<boolean>(false)
    const [modal2, setModal2] = useState<boolean>(false)
    const [changePurchaseRequest, { loading: changeLoading }] = useMutation(CHANGE_PURCHASE_REQUEST, {
        variables: {
            requestId: userRequest.id,
            loungeCode: loungeCode,
            requestDate: requestDate,
            requestTime: requestTime
        },
        onCompleted(data: any) {
            if (data) {
                setModal1(false)
                setUserRequest(data.changePurchaseRequest)
                // props.apolloStaticCache.cache.reset().then(() => { redirect({}, '/mypage') })
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
    const [cancelPurchaseRequest, { loading: cancelLoading }] = useMutation(CANCEL_PURCHASE_REQUEST, {
        variables: { requestId: userRequest.id },
        onCompleted() {
            alert('예약 취소에 성공하였습니다!\n'
                + '꼭 다시 뵙기를 기원할게요!')
            router.push('/')
        },
        onError(error) {
            console.error(error.message)
            if (error.message === 'request not found') {
                alert('죄송합니다. 예약내역이 없습니다.')
            } else {
                alert('알 수 없는 오류가 발생했어요!')
            }
            router.push('/')
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

    function handleClickChange() {
        changePurchaseRequest()
    }
    function handleClickCancel() {
        cancelPurchaseRequest()
    }

    function showModal(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, modal: string) {
        e.preventDefault(); // 修复 Android 上点击穿透
        if (modal === 'modal1') {
            setModal1(true)
        } else if (modal === 'modal2') {
            setModal2(true)
        }
    }
    const availableYeuksamTimes = availablePurchaseRequestTime(requestDate, 1, props.purchaseRequestList)
    const availableGangNumTimes = availablePurchaseRequestTime(requestDate, 2, props.purchaseRequestList)
    return (
        <Layout name={props.user ? props.user.name : undefined}>
            <div className="mypage">
                {size !== 0 ? // 예약 내역이 있는 경우
                    ((userRequest.date.slice(0, 16) > moment().format().slice(0, 16)) && userRequest.status !== 'cancel') ? // 오늘 이후 취소되지 않은 예약이 있을 경우
                        (<div className="contentWrap">
                            <p className="qDesc3"><strong>{props.user.name}님</strong></p>
                            <p className="qDesc4">{props.user.phoneNumber}</p>

                            <div className="status-card">
                                <div className="inner-content">
                                    <a className="mapLink" href={loungeCode === 1 ? "http://naver.me/xH2We7TP" : "http://naver.me/xfa1CFMZ"} target="_blank"><span>라운지 위치보기 &#xE001;</span></a>
                                    <p className="booking-info">고객님의 방문일정은 <strong>라운지 {loungeCode === 1 ? "역삼성당" : "강남"}</strong><br /><strong>{getMDW(userRequest.date)} {getHour(userRequest.date)}</strong> 입니다.</p>
                                </div>
                                <div className="inner-btn-wrap">
                                    <button className="btn-cancel" onClick={(e) => showModal(e, 'modal2')}>예약취소하기</button>
                                    <button className="btn-change" onClick={(e) => showModal(e, 'modal1')}>일정변경하기</button>
                                </div>
                            </div>
                        </div>) :
                        // 이전 예약이 있지만 취소상태이거나 그 예약이 이전 예약인 경우
                        (<div className="contentWrap noBooking">
                            <p className="qDesc3"><strong>{props.user.name}님</strong></p>
                            <p className="qDesc4">{props.user.phoneNumber}</p>
                            {userRequest.status === 'cancel' ? // 취소 상태의 예약인 경우 : 예약이 하나도 없다는 걸 가정(오류 있음)
                                (<div className="status-card">
                                    <div className="inner-content">
                                        <p className="booking-info">설문예약을 통해 플로브에서<br />고객님께 딱 알맞는 안경을 찾아보세요!</p>
                                    </div>
                                    <div className="inner-btn-wrap">
                                        <a href="/survey" className="btn-start">플로브 시작하기</a>
                                    </div>
                                </div>) : // 취소가 아닌 경우 : 이전 방문한 적이 있는 경우
                                (<div className="status-card">
                                    <div className="inner-content">
                                        <p className="booking-info" >고객님의 이전 예약내역은 <strong style={{ color: '#64433F' }}>라운지 {userRequest.loungeCode === 1 ? "역삼성당" : "강남"}</strong><br /><strong style={{ color: '#64433F' }}>{getMDW(userRequest.date)} {getHour(userRequest.date)}</strong> 입니다.</p>
                                    </div>
                                    <div className="inner-btn-wrap">
                                        <a href="/survey" className="btn-start">다시 예약하기</a>
                                    </div>
                                </div>)
                            }
                        </div>
                        ) :
                    // 예약 내역이 하나도 없는 경우
                    (<div className="contentWrap noBooking">
                        <p className="qDesc3"><strong>{props.user.name}님</strong></p>
                        <p className="qDesc4">{props.user.phoneNumber}</p>
                        <div className="status-card">
                            <div className="inner-content">
                                <p className="booking-info">설문예약을 통해 플로브에서<br />고객님께 딱 알맞는 안경을 찾아보세요!</p>
                            </div>
                            <div className="inner-btn-wrap">
                                <a href="/survey" className="btn-start">플로브 시작하기</a>
                            </div>
                        </div>
                    </div>)
                }

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
                                                    <p className={getOnlyDate(item.date) == String(now.getDate()) ? "day today" : "day"}>
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
                                    <div className="q12__lounge-time-title">라운지/시간 선택</div>
                                    <div className="q12__title-underline"></div>
                                    <div className="q12__option-lounge">
                                        <div></div>
                                        <div className="lounge-name">라운지 역삼성당</div>
                                        <div className="lounge-caption">역삼역 1번출구 도보7분, 주차가능</div>
                                        <ul className="option-list">
                                            {requestDate !== '' && !(getWeekday(requestDate) === '목요일' || getWeekday(requestDate) === '금요일') &&
                                                availableYeuksamTimes.map(
                                                    (item: Slot, index: number) => (
                                                        // 오늘 현재시간 4시간 이후부터 예약 가능하나 3시 이후에는 예약 불가능
                                                        (getOnlyDate(requestDate) === String(now.getDate()) &&
                                                            (parseInt(item.time.slice(0, 2)) < (now.getHours() + 4) ||
                                                                now.getHours() >= 15) ? '' :
                                                            (<li key={index} id={index.toString()} onClick={(e) => handleChangeLoungeTime(e)}>
                                                                <button className={item.time === requestTime && item.loungeCode === loungeCode ? "time selected" : "time"} value={item.time + ',' + item.loungeCode}>{item.time}</button>
                                                            </li>))
                                                    )
                                                )}
                                        </ul>
                                    </div>
                                    <div className="q12__option-lounge">
                                        <div></div>
                                        <div className="lounge-name">라운지 강남</div>
                                        <div className="lounge-caption">강남역 4번출구 도보3분, 주차가능</div>
                                        <ul className="option-list">
                                            {requestDate !== '' && availableGangNumTimes.map(
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
                                    (<button className="q-wrap__btn q-wrap__btn-next tn-0026" type='submit'
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
                            <div className="q-wrap__question-main">취소사유를 선택해주세요.</div>
                            <div className="q-wrap__question-sub">더 좋은 서비스를 준비하도록 도와주세요.</div>
                        </div>
                        <div className="whyCancel" style={{ padding: '0 20px' }}>
                            <input className="q-wrap__input-radio" name="whyCancel" type="radio" id="q1_1_c" />
                            <label className="q-wrap__label-radio-100" htmlFor="q1_1_c">급한 약속이 생겼어요.</label>
                            <input className="q-wrap__input-radio" name="whyCancel" type="radio" id="q1_2_c" />
                            <label className="q-wrap__label-radio-100" htmlFor="q1_2_c">라운지 위치가 방문하기 멀어요.</label>

                            <div className="q-wrap__textarea-wrap" style={{ padding: '0 0' }}>
                                <p className="q-wrap__textarea-caption">* 자세히 들려주기</p>
                                <textarea
                                    className="q-wrap__textarea"
                                    placeholder="예시) 원하는 안경 브랜드가 없어요."
                                ></textarea>
                            </div>
                        </div>

                        {(!cancelLoading ?
                            (<button className="q-wrap__btn q-wrap__btn-next tn-0026" type='submit' style={{ background: "#333" }}
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

    if (!user) {
        redirect(context, '/pickup/inquiry')
        return { props: {} }
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

export default PickupPageIndex