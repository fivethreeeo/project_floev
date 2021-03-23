import React, { useState } from 'react'


export default function preferLensShapes(props: {
    oldAnswers: Answers
    answersUpdate: (answersParam: Answers) => void
    currentStep: number
    max: number
    purchaseRequest: PurchaseRequest[]
    onPrev: () => void
    onNext: () => void
}) {
    const [preferLensShapes, setPreferLensShapes] = useState<Array<string>>(props.oldAnswers.preferLensShapes)

    function handleChangePreferLensShapes(e: any) {
        const newPreferLensShape = e.target.value
        let newPreferLensShapes: string[] = [...preferLensShapes]

        if (e.target.checked) {
            newPreferLensShapes.push(newPreferLensShape)
        } else {
            newPreferLensShapes = newPreferLensShapes.filter(n => n !== newPreferLensShape)
        }
        setPreferLensShapes(newPreferLensShapes)

        let answersParam: Answers = props.oldAnswers
        answersParam.preferLensShapes = newPreferLensShapes
        props.answersUpdate(answersParam)

        localStorage.setItem('floev[currentStep]', '93')
        localStorage.setItem('floev[preferLensShapes]', newPreferLensShapes.toString())
    }

    return (<>
        <div className="q-wrap q8">
            <div className="q-wrap__question-main">preferLensShapes</div>
            {/*<div className="q-wrap__question-sub">플로브 안경 추천 서비스는 가장 나은 안경을 고민하고 해소할 수 있는 방법을 제안해요.</div>*/}
            <div className="q-wrap__answer-wrap q-wrap__checkbox-wrap" onChange={(e) => handleChangePreferLensShapes(e)}>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pls_1" onChange={() => { }} value="원형" checked={preferLensShapes.includes("원형")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pls_1">원형</label>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pls_2" onChange={() => { }} value="타원형" checked={preferLensShapes.includes("타원형")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pls_2">타원형</label>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pls_3" onChange={() => { }} value="사각형" checked={preferLensShapes.includes("사각형")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pls_3">사각형</label>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pls_4" onChange={() => { }} value="캣아이" checked={preferLensShapes.includes("캣아이")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pls_4">캣아이</label>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pls_5" onChange={() => { }} value="혼합형" checked={preferLensShapes.includes("혼합형")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pls_5">혼합형</label>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pls_6" onChange={() => { }} value="알이 큰" checked={preferLensShapes.includes("알이 큰")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pls_6">알이 큰</label>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pls_7" onChange={() => { }} value="알이 작은" checked={preferLensShapes.includes("알이 작은")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pls_7">알이 작은</label>
            </div>
            <div className="q-wrap__btn-wrap">
                <button className="q-wrap__btn q-wrap__btn-prev" type="button" disabled={props.currentStep !== props.max ? false : true} onClick={() => props.onPrev()}>이전</button>
                {preferLensShapes.length === 0 ? (
                    <button className="q-wrap__btn q-wrap__btn-next q-wrap__btn-next--disabled" type="button"><span>다음</span> <img src="/img/survey/ic-arrows-right.png" alt="" /></button>) :
                    (<button className="q-wrap__btn q-wrap__btn-next" type="button" onClick={() => props.onNext()}><span>다음</span> <img src="/img/survey/ic-arrows-right.png" alt="" /></button>)
                }
            </div>
        </div>

    </>)
}