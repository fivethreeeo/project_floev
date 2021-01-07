import Layout from '../layout/DefaultLayout'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { gql, useMutation } from '@apollo/client'

const SIGN_UP_USER = gql`
  mutation signUpUser($email: String!, $password: String!, $name: String!, $phoneNumber: String!) {
    signUpUser(email: $email, password: $password, name: $name, phoneNumber: $phoneNumber) {
      token
      user{
          name
          email
      }
    }
  }
`
const CHECK_EMAIL_DUP = gql`
  mutation checkEmailDup($email: String!){
    checkEmailDup(email: $email)
  }
`

const SignUp = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [isEmail, setIsEmail] = useState(false)
    const [password, setPassword] = useState('');
    const [isPassword, setIsPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isPhoneNumber, setIsPhoneNumber] = useState(false);
    const [checkEmailDup] = useMutation(CHECK_EMAIL_DUP, {
        onCompleted(data: any) {
            console.log("data.checkEmailDup: " + JSON.stringify(data.checkEmailDup))
        }
    })
    const [signUpUser] = useMutation(SIGN_UP_USER, {
        onCompleted() {
            router.push('/')
        }
    });

    useEffect(() => {
        const tempToken = window.localStorage.getItem('token')
        if (tempToken !== null) {
            router.push('/')
        }
    })

    const validateEmail = (asValue: string) => {
        const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
    }

    const handleEmail = (e: any) => {
        const tempEmail: string = e.target.value
        setEmail(tempEmail)
        if (validateEmail(tempEmail)) {
            setIsEmail(true)
        }
    }
    const validatePassword = (asValue: string) => {
        // var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,24}$/; //  8 ~ 10자 영문, 숫자 조합
        // return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
        if (asValue.length >= 6 && asValue.length < 25) {
            return true
        }
        return false
    }

    const handlePassword = (e: any) => {
        const tempPassword: string = e.target.value
        setPassword(tempPassword)
        if (validatePassword(tempPassword)) {
            setIsPassword(true)
        }
    }

    const validatePhoneNumber = (asValue: string) => {
        const regExp = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]{3,4})([0-9]{4})/g
        return regExp.test(asValue);
    }

    const handlePhoneNumber = (e: any) => {
        const tempPhoneNumber: string = e.target.value
        setPhoneNumber(e.target.value)
        if (validatePhoneNumber(tempPhoneNumber)) {
            setIsPhoneNumber(true)
        }
    }

    return (
        <>
            <Layout title="플로브 - 나의 눈을 위한 안경 큐레이션 서비스">
                <div className="signupPage">
                    <div className="signup">
                        <h2 className="signup__title">회원가입</h2>
                        <div className="signup_form">
                            <form action="">

                                {/* ----------------- 이메일 입력 ------------------ */}
                                <div className="input-box">
                                    <input 
                                        className="input-box__input"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        type="text"
                                        placeholder="이메일 입력"
                                        id="input-label--email"
                                        tabIndex={1}
                                    />
                                    <label className="input-box__label" htmlFor="input-label--email">이메일</label>
                                    <div className="input-box__btn-wrap">
                                        <span className="input-box__btn-erase" onClick={() => setEmail('')}>X</span>
                                        <span className="input-box__ico-check">v</span>
                                        {/*<span className="input-box__ico-check input-box__ico-check--done">v</span>*/}
                                        {/*<span className="input-box__ico-check input-box__ico-check--err">v</span>*/}
                                        <span className="input-box__btn-ckeck-double" onClick={() => checkEmailDup({ variables: { email: email } })}>중복확인</span>
                                        {/*<span className="input-box__btn-ckeck-double input-box__btn-ckeck-double--done">확인완료</span>*/}
                                    </div>
                                    <div className="input-box__msg-wrap">
                                        <span className="input-box__msg input-box__msg--err">이메일을 입력해주세요.</span>
                                        {/*<span className="input-box__msg input-box__msg--err">이메일 형식에 맞게 입력해주세요.</span>*/}
                                        {/*<span className="input-box__msg input-box__msg--err">이메일 중복여부를 확인해주세요.</span>*/}
                                        {/*<span className="input-box__msg input-box__msg--err">이미 사용 중인 이메일입니다.</span>*/}
                                        {/*<span className="input-box__msg">사용할 수 있는 이메일입니다.</span>*/}
                                    </div>
                                </div>

                                {/* ----------------- 비밀번호 입력 ------------------ */}
                                <div className="input-box">
                                    <input
                                        className="input-box__input"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        onFocus={() => setIsPassword(true)}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="8자리 이상"
                                        id="input-label--pw"
                                        tabIndex={2}
                                    />
                                    <label className="input-box__label" htmlFor="input-label--pw">비밀번호</label>
                                    <div className="input-box__btn-wrap">
                                        <span className="input-box__ico-check">v</span>
                                        {/*<span className="input-box__ico-check input-box__ico-check--done">v</span>*/}
                                        {/*<span className="input-box__ico-check input-box__ico-check--err">v</span>*/}
                                        {password.length > 0 && (
                                            <>
                                                <span className="input-box__btn-erase" onClick={() => setPassword('')}>X</span>
                                                <span className="input-box__btn-display" onClick={() => setShowPassword(!showPassword)}>{showPassword ? `가리기` : `표시`}</span>
                                            </>
                                        )}
                                    </div>
                                    <div className="input-box__msg-wrap">
                                        <span className="input-box__msg input-box__msg--err">비밀번호를 입력해주세요.</span>
                                        {/*<span className="input-box__msg input-box__msg--err">8자리 이상 영문, 숫자를 조합해주세요.</span>*/}
                                    </div>
                                </div>

                                {/* ----------------- 이름 입력 ------------------ */}
                                <div className="input-box">
                                    <input
                                        className="input-box__input"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        type="text"
                                        placeholder="이름 입력"
                                        id="input-label--name"
                                        tabIndex={3}
                                    />
                                    <label className="input-box__label" htmlFor="input-label--name">이름</label>
                                    <div className="input-box__btn-wrap">
                                        <span className="input-box__ico-check">v</span>
                                        {/*<span className="input-box__ico-check input-box__ico-check--done">v</span>*/}
                                        {/*<span className="input-box__ico-check input-box__ico-check--err">v</span>*/}
                                        {name.length > 0 && (
                                            <>
                                                <span className="input-box__btn-erase" onClick={() => setName('')}>X</span>
                                            </>
                                        )}
                                    </div>
                                    <div className="input-box__msg-wrap">
                                        <span className="input-box__msg input-box__msg--err">이름을 입력해주세요.</span>
                                    </div>
                                </div>

                                {/* ----------------- 휴대전화 입력 ------------------ */}
                                <div className="input-box">
                                    <input
                                        className="input-box__input"
                                        value={phoneNumber}
                                        onChange={e => setPhoneNumber(e.target.value)}
                                        type="text"
                                        placeholder="01012341234"
                                        id="input-label--phone"
                                        tabIndex={4}
                                    />
                                    <label className="input-box__label" htmlFor="input-label--phone">휴대전화</label>
                                    <div className="input-box__btn-wrap">
                                        <span className="input-box__ico-check">v</span>
                                        {/*<span className="input-box__ico-check input-box__ico-check--done">v</span>*/}
                                        {/*<span className="input-box__ico-check input-box__ico-check--err">v</span>*/}
                                        {phoneNumber.length > 0 && (
                                            <>
                                                <span className="input-box__btn-erase" onClick={() => setPhoneNumber('')}>X</span>
                                            </>
                                        )}
                                    </div>
                                    <div className="input-box__msg-wrap">
                                        <span className="input-box__msg input-box__msg--err">휴대전화번호를 입력해주세요.</span>
                                        {/*<span className="input-box__msg input-box__msg--err">휴대전화번호 11자리를 정확히 입력해주세요.</span>*/}
                                    </div>
                                </div>

                                <div className="signup__btn--submit">
                                    <button className="btn--disabled" disabled>회원가입</button>
                                    {/*<button
                                        onClick={() => signUpUser({
                                            variables: {
                                                email: email, password: password, name: name, phoneNumber: phoneNumber
                                            }
                                        })}
                                    >
                                    회원가입
                                    </button>*/}
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}

export default SignUp
