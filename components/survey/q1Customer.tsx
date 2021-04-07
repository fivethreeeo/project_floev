import React, { useState } from 'react'
import { EVENT, CUSTOMER } from '../../lib/constants'

export default function Q1Customer(props: SurveyProps) {
    const [customer, setCustomer] = useState<number>(props.oldAnswers.customer)

    function handleChange(e: any) {
        const newCustomer: number = parseInt(e.target.value)
        setCustomer(newCustomer)

        let answersParam: Answers = props.oldAnswers
        answersParam.customer = newCustomer
        props.answersUpdate(answersParam)

        localStorage.setItem('floev[currentStep]', '1')
        localStorage.setItem('floev[customer]', String(newCustomer))
    }

    return (<>
        <div className="q-wrap q1">
            <div className="q-wrap__question-main">누가 추천받을 안경인가요?</div>
            <div className="q-wrap__question-sub"></div>
            <div className="q-wrap__answer-wrap" onChange={e => handleChange(e)}>
                <input className="q-wrap__input-radio" type="radio" id="q1_1" onChange={() => { }} value={CUSTOMER.SELF} checked={customer === CUSTOMER.SELF} />
                <label className="q-wrap__label-radio-100" htmlFor="q1_1">제가 추천 받을거에요</label>

                <input className="q-wrap__input-radio" type="radio" id="q1_2" onChange={() => { }} value={CUSTOMER.WITH} checked={customer === CUSTOMER.WITH} />
                <label className="q-wrap__label-radio-100" htmlFor="q1_2">친구(연인)와 함께 추천받고 싶어요</label>
            </div>
            <div className="q-wrap__btn-wrap">
                <button className="q-wrap__btn q-wrap__btn-prev tn-0007" type="button" disabled={props.currentStep !== props.max ? false : true} onClick={() => props.onPrev(EVENT.SURVEY.Q1.PREV)}>이전</button>
                {customer < 0 ? (
                    <button className="q-wrap__btn q-wrap__btn-next q-wrap__btn-next--disabled" type="button"><span>다음</span> <img src="/img/survey/ic-arrows-right.png" alt="" /></button>) :
                    (<button className="q-wrap__btn q-wrap__btn-next tn-0006" type="button" onClick={() => props.onNext(EVENT.SURVEY.Q1.NEXT)}><span>다음</span> <img src="/img/survey/ic-arrows-right.png" alt="" /></button>)
                }
            </div>
        </div>
    </>)
}