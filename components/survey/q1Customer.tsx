import React, { useState } from 'react'

enum CUSTOMER {
    SELF,
    WITH,
    OTHER
}

export default function Q1Customer(props: {
    oldAnswers: Answers
    answersUpdate: (answersParam: Answers) => void
    currentStep: number
    max: number
    onPrev: () => void
    onNext: () => void
}) {
    const customerJSON = localStorage.getItem('floev[customer]');
    const [customer, setCustomer] = useState<number>(
        customerJSON !== null ? parseInt(JSON.parse(customerJSON)) : -1)

    function handleChange(e: any) {
        const newCustomer: number = parseInt(e.target.value)
        setCustomer(newCustomer)

        let answersParam: Answers = props.oldAnswers
        answersParam.customer = newCustomer
        props.answersUpdate(answersParam)

        // for caching
        localStorage.setItem('floev[currentStep]', '1')
        localStorage.setItem('floev[customer]', String(newCustomer))
    }

    return (<>
        <div className="contentWrap">
            <p>반가워요. 플로브 서비스가 시작되었어요.</p>
            <p>누가 추천받을 안경인가요?</p>
            <div onChange={e => handleChange(e)}>
                <input type="radio" name="gender" id="q_2_1" onChange={() => { }}
                    value={CUSTOMER.SELF} checked={customer === CUSTOMER.SELF} />
                <label htmlFor="q_2_1" className="input-label">
                    <span className="inputTxt">제가 추천받을 거에요</span>
                </label>
                <input type="radio" name="gender" id="q_2_2" onChange={() => { }}
                    value={CUSTOMER.WITH} checked={customer === CUSTOMER.WITH} />
                <label htmlFor="q_2_2">
                    <span className="inputTxt">제 친구(연인)과 함께 추천받고 싶어요</span>
                </label>
                <input type="radio" name="gender" id="q_2_2" onChange={() => { }}
                    value={CUSTOMER.OTHER} checked={customer === CUSTOMER.OTHER} />
                <label htmlFor="q_2_2">
                    <span>다른 사람에게 선물하고 싶어요</span>
                </label>
            </div>
        </div>
        <div className="btnWrap">
            {customer < 0 ? (
                <button className="btnNext disabled" type="button">다음</button>) :
                (<button className="btnNext gtm-016" type="button" onClick={() => props.onNext()}>다음</button>)
            }
        </div>
    </>)
}