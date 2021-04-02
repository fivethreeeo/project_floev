import React, { useState } from 'react'


export default function preferMoods(props: {
    hatchery: Hatchery
    oldAnswers: Answers
    answersUpdate: (answersParam: Answers) => void
    currentStep: number
    max: number
    purchaseRequest: PurchaseRequest[]
    onPrev: () => void
    onNext: () => void
}) {
    const [preferMoods, setPreferMoods] = useState<Array<string>>(props.oldAnswers.preferMoods)

    function handleChangePreferMoods(e: any) {
        const newPreferMood = e.target.value
        let newPreferMoods: string[] = [...preferMoods]

        if (e.target.checked) {
            newPreferMoods.push(newPreferMood)
        } else {
            newPreferMoods = newPreferMoods.filter(n => n !== newPreferMood)
        }
        setPreferMoods(newPreferMoods)

        let answersParam: Answers = props.oldAnswers
        answersParam.preferMoods = newPreferMoods
        props.answersUpdate(answersParam)

        localStorage.setItem('floev[currentStep]', '94')
        localStorage.setItem('floev[preferMoods]', newPreferMoods.toString())
    }

    return (<>
        <div className="q-wrap q8">
            <div className="q-wrap__question-main">선호하는 안경 스타일을 모두 선택해주세요.</div>
            <div className="q-wrap__answer-wrap q-wrap__checkbox-wrap" onChange={(e) => handleChangePreferMoods(e)}>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pm_1" onChange={() => { }}
                    value="정장에 어울리는" checked={preferMoods.includes("정장에 어울리는")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pm_1">정장에 어울리는</label>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pm_2" onChange={() => { }}
                    value="캐주얼에 어울리는" checked={preferMoods.includes("캐주얼에 어울리는")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pm_2">캐주얼에 어울리는</label>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pm_3" onChange={() => { }}
                    value="다양한 옷에 어울리는" checked={preferMoods.includes("다양한 옷에 어울리는")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pm_3">다양한 옷에 어울리는</label>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pm_4" onChange={() => { }}
                    value="안경이 포인트되는" checked={preferMoods.includes("안경이 포인트되는")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pm_4">안경이 포인트되는</label>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pm_5" onChange={() => { }}
                    value="자연스러운" checked={preferMoods.includes("자연스러운")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pm_5">자연스러운</label>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pm_6" onChange={() => { }}
                    value="지적인" checked={preferMoods.includes("지적인")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pm_6">지적인</label>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pm_7" onChange={() => { }}
                    value="깔끔한" checked={preferMoods.includes("깔끔한")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pm_7">깔끔한</label>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pm_8" onChange={() => { }}
                    value="세련된" checked={preferMoods.includes("세련된")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pm_8">세련된</label>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pm_9" onChange={() => { }}
                    value="차가운" checked={preferMoods.includes("차가운")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pm_9">차가운</label>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pm_10" onChange={() => { }}
                    value="따뜻한" checked={preferMoods.includes("따뜻한")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pm_10">따뜻한</label>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pm_11" onChange={() => { }}
                    value="부드러운" checked={preferMoods.includes("부드러운")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pm_11">부드러운</label>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pm_12" onChange={() => { }}
                    value="스마트한" checked={preferMoods.includes("스마트한")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pm_12">스마트한</label>

                <input className="q-wrap__input-checkbox" type="checkbox" id="q_pm_13" onChange={() => { }}
                    value="심플한" checked={preferMoods.includes("심플한")} />
                <label className="q-wrap__label-checkbox" htmlFor="q_pm_13">심플한</label>

            </div>
            <div className="q-wrap__btn-wrap">
                <button className="q-wrap__btn q-wrap__btn-prev tn-0037" type="button" disabled={props.currentStep !== props.max ? false : true} onClick={() => props.onPrev()}>이전</button>
                {preferMoods.length === 0 ? (
                    <button className="q-wrap__btn q-wrap__btn-next q-wrap__btn-next--disabled" type="button"><span>다음</span> <img src="/img/survey/ic-arrows-right.png" alt="" /></button>) :
                    (<button className="q-wrap__btn q-wrap__btn-next tn-0036" type="button" onClick={() => props.onNext()}><span>다음</span> <img src="/img/survey/ic-arrows-right.png" alt="" /></button>)
                }
            </div>
        </div>

    </>)
}