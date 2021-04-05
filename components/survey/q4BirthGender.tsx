import React, { useState } from 'react'
import * as Creep from '../../lib/hatchery'
import { EVENT } from '../../lib/constants'

export default function Q4BirthGender(props: SurveyProps) {
    const [birth, setBirth] = useState<number>(props.oldAnswers.birth)
    const [gender, setGender] = useState<string>(props.oldAnswers.gender)

    function handleChangeBirth(e: any) {
        const newBirth: number = parseInt(e.target.value)
        setBirth(newBirth)

        let answersParam: Answers = props.oldAnswers
        answersParam.birth = newBirth
        props.answersUpdate(answersParam)

        localStorage.setItem('floev[currentStep]', '4')
        localStorage.setItem('floev[birth]', String(newBirth))
    }

    function handleChangeGender(e: any) {
        const newGender: string = e.target.value
        setGender(newGender)

        let answersParam: Answers = props.oldAnswers
        answersParam.gender = newGender
        props.answersUpdate(answersParam)

        localStorage.setItem('floev[currentStep]', '2')
        localStorage.setItem('floev[gender]', newGender)
    }

    const createOptions = () => {
        const options = []
        for (let i = 2004; i >= 1955; i--)
            options.push(<option key={i} value={i}>{i}</option>)
        return options
    }
    async function handleClickNext() {
        // 이때 status egg status 업데이트
        // 기존 hatcheryId로 검색했을 때 birth/gender 와 새롭게 입력된 birth/gender 비교

        props.onNext(EVENT.SURVEY.Q4.NEXT)
    }

    return (<>
        <div className="q-wrap q4">
            <div className="q-wrap__question-main">기본 정보를 체크해주세요.</div>
            <div className="q-wrap__question-sub"></div>
            <div className="q-wrap__answer-wrap">
                <select className="q-wrap__select" onChange={(e) => handleChangeBirth(e)} value={birth} required>
                    <option value="" hidden>출생연도 선택</option>
                    {createOptions()}
                </select>
                <div className="input-radio-40-wrap" onChange={e => handleChangeGender(e)}>
                    <input className="q-wrap__input-radio" type="radio" id="q4_1" onChange={() => { }} value="male" checked={gender === 'male'} />
                    <label className="q-wrap__label-radio-40 q-wrap__label-radio-40--left" htmlFor="q4_1">남</label>
                    <input className="q-wrap__input-radio" type="radio" id="q4_2" onChange={() => { }} value="female" checked={gender === 'female'} />
                    <label className="q-wrap__label-radio-40 q-wrap__label-radio-40--right" htmlFor="q4_2">여</label>
                </div>
            </div>
            <div className="q-wrap__btn-wrap">
                <button className="q-wrap__btn q-wrap__btn-prev tn-0009" type="button" disabled={props.currentStep !== props.max ? false : true} onClick={() => props.onPrev(EVENT.SURVEY.Q4.PREV)}>이전</button>
                {birth < 0 || gender === '' ? (
                    <button className="q-wrap__btn q-wrap__btn-next q-wrap__btn-next--disabled" type="button"><span>다음</span> <img src="/img/survey/ic-arrows-right.png" alt="" /></button>) :
                    (<button className="q-wrap__btn q-wrap__btn-next tn-0008" type="button" onClick={handleClickNext}><span>다음</span> <img src="/img/survey/ic-arrows-right.png" alt="" /></button>)
                }
            </div>
        </div>

    </>)
}