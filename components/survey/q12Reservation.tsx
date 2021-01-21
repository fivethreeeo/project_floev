import React, { useState } from 'react'
import { availableTime } from '../../utils/nonOccupiedTime'
import { getDayDate, getOnlyDate } from '../../utils/timeFormat'

const fromToday = getDayDate(13, 0)
const now = new Date(Date.now());

export default function Q12Reservation(props: {
    oldAnswers: Answers
    answersUpdate: (answersParam: Answers) => void
    currentStep: number
    max: number
    schedule: Schedule[]
    onPrev: () => void
    onNext: () => void
}) {
    const [loungeCode, setLoungeCode] = useState<number>(props.oldAnswers.loungeCode)
    const [reservationDate, setReservationDate] = useState<string>(props.oldAnswers.reservationDate)
    const [reservationTime, setReservationTime] = useState<string>(props.oldAnswers.reservationTime)
    // const [loungeCode, setLoungeCode] = useState<number>(2) // 1: 역삼성당, 2: 강남
    // const [reservationDate, setReservationDate] = useState<string>("2021-01-19")
    // const [reservationTime, setReservationTime] = useState<string>("11:00")

    // const test = () => {
    //     setReservationDate("2021-01-19")
    //     setReservationTime("11:01")

    //     let answersParam: Answers = props.oldAnswers
    //     answersParam.loungeCode = 1
    //     answersParam.reservationDate = '2021-01-19'
    //     answersParam.reservationTime = '11:01'
    //     props.answersUpdate(answersParam)

    //     localStorage.setItem('floev[loungeCode]', String(1))
    // }

    function handleChangeDate(e: any) {
        const newReservationDate = fromToday[e.currentTarget.id].date
        setReservationDate(newReservationDate)
        setReservationTime('')

        let answersParam: Answers = props.oldAnswers
        answersParam.reservationDate = newReservationDate
        answersParam.loungeCode = 0
        answersParam.reservationTime = ''
        props.answersUpdate(answersParam)

        localStorage.setItem('floev[currentStep]', '12')
        localStorage.setItem('floev[reservationDate]', newReservationDate)
        localStorage.removeItem('floev[loungeCode]')
        localStorage.removeItem('floev[reservationTime]')
    }

    function handleChangeLoungeTime(e: any) {
        const newReservationTime = e.target.value.split(',')[0]
        const newLoungeCode = parseInt(e.target.value.split(',')[1])
        setReservationTime(newReservationTime)
        setLoungeCode(newLoungeCode)

        let answersParam: Answers = props.oldAnswers
        answersParam.reservationTime = newReservationTime
        answersParam.loungeCode = newLoungeCode
        props.answersUpdate(answersParam)

        localStorage.setItem('floev[currentStep]', '13')
        localStorage.setItem('floev[reservationTime]', newReservationTime)
        localStorage.setItem('floev[loungeCode]', String(newLoungeCode))
    }

    const availableYeuksamTimes = availableTime(reservationDate, 1, props.schedule)
    const availableGangNumTimes = availableTime(reservationDate, 2, props.schedule)

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
                            <button className={item.date == reservationDate ? "date selected" : "date"}>
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
                    {reservationDate !== '' && availableYeuksamTimes.map(
                        (item: Slot, index: number) => (
                            // 오늘 현재시간 4시간 이후부터 예약 가능하나 3시 이후에는 예약 불가능
                            (getOnlyDate(reservationDate) === String(now.getDate()) &&
                                (parseInt(item.time.slice(0, 2)) < (now.getHours() + 4) ||
                                    now.getHours() >= 15) ? '' :
                                (<li key={index} id={index.toString()} onClick={(e) => handleChangeLoungeTime(e)}>
                                    <button className={item.time === reservationTime && item.loungeCode === loungeCode ? "time selected" : "time"} value={item.time + ',' + item.loungeCode}>{item.time}</button>
                                </li>))
                        ))}
                </div>
            </div>
            <div className="option-lounge">
                <div>강남</div>
                <div className="option-list">
                    {reservationDate !== '' && availableGangNumTimes.map(
                        (item: Slot, index: number) => (
                            // 오늘 현재시간 4시간 이후부터 예약 가능하나 3시 이후에는 예약 불가능
                            (getOnlyDate(reservationDate) === String(now.getDate()) &&
                                (parseInt(item.time.slice(0, 2)) < (now.getHours() + 4) ||
                                    now.getHours() >= 15) ? '' :
                                (<li key={index} id={index.toString()} onClick={(e) => handleChangeLoungeTime(e)}>
                                    <button className={item.time === reservationTime && item.loungeCode === loungeCode ? "time selected" : "time"} value={item.time + ',' + item.loungeCode} >{item.time}</button>
                                </li>))
                        ))}
                </div>
            </div>

        </div>
        <div className="btnWrap">
            {reservationDate === "" || reservationTime === "" ?
                (<button className="btnNext disabled" type="button" disabled>다음</button>) :
                (<button className="btnNext gtm-028" type="button" onClick={() => props.onNext()}>다음</button>)}
        </div>
    </>)
}