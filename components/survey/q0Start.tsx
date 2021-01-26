import React from 'react'

export default function Q0Start(props: {
    oldAnswers: Answers
    answersUpdate: (answers: Answers) => void
    currentStep: number
    max: number
    onPrev: () => void
    onNext: () => void
}) {

    return (<>
                <div className="q-wrap q0">
                    <div className="q0__title">
                        <p className="text">지금부터<br/><strong>나의 안경 설문</strong>을<br/>시작해 볼까요?</p>
                        <div className="tag"><img src="/static/img/survey/icon-clock.png" alt="8분소요예상"/><strong>8min</strong></div>
                    </div>
                    <div className="q0__steps">
                        <ul>
                            <li className="q0__step">
                                <span className="oval oval--color"><span className="oval__inner"></span></span>
                                <p className="q0__step-desc q0__step-desc--color"><strong>나의 안경 설문</strong><br/><span>안경 고민과 취향찾기</span></p>
                            </li>
                            <li className="q0__step">
                                <span className="oval"><span className="oval__inner"></span></span>
                                <p className="q0__step-desc">12시간 이내 설문 분석<br/><span>전담 플로브 카운셀러</span></p>
                            </li>
                            <li className="q0__step">
                                <span className="oval"><span className="oval__inner"></span></span>
                                <p className="q0__step-desc">16개 안경테 맞춤 추천<br/><span>안경 박스 제작</span></p>
                            </li>
                            <li className="q0__step">
                                <span className="oval"><span className="oval__inner"></span></span>
                                <p className="q0__step-desc">라운지 추천 서비스<br/><span>안경 카운셀러와 1:1 큐레이션</span></p>
                            </li>
                        </ul>
                        <div className="vertical-line"></div>
                    </div>
                    <div className="q0__btn-start tn-0005" onClick={() => props.onNext()}>설문 시작하기</div>
                </div>
    </>)
}