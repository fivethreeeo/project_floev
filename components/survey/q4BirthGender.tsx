import cuid from 'cuid'
import React, { useState } from 'react'
import { EVENT, ZERG } from '../../lib/constants'
import { createEgg, lavaTo } from '../../lib/hatchery'

export default function Q4BirthGender(props: SurveyProps) {
    const [birth, setBirth] = useState<number>(props.oldAnswers.birth)
    const [gender, setGender] = useState<string>(props.oldAnswers.gender)
    const oldBirth = parseInt(localStorage.getItem('floev[birth]') ?? '-1')
    const oldGender = localStorage.getItem('floev[gender]') ?? ''

    function handleChangeBirth(e: any) {
        const newBirth: number = parseInt(e.target.value)
        setBirth(newBirth)

        let answersParam: Answers = props.oldAnswers
        answersParam.birth = newBirth
        props.answersUpdate(answersParam)

        localStorage.setItem('floev[currentStep]', '4')
        localStorage.setItem('floev[newBirth]', String(newBirth))
    }

    function handleChangeGender(e: any) {
        const newGender: string = e.target.value
        setGender(newGender)

        let answersParam: Answers = props.oldAnswers
        answersParam.gender = newGender
        props.answersUpdate(answersParam)

        localStorage.setItem('floev[currentStep]', '2')
        localStorage.setItem('floev[newGender]', newGender)
    }

    const createOptions = () => {
        const options = []
        for (let i = 2004; i >= 1955; i--)
            options.push(<option key={i} value={i}>{i}</option>)
        return options
    }
    async function handleClickNext() {
        const egg: Hatchery = props.hatchery
        egg.birth = birth
        egg.gender = gender
        if (oldBirth === -1 || oldGender === '') {
            egg.status = ZERG.EGG
            lavaTo(egg)
            localStorage.setItem('_sts', ZERG.EGG)
        } else if (oldBirth !== egg.birth || oldGender !== egg.gender) {
            egg.hatcheryId = cuid() + 'H'
            egg.currentSessionId = 1
            egg.userId = null
            egg.status = ZERG.EGG
            createEgg(egg)
            localStorage.setItem('_hid', egg.hatcheryId)
            sessionStorage.setItem('_sid', String(egg.currentSessionId))
            sessionStorage.setItem('current_event', '0')
            localStorage.setItem('_sts', ZERG.EGG)
        } else {
            // no status change
        }
        localStorage.setItem('floev[birth]', String(egg.birth))
        localStorage.setItem('floev[gender]', egg.gender)
        props.updateHatchery(egg)
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