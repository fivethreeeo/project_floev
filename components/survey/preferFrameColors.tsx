import React, { useState } from 'react'


export default function preferFrameColors(props: {
    oldAnswers: Answers
    answersUpdate: (answersParam: Answers) => void
    currentStep: number
    max: number
    purchaseRequest: PurchaseRequest[]
    onPrev: () => void
    onNext: () => void
}) {
    const [preferFrameColors, setPreferFrameColors] = useState<Array<string>>(props.oldAnswers.preferFrameColors)

    function handleChangePreferFrameColors(e: any) {
        const newPreferFrameColor = e.target.value
        let newPreferFrameColors: string[] = [...preferFrameColors]

        if (e.target.checked) {
            newPreferFrameColors.push(newPreferFrameColor)
        } else {
            newPreferFrameColors = newPreferFrameColors.filter(n => n !== newPreferFrameColor)
        }
        setPreferFrameColors(newPreferFrameColors)

        let answersParam: Answers = props.oldAnswers
        answersParam.preferFrameColors = newPreferFrameColors
        props.answersUpdate(answersParam)

        localStorage.setItem('floev[currentStep]', '20')
        localStorage.setItem('floev[preferFrameColors]', newPreferFrameColors.toString())
    }

    return (<>
        <div className="q-wrap q8">
            <div className="q-wrap__question-main">preferFrameColors</div>
            {/*<div className="q-wrap__question-sub">플로브 안경 추천 서비스는 가장 나은 안경을 고민하고 해소할 수 있는 방법을 제안해요.</div>*/}
            <div className="q-wrap__answer-wrap q-wrap__checkbox-wrap" onChange={(e) => handleChangePreferFrameColors(e)}>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pfc_1" onChange={() => { }} value="투명" checked={preferFrameColors.includes("투명")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pfc_1">투명</label>
                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pfc_2" onChange={() => { }} value="블랙" checked={preferFrameColors.includes("블랙")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pfc_2">블랙</label>
                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pfc_3" onChange={() => { }} value="그레이" checked={preferFrameColors.includes("그레이")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pfc_3">그레이</label>
                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pfc_4" onChange={() => { }} value="실버" checked={preferFrameColors.includes("실버")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pfc_4">실버</label>
                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pfc_5" onChange={() => { }} value="골드" checked={preferFrameColors.includes("골드")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pfc_5">골드</label>
                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pfc_6" onChange={() => { }} value="로즈골드" checked={preferFrameColors.includes("로즈골드")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pfc_6">로즈골드</label>
                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pfc_7" onChange={() => { }} value="브라운" checked={preferFrameColors.includes("브라운")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pfc_7">브라운</label>
                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pfc_6" onChange={() => { }} value="무채색" checked={preferFrameColors.includes("무채색")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pfc_6">무채색</label>
                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pfc_7" onChange={() => { }} value="화려한색" checked={preferFrameColors.includes("화려한색")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pfc_7">화려한색</label>
            </div>
            <div className="q-wrap__btn-wrap">
                <button className="q-wrap__btn q-wrap__btn-prev" type="button" disabled={props.currentStep !== props.max ? false : true} onClick={() => props.onPrev()}>이전</button>
                {preferFrameColors.length === 0 ? (
                    <button className="q-wrap__btn q-wrap__btn-next q-wrap__btn-next--disabled" type="button"><span>다음</span> <img src="static/img/survey/ic-arrows-right.png" alt="" /></button>) :
                    (<button className="q-wrap__btn q-wrap__btn-next" type="button" onClick={() => props.onNext()}><span>다음</span> <img src="static/img/survey/ic-arrows-right.png" alt="" /></button>)
                }
            </div>
        </div>

    </>)
}