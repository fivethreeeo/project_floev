import React, { useState } from 'react'
import { EVENT } from '../../lib/constants'

export default function preferLensShapes(props: SurveyProps) {
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
            <div className="q-wrap__question-main">선호하는 안경의 모양을 모두 선택해주세요.</div>
            <div className="q-wrap__answer-wrap q-wrap__checkbox-wrap" onChange={(e) => handleChangePreferLensShapes(e)}>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pls_1" onChange={() => { }} value="원형" checked={preferLensShapes.includes("원형")} />
                <label className="q-wrap__label-checkbox q-wrap__label-checkbox__lens-shape" htmlFor="q_pls_1">
                    <div className="label-lens-shape">
                        <span className="lens-shape__basic lens-shape__oval">
                            <img src="/img/survey/shape_1.svg" alt="" />
                        </span>
                        <span className="lens-shape__name">원형</span>
                    </div>
                </label>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pls_3" onChange={() => { }} value="사각형" checked={preferLensShapes.includes("사각형")} />
                <label className="q-wrap__label-checkbox q-wrap__label-checkbox__lens-shape" htmlFor="q_pls_3">
                    <div className="label-lens-shape">
                        <span className="lens-shape__basic lens-shape__rec">
                            <img src="/img/survey/shape_2.svg" alt="" />
                        </span>
                        <span className="lens-shape__name">사각형</span>
                    </div>
                </label>


                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pls_5" onChange={() => { }} value="혼합형" checked={preferLensShapes.includes("혼합형")} />
                <label className="q-wrap__label-checkbox q-wrap__label-checkbox__lens-shape" htmlFor="q_pls_5">
                    <div className="label-lens-shape">
                        <span className="lens-shape__basic lens-shape__mix">
                            <img src="/img/survey/shape_3.svg" alt="" />
                        </span>
                        <span className="lens-shape__name">혼합형</span>
                    </div>
                </label>

            </div>
            <div className="q-wrap__btn-wrap">
                <button className="q-wrap__btn q-wrap__btn-prev tn-0035" type="button" disabled={props.currentStep !== props.max ? false : true} onClick={() => props.onPrev(EVENT.SURVEY.Q9_3.PREV)}>이전</button>
                {preferLensShapes.length === 0 ? (
                    <button className="q-wrap__btn q-wrap__btn-next q-wrap__btn-next--disabled" type="button"><span>다음</span> <img src="/img/survey/ic-arrows-right.png" alt="" /></button>) :
                    (<button className="q-wrap__btn q-wrap__btn-next tn-0034" type="button" onClick={() => props.onNext(EVENT.SURVEY.Q9_3.NEXT)}><span>다음</span> <img src="/img/survey/ic-arrows-right.png" alt="" /></button>)
                }
            </div>
        </div>

    </>)
}