import React, { useState } from 'react'

export enum HASWORN {
    YES,
    NO
}

export default function Q5HasWorn(props: {
    oldAnswers: Answers
    answersUpdate: (answersParam: Answers) => void
    currentStep: number
    max: number
    schedule: Schedule[]
    onPrev: () => void
    onNext: () => void
}) {
    const [hasWorn, setHasWorn] = useState<number>(props.oldAnswers.hasWorn)

    function handleChange(e: any) {
        const newHasWorn: number = parseInt(e.target.value)
        setHasWorn(newHasWorn)

        let answersParam: Answers = props.oldAnswers
        answersParam.hasWorn = newHasWorn
        if (newHasWorn === HASWORN.NO) {
            answersParam.painDegree = -1
            answersParam.painDegreeEtc = ''
            answersParam.painTypes = ['']
            answersParam.painTypesEtc = ''
            answersParam.size = ''
            localStorage.removeItem('floev[painDegree]')
            localStorage.removeItem('floev[painDegreeEtc]')
            localStorage.removeItem('floev[painTypes]')
            localStorage.removeItem('floev[painTypesEtc]')
            localStorage.removeItem('floev[size]')
        }
        props.answersUpdate(answersParam)

        // for caching
        localStorage.setItem('floev[currentStep]', '5')
        localStorage.setItem('floev[hasWorn]', String(newHasWorn))
    }

    return (<>
        <div className="q-wrap q5">
            <div className="q-wrap__question-main">안경을 평소에 착용하시나요?</div>
            <div className="q-wrap__question-sub">시력 교정 목적/눈 보호 목적 모두 해당돼요.</div>
            <div className="q-wrap__answer-wrap" onChange={e => handleChange(e)}>
                <input className="q-wrap__input-radio" type="radio" id="q5_1" onChange={() => { }} value={HASWORN.YES} checked={hasWorn === HASWORN.YES} />
                <label className="q-wrap__label-radio-100" htmlFor="q5_1">네. 착용해요</label>
                <input className="q-wrap__input-radio" type="radio" id="q5_2" onChange={() => { }} value={HASWORN.NO} checked={hasWorn === HASWORN.NO} />
                <label className="q-wrap__label-radio-100" htmlFor="q5_2">아니요. 첫 안경이에요</label>
            </div>
            <div className="q-wrap__btn-wrap">
                <button className="q-wrap__btn q-wrap__btn-prev tn-0011" type="button" disabled={props.currentStep !== props.max ? false : true} onClick={() => props.onPrev()}>이전</button>
                {hasWorn < 0 ? (
                    <button className="q-wrap__btn q-wrap__btn-next q-wrap__btn-next--disabled" type="button"><span>다음</span> <img src="static/img/survey/ic-arrows-right.png" alt="" /></button>) :
                    (<button className="q-wrap__btn q-wrap__btn-next tn-0010" type="button" onClick={() => props.onNext()}><span>다음</span> <img src="static/img/survey/ic-arrows-right.png" alt="" /></button>)
                }
            </div>
        </div>
    </>)
}