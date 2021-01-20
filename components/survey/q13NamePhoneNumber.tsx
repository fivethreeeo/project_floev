import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Spin } from 'antd'
import cookie from 'cookie'
import axios from 'axios'
import { gql, useMutation } from '@apollo/client'

const MAKE_SURVEY_RESERVATION = gql`
  mutation makeSurveyReservation(
        $customer: Int!, $birth: Int!, $gender: String!, $hasWorn: Int!,
        $purpose: [String!], $purposeEtc: String,
        $painDegree: Int!, $painDegreeEtc: String,
        $painTypes: [String!], $painTypesEtc: String,
        $prefer: String!, $size: String, $loungeCode: Int!,
        $reservationDate: String!, $reservationTime: String!,
        $name: String!, $phoneNumber: String!, $authNumber: String!) {
    makeSurveyReservation(
        customer: $customer, birth: $birth, gender: $gender, hasWorn: $hasWorn,
        purpose: $purpose, purposeEtc: $purposeEtc,
        painDegree: $painDegree, painDegreeEtc: $painDegreeEtc,
        painTypes: $painTypes, painTypesEtc: $painTypesEtc,
        prefer: $prefer, size: $size, loungeCode: $loungeCode
        reservationDate: $reservationDate, reservationTime: $reservationTime,
        name: $name, phoneNumber: $phoneNumber, authNumber: $authNumber) {
    token
        user{
            id
            reservations{
                id
                date
                lounge
            }
        }
    }
  }
`

