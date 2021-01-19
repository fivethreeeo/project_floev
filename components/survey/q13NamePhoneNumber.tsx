import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Spin } from 'antd'
// import redirect from '../../lib/redirect'
import cookie from 'cookie'
// import axios from 'axios'
import { gql, useMutation } from '@apollo/client'

const MAKE_SURVEY_RESERVATION = gql`
  mutation makeSurveyReservation(
        $customer: Int!, $birth: Int!, $gender: String!, $hasWorn: Int!,
        $purpose: [String!], $purposeEtc: String!,
        $painDegree: Int, $painDegreeEtc: String,
        $painTypes: [String!], $painTypesEtc: String,
        $prefer: String!, $size: String,
        $reservationDate: String!, $reservationTime: String!,
        $name: String!, $phoneNumber: String!, $authNumber: String!) {
    makeSurveyReservation(
        customer: $customer, birth: $birth, gender: $gender, hasWorn: $hasWorn,
        purpose: $purpose, purposeEtc: $purposeEtc,
        painDegree: $painDegree, painDegreeEtc: $painDegreeEtc,
        painTypes: $painTypes, painTypesEtc: $painTypesEtc,
        prefer: $prefer, size: $size,
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
    onPrev: () => void
    onNext: () => void
}) {
    const router = useRouter()
    const [name, setName] = useState<string>(localStorage.getItem('floev[name]') ?? '')
    const [phoneNumber, setPhoneNumber] = useState<string>(
        localStorage.getItem('floev[phoneNumber]') ?? '')
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
                router.push('/complete')
            }
        },
        onError(error) {
            console.error(error.message)
            // 백엔드 에러와 일치시키기
            if (error.message === "not valid") {
                setIsError(true)
                setIsSentAuth(true)
                setAuthNumber('')
            }// 백엔드 에러와 일치시키기
            else if (error.message === "Duplicated") {
                alert('죄송합니다. 이미 예약된 시간입니다.')
                props.onPrev()
            }
        }
    });

    function handleChangePhoneNumber(e: any) {
        const newPhoneNumber: string = parsePhoneNumber(e.target.value)
        setPhoneNumber(newPhoneNumber)

        let answersParam: Answers = props.oldAnswers
        answersParam.phoneNumber = newPhoneNumber
        props.answersUpdate(answersParam)

        localStorage.setItem('floev[currentStep]', '14')
        localStorage.setItem('floev[phoneNumber]', newPhoneNumber)
    }

    function handleChangeAuthNumber(e: any) {
        const newAuthNumber = e.target.value
        setAuthNumber(newAuthNumber)

        let answersParam: Answers = props.oldAnswers
        answersParam.authNumber = newAuthNumber
        props.answersUpdate(answersParam)
    }

    function parsePhoneNumber(numberString: string) {
        return numberString.split("-").join("")
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

        // axios.post("https://api.floev.com/auth/create", {
        //     phoneNumber: parsePhoneNumber(phoneNumber)
        // }).then((result: any) => {
        //     if (result.data["code"] === "success") {
        //         setAuthNumber('')
        //         new Promise(setTimerOn)
        //     }
        // })
    }

    return (<>
        <div className="contentWrap">
            <p className="qDesc" style={{ fontSize: '18px', lineHeight: '28px', wordBreak: 'break-all' }}>소중한 눈을 위해 플로브를 찾아주셔서 감사합니다. 마지막 인증을 통해 예약을 확정해주세요.</p>
            <div className="qLine"></div>

            <input className="inp01" type="tel" name="phoneNumber" placeholder={'휴대폰 번호 (  \'-\' 없이 숫자만 입력 )'} maxLength={13} onChange={e => handleChangePhoneNumber(e)} />
            {!isSentAuth ?
                phoneNumber.length === 11 ?
                    (<button className="btn btn02" onClick={() => requestAuthNumber()}>인증번호전송</button>) :
                    (<button className="btn btn02 gray200">인증번호전송</button>) :
                (<div style={{ position: 'relative' }} >
                    <input className="inp01" style={{ fontSize: '16px', width: '100%', marginBottom: '0' }} type="text" name="authNumber" placeholder={'인증번호 4자리'} value={authNumber} onChange={e => handleChangeAuthNumber(e)} disabled={isAuthenticated} maxLength={4} />
                    {isAuthenticated ?
                        (<button style={{}} className="btn btn02 btnResend">재전송</button>) :
                        (<button style={{}} className="btn btn02 btnResend gtm-test-resend" onClick={() => requestAuthNumber()}>재전송</button>)}

                    {leftSecond <= 180 ?
                        <div style={{ position: 'absolute', top: '11px', right: '76px', fontSize: '12px' }}>{parseSecondToMinute(leftSecond)}</div> :
                        leftSecond === 181 ?
                            <div style={{ position: 'absolute', top: '11px', right: '76px', fontSize: '12px', color: '#C3512A' }}>만료</div> :
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
                    (loading ?
                        (<Spin size="large" tip="잠시만 기다려주세요.." />) :
                        (<button className="btnCom color gtm-test-14-next" type={'submit'}
                            onClick={() => makeSurveyReservation()}>인증하고 예약완료하기</button>))
                }
            </div>)
        }
    </>)
}