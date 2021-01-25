import React from 'react'

export default function Q2CustomerWith(props: {
    oldAnswers: Answers
    answersUpdate: (answersParam: Answers) => void
    currentStep: number
    max: number
    schedule: Schedule[]
    onPrev: () => void
    onNext: () => void
}) {

    return (<>
        <div className="q-wrap q2">
            <div className="q-wrap__question-main">함께 추천받을 분에게<br/>아래 설문 링크를 전달해주세요.</div>
            <div className="q-wrap__question-sub">설문을 마치시면 담당 카운셀러가 같이 서비스 받을 수 있도록 준비해드려요.</div>
            <div className="q-wrap__answer-wrap">
                카카오링크
            </div>
            <div className="q-wrap__btn-wrap">
                <button className="q-wrap__btn q-wrap__btn-prev" type="button" disabled={props.currentStep !== props.max ? false : true} onClick={() => props.onPrev()}>이전</button>
                <button className="q-wrap__btn q-wrap__btn-next" type="button" onClick={() => props.onNext()}><span>다음</span> <img src="static/img/survey/ic-arrows-right.png" alt=""/></button>
            </div>
        </div>
    </>)
}