import React, { useState } from 'react'
import { availablePurchaseRequestTime } from '../../utils/surveyUtils'
import { getDayDate, getOnlyDate, getWeekday } from '../../utils/timeFormat'
import { LOUNGE } from '../../lib/constants'
import * as Creep from '../../lib/hatchery'
import { EVENT } from '../../lib/constants'

const fromToday = getDayDate(7, 0)
const now = new Date(Date.now());

export default function Q12Request(props: SurveyProps) {
    const [loungeCode, setLoungeCode] = useState<number>(props.oldAnswers.loungeCode)
    const [requestDate, setRequestDate] = useState<string>(props.oldAnswers.requestDate)
    const [requestTime, setRequestTime] = useState<string>(props.oldAnswers.requestTime)

    function handleChangeDate(e: any) {
        const newRequestDate = fromToday[e.currentTarget.id].date
        setRequestDate(newRequestDate)
        setLoungeCode(0)
        setRequestTime('')

        let answersParam: Answers = props.oldAnswers
        answersParam.requestDate = newRequestDate
        answersParam.loungeCode = 0
        answersParam.requestTime = ''
        props.answersUpdate(answersParam)

        localStorage.setItem('floev[currentStep]', '12')
        localStorage.setItem('floev[requestDate]', newRequestDate)
        localStorage.removeItem('floev[loungeCode]')
        localStorage.removeItem('floev[requestTime]')
    }

    function handleChangeLoungeTime(e: any) {
        const newRequestTime = e.target.value.split(',')[0]
        const newLoungeCode = parseInt(e.target.value.split(',')[1])
        setRequestTime(newRequestTime)
        setLoungeCode(newLoungeCode)

        let answersParam: Answers = props.oldAnswers
        answersParam.requestTime = newRequestTime
        answersParam.loungeCode = newLoungeCode
        props.answersUpdate(answersParam)

        localStorage.setItem('floev[currentStep]', '13')
        localStorage.setItem('floev[requestTime]', newRequestTime)
        localStorage.setItem('floev[loungeCode]', String(newLoungeCode))
    }

    function naverPixelRequest() {
        let _nasa = {
            cnv: ''
        };
        if (window.wcs) {
            _nasa["cnv"] = window.wcs.cnv("4", "1");
            window.wcs.inflow("floev.com");
            window.wcs_do(_nasa);
        }
    }
    async function handleClickPrev() {
        await Creep.recordEvent({
            hatchery: props.hatchery,
            event: Creep.createPostDataOf(EVENT.SURVEY.Q12.PREV)
        })
        props.onPrev()
    }
    async function handleClickNext() {
        naverPixelRequest()
        await Creep.recordEvent({
            hatchery: props.hatchery,
            event: Creep.createPostDataOf(EVENT.SURVEY.Q12.NEXT)
        })
        props.onNext()
    }

    const availableYeuksamTimes = availablePurchaseRequestTime(requestDate, LOUNGE.YEUKSAM, props.purchaseRequest)
    const availableGangNumTimes = availablePurchaseRequestTime(requestDate, LOUNGE.GANGNAM, props.purchaseRequest)

    return (<>
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
                    <div className="q12__coupon">
                        <div><strong>지금 예약 완료하고<br /><span>2만원 할인 쿠폰</span> 받아 가세요!</strong></div>
                        <img src="/img/survey/coupon-welcome-banner.png" alt="" />
                    </div>
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

            <div className="q-wrap__btn-wrap">
                <button className="q-wrap__btn q-wrap__btn-prev tn-0025" type="button" disabled={props.currentStep !== props.max ? false : true} onClick={handleClickPrev}>이전</button>
                {requestDate === "" || loungeCode === 0 || requestTime === "" ? (
                    <button className="q-wrap__btn q-wrap__btn-next q-wrap__btn-next--disabled" type="button"><span>다음</span> <img src="/img/survey/ic-arrows-right.png" alt="" /></button>) :
                    (<button className="q-wrap__btn q-wrap__btn-next tn-0024" type="button" onClick={handleClickNext}><span>다음</span> <img src="/img/survey/ic-arrows-right.png" alt="" /></button>)
                }
            </div>
        </div>
    </>)
}