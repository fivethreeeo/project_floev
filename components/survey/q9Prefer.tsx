import React, { useState } from 'react'

export default function Q9Prefer(props: {
    oldAnswers: Answers
    answersUpdate: (answersParam: Answers) => void
    currentStep: number
    max: number
    onPrev: () => void
    onNext: () => void
}) {
    const [prefer, setPrefer] = useState<string>('')

    function handleChange(e: any) {
        const newPrefer: string = e.target.value
        setPrefer(newPrefer)

        let answersParam: Answers = props.oldAnswers
        answersParam.prefer = newPrefer
        props.answersUpdate(answersParam)

        // for caching
        localStorage.setItem('floev[currentStep]', '9')
        localStorage.setItem('floev[preger]', newPrefer)
    }

    return (<>
        <div className="contentWrap">
            <p className="qDesc">안경에 대한 고민&#38;플로브에게 요청하고 싶은 내용을 자유롭게 남겨주세요.</p>
            <div className="personal">
                <p><strong>이미지 고민</strong><br />
                &#34;회사에서 존재감 있는 사람이 되고싶은데 안경으로 이미지 변신을 하고싶어요!&#34;<br />
                    <strong>스타일 고민</strong><br />
                &#34;무채색 안경을 선호하지만 검정색은 별로에요&#34;<br />
                &#34;첫 안경이라 어떤게 어울리는지 잘 모르겠어요. 최대한 다양하게 경험해볼래요!&#34;<br />
                    <strong>사이즈&#38;디자인 고민</strong><br />
                &#34;주로 후드티,청바지,티셔츠 등 캐주얼한 옷을 입어요. 무난하게 어울리는 안경이 필요해요&#34;<br />
                &#34;저는 뿔테는 너무 무거워서 싫고 금속테 위주로 보고싶어요&#34;
                        </p>
                <textarea
                    name="pain-type-etc"
                    id="pain-type-etc"
                    placeholder="원하는 분위기, 스타일, 기피 색상, 기피 스타일,
                        불편해도 스타일리쉬하게, 무조건 편한거, 선호하는 브랜드 등"
                    value={prefer}
                    onChange={(e) => handleChange(e)}
                ></textarea>
            </div>
        </div>
        <div className="btnWrap">
            {prefer.length === 0 ?
                (<button className="btnNext disabled" type="button" disabled>다음</button>) :
                (<button className="btnNext gtm-021" type="button" onClick={() => props.onNext()}>다음</button>)}
        </div>
    </>)
}