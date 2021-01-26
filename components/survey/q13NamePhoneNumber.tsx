import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Spin } from 'antd'
import cookie from 'cookie'
import axios from 'axios'
import { gql, useMutation } from '@apollo/client'
import path from 'path';
import moment from 'moment'
import { resetSurvey } from '../../utils/surveyUtils'

const MAKE_SURVEY_PURCHASE_REQUEST = gql`
  mutation makeSurveyPurchaseRequest(
        $customer: Int!, $birth: Int!, $gender: String!, $hasWorn: Int!,
        $purposes: [String!], $purposeEtc: String,
        $painDegree: Int!, $painDegreeEtc: String,
        $painTypes: [String!], $painTypesEtc: String,
        $prefer: String!, $size: String, $loungeCode: Int!,
        $requestDate: String!, $requestTime: String!,
        $name: String!, $phoneNumber: String!, $authNumber: String!) {
    makeSurveyPurchaseRequest(
        customer: $customer, birth: $birth, gender: $gender, hasWorn: $hasWorn,
        purposes: $purposes, purposeEtc: $purposeEtc,
        painDegree: $painDegree, painDegreeEtc: $painDegreeEtc,
        painTypes: $painTypes, painTypesEtc: $painTypesEtc,
        prefer: $prefer, size: $size, loungeCode: $loungeCode
        requestDate: $requestDate, requestTime: $requestTime,
        name: $name, phoneNumber: $phoneNumber, authNumber: $authNumber) {
    token
        user{
            id
            requests{
                id
                date
                loungeCode
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

    const [makeSurveyPurchaseRequest, { loading }] = useMutation(MAKE_SURVEY_PURCHASE_REQUEST, {
        variables: {
            customer: props.oldAnswers.customer, birth: props.oldAnswers.birth,
            gender: props.oldAnswers.gender, hasWorn: props.oldAnswers.hasWorn,
            purposes: props.oldAnswers.purposes, purposeEtc: props.oldAnswers.purposeEtc,
            painDegree: props.oldAnswers.painDegree, painDegreeEtc: props.oldAnswers.painDegreeEtc,
            painTypes: props.oldAnswers.painTypes, painTypesEtc: props.oldAnswers.painTypesEtc,
            prefer: props.oldAnswers.prefer, size: props.oldAnswers.size,
            loungeCode: props.oldAnswers.loungeCode,
            requestDate: props.oldAnswers.requestDate,
            requestTime: props.oldAnswers.requestTime,
            name: name, phoneNumber: phoneNumber, authNumber: authNumber
        },
        onCompleted(data: any) {
            if (data) {
                const token = data.makeSurveyPurchaseRequest.token
                document.cookie = cookie.serialize("token", token, {
                    maxAge: 12 * 60 * 60
                })
                window.analytics.identify({
                    name: name,
                    birth: props.oldAnswers.birth,
                    gender: props.oldAnswers.gender
                });
                resetSurvey()
                router.replace('/complete')
            }
        },
        onError(error) {
            console.error(error.message)
            // 백엔드 에러와 일치시키기
            if (error.message === "not valid") {
                setIsError(true)
                setAuthNumber('')
                setIsActive(false)
                alert('인증번호가 유효하지 않습니다. 다시 시도해주세요.')
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
        setIsError(false) // 인증번호를 입력하는 중이니 에러메시지를 없애야겠지

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
    function hashCode(input: string) {
        for (var i = 0, hash = 0xdeadbeef; i < input.length; i++)
            hash = Math.imul(hash ^ input.charCodeAt(i), 2654435761);
        return (hash ^ hash >>> 16) >>> 0;
    };

    const submitPhoto = async () => {
        for (let i = 0; i < props.oldAnswers.photoFileList.length; i++) {
            const formData = new FormData()
            const file = props.oldAnswers.photoFileList[i].originFileObj
            const fileName: string = moment().format().slice(0, 16) + "_" + hashCode(phoneNumber).toString() + "_prefer_" + i.toString() + path.extname(props.oldAnswers.photoFileList[i].name)
            if (file !== undefined) {
                formData.append("upload-image", file, fileName)
            }
            await axios.post('https://image.floev.com/upload', formData, {
                headers: { "content-type": "multipart/form-data" }
            }).then(res => {
                console.log(res.status)
            }).catch(err => {
                console.error(err)
            })
        }
        for (let i = 0; i < props.oldAnswers.preferFileList.length; i++) {
            const formData = new FormData()
            const file = props.oldAnswers.preferFileList[i].originFileObj
            const fileName: string = moment().format().slice(0, 16) + "_" + hashCode(phoneNumber).toString() + "_" + i.toString() + path.extname(props.oldAnswers.photoFileList[i].name)
            if (file !== undefined) {
                formData.append("upload-image", file, fileName)
            }
            await axios.post('https://image.floev.com/upload', formData, {
                headers: { "content-type": "multipart/form-data" }
            }).then(res => {
                console.log(res.status)
            }).catch(err => {
                console.error(err)
            })
        }
    }
    function handleClick() {
        submitPhoto()
        makeSurveyPurchaseRequest()
    }

    return (<>
        <div className="q-wrap q13">
            <div className="q-wrap__question-main">인증을 통해 예약을 확정해주세요.</div>

            <div className="q-wrap__answer-wrap">

                {/* 이름 입력 */}
                <input className="q-wrap__input-text" type="text" placeholder={'이름 입력'} maxLength={10} onChange={e => handleChangeName(e)} />
                {/* 휴대전화번호 입력 */}
                <input className="q-wrap__input-text" type="tel" placeholder={'휴대폰 번호 입력 (  \'-\' 없이 숫자만 )'} maxLength={11} onChange={e => handleChangePhoneNumber(e)} />
                {!isSentAuth ?
                    // 인증번호 보내기 전
                    isPhoneNumber ?
                        (<button className="btn-num" onClick={() => requestAuthNumber()}>인증번호전송</button>) :
                        (<button className="btn-num">인증번호전송</button>) :
                    // 인증번호 보낸 후
                    (<div className="input-text-num">
                        <input className="q-wrap__input-text" type="text" placeholder={'인증번호 4자리'} value={authNumber} onChange={e => handleChangeAuthNumber(e)} maxLength={4} />
                        {isAuthenticated ?
                            (<button className="btn-resend" onClick={() => requestAuthNumber()}>재전송</button>) :
                            (<button className="btn-resend">재전송</button>)}

                        {leftSecond <= 180 ?
                            <div className="left-time">{parseSecondToMinute(leftSecond)}</div> :
                            leftSecond === 181 ?
                                <div className="left-done">만료</div> :
                                leftSecond === 182 ?
                                    <span className="time"></span> :
                                    <div className="txtWarning">인증번호가 일치하지 않습니다. 다시 확인해주세요.</div>}
                    </div>)
                } {isError && (<div className="txtWarning">인증번호가 일치하지 않습니다. 다시 확인해주세요.</div>)}

            </div>


            <div className="q-wrap__btn-wrap">
                <button className="q-wrap__btn q-wrap__btn-prev" type="button" disabled={props.currentStep !== props.max ? false : true} onClick={() => props.onPrev()}>이전</button>
                {authNumber.length !== 4 || !isActive ?
                    (<button className="q-wrap__btn q-wrap__btn-next q-wrap__btn-next--disabled"><span>인증하고 예약완료하기</span> <img src="static/img/survey/ic-arrows-right.png" alt="" /></button>) :
                    (!loading ?
                        (<button className="q-wrap__btn q-wrap__btn-next" type={'submit'}
                            onClick={() => handleClick()}><span>인증하고 예약완료하기</span> <img src="static/img/survey/ic-arrows-right.png" alt="" /></button>) :
                        (<Spin size="large" tip="잠시만 기다려주세요.." />))
                }
            </div>

        </div>
    </>)

}
