import React, { useState } from 'react'


export default function Q8Paintypes(props: {
    oldAnswers: Answers
    answersUpdate: (answersParam: Answers) => void
    currentStep: number
    max: number
    onPrev: () => void
    onNext: () => void
}) {
    const [painTypes, setPainTypes] = useState<Array<string>>(
        (localStorage.getItem('floev[painTypes]') ?? '').split(','))
    const [painTypesEtc, setPainTypesEtc] = useState<string>(
        localStorage.getItem('floev[painTypesEtc]') ?? '')

    function handleChangePainTypes(e: any) {
        const newPainType = e.target.value
        let newPainTypes: string[] = painTypes

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
        <div className="contentWrap">
            <p className="qDesc">지금 안경에서 느껴지는 불편함을 모두 체크해주세요.</p>
            <p className="qDesc">플로브 안경 추천 서비스는 가장 나은 안경을 고민하고 해소할 수 있는 방법을 제안해요.</p>
            <div className="answerWrap inputCheckbox" onChange={(e) => handleChangePainTypes(e)}>
                {/* 고도근시문제 */}
                <input id="pain-type-1" type="checkbox" name="고도근시문제" onChange={() => { }}
                    value="고도근시문제" checked={painTypes.includes("고도근시문제")} />
                <label htmlFor="pain-type-1" className="input-label">
                    <p className="inner"><span className="inputImg"></span>
                        <span className="inputTxt">눈이 작아보여요</span>
                    </p>
                </label>
                {/* 콧대자국문제 */}
                <input id="pain-type-2" type="checkbox" name="콧대자국문제" onChange={() => { }}
                    value="콧대자국문제" checked={painTypes.includes("콧대자국문제")} />
                <label htmlFor="pain-type-2" className="input-label">
                    <p className="inner"><span className="inputImg"></span>
                        <span className="inputTxt">콧대에 자국이 남아요</span>
                    </p>
                </label>
                {/* 화장지워짐 */}
                <input id="pain-type-3" type="checkbox" name="화장지워짐" onChange={() => { }}
                    value="화장지워짐" checked={painTypes.includes("화장지워짐")} />
                <label htmlFor="pain-type-3" className="input-label">
                    <p className="inner"><span className="inputImg"></span>
                        <span className="inputTxt">화장이 지워져요</span>
                    </p>
                </label>
                {/* 피팅문제 */}
                <input id="pain-type-4" type="checkbox" name="피팅문제" onChange={() => { }}
                    value="피팅문제" checked={painTypes.includes("피팅문제")} />
                <label htmlFor="pain-type-4" className="input-label">
                    <p className="inner"><span className="inputImg"></span>
                        <span className="inputTxt">자꾸 흘러내려요</span>
                    </p>
                </label>
                {/* 사이즈문제 */}
                <input id="pain-type-5" type="checkbox" name="사이즈문제" onChange={() => { }}
                    value="사이즈문제" checked={painTypes.includes("사이즈문제")} />
                <label htmlFor="pain-type-5" className="input-label">
                    <p className="inner"><span className="inputImg"></span>
                        <span className="inputTxt">관자놀이가 눌려요</span>
                    </p>
                </label>
                {/* 알러지문제 */}
                <input id="pain-type-6" type="checkbox" name="알러지문제" onChange={() => { }}
                    value="알러지문제" checked={painTypes.includes("알러지문제")} />
                <label htmlFor="pain-type-6" className="input-label">
                    <p className="inner"><span className="inputImg"></span>
                        <span className="inputTxt">알러지 반응이 일어나요</span>
                    </p>
                </label>
                {/* 얼굴커보임 */}
                <input id="pain-type-7" type="checkbox" name="얼굴커보임" onChange={() => { }}
                    value="얼굴커보임" checked={painTypes.includes("얼굴커보임")} />
                <label htmlFor="pain-type-7" className="input-label">
                    <p className="inner"><span className="inputImg"></span>
                        <span className="inputTxt">얼굴이 커보여요</span>
                    </p>
                </label>
                {/* 안경무거움 */}
                <input id="pain-type-8" type="checkbox" name="안경무거움" onChange={() => { }}
                    value="안경무거움" checked={painTypes.includes("안경무거움")} />
                <label htmlFor="pain-type-8" className="input-label">
                    <p className="inner"><span className="inputImg"></span>
                        <span className="inputTxt">안경이 무거워요</span>
                    </p>
                </label>
                {/* 귀아픔문제 */}
                <input id="pain-type-9" type="checkbox" name="귀아픔문제" onChange={() => { }}
                    value="귀아픔문제" checked={painTypes.includes("귀아픔문제")} />
                <label htmlFor="pain-type-9" className="input-label">
                    <p className="inner"><span className="inputImg"></span>
                        <span className="inputTxt">귀가 아파요</span>
                    </p>
                </label>
                {/* 문제없음 */}
                <input id="pain-type-10" type="checkbox" name="문제없음" onChange={() => { }}
                    value="문제없음" checked={painTypes.includes("문제없음")} />
                <label htmlFor="pain-type-10" className="input-label">
                    <p className="inner"><span className="inputImg"></span>
                        <span className="inputTxt">큰 문제 없었어요</span>
                    </p>
                </label>
            </div>
            <div className="personal">
                <p>*그 외 고민되는 불편함이 있다면 편하게 남겨주세요</p>
                <textarea
                    name="pain-type-etc"
                    id="pain-type-etc"
                    placeholder="예시) 운전할 때, 특히 비올 때 빛번짐이 심해요"
                    value={painTypesEtc}
                    onChange={(e) => handleChangePainTypeEtc(e)}
                ></textarea>
            </div>
        </div>
        <div className="btnWrap">
            {painTypes.length === 0 && painTypesEtc === '' ?
                (<button className="btnNext disabled" type="button" disabled>다음</button>) :
                (<button className="btnNext gtm-021" type="button" onClick={() => props.onNext()}>다음</button>)}
        </div>
    </>)
}