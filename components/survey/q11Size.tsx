import React, { useState } from 'react'

export default function Q11Size(props: {
    oldAnswers: Answers
    answersUpdate: (answersParam: Answers) => void
    currentStep: number
    max: number
    onPrev: () => void
    onNext: () => void
}) {

    const [size, setSize] = useState<string>("")

    function handleChange(newSize: string) {
        setSize(newSize) //화면 표시를 위한 const control
        let answersParam: Answers = props.oldAnswers
        answersParam.size = newSize
        props.answersUpdate(answersParam)

        // for caching
        localStorage.setItem('floev[currentStep]', '11')
        localStorage.setItem('floev[size]', newSize)
    }

    return (<>
        <div className="contentWrap">
            <p className="qDesc">사진을 참고하여 내 안경의 사이즈를 입력해주세요.</p>
            <p className="qDesc2">지워지거나 원래 적혀있지 않은 안경도 있어요. 이 경우 편하게 넘어가셔도 됩니다.</p>
            <div className="answerWrap">
                <input type="text" name="size" placeholder={'00-00-000'} value={size} maxLength={9} onChange={e => handleChange(e.target.value)} />
            </div>
        </div>
        <div className="btnWrap">
            {size === null || size === '' ?
                (<button className="btnNext disabled" type="button">다음</button>) :
                (<button className="btnNext gtm-016" type="button" onClick={() => props.onNext()}>다음</button>)}
        </div>
    </>)
}