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
                        {hasWorn < 0 ? (
                            <button className="btnNext disabled" type="button">다음</button>) :
                            (<button className="btnNext gtm-016" type="button" onClick={() => props.onNext()}>다음</button>)
                        }
                        <button className="btn btn01 gtm-012" style={{ fontSize: '16px', borderRadius: '24px'}} type="button" disabled={props.currentStep !== props.max ? false : true} onClick={() => props.onPrev()}>뒤로</button>
                    </div>
                </div>
    </>)
}