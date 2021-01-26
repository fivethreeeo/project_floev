import React, { useState } from 'react'


export default function Q8Paintypes(props: {
    oldAnswers: Answers
    answersUpdate: (answersParam: Answers) => void
    currentStep: number
    max: number
    schedule: Schedule[]
    onPrev: () => void
    onNext: () => void
}) {
    const [painTypes, setPainTypes] = useState<Array<string>>(props.oldAnswers.painTypes)
    const [painTypesEtc, setPainTypesEtc] = useState<string>(props.oldAnswers.painTypesEtc)

    function handleChangePainTypes(e: any) {
        const newPainType = e.target.value
        let newPainTypes: string[] = [...painTypes]

        if (e.target.checked) {
            newPainTypes.push(newPainType)
        } else {
            newPainTypes = newPainTypes.filter(n => n !== newPainType)
        }
        setPainTypes(newPainTypes)

        let answersParam: Answers = props.oldAnswers
        answersParam.painTypes = newPainTypes
        props.answersUpdate(answersParam)

        localStorage.setItem('floev[currentStep]', '8')
        localStorage.setItem('floev[painTypes]', newPainTypes.toString())
    }

    function handleChangePainTypeEtc(e: any) {
        const newPainTypeEtc = e.target.value
        setPainTypesEtc(newPainTypeEtc)

        let answersParam: Answers = props.oldAnswers
        answersParam.painTypesEtc = newPainTypeEtc
        props.answersUpdate(answersParam)

        localStorage.setItem('floev[currentStep]', '8')
        localStorage.setItem('floev[painTypesEtc]', newPainTypeEtc)
    }

    return (<>
        <div className="q-wrap q8">
            <div className="q-wrap__question-main">지금 안경에서 느껴지는 불편함을 모두 체크해주세요.</div>
            {/*<div className="q-wrap__question-sub">플로브 안경 추천 서비스는 가장 나은 안경을 고민하고 해소할 수 있는 방법을 제안해요.</div>*/}
            <div className="q-wrap__answer-wrap q-wrap__checkbox-wrap" onChange={(e) => handleChangePainTypes(e)}>
                {/* 문제없음 */}
                <input className="q-wrap__input-checkbox" type="checkbox" id="q8_1" onChange={() => { }} value="문제없음" checked={painTypes.includes("문제없음")} />
                <label className="q-wrap__label-checkbox" htmlFor="q8_1">큰 불편함 없었어요</label>
                {/* 피팅문제 */}
                <input className="q-wrap__input-checkbox" type="checkbox" id="q8_2" onChange={() => { }} value="피팅문제" checked={painTypes.includes("피팅문제")} />
                <label className="q-wrap__label-checkbox" htmlFor="q8_2">흘러내림</label>
                {/* 귀아픔문제 */}
                <input className="q-wrap__input-checkbox" type="checkbox" id="q8_7" onChange={() => { }} value="귀아픔문제" checked={painTypes.includes("귀아픔문제")} />
                <label className="q-wrap__label-checkbox" htmlFor="q8_7">귀아픔</label>
                {/* 콧대자국문제 */}
                <input className="q-wrap__input-checkbox" type="checkbox" id="q8_3" onChange={() => { }} value="콧대자국문제" checked={painTypes.includes("콧대자국문제")} />
                <label className="q-wrap__label-checkbox" htmlFor="q8_3">콧대자국</label>
                {/* 고도근시문제 */}
                <input className="q-wrap__input-checkbox" type="checkbox" id="q8_4" onChange={() => { }} value="고도근시문제" checked={painTypes.includes("고도근시문제")} />
                <label className="q-wrap__label-checkbox" htmlFor="q8_4">눈 작아보임</label>
                {/* 화장지워짐 */}
                <input className="q-wrap__input-checkbox" type="checkbox" id="q8_5" onChange={() => { }} value="화장지워짐" checked={painTypes.includes("화장지워짐")} />
                <label className="q-wrap__label-checkbox" htmlFor="q8_5">화장지워짐</label>
                {/* 알러지문제 */}
                <input className="q-wrap__input-checkbox" type="checkbox" id="q8_6" onChange={() => { }} value="알러지문제" checked={painTypes.includes("알러지문제")} />
                <label className="q-wrap__label-checkbox" htmlFor="q8_6">알러지</label>
                {/* 사이즈문제 */}
                <input className="q-wrap__input-checkbox" type="checkbox" id="q8_8" onChange={() => { }} value="관자놀이눌림" checked={painTypes.includes("관자놀이눌림")} />
                <label className="q-wrap__label-checkbox" htmlFor="q8_8">관자놀이 눌림</label>
                {/* 얼굴커보임 */}
                <input className="q-wrap__input-checkbox" type="checkbox" id="q8_9" onChange={() => { }} value="얼굴커보임" checked={painTypes.includes("얼굴커보임")} />
                <label className="q-wrap__label-checkbox" htmlFor="q8_9">얼굴 커보임</label>
                {/* 안경작음 */}
                <input className="q-wrap__input-checkbox" type="checkbox" id="q8_10" onChange={() => { }} value="안경작음" checked={painTypes.includes("안경작음")} />
                <label className="q-wrap__label-checkbox" htmlFor="q8_10">안경이 작음</label>
                {/* 안경무거움 */}
                <input className="q-wrap__input-checkbox" type="checkbox" id="q8_11" onChange={() => { }} value="안경무거움" checked={painTypes.includes("안경무거움")} />
                <label className="q-wrap__label-checkbox" htmlFor="q8_11">안경 무거움</label>
                {/* 안어울림 */}
                <input className="q-wrap__input-checkbox" type="checkbox" id="q8_12" onChange={() => { }} value="안경안어울림" checked={painTypes.includes("안경안어울림")} />
                <label className="q-wrap__label-checkbox" htmlFor="q8_12">안경이 정말 안어울려요</label>
            </div>
            <div className="q-wrap__textarea-wrap">
                <p className="q-wrap__textarea-caption">*그 외 고민되는 불편함이 있다면 편하게 남겨주세요.</p>
                <textarea
                    className="q-wrap__textarea"
                    placeholder="예시) 운전할 때, 특히 비올 때 빛번짐이 심해요"
                    value={painTypesEtc}
                    onChange={(e) => handleChangePainTypeEtc(e)}
                ></textarea>
            </div>
            <div className="q-wrap__btn-wrap">
                <button className="q-wrap__btn q-wrap__btn-prev" type="button" disabled={props.currentStep !== props.max ? false : true} onClick={() => props.onPrev()}>이전</button>
                {painTypes.length === 1 && painTypesEtc.length === 0 ? (
                    <button className="q-wrap__btn q-wrap__btn-next q-wrap__btn-next--disabled" type="button"><span>다음</span> <img src="static/img/survey/ic-arrows-right.png" alt="" /></button>) :
                    (<button className="q-wrap__btn q-wrap__btn-next" type="button" onClick={() => props.onNext()}><span>다음</span> <img src="static/img/survey/ic-arrows-right.png" alt="" /></button>)
                }
            </div>
        </div>

    </>)
}