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
    schedule: Schedule[]
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
        <div className="contentWrap">
            <p className="qDesc">안경/콘택트렌즈를 착용하지 않고 일상적인 생활이 어느정도 가능하신가요?</p>
            <div className="qLine"></div>
            <div className="answerWrap inputRadio" onChange={(e) => handleChangePainDegree(e)}>
                {/* 매우편안 */}
                <input type="radio" name="never" id="seriousness-4" onChange={() => { }}
                    value={PAINDEGREE.NEVER} checked={painDegree === PAINDEGREE.NEVER} />
                <label htmlFor="seriousness-4" className="input-label">
                    <span className="inputImg"></span>
                    <span className="inputTxt">큰 문제 없어요</span>
                </label>
                {/* 조금편안 */}
                <input type="radio" name="sometimes" id="seriousness-3" onChange={() => { }}
                    value={PAINDEGREE.SOMETIMES} checked={painDegree === PAINDEGREE.SOMETIMES} />
                <label htmlFor="seriousness-3" className="input-label">
                    <span className="inputImg"></span>
                    <span className="inputTxt">가능하지만 피로감을 느껴요</span>
                </label>
                {/* 조금불편 */}
                <input type="radio" name="often" id="seriousness-2" onChange={() => { }}
                    value={PAINDEGREE.OFTEN} checked={painDegree === PAINDEGREE.OFTEN} />
                <label htmlFor="seriousness-2" className="input-label">
                    <span className="inputImg"></span>
                    <span className="inputTxt">때때로 어려워요</span>
                </label>
                {/* 매우불편 */}
                <input type="radio" name="always" id="seriousness-1" onChange={() => { }}
                    value={PAINDEGREE.ALWAYS} checked={painDegree === PAINDEGREE.ALWAYS} />
                <label htmlFor="seriousness-1" className="input-label">
                    <span className="inputImg"></span>
                    <span className="inputTxt">불가능해요</span>
                </label>
                {/* 모르겠음 */}
                <input type="radio" name="noidea" id="seriousness-5" onChange={() => { }}
                    value={PAINDEGREE.NOIDEA} checked={painDegree === PAINDEGREE.NOIDEA} />
                <label htmlFor="seriousness-5" className="input-label">
                    <span className="inputImg"></span>
                    <span className="inputTxt">잘 모르겠어요</span>
                </label>
            </div>
            <div className="personal">
                <p>*그 외 어려움이나 구체적인 상황을 더 들려주세요</p>
                <textarea
                    name="pain-degree-etc"
                    id="pain-degree-etc"
                    placeholder="예시) 책을 읽거나 일기를 쓰는 등 근거리 작업이 어려워요.
                        컴퓨터를 많이 보는 직업이라 눈이 좋아도 피로해요."
                    value={painDegreeEtc}
                    onChange={(e) => handleChangePainDegreeEtc(e)}
                ></textarea>
            </div>
        </div>
        <div className="btnWrap">
            {painDegree < 0 && painDegreeEtc === '' ?
                (<button className="btnNext disabled" type="button" disabled>다음</button>) :
                (<button className="btnNext gtm-020" type="button" onClick={() => props.onNext()}>다음</button>)}
        </div>
    </>)
}