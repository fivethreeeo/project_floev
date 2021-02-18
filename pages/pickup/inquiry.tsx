import React, { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import Layout from '../../layout/DefaultLayout'
import cookie from 'cookie'
import axios from 'axios'
import { GetServerSideProps } from "next"
import { createApolloClient } from "../../lib/apolloClient"
import { SIGN_IN_WITH_PHONENUMBER } from "../../lib/mutation"
import { CHECKUP_USER } from "../../lib/query"
import redirect from '../../lib/redirect'
import { useMutation } from "@apollo/client"
import { Spin } from "antd"
// import { NormalizedCache } from "@apollo/client"

const Inquiry = () => {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [isPhoneNumber, setIsPhoneNumber] = useState<boolean>(false)
    const [authNumber, setAuthNumber] = useState<string>('')
    const [isSentAuth, setIsSentAuth] = useState<boolean>(false)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [leftSecond, setLeftSecond] = useState<number>(180)
    const [isActive, setIsActive] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)

    const [signInWithPhoneNumber, { loading }] = useMutation(SIGN_IN_WITH_PHONENUMBER, {
        variables: { phoneNumber: phoneNumber, authNumber: authNumber },
        onCompleted(data: any) {
            if (data) {
                document.cookie = cookie.serialize("token", data.signInWithPhoneNumber.token, {
                    maxAge: 12 * 60 * 60
                })
                router.replace('/pickup')
            }
        },
        onError(error) {
            console.error(error.message)
            setIsError(true)
            setAuthNumber('')
            setIsActive(false)
            if (error.message === "No User in signInWithPhoneNumber") {
                alert('등록되지 않은 사용자에요! 설문 진행을 통해 서비스를 예약해주세요!')
            } else if (error.message === "Not valid authnumber in signInWithPhoneNumber") {
                alert('인증번호가 유효하지 않습니다. 다시 시도해주세요.')
            }
        }
    });

    function handleChangePhoneNumber(e: any) {
        const newPhoneNumber: string = e.target.value

        if (validatePhoneNumber(newPhoneNumber)) {
            setPhoneNumber(newPhoneNumber)
            setIsPhoneNumber(true)
        } else {
            setIsPhoneNumber(false)
        }
    }

    function handleChangeAuthNumber(e: any) {
        const newAuthNumber = e.target.value
        setAuthNumber(newAuthNumber)
        setIsError(false) // 인증번호를 입력하는 중이니 에러메시지를 없애야겠지
    }

    function validatePhoneNumber(numberString: string) {
        const regex = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]{3,4})([0-9]{4})/g
        return regex.test(numberString)
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
        setIsAuthenticated(true)
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

    return (
        <Layout title="플로브 - 나의 눈을 위한 안경 큐레이션 서비스">
            <div className="mypage-inquiry">
                <div className="q-wrap q13">
                    <div className="q-wrap__question-main">픽업예약조회</div>
                    <div className="q-wrap__question-sub">예약시 입력하신 휴대폰 번호를 입력해주세요.</div>
                    <div className="q-wrap__answer-wrap">

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
                        {authNumber.length !== 4 || !isActive ?
                            (<button className="q-wrap__btn q-wrap__btn-next q-wrap__btn-next--disabled"><span>인증하고 예약 조회하기</span></button>) :
                            (!loading ?
                                (<button className="q-wrap__btn q-wrap__btn-next" type='submit'
                                    onClick={() => signInWithPhoneNumber()}><span>인증하고 예약조회하기</span></button>) :
                                (<Spin size="large" tip="잠시만 기다려주세요.." />))
                        }
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const client = createApolloClient(context)
    const { user } = await client.query({ query: CHECKUP_USER })
        .then(({ data }) => {
            return { user: data.checkUpUser };
        }).catch(() => {
            return { user: null };
        });
    if (user !== null) {
        redirect(context, "/pickup")
    }
    return { props: {} }
}

export default Inquiry