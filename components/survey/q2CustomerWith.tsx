import Link from 'next/link'
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
        <p>동행자 링크 안내</p>
        <Link href="https://floev.com/survey">
            <a>https://floev.com/survey</a>
        </Link>
        <div className="btnWrap">
            <button className="btnNext gtm-016" type="button" onClick={() => props.onNext()}>다음</button>
        </div>
        <button className="btn btn01 gtm-012" style={{ fontSize: '16px', borderRadius: '24px'}} type="button" disabled={props.currentStep !== props.max ? false : true} onClick={() => props.onPrev()}>뒤로</button>
    </>)
}