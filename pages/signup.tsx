import Layout from '../layout/DefaultLayout'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { gql, useMutation } from '@apollo/client'
import cookie from 'cookie'
import { GetServerSideProps } from 'next'
import { createApolloClient } from '../lib/apolloClient'

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
const CHECKUP_USER = gql`
	query checkUpUser{
		checkUpUser{
			name
		}
	}
`

const SignUp = ({
    user
}: {
    user: any
}) => {
    const router = useRouter();

    //email
    const [email, setEmail] = useState('');
    const [isEmail, setIsEmail] = useState(true)
    const [emailState, setEmailState] = useState(0) // 0: 초기상태, 1: 불가능, 2: 가능, 3: focusing된 상태
    const [dupEmail, setDupEmail] = useState(0) // 0: 초기상태, 1: 중복됨, 2: 중복안됨
    const [checkEmailDup] = useMutation(CHECK_EMAIL_DUP, {
        onCompleted(data: any) {
            const dupResult: boolean = data.checkEmailDup
            if (dupResult) { // true: 중복유저 있음
                setDupEmail(1)
                // 훗날 로그인페이지로 이동하겠냐는 alert 창 띄우고 이동 버튼 만들기

            } else { // false: 중복유저 없음
                setDupEmail(2)
            }
        },
    })
    // password
    const [password, setPassword] = useState('');
    const [isPassword, setIsPassword] = useState(true);
    const [passwordState, setPasswordState] = useState(0) // 0: 초기상태, 1: 불가능, 2: 가능, 3: focusing된 상태
    const [showPassword, setShowPassword] = useState(false);

    // name
    const [name, setName] = useState('');
    const [isName, setIsName] = useState(true);
    const [nameState, setNameState] = useState(0) // 0: 초기상태, 1: 불가능, 2: 가능, 3: focusing된 상태 

    // phoneNumber
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isPhoneNumber, setIsPhoneNumber] = useState(true);
    const [phoneNumberState, setPhoneNumberState] = useState(0);

    const [signUpUser] = useMutation(SIGN_UP_USER, {
        variables: {
            email: email, password: password, name: name, phoneNumber: phoneNumber
        },
        onCompleted(data: any) {
            if (data) {
                const token = data.signUpUser.token
                document.cookie = cookie.serialize("token", token, {
                    maxAge: 12 * 60 * 60
                })
                window.analytics.identify({
                    email: email,
                    name: name
                });
                router.push('/')
            }
        }
    });

    useEffect(() => {
        if (user) {
            router.push('/')
        }
    }, [user])

    const handleFocusEmail = () => {
        setIsEmail(true)
        setEmailState(3)
        setDupEmail(0)
    }
    const handleBlurEmail = () => {
        if (email.length === 0) {
            setIsEmail(false)
            setEmailState(1)
            return
        }
        // validate email
        const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

        if (!regExp.test(email)) {
            setEmailState(1)
        } else {
            setEmailState(2)
        }
    }

    const emailInputIcon = () => {
        let icon
        if (emailState === 0) {
            icon = <span className="input-box__ico-check"></span>
        } else if (emailState === 1) {
            icon = <span className="input-box__ico-check input-box__ico-check--err"></span>
        } else if (emailState === 2) {
            if (dupEmail < 2) {
                icon = <span className="input-box__ico-check input-box__ico-check--err"></span>
            } else {
                icon = <span className="input-box__ico-check input-box__ico-check--done"></span>
            }
        }
        // else if (emailState === 3) {
        //     icon = <span className="input-box__btn-erase" onClick={() => setEmail('')}>X</span>
        // }
        return icon
    }

    const emailDupButton = () => {
        let button

        if (dupEmail < 2) {
            if (emailState !== 2) {
                button = <span className="input-box__btn-ckeck-double">중복확인</span> // 비활성화
            } else {
                button = <span className="input-box__btn-ckeck-double" onClick={() => checkEmailDup({ variables: { email: email } })}>중복확인</span>
            }
        } else if (dupEmail === 2 && emailState === 2) {
            button = <span className="input-box__btn-ckeck-double input-box__btn-ckeck-double--done">확인완료</span>
        }
        return button
    }

    const emailInputMessage = () => {
        let message

        if (!isEmail) {
            message = <span className="input-box__msg input-box__msg--err">이메일을 입력해주세요.</span>
        } else if (emailState === 1) {
            message = <span className="input-box__msg input-box__msg--err">이메일 형식에 맞게 입력해주세요.</span>
        } else if (emailState === 2) {
            if (dupEmail === 0) {
                message = <span className="input-box__msg input-box__msg--err">이메일 중복여부를 확인해주세요.</span>
            } else if (dupEmail === 1) {
                message = <span className="input-box__msg input-box__msg--err">이미 사용 중인 이메일입니다.</span>
            } else if (dupEmail === 2) {
                message = <span className="input-box__msg">사용할 수 있는 이메일입니다.</span>
            }
        }
        return message
    }

    const handleFocusPassword = () => {
        setIsPassword(true)
        setPasswordState(3)
    }

    const handleBlurPassword = () => {
        if (password.length === 0) {
            setIsPassword(false)
        }
        // validate password
        if (password.length >= 8 && password.length < 25) {
            setPasswordState(2) // 정상
        } else {
            setPasswordState(1) // 비정상
        }
    }

    const passwordInputIcon = () => {
        let icon
        if (passwordState === 0) {
            icon = <span className="input-box__ico-check"></span>
        } else if (passwordState === 1) {
            icon = <span className="input-box__ico-check input-box__ico-check--err"></span>
        } else if (passwordState === 2) {
            icon = <span className="input-box__ico-check input-box__ico-check--done"></span>
        }
        // else if (passwordState === 3) {
        //     icon = <span className="input-box__btn-erase" onClick={() => setPassword('')}>X</span>
        // }
        return icon
    }

    const passwordInputMessage = () => {
        let message
        if (!isPassword) {
            message = <span className="input-box__msg input-box__msg--err">비밀번호를 입력해주세요.</span>
        } else if (passwordState === 1) {
            message = <span className="input-box__msg input-box__msg--err">8자리 이상 24자리 이하로 입력해주세요</span>
        }
        return message
    }

    const handleFocusName = () => {
        setIsName(true)
        setNameState(3)
    }

    const handleBlurName = () => {
        if (name.length === 0) {
            setIsName(false)
            setNameState(1)
        } else {
            setNameState(2)
        }
    }

    const nameInputIcon = () => {
        let icon
        if (nameState === 0) {
            icon = <span className="input-box__ico-check"></span>
        } else if (nameState === 1) {
            icon = <span className="input-box__ico-check input-box__ico-check--err"></span>
        } else if (nameState === 2) {
            icon = <span className="input-box__ico-check input-box__ico-check--done"></span>
        }
        // else if (nameState === 3) {
        //     icon = <span className="input-box__btn-erase" onClick={() => setName('')}>X</span>
        // }
        return icon
    }

    const handleFocusPhoneNumber = () => {
        setIsPhoneNumber(true)
        setPhoneNumberState(3)
    }

    const handleBlurPhoneNumber = () => {
        if (phoneNumber.length === 0) {
            setIsPhoneNumber(false)
            setPhoneNumberState(1)
            return
        }
        // validate email
        const regExp = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]{3,4})([0-9]{4})/g

        if (!regExp.test(phoneNumber)) {
            setPhoneNumberState(1)
        } else {
            setPhoneNumberState(2)
        }
    }

    const phoneNumberInputIcon = () => {
        let icon
        if (phoneNumberState === 0) {
            icon = <span className="input-box__ico-check"></span>
        } else if (phoneNumberState === 1) {
            icon = <span className="input-box__ico-check input-box__ico-check--err"></span>
        } else if (phoneNumberState === 2) {
            icon = <span className="input-box__ico-check input-box__ico-check--done"></span>
        }
        // else if (nameState === 3) {
        //     icon = <span className="input-box__btn-erase" onClick={() => setPhoneNumber('')}>X</span>
        // }
        return icon
    }

    const phoneNumberInputMessage = () => {
        let message
        if (!isPhoneNumber) {
            message = <span className="input-box__msg input-box__msg--err">휴대전화번호를 입력해주세요.</span>
        } else if (phoneNumberState === 1) {
            message = <span className="input-box__msg input-box__msg--err">휴대전화번호를 양식에 맞게 입력해주세요.</span>
        }
        return message
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        let isMutate: boolean = true

        if (email.length === 0) {
            setIsEmail(false)
            isMutate = false
        } else if (dupEmail < 2) {
            isMutate = false
        }
        if (password.length === 0) {
            setIsPassword(false)
            isMutate = false
        }
        if (name.length === 0) {
            setIsName(false)
            isMutate = false
        }
        if (phoneNumber.length === 0) {
            setIsPhoneNumber(false)
            isMutate = false
        }
        if (isMutate) {
            signUpUser();
        }
    }

    return (
        <>
            <Layout title="플로브 - 나의 눈을 위한 안경 큐레이션 서비스">
                <div className="signupPage">
                    <div className="signup">
                        <h2 className="signup__title">회원가입</h2>
                        <div className="signup__form">

                            <form onSubmit={(e) => handleSubmit(e)}>

                                {/* 이메일 입력 */}
                                <div className="input-box">
                                    <input className={!isEmail || dupEmail === 1 ? `input-box__input input-box__input--err` : `input-box__input`} value={email}
                                        onFocus={() => handleFocusEmail()}
                                        onBlur={() => handleBlurEmail()}
                                        onChange={e => setEmail(e.target.value)}
                                        type="text" placeholder="이메일 입력" id="input-label--email"
                                        tabIndex={1}
                                    />
                                    <label className="input-box__label" htmlFor="input-label--email">이메일</label>
                                    <div className="input-box__btn-wrap">
                                        {emailInputIcon()}
                                        {emailDupButton()}
                                    </div>
                                    <div className="input-box__msg-wrap">
                                        {emailInputMessage()}
                                    </div>
                                </div>


                                {/* 비밀번호 입력 */}
                                <div className="input-box">
                                    <input className={!isPassword || passwordState === 1 ? `input-box__input input-box__input--err` : `input-box__input`} value={password}
                                        onFocus={() => handleFocusPassword()}
                                        onBlur={() => handleBlurPassword()}
                                        onChange={e => setPassword(e.target.value)}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="8자리 이상"
                                        id="input-label--pw"
                                        tabIndex={2}
                                    />
                                    <label className="input-box__label" htmlFor="input-label--pw">비밀번호</label>
                                    <div className="input-box__btn-wrap">
                                        {passwordInputIcon()}
                                        {password.length > 0 && (
                                            <span className="input-box__btn-display" onClick={() => setShowPassword(!showPassword)}>{showPassword ? `가리기` : `표시`}</span>
                                        )}
                                    </div>
                                    <div className="input-box__msg-wrap">
                                        {passwordInputMessage()}
                                    </div>
                                </div>


                                {/* 이름 입력 */}
                                <div className="input-box">
                                    <input className={!isName ? `input-box__input input-box__input--err` : `input-box__input`} value={name}
                                        onFocus={() => handleFocusName()}
                                        onBlur={() => handleBlurName()}
                                        onChange={e => setName(e.target.value)}
                                        type="text" placeholder="이름 입력" id="input-label--name"
                                        tabIndex={3}
                                    />
                                    <label className="input-box__label" htmlFor="input-label--name">이름</label>
                                    <div className="input-box__btn-wrap">
                                        {nameInputIcon()}
                                    </div>
                                    <div className="input-box__msg-wrap">
                                        {!isName && (<span className="input-box__msg input-box__msg--err">이름을 입력해주세요.</span>)}
                                    </div>
                                </div>



                                {/* 휴대전화 입력 */}
                                <div className="input-box">
                                    <input
                                        className={!isPhoneNumber ? `input-box__input input-box__input--err` : `input-box__input`} value={phoneNumber}
                                        onFocus={() => handleFocusPhoneNumber()}
                                        onBlur={() => handleBlurPhoneNumber()}
                                        onChange={e => setPhoneNumber(e.target.value)}
                                        type="text"
                                        placeholder="ex) 01012341234"
                                        id="input-label--phone"
                                        tabIndex={4}
                                    />
                                    <label className="input-box__label" htmlFor="input-label--phone">휴대전화</label>
                                    <div className="input-box__btn-wrap">
                                        {phoneNumberInputIcon()}
                                    </div>
                                    <div className="input-box__msg-wrap">
                                        {phoneNumberInputMessage()}
                                    </div>
                                </div>

                                <div className="signup__btn--submit">
                                    <button type="submit" tabIndex={5}>회원가입하기</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => { //{ req }: { req: any }
    const client = createApolloClient(context)
    const { user } = await client.query({ query: CHECKUP_USER })
        .then(({ data }) => {
            return { user: data.checkUpUser };
        })
        .catch((error) => {
            console.error(error.message)
            // Fail gracefully
            return { user: null };
        });

    return {
        props: {
            // this hydrates the clientside Apollo cache in the `withApollo` HOC
            apolloStaticCache: client.cache.extract(),
            user
        },
    }
}

export default SignUp
