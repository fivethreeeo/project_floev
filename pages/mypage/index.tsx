import React, { useState } from "react"
import Router from 'next/router'
import Layout from '../../layout/DefaultLayout'
import { getDayDate, getOnlyDate, getMDW, getHour, getWeekday } from '../../utils/timeFormat'
// import { CHANGE_PURCHASE_REQUEST, CANCEL_PURCHASE_REQUEST } from '../../lib/mutation'
import { CHECKUP_USER, GET_PURCHASE_REQUEST_LIST } from '../../lib/query'
import { availableTime } from '../../utils/surveyUtils'
import moment from 'moment'
import { Modal } from "antd"
import { GetServerSideProps } from "next"
import { createApolloClient } from "../../lib/apolloClient"

interface PurchaseRequest {
    id: string
    date: string
    loungeCode: number
}

const fromToday = getDayDate(14, 1)
const now = new Date(Date.now());

const MyPageIndex = (props: {
    user: any
    userRequests: PurchaseRequest[]
}) => {
    // 유저 정보
    const user = props.user
    const size = props.userRequests.length
    const userRequest = props.userRequests[size - 1]

    // 예약 변경용
    const [loungeCode, setLoungeCode] = useState<number>(0)
    const [requestDate, setRequestDate] = useState<string>(moment().add(15, 'hours').format().slice(0, 10))
    const [requestTime, setRequestTime] = useState<string>('')

    const [changeSuccess, setChangeSuccess] = useState<boolean>(false)
    const [cancelSuccess, setCancelSuccess] = useState<boolean>(false)
    // const [changedDateTime, setChangedDateTime] = useState(null)
    const [modal1, setModal1] = useState<boolean>(false)
    const [modal2, setModal2] = useState<boolean>(false)



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

    }
    function handleClickCancel() {

    }

    function showModal(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, modal: string) {
        e.preventDefault(); // 修复 Android 上点击穿透
        if (modal === 'modal1') {
            setModal1(true)
        } else if (modal === 'modal2') {
            setModal2(true)
        }
    }
    const availableYeuksamTimes = availableTime(requestDate, 1, props.userRequests)
    const availableGangNumTimes = availableTime(requestDate, 2, props.userRequests)
    return (
        <Layout>
            <div className="myPageWrap">
                <div className="goBackBtnWrap">
                    <div className="goBackBtn" onClick={() => Router.back()}></div>
                </div>

                {size !== 0 &&
                    (userRequest.date.slice(0, 16) > moment().format().slice(0, 16)) ?
                    (<div className="contentWrap">
                        <p className="qDesc3"><strong>{props.user.name}님</strong></p>
                        <p className="qDesc4">{props.user.phoneNumber}</p>

                        <div className="status-card">
                            <div className="inner-content">
                                <a className="mapLink" href={loungeCode === 1 ? "https://m.map.naver.com/search2/site.nhn?query=%EC%97%AD%EC%82%BC%20%ED%94%8C%EB%A1%9C%EB%B8%8C&sm=hty&style=v5&code=1175801694" : "https://m.map.naver.com/search2/site.nhn?query=%EA%B0%95%EB%82%A8%20%ED%94%8C%EB%A1%9C%EB%B8%8C&sm=hty&style=v5&code=1814217589"} target="_blank"><span>라운지 위치보기 &#xE001;</span></a>
                                <p className="booking-info">고객님의 방문일정은 <strong>라운지 {loungeCode === 1 ? "역삼성당" : "강남"}</strong><br /><strong>{getMDW(userRequest.date)} {getHour(userRequest.date)}</strong> 입니다.</p>
                            </div>
                            <div className="inner-btn-wrap">
                                <button className="btn-cancel" onClick={(e) => showModal(e, 'modal2')}>예약취소하기</button>
                                <button className="btn-change" onClick={(e) => showModal(e, 'modal1')}>일정변경하기</button>
                            </div>
                        </div>

                        <div className="noti-1">
                            <p className="inner-p-1"><strong>당일 변경/취소는 서비스 유지에 어려움을 줍니다.</strong></p>
                            <p className="inner-p-2">예약 변경/취소는 마이페이지를 통해<br /><strong>최소한</strong> 하루 전까지 부탁드려요.</p>
                            <p className="inner-p-3">플로브 서비스를 위해 배려해주셔서 감사합니다.</p>
                        </div>

                        <div className="noti-2">
                            <div className="innerLine"></div>
                            <p className="inner-p-1"><strong>플로브 방문 전 체크해주세요</strong></p>
                            <div className="inner-list">
                                <div className="li"><div className="imgbx"><img src="/static/new/noti2-img1.jpg" alt="" /></div><div className="txtbx"><p>예약시간에 맞추어<br />정시에 도착</p></div></div>
                                <div className="li"><div className="imgbx"><img src="/static/new/noti2-img2.jpg" alt="" /></div><div className="txtbx"><p>콘텍트렌즈는<br />빼고 방문</p></div></div>
                                <div className="li con3"><div className="imgbx"><img src="/static/new/noti2-img3.jpg" alt="" /></div><div className="txtbx"><p><span>(선택사항)</span><br />카카오톡으로<br />얼굴 사진 전송</p></div></div>
                                <div className="li"><div className="imgbx"><img src="/static/new/noti2-img4.jpg" alt="" /></div><div className="txtbx"><p>기존 착용안경<br />가져오기</p></div></div>
                            </div>
                        </div>

                    </div>


                    ) : (
                        <div>
                            <div className="contentWrap noBooking">
                                <p className="qDesc3"><strong>{props.user.name}님</strong></p>
                                <p className="qDesc4">{props.user.phoneNumber}</p>

                                {/* 1. 예약내역 없음 */}
                                {size === 0 ? (
                                    <div className="status-card">
                                        <div className="inner-content">
                                            <p className="booking-info">설문예약을 통해 플로브에서<br />고객님께 딱 알맞는 안경을 찾아보세요!</p>
                                        </div>
                                        <div className="inner-btn-wrap">
                                            <a href="/survey" className="btn-start">플로브 시작하기</a>
                                        </div>
                                    </div>
                                ) : (
                                        <div className="status-card">
                                            <div className="inner-content">
                                                <p className="booking-info" >고객님의 이전 예약내역은 <strong style={{ color: '#64433F' }}>라운지 {userRequest.loungeCode === 1 ? "역삼성당" : "강남"}</strong><br /><strong style={{ color: '#64433F' }}>{getMDW(userRequest.date)} {getHour(userRequest.date)}</strong> 입니다.</p>
                                            </div>
                                            <div className="inner-btn-wrap">
                                                <a href="/survey" className="btn-start">다시 예약하기</a>
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </div>
                    )}
            </div>

            <a style={{ display: 'block', margin: '64px auto 0', maxWidth: '420px', padding: '0 20px 80px', textDecoration: 'underline', fontWeight: 700, fontSize: '18px' }} href="/service-policy">서비스 정책 보기</a>

            {size !== 0 && (
                <Modal
                    visible={modal1}
                    onCancel={() => setModal1(false)} >
                    {!changeSuccess && (
                        <div className="q-wrap q12">
                            <div className="q-wrap__question-main">방문하실 일정을 선택해주세요.</div>
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
                                <button className="q-wrap__btn q-wrap__btn-next q-wrap__btn-next--disabled" type="button"><span>일정변경하기</span> <img src="static/img/survey/ic-arrows-right.png" alt="" /></button>) :
                                (<button className="q-wrap__btn q-wrap__btn-next tn-0024" type="button" onClick={() => handleClickChange()}><span>일정변경하기</span> <img src="static/img/survey/ic-arrows-right.png" alt="" /></button>)
                            }

                        </div>
                    )}
                    {/* 예약 변경 완료 후 */}
                    {/* { changeSuccess && (
                        <div className="modalWrap bookingChange">
                            <div className="modalDesc">
                                <p className="main" style={{ fontWeight: 400 }}><strong>{user.name}님</strong>의<br />예약일정을 변경했습니다.</p>
                                <div className="innerLine"></div>
                            </div>
                            <div style={{ display: 'block', content: '', clear: 'both' }}></div>

                            <div className="bookingInfo" style={{ padding: '40px 32px' }}>
                                <p><span>방문날짜</span><strong style={{ color: '#C3512A' }}>{getYMDW(changedDateTime)}</strong></p>
                                <p><span>방문시간</span><strong style={{ color: '#C3512A' }}>{getHour(changedDateTime)}</strong></p>
                                <p><span>방문지점</span><strong style={{ color: '#C3512A' }}>플로브(Floev) 라운지 역삼성당</strong><br /></p>
                                <p style={{ paddingLeft: '70px', marginBottom: '0' }}><a href="https://m.map.naver.com/search2/site.nhn?query=%EC%97%AD%EC%82%BC%20%ED%94%8C%EB%A1%9C%EB%B8%8C&sm=hty&style=v5&code=1175801694" target="_blank"><span style={{ fontSize: '13px', color: '#848889', textDecoration: 'underline', cursor: 'pointer' }}>라운지 위치 확인하기</span></a></p>
                            </div>
                            <div style={{ padding: '0 24px' }}><button className="btn01" type="button" style={{ fontSize: '16px' }} onClick={() => setModal1(false)}>확인</button></div>
                        </div>
                    )} */}
                </Modal>
            )}
            {size !== 0 && (
                <Modal
                    visible={modal2}
                    onCancel={() => setModal2(false)}>
                    {!cancelSuccess ? (
                        <div className="modalWrap bookingCancel">
                            <div className="modalDesc">
                                <p className="main">취소사유를 선택해주세요.</p>
                                <p className="sub">더 좋은 서비스를 준비하도록 도와주세요.</p>
                                <div className="innerLine"></div>
                            </div>
                            <div className="whyCancel">

                                <div className="answerWrap inputRadio">
                                    <p><input type="radio" name="whyCancel" id="whyCancel-1" value="급한약속" /><label htmlFor="whyCancel-1" className="input-label"><span className="inputImg"></span><span className="inputTxt">급한 약속이 생겼어요.</span></label></p>
                                    <p><input type="radio" name="whyCancel" id="whyCancel-2" value="위치멀어" /><label htmlFor="whyCancel-2" className="input-label"><span className="inputImg"></span><span className="inputTxt">라운지 위치가 방문하기 멀어요.</span></label></p>
                                </div>

                                <div className="personal">
                                    <p>자세히 들려주기</p>
                                    <textarea
                                        name=""
                                        id=""
                                        placeholder="예시) 원하는 안경 브랜드가 없어요."
                                    ></textarea>
                                </div>
                            </div>

                            <button className="q-wrap__btn q-wrap__btn-next tn-0024" type="button" onClick={() => handleClickCancel()}><span>일정취소하기</span> <img src="static/img/survey/ic-arrows-right.png" alt="" /></button>

                        </div>
                    ) : (
                            <div className="modalWrap bookingCancel">
                                <div className="modalDesc">
                                    <p className="main" style={{ fontWeight: 400 }}><strong>{user.name}님</strong>의<br />예약일정을 취소했습니다.</p>
                                    <div className="innerLine"></div>
                                </div>
                                <div className="goodBye">
                                    <div className="">더 좋은 기회에 뵙기를 기대할게요!</div>
                                </div>
                                <div style={{ padding: '0 24px' }}><button className="btn01" type="button" style={{ fontSize: '16px' }} onClick={() => { Router.push('/') }}>확인</button></div>
                            </div>
                        )}
                </Modal>
            )}
        </Layout >
    )
}
export const getServerSideProps: GetServerSideProps = async (context) => { //{ req }: { req: any }
    const client = createApolloClient(context)

    // 유저 로그인을 해서 유저가 없으면
    const { user } = await client.query({ query: CHECKUP_USER }) //const { user } = 
        .then(({ data }) => {
            return { user: data.checkUpUser };
        }).catch(() => {
            return { user: null };
        });
    const { purchaseRequestList } = await client.query({ query: GET_PURCHASE_REQUEST_LIST })
        .then(({ data }) => {
            return { purchaseRequestList: data.getPuchaseRequestList };
        })
        .catch((error) => {
            console.error("Schedule data fetch ERROR" + error.message)
            return { purchaseRequestList: null };
        });
    const userRequests = user.requests

    return {
        props: {
            // this hydrates the clientside Apollo cache in the `withApollo` HOC
            apolloStaticCache: client.cache.extract(),
            user,
            userRequests,
            purchaseRequestList
        },
    }
}

export default MyPageIndex