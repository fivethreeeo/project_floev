import React from 'react'

export default function Q3WithCustomer(props: {
    oldAnswers: Answers
    answersUpdate: (answersParam: Answers) => void
    currentStep: number
    max: number
    schedule: Schedule[]
    onPrev: () => void
    onNext: () => void
}) {

    return (<>
        <p>카톡 상담 안내</p>
        <p>{props.oldAnswers.customer === 2 ? '카톡 상담 버튼을 눌러주세요!' : ''}</p>
        <button className="gtm-034 closeBtn" onClick={() => {/* handleClick(e) */ }}>카톡 상담 시작하기</button><br />
        <button className="btn btn01 gtm-012" style={{ fontSize: '16px', borderRadius: '24px' }} type="button" disabled={props.currentStep !== props.max ? false : true} onClick={() => props.onPrev()}>뒤로</button>
    </>)
}