export default function Q12NamePhoneNumber(props: {
    oldAnswers: Answers
    answersUpdate: (answersParam: Answers) => void
    currentStep: number
    max: number
    schedule: Schedule[]
    onPrev: () => void
    onNext: () => void
}) {
    const router = useRouter()
    const [name, setName] = useState<string>(props.oldAnswers.name)
    const [phoneNumber, setPhoneNumber] = useState<string>(props.oldAnswers.phoneNumber)
    const [isPhoneNumber, setIsPhoneNumber] = useState<boolean>(false)
    const [authNumber, setAuthNumber] = useState<string>('')
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [isSentAuth, setIsSentAuth] = useState<boolean>(false)
    const [leftSecond, setLeftSecond] = useState<number>(180)
    const [isActive, setIsActive] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)

    const [makeSurveyReservation, { loading }] = useMutation(MAKE_SURVEY_RESERVATION, {
        variables: {
            customer: props.oldAnswers.customer, birth: props.oldAnswers.birth,
            gender: props.oldAnswers.gender, hasWorn: props.oldAnswers.hasWorn,
            purpose: props.oldAnswers.purposes, purposeEtc: props.oldAnswers.purposeEtc,
            painDegree: props.oldAnswers.painDegree, painDegreeEtc: props.oldAnswers.painDegreeEtc,
            painTypes: props.oldAnswers.painTypes, painTypesEtc: props.oldAnswers.painTypesEtc,
            prefer: props.oldAnswers.prefer, size: props.oldAnswers.size,
            reservationDate: props.oldAnswers.reservationDate, reservationTime: props.oldAnswers.reservationTime,
            name: name, phoneNumber: phoneNumber, authNumber: authNumber
        },
        onCompleted(data: any) {
            if (data) {
                const token = data.makeSurveyReservation.token
                document.cookie = cookie.serialize("token", token, {
                    maxAge: 12 * 60 * 60
                })
                window.analytics.identify({
                    name: name,
                    birth: props.oldAnswers.birth,
                    gender: props.oldAnswers.gender
                });
                localStorage.setItem('floev[currentStep]', '0')
                router.replace('/complete')
            }
        },
        onError(error) {
            console.error(error.message)
            // 백엔드 에러와 일치시키기
            if (error.message === "not valid") {
                setIsError(true)
                setAuthNumber('')
            }// 백엔드 에러와 일치시키기
            else if (error.message === "Duplicated") {
                alert('죄송합니다. 이미 예약된 시간입니다.')
                props.onPrev()
            }
        }
    });

    function handleChangeName(e: any) {
        const newName: string = e.target.value
        setName(newName)

        let answersParam: Answers = props.oldAnswers
        answersParam.name = newName
        props.answersUpdate(answersParam)

        localStorage.setItem('floev[currentStep]', '13')
        localStorage.setItem('floev[name]', newName)
    }

    function handleChangePhoneNumber(e: any) {
        const newPhoneNumber: string = e.target.value
        setPhoneNumber(newPhoneNumber)

        if (validatePhoneNumber(newPhoneNumber)) {
            let answersParam: Answers = props.oldAnswers
            answersParam.phoneNumber = newPhoneNumber
            props.answersUpdate(answersParam)
            setIsPhoneNumber(true)
        } else {
            setIsPhoneNumber(false)
        }

        localStorage.setItem('floev[currentStep]', '13')
        localStorage.setItem('floev[phoneNumber]', newPhoneNumber)
    }

    function handleChangeAuthNumber(e: any) {
        const newAuthNumber = e.target.value
        setAuthNumber(newAuthNumber)

        let answersParam: Answers = props.oldAnswers
        answersParam.authNumber = newAuthNumber
        props.answersUpdate(answersParam)
    }

    function validatePhoneNumber(numberString: string) {
        const regex = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]{3,4})([0-9]{4})/g
        if (!regex.test(numberString)) {
            return false
        }
        return true
    }

    function parseSecondToMinute(num: number) {
        if ((num % 60) < 10) {
            return '0' + Math.floor(num / 60).toString() + ':0' + (num % 60).toString()
        } else {
            return '0' + Math.floor(num / 60).toString() + ':' + (num % 60).toString()
        }
    }

    useEffect(() => {
        let interval: any = null;
        if (isActive && leftSecond !== 0) {
            interval = setInterval(() => {
                setLeftSecond(leftSecond => leftSecond - 1);
            }, 1000);
        } else {
            setTimerOff()
        }
        return () => clearInterval(interval);
    }, [isActive, leftSecond]);

    const setTimerOn = () => {
        setLeftSecond(180)
        setIsActive(true)
    }

    const setTimerOff = () => {
        setIsActive(false);
        setLeftSecond(181);
    }

    function requestAuthNumber() {
        setIsSentAuth(true)
        setTimerOn()

        axios.post("https://api.floev.com/auth/create", {
            phoneNumber: phoneNumber
        }).then((result: any) => {
            if (result.data["code"] === "success") {
                setAuthNumber('')
                setIsAuthenticated(true)
                new Promise(setTimerOn)
            }
        })
    }

    return (<>
        <div className="contentWrap">
            <p className="qDesc" >신청 완료에 필요한 나의 정보를 입력해주세요.</p>
            <div className="qLine"></div>

            {/* 이름 입력 */}
            <input className="inp01" type="text" name="name" placeholder={'이름을 입력해주세요'}
                maxLength={10} onChange={e => handleChangeName(e)} />

            {/* 휴대전화번호 입력 */}
            <input className="inp01" type="tel" name="phoneNumber" placeholder={'휴대폰 번호 (  \'-\' 없이 숫자만 입력 )'} maxLength={13} onChange={e => handleChangePhoneNumber(e)} />

            {!isSentAuth ?
                // 인증번호 보내기 전
                isPhoneNumber ?
                    (<button className="btn btn02" onClick={() => requestAuthNumber()}>인증번호전송</button>) :
                    (<button className="btn btn02 gray200">인증번호전송</button>) :

                // 인증번호 보낸 후
                (<div>
                    <input className="inp01" type="text" name="authNumber" placeholder={'인증번호 4자리'} value={authNumber} onChange={e => handleChangeAuthNumber(e)} maxLength={4} />
                    {isAuthenticated ?
                        (<button className="btn btn02 btnResend gtm-test-resend" onClick={() => requestAuthNumber()}>재전송</button>) :
                        (<button className="btn btn02 btnResend">재전송</button>)}

                    {leftSecond <= 180 ?
                        <div>{parseSecondToMinute(leftSecond)}</div> :
                        leftSecond === 181 ?
                            <div>만료</div> :
                            leftSecond === 182 ?
                                <span className="time"></span> :
                                <div className="txtWarning">인증번호가 일치하지 않습니다. 다시 확인해주세요.</div>}
                </div>)}
            {isError &&
                (<div className="txtWarning">인증번호가 일치하지 않습니다. 다시 확인해주세요.</div>)}
        </div>
        {isSentAuth &&
            (<div className="btnWrap">
                { authNumber.length !== 4 || !isActive ?
                    (<button className="btnCom disabled">인증하고 예약완료하기</button>) :
                    (!loading ?
                        (<button className="btnCom color gtm-test-14-next" type={'submit'}
                            onClick={() => makeSurveyReservation()}>인증하고 예약완료하기</button>) :
                        (<Spin size="large" tip="잠시만 기다려주세요.." />))
                }
                {isActive ? 'true' : 'false'}
            </div>)
        }
    </>)
}