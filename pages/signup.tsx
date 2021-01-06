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
            <p>회원가입</p>
            <input
                value={email}
                onChange={e => handleEmail(e)}
                type="text"
                placeholder="이메일을 입력해주세요." // Front 단에서 validation, 중복확인
                required
            /><button type="button"
                onClick={() => checkEmailDup({ variables: { email: email } })}
            > 중복확인</button>
            <br />
            <input
                value={password}
                onChange={e => handlePassword(e)}
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요." // 안 보이게 하기
                required
            /><button onClick={() => setShowPassword(!showPassword)}>{showPassword ? `가리기` : `표시`}</button><br />
            <input
                value={name}
                onChange={e => setName(e.target.value)}
                type="text"
                placeholder="이름을 입력해주세요."
                required
            /><br />
            <input
                value={phoneNumber}
                onChange={(e) => handlePhoneNumber(e)}
                type="text"
                placeholder="휴대전화를 입력해주세요." // 휴대전화 인증
                required
            /><br />
            <button type="button"
                onClick={() => signUpUser({
                    variables: {
                        email: email, password: password, name: name, phoneNumber: phoneNumber
                    }
                })}
            > 회원가입
      </button>
        </>
    )
}

export default SignUp
