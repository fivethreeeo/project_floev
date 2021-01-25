import React, { useState } from 'react'
import { availableTime } from '../../utils/nonOccupiedTime'
import { getDayDate, getOnlyDate } from '../../utils/timeFormat'

const fromToday = getDayDate(13, 0)
const now = new Date(Date.now());

export default function Q12Request(props: {
    oldAnswers: Answers
    answersUpdate: (answersParam: Answers) => void
    currentStep: number
    max: number
    schedule: Schedule[]
    onPrev: () => void
    onNext: () => void
}) {
    const [loungeCode, setLoungeCode] = useState<number>(props.oldAnswers.loungeCode)
    const [requestDate, setRequestDate] = useState<string>(props.oldAnswers.requestDate)
    const [requestTime, setRequestTime] = useState<string>(props.oldAnswers.requestTime)

    function handleChangeDate(e: any) {
        const newRequestDate = fromToday[e.currentTarget.id].date
        setRequestDate(newRequestDate)
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

    const availableYeuksamTimes = availableTime(requestDate, 1, props.schedule)
    const availableGangNumTimes = availableTime(requestDate, 2, props.schedule)

    return (<>
        <div className="option-wrap">
            <div>날짜 선택</div>
            <div className="option-list">
                {fromToday.map(
                    (item: any, index: number) => (
                        <li className={getOnlyDate(item.date) === String(now.getDate()) ? "day-date today" : "day-date"} key={index} id={index.toString()} value={getOnlyDate(item.date)} onClick={e => handleChangeDate(e)}>
                            <p className="day">
                                {getOnlyDate(item.date) == String(now.getDate()) ? '오늘' : item.day}
                            </p>
                            <button className={item.date == requestDate ? "date selected" : "date"}>
                                {getOnlyDate(item.date)}
                            </button>
                        </li>)
                )}
            </div>
        </div>

        <div className="option-wrap">
            <div>라운지/시간 선택</div>
            <div className="option-lounge">
                <div>역삼성당</div>
                <div className="option-list">
                    {requestDate !== '' && availableYeuksamTimes.map(
                        (item: Slot, index: number) => (
                            // 오늘 현재시간 4시간 이후부터 예약 가능하나 3시 이후에는 예약 불가능
                            (getOnlyDate(requestDate) === String(now.getDate()) &&
                                (parseInt(item.time.slice(0, 2)) < (now.getHours() + 4) ||
                                    now.getHours() >= 15) ? '' :
                                (<li key={index} id={index.toString()} onClick={(e) => handleChangeLoungeTime(e)}>
                                    <button className={item.time === requestTime && item.loungeCode === loungeCode ? "time selected" : "time"} value={item.time + ',' + item.loungeCode}>{item.time}</button>
                                </li>))
                        ))}
                </div>
            </div>
            <div className="option-lounge">
                <div>강남</div>
                <div className="option-list">
                    {requestDate !== '' && availableGangNumTimes.map(
                        (item: Slot, index: number) => (
                            // 오늘 현재시간 4시간 이후부터 예약 가능하나 3시 이후에는 예약 불가능
                            (getOnlyDate(requestDate) === String(now.getDate()) &&
                                (parseInt(item.time.slice(0, 2)) < (now.getHours() + 4) ||
                                    now.getHours() >= 15) ? '' :
                                (<li key={index} id={index.toString()} onClick={(e) => handleChangeLoungeTime(e)}>
                                    <button className={item.time === requestTime && item.loungeCode === loungeCode ? "time selected" : "time"} value={item.time + ',' + item.loungeCode} >{item.time}</button>
                                </li>))
                        ))}
                </div>
            </div>

        </div>
        <div className="btnWrap">
            {requestDate === "" || requestTime === "" ?
                (<button className="btnNext disabled" type="button" disabled>다음</button>) :
                (<button className="btnNext gtm-028" type="button" onClick={() => props.onNext()}>다음</button>)}
        </div>
        <button className="btn btn01 gtm-012" style={{ fontSize: '16px', borderRadius: '24px' }} type="button" disabled={props.currentStep !== props.max ? false : true} onClick={() => props.onPrev()}>뒤로</button>
    </>)
}