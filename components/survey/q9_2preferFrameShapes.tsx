import React, { useState } from 'react'


export default function preferFrameShapes(props: {
    oldAnswers: Answers
    answersUpdate: (answersParam: Answers) => void
    currentStep: number
    max: number
    purchaseRequest: PurchaseRequest[]
    onPrev: () => void
    onNext: () => void
}) {
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
            <div className="q-wrap__question-main">preferFrameShapes</div>
            {/*<div className="q-wrap__question-sub">플로브 안경 추천 서비스는 가장 나은 안경을 고민하고 해소할 수 있는 방법을 제안해요.</div>*/}
            <div className="q-wrap__answer-wrap q-wrap__checkbox-wrap" onChange={(e) => handleChangePreferFrameShapes(e)}>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pfs_1" onChange={() => { }} value="온테" checked={preferFrameShapes.includes("온테")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pfs_1">온테</label>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pfs_2" onChange={() => { }} value="반무테" checked={preferFrameShapes.includes("반무테")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pfs_2">반무테</label>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pfs_3" onChange={() => { }} value="무테" checked={preferFrameShapes.includes("무테")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pfs_3">무테</label>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pfs_4" onChange={() => { }} value="투브릿지" checked={preferFrameShapes.includes("투브릿지")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pfs_4">투브릿지</label>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pfs_5" onChange={() => { }} value="하금테" checked={preferFrameShapes.includes("하금테")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pfs_5">하금테</label>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pfs_6" onChange={() => { }} value="메탈테" checked={preferFrameShapes.includes("메탈테")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pfs_6">메탈테</label>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pfs_7" onChange={() => { }} value="뿔테" checked={preferFrameShapes.includes("뿔테")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pfs_7">뿔테</label>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pfs_8" onChange={() => { }} value="얇은" checked={preferFrameShapes.includes("얇은")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pfs_8">얇은</label>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pfs_9" onChange={() => { }} value="두꺼운" checked={preferFrameShapes.includes("두꺼운")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pfs_9">두꺼운</label>
            </div>
            <div className="q-wrap__btn-wrap">
                <button className="q-wrap__btn q-wrap__btn-prev" type="button" disabled={props.currentStep !== props.max ? false : true} onClick={() => props.onPrev()}>이전</button>
                {preferFrameShapes.length === 0 ? (
                    <button className="q-wrap__btn q-wrap__btn-next q-wrap__btn-next--disabled" type="button"><span>다음</span> <img src="/img/survey/ic-arrows-right.png" alt="" /></button>) :
                    (<button className="q-wrap__btn q-wrap__btn-next" type="button" onClick={() => props.onNext()}><span>다음</span> <img src="/img/survey/ic-arrows-right.png" alt="" /></button>)
                }
            </div>
        </div>

    </>)
}