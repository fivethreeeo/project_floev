import React, { useState } from 'react'

export default function Q6Purpose(props: {
    oldAnswers: Answers
    answersUpdate: (answersParam: Answers) => void
    currentStep: number
    max: number
    onPrev: () => void
    onNext: () => void
}) {
    const [purposes, setPurposes] = useState<Array<string>>(
        (localStorage.getItem('floev[purposes]') ?? '').split(','))
    const [purposeEtc, setPurposeEtc] = useState<string>(
        localStorage.getItem('floev[purposeEtc]') ?? '')

    function handleChangePurpose(e: any) {
        const newPurpose = e.target.value
        let newPurposes: string[] = purposes

        if (e.target.checked) {
            newPurposes.push(newPurpose)
        } else {
            newPurposes = newPurposes.filter(n => n !== newPurpose)
        }

        setPurposes(newPurposes)

        let answersParam: Answers = props.oldAnswers
        answersParam.purposes = newPurposes
        props.answersUpdate(answersParam)

        localStorage.setItem('floev[currentStep]', '6')
        localStorage.setItem('floev[purposes]', newPurposes.toString())
    }

    function handleChangePuposeEtc(e: any) {
        const newPurposeEtc = e.target.value
        setPurposeEtc(newPurposeEtc)

        let answersParam: Answers = props.oldAnswers
        answersParam.purposeEtc = newPurposeEtc
        props.answersUpdate(answersParam)

        localStorage.setItem('floev[currentStep]', '6')
        localStorage.setItem('floev[purposeEtc]', newPurposeEtc)
    }

    return (<>
        <div className="contentWrap">
            <p>어떤 용도의 안경을 추천해드릴까요?</p>
            <div onChange={e => handleChangePurpose(e)}>
                <input id="q_4_1" type="checkbox" name="daily" onChange={() => { }}
                    value="daily" checked={purposes.includes("daily")} />
                <label htmlFor="purpose-1" className="input-label">
                    <p className="inner">
                        <span className="inputTxt">일상/데일리용 안경</span>
                    </p>
                </label>
                <input id="q_4_2" type="checkbox" name="work" onChange={() => { }}
                    value="work" checked={purposes.includes("work")} />
                <label htmlFor="purpose-2" className="input-label">
                    <p className="inner">
                        <span className="inputTxt others">업무/컴퓨터 작업용 안경</span>
                    </p>
                </label>
            </div>
        </div>
        <div className="personal">
            <p>* 그 외 용도나 구체적인 상황을 더 들려주세요.</p>
            <textarea
                name="purpose-etc"
                id="purpose-etc"
                placeholder="예시) 독서용 안경이 필요해요.
                        집에서만 렌즈 대신 착용하는 안경이에요."
                value={purposeEtc ?? ''}
                onChange={e => handleChangePuposeEtc(e)}
            ></textarea>
        </div>
        <div className="btnWrap">
            {purposes.length === 0 && purposeEtc === '' ? (
                <button className="btnNext disabled" type="button">다음</button>) :
                (<button className="btnNext gtm-016" type="button" onClick={() => props.onNext()}>다음</button>)
            }
        </div>
    </>)
}