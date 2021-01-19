import React, { useState } from 'react'

export default function Q4BirthGender(props: {
    oldAnswers: Answers
    answersUpdate: (answersParam: Answers) => void
    currentStep: number
    max: number
    onPrev: () => void
    onNext: () => void
}) {
    const [birth, setBirth] = useState<number>(parseInt(localStorage.getItem('floev[birth]') ?? '-1'))
    const [gender, setGender] = useState<string>(localStorage.getItem('floev[gender]') ?? '')

    function handleChangeBirth(e: any) {
        const newBirth: number = parseInt(e.target.value)
        setBirth(newBirth)

        let answersParam: Answers = props.oldAnswers
        answersParam.birth = newBirth
        props.answersUpdate(answersParam)

        // for caching
        localStorage.setItem('floev[currentStep]', '4')
        localStorage.setItem('floev[birth]', String(newBirth))
    }

    function handleChangeGender(e: any) {
        const newGender: string = e.target.value
        setGender(newGender)

        let answersParam: Answers = props.oldAnswers
        answersParam.gender = newGender
        props.answersUpdate(answersParam)

        // for caching
        localStorage.setItem('floev[currentStep]', '2')
        localStorage.setItem('floev[gender]', newGender)
    }

    const createOptions = () => {
        const options = []
        for (let i = 2004; i >= 1955; i--)
            options.push(<option key={i} value={i}>{i}</option>)
        return options
    }

    return (<>
        <div className="contentWrap">
            <p>기본 정보를 체크해주세요.</p>
            <p className="qDesc">나이를 알려주세요.</p>
            <p className="qDesc2">나이에 따라 일반적으로 발생하는 눈의 불편함을 참고해요.</p>
            <div className="qLine"></div>
            <div className="answerWrap">
                <select name="age" onChange={(e) => handleChangeBirth(e)} value={birth}>
                    <option defaultValue={-1}>나이</option>
                    {createOptions()}
                </select>
            </div>
            <div className="answerWrap inputRadio" onChange={e => handleChangeGender(e)}>
                <input type="radio" name="male" id="q_2_1" onChange={() => { }}
                    value="male" checked={gender === 'male'} />
                <label htmlFor="q_2_1">
                    <span className="inputTxt">남</span>
                </label>
                <input type="radio" name="female" id="q_2_2" onChange={() => { }}
                    value="female" checked={gender === 'female'} />
                <label htmlFor="q_2_2">
                    <span className="inputTxt">여</span>
                </label>
            </div>

        </div>
        <div className="btnWrap">
            {birth < 0 || gender === '' ? (
                <button className="btnNext disabled" type="button">다음</button>) :
                (<button className="btnNext gtm-016" type="button" onClick={() => props.onNext()}>다음</button>)
            }
        </div>
    </>)
}