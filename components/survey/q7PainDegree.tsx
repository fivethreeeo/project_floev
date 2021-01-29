import React, { useState } from 'react'

enum PAINDEGREE {
    NEVER,
    SOMETIMES,
    OFTEN,
    ALWAYS,
    NOIDEA
}

export default function Q7PainDegree(props: {
    oldAnswers: Answers
    answersUpdate: (answersParam: Answers) => void
    currentStep: number
    max: number
    purchaseRequest: PurchaseRequest[]
    onPrev: () => void
    onNext: () => void
}) {
    const [painDegree, setPainDegree] = useState<number>(props.oldAnswers.painDegree)
    const [painDegreeEtc, setPainDegreeEtc] = useState<string>(props.oldAnswers.painDegreeEtc)

    function handleChangePainDegree(e: any) {
        const newPainDegree: number = parseInt(e.target.value)
        setPainDegree(newPainDegree)

        let answersParam: Answers = props.oldAnswers
        answersParam.painDegree = newPainDegree
        props.answersUpdate(answersParam)

        localStorage.setItem('floev[currentStep]', '7')
        localStorage.setItem('floev[painDegree]', String(newPainDegree))
    }

    function handleChangePainDegreeEtc(e: any) {
        const newPainDegreeEtc = e.target.value
        setPainDegreeEtc(newPainDegreeEtc)

        let answersParam: Answers = props.oldAnswers
        answersParam.painDegreeEtc = newPainDegreeEtc
        props.answersUpdate(answersParam)

        localStorage.setItem('floev[currentStep]', '7')
        localStorage.setItem('floev[painDegreeEtc]', newPainDegreeEtc)
    }
    return (<>
        <div className="q-wrap q7">
            <div className="q-wrap__question-main">안경/콘택트렌즈를 착용하지 않고 일상생활이 어느정도 가능하신가요?</div>
            <div className="q-wrap__answer-wrap" onChange={(e) => handleChangePainDegree(e)}>
                <input className="q-wrap__input-radio" type="radio" id="q7_1" onChange={() => { }} value={PAINDEGREE.NEVER} checked={painDegree === PAINDEGREE.NEVER} />
                <label className="q-wrap__label-radio-100" htmlFor="q7_1">큰 문제 없어요</label>
                <input className="q-wrap__input-radio" type="radio" id="q7_2" onChange={() => { }} value={PAINDEGREE.SOMETIMES} checked={painDegree === PAINDEGREE.SOMETIMES} />
                <label className="q-wrap__label-radio-100" htmlFor="q7_2">가능하지만 피로감을 느껴요</label>
                <input className="q-wrap__input-radio" type="radio" id="q7_3" onChange={() => { }} value={PAINDEGREE.OFTEN} checked={painDegree === PAINDEGREE.OFTEN} />
                <label className="q-wrap__label-radio-100" htmlFor="q7_3">때때로 어려워요</label>
                <input className="q-wrap__input-radio" type="radio" id="q7_4" onChange={() => { }} value={PAINDEGREE.ALWAYS} checked={painDegree === PAINDEGREE.ALWAYS} />
                <label className="q-wrap__label-radio-100" htmlFor="q7_4">불가능해요</label>
                <input className="q-wrap__input-radio" type="radio" id="q7_5" onChange={() => { }} value={PAINDEGREE.NOIDEA} checked={painDegree === PAINDEGREE.NOIDEA} />
                <label className="q-wrap__label-radio-100" htmlFor="q7_5">잘 모르겠어요</label>
            </div>
            <div className="q-wrap__textarea-wrap">
                <p className="q-wrap__textarea-caption">* 그 외 어려움이나 구체적인 상황을 더 들려주세요.</p>
                <textarea
                    className="q-wrap__textarea"
                    value={painDegreeEtc} onChange={(e) => handleChangePainDegreeEtc(e)}
                    placeholder="예시) 책을 읽거나 일기를 쓰는 등 근거리 작업이 어려워요. 컴퓨터를 많이 보는 직업이라 눈이 좋아도 피로해요"
                ></textarea>
            </div>
            <div className="q-wrap__btn-wrap">
                <button className="q-wrap__btn q-wrap__btn-prev tn-0015" type="button" disabled={props.currentStep !== props.max ? false : true} onClick={() => props.onPrev()}>이전</button>
                {painDegree < 0 ? (
                    <button className="q-wrap__btn q-wrap__btn-next q-wrap__btn-next--disabled" type="button"><span>다음</span> <img src="static/img/survey/ic-arrows-right.png" alt="" /></button>) :
                    (<button className="q-wrap__btn q-wrap__btn-next tn-0014" type="button" onClick={() => props.onNext()}><span>다음</span> <img src="static/img/survey/ic-arrows-right.png" alt="" /></button>)
                }
            </div>
        </div>
    </>)
}