import React, { useState } from 'react'
import { availableTime } from '../../utils/nonOccupiedTime'
import { getDayDate, getOnlyDate } from '../../utils/timeFormat'
import moment from 'moment'

const loungeList = [
    { 'name': '강남', 'code': 2 },
    { 'name': '역삼성당', 'code': 1 }
]

const fromToday = getDayDate(14)
const now = new Date(Date.now());

export default function Q12Reservation(props: {
    oldAnswers: Answers
    answersUpdate: (answersParam: Answers) => void
    currentStep: number
    max: number
    onPrev: () => void
    onNext: () => void
}) {
    const [lounge, setLounge] = useState<number>(
        parseInt(localStorage.getItem('floev[lounge]') ?? '2')) // 1: 역삼성당, 2: 강남
    const [reservationDate, setReservationDate] = useState<string>(
        localStorage.getItem('floev[reservationDate]') ?? moment().add(15, 'hours').format().slice(0, 10))
    const [reservationTime, setReservationTime] = useState<string>(
        localStorage.getItem('floev[reservationTime]') ?? '')

    function handleChangeLounge(e: any) {
        const newLounge = parseInt(e.target.value)
        setLounge(newLounge)
        setReservationDate('')
        setReservationTime('')

        let answersParam: Answers = props.oldAnswers
        answersParam.lounge = newLounge
        answersParam.reservationDate = ''
        answersParam.reservationTime = ''
        props.answersUpdate(answersParam)

        localStorage.setItem('floev[currentStep]', '12')
        localStorage.setItem('floev[lounge]', String(newLounge))
        localStorage.removeItem('floev[reservationDate]')
        localStorage.removeItem('floev[reservationTime]')
    }

    function handleChangeDate(e: any) {
        const newReservationDate = fromToday[e.currentTarget.id].date
        setReservationDate(newReservationDate)
        setReservationTime('')

        let answersParam: Answers = props.oldAnswers
        answersParam.reservationDate = newReservationDate
        answersParam.reservationTime = ''
        props.answersUpdate(answersParam)

        localStorage.setItem('floev[currentStep]', '12')
        localStorage.setItem('floev[reservationDate]', newReservationDate)
        localStorage.removeItem('floev[reservationTime]')
    }

    function handleChangeTime(e: any) {
        const newReservationTime =
            e.currentTarget.value.toString().slice(0, 2) + ':' +
            e.currentTarget.value.toString().slice(2, 4);
        setReservationTime(newReservationTime)

        let answersParam: Answers = props.oldAnswers
        answersParam.reservationTime = newReservationTime
        props.answersUpdate(answersParam)

        localStorage.setItem('floev[currentStep]', '13')
        localStorage.setItem('floev[reservationTime]', newReservationTime)
    }

    const availableTimes = availableTime(reservationDate, lounge, [])
    return (<>
        <div className="contentWrap reservedTime">
            <p className="qDesc">방문 가능한 날짜와 시간을 확인하고 예약해주세요.</p>
            <p className="qDesc2">최대 14일 이후까지 예약 가능합니다.</p>
            <div className="answerWrap">
                <div className="lounge optionWrap">
                    <div className="inner">
                        <p className="optionTitle">라운지 선택</p>
                        <div className="innerLineWrap"><div className="innerLine"></div></div>
                        <ul className="optionList">
                            {loungeList.map((item, index) => (
                                <li key={index} value={item.code} onClick={(e) => handleChangeLounge(e)}>
                                    <button className={item.code === lounge ? "selected gtm-029" : "gtm-030"}>{item.name}</button>
                                </li>
                            ))}
                            <li className="space"></li>
                            <div className="clearfix"></div>
                        </ul>
                    </div>
                </div>
                <div className="date optionWrap">
                    <div className="inner">
                        <p className="optionTitle">날짜 선택</p>
                        <div className="innerLineWrap"><div className="innerLine"></div></div>
                        <ul className="optionList">
                            {fromToday.map(
                                (item: any, index: number) => (
                                    // list name='date'
                                    <li key={index} id={index.toString()} value={getOnlyDate(item.date)} onClick={e => handleChangeDate(e)}>
                                        <p className="day">
                                            <span className={(getOnlyDate(item.date) == String(now.getDate())) || item.day === '토' || item.day === '일' ? 'color' : ''}>{getOnlyDate(item.date) == String(now.getDate()) ? '오늘' : item.day}</span>
                                        </p>
                                        <button className={item.date == reservationDate ? "selected" : ""}>
                                            <p className="dateNum gtm-032">{getOnlyDate(item.date)}</p>
                                        </button>
                                    </li>)
                            )}
                            <li className="space"></li>
                            <div className="clearfix"></div>
                        </ul>
                    </div>
                </div>
                <div className="time optionWrap">
                    <div className="inner">
                        <p className="optionTitle">시간 선택</p>
                        <div className="innerLineWrap"><div className="innerLine"></div></div>
                        <ul className="optionList">
                            {!(reservationDate === "2021-01-15" && lounge === 1) &&
                                !(reservationDate == "2021-01-21" && lounge === 1) &&
                                !(reservationDate == "2021-01-22" && lounge === 1) &&
                                !(reservationDate == "2021-01-28" && lounge === 1) &&
                                !(reservationDate == "2021-01-29" && lounge === 1) &&
                                reservationDate !== null && availableTimes.map(
                                    (item, index) => (
                                        // 오늘 현재시간 4시간 이후부터 예약 가능하나 3시 이후에는 예약 불가능
                                        (getOnlyDate(reservationDate) == String(now.getDate()) &&
                                            (parseInt(item.value.slice(0, 2)) < (now.getHours() + 4) ||
                                                now.getHours() >= 15) ? '' :
                                            (<li id={index.toString()} value={item.value.replace(':', '')} onClick={(e) => handleChangeTime(e)}>
                                                <button className={item.value == reservationTime ? "selected gtm-033" : "gtm-033"}>{item.value}</button>
                                            </li>))
                                    ))}
                            <div className="clearfix"></div>

                            {(reservationDate && availableTimes.length === 0) && (<p className="inputCheck" style={{ color: '#C3512A', paddingBottom: '16px' }}>죄송해요. 선택하신 날짜의 예약은 마감되었습니다.</p>)}
                        </ul>
                    </div>
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