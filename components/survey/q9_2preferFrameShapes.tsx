import React, { useState } from 'react'
import { EVENT } from '../../lib/constants'

export default function preferFrameShapes(props: SurveyProps) {
    const [preferFrameShapes, setPreferFrameShapes] = useState<Array<string>>(props.oldAnswers.preferFrameShapes)

    function handleChangePreferFrameShapes(e: any) {
        const newPreferFrameShape = e.target.value
        let newPreferFrameShapes: string[] = [...preferFrameShapes]

        if (e.target.checked) {
            newPreferFrameShapes.push(newPreferFrameShape)
        } else {
            newPreferFrameShapes = newPreferFrameShapes.filter(n => n !== newPreferFrameShape)
        }
        setPreferFrameShapes(newPreferFrameShapes)

        let answersParam: Answers = props.oldAnswers
        answersParam.preferFrameShapes = newPreferFrameShapes
        props.answersUpdate(answersParam)

        localStorage.setItem('floev[currentStep]', '92')
        localStorage.setItem('floev[preferFrameShapes]', newPreferFrameShapes.toString())
    }

    return (<>
        <div className="q-wrap q8">
            <div className="q-wrap__question-main">선호하는 안경의 형태를 모두 선택해주세요.</div>
            <div className="q-wrap__answer-wrap q-wrap__checkbox-wrap" onChange={(e) => handleChangePreferFrameShapes(e)}>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pfs_6" onChange={() => { }} value="메탈테" checked={preferFrameShapes.includes("메탈테")} />
                <label className="q-wrap__label-checkbox q-wrap__label-checkbox__frame-shape" htmlFor="q_pfs_6">
                    <div className="label-frame-shape">
                        <span className="frame-shape__basic frame-shape__"></span>
                        <span>메탈테</span>
                    </div>
                </label>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pfs_7" onChange={() => { }} value="뿔테" checked={preferFrameShapes.includes("뿔테")} />
                <label className="q-wrap__label-checkbox q-wrap__label-checkbox__frame-shape" htmlFor="q_pfs_7">
                    <div className="label-frame-shape">
                        <span className="frame-shape__basic frame-shape__"></span>
                        <span>뿔테</span>
                    </div>
                </label>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pfs_5" onChange={() => { }} value="하금테" checked={preferFrameShapes.includes("하금테")} />
                <label className="q-wrap__label-checkbox q-wrap__label-checkbox__frame-shape" htmlFor="q_pfs_5">
                    <div className="label-frame-shape">
                        <span className="frame-shape__basic frame-shape__"></span>
                        <span>하금테</span>
                    </div>
                </label>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pfs_8" onChange={() => { }} value="얇은테" checked={preferFrameShapes.includes("얇은테")} />
                <label className="q-wrap__label-checkbox q-wrap__label-checkbox__frame-shape" htmlFor="q_pfs_8">
                    <div className="label-frame-shape">
                        <span className="frame-shape__basic frame-shape__"></span>
                        <span>얇은테</span>
                    </div>
                </label>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pfs_9" onChange={() => { }} value="두꺼운테" checked={preferFrameShapes.includes("두꺼운테")} />
                <label className="q-wrap__label-checkbox q-wrap__label-checkbox__frame-shape" htmlFor="q_pfs_9">
                    <div className="label-frame-shape">
                        <span className="frame-shape__basic frame-shape__"></span>
                        <span>두꺼운테</span>
                    </div>
                </label>

            </div>
            <div className="q-wrap__btn-wrap">
                <button className="q-wrap__btn q-wrap__btn-prev tn-0033" type="button" disabled={props.currentStep !== props.max ? false : true} onClick={() => props.onPrev(EVENT.SURVEY.Q9_2.PREV)}>이전</button>
                {preferFrameShapes.length === 0 ? (
                    <button className="q-wrap__btn q-wrap__btn-next q-wrap__btn-next--disabled" type="button"><span>다음</span> <img src="/img/survey/ic-arrows-right.png" alt="" /></button>) :
                    (<button className="q-wrap__btn q-wrap__btn-next tn-0032" type="button" onClick={() => props.onNext(EVENT.SURVEY.Q9_2.NEXT)}><span>다음</span> <img src="/img/survey/ic-arrows-right.png" alt="" /></button>)
                }
            </div>
        </div>

    </>)
}