import React from 'react'
import Link from 'next/link'

export default function Q0Start(props: {
    oldAnswers: Answers
    answersUpdate: (answers: Answers) => void
    currentStep: number
    max: number
    onPrev: () => void
    onNext: () => void
}) {

    return (<>
        <div className="surveyHeader start">
            <Link href="/">
                <div className="goBackBtnWrap">
                    <div className="goBackBtn"><a></a></div>
                </div>
            </Link>
        </div>
        <div className="contentWrap" style={{ padding: '108px 36px 24px' }}>
            <div style={{ width: '200px', margin: '0 auto' }}>
                <img style={{ width: '100%' }}
                    src="/static/new/il-1.jpg"
                    alt="안경은 일상을 함께하는 만큼 나에 대한 세삼한 고민이 필요해요" />
            </div>

            <p className="ppp"
                style={{
                    textAlign: 'center',
                    color: '#c3512a',
                    fontSize: '16px',
                    margin: '24px 0 48px'
                }}>
                <strong>안경은 일상을 함께하는 만큼<br />나에 대한 세심한 고민이 필요해요.</strong></p>

            <p style={{ fontWeight: 300 }}>
                <strong>5분 눈 건강/스타일 체크</strong>로 플로브 서비스를 시작해 주세요.</p>

            <p style={{ fontWeight: 300 }}>
                <strong>1시간 오프라인 큐레이션 서비스</strong>로 고민을 해결합니다.</p>

        </div>
        <div className="start btnWrap">
            {/* ga event 2 */}
            <button className="btn btn01 gtm-012"
                style={{
                    fontSize: '16px',
                    borderRadius: '24px'
                }}
                type="button"
                disabled={props.currentStep !== props.max ? false : true}
                onClick={() => props.onNext()}>5분 체크 시작하기
                </button>
        </div>
    </>)
}