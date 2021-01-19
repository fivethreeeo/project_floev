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
    onPrev: () => void
    onNext: () => void
}) {
    const [haveWorn, setHasWorn] = useState<number>(
        parseInt(localStorage.getItem('floev[hasWorn]') ?? '-1'))

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
        <div className="contentWrap">
            <p>안경을 평소에 착용하시나요?</p>
            <p>(시력 교정 목적/눈 보호 목적 모두 해당돼요)</p>
            <div onChange={e => handleChange(e)}>
                <input type="radio" name="yes" id="q_3_1" onChange={() => { }}
                    value={HASWORN.YES} checked={haveWorn === HASWORN.YES} />
                <label htmlFor="q_2_1" className="input-label">
                    <span className="inputTxt">네, 착용해요</span>
                </label>
                <input type="radio" name="no" id="q_3_2" onChange={() => { }}
                    value={HASWORN.NO} checked={haveWorn === HASWORN.NO} />
                <label htmlFor="q_2_2">
                    <span className="inputTxt">아니요, 첫 안경이에요</span>
                </label>
            </div>
        </div>
        <div className="btnWrap">
            {haveWorn < 0 ? (
                <button className="btnNext disabled" type="button">다음</button>) :
                (<button className="btnNext gtm-016" type="button" onClick={() => props.onNext()}>다음</button>)
            }
        </div>
    </>)
}