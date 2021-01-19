import React from 'react'

export default function Q3WithCustomer(props: {
    oldAnswers: Answers
    answersUpdate: (answersParam: Answers) => void
    currentStep: number
    max: number
    onPrev: () => void
    onNext: () => void
}) {

    return (<>
        <p>카톡 상담 안내</p>
        <p>{props.oldAnswers.customer === 2 ? '카톡 상담 버튼을 눌러주세요!' : ''}</p>
        <button className="gtm-034 closeBtn" onClick={() => {/* handleClick(e) */ }}>카톡 상담 시작하기</button>
    </>)
}