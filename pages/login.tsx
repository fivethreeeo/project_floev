import Layout from '../layout/DefaultLayout'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { gql, useMutation } from '@apollo/client'
import Link from 'next/link'

const SIGN_IN_USER = gql`
  mutation signInUser($email: String!, $password: String!) {
    signInUser(email: $email, password: $password) {
      token
      user{
          name
          email
      }
    }
  }
`

const LoginPage = () => {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [isEmail, setIsEmail] = useState(true)
	const [password, setPassword] = useState('');
	const [isPassword, setIsPassword] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [valid, setValid] = useState(true)
	const [signInUser] = useMutation(SIGN_IN_USER, {
		variables: {
			email: email, password: password
		},
		onCompleted(data) {
			if (data) {
				const token = data.signInUser.token
				console.log('token in completed: ' + token)
				// document.cookie = cookie.serialize("token", token, {
				//     maxAge: 12 * 60 * 60
				// })
				window.localStorage.setItem('token', token)
				router.push('/')
			}
		},
		onError(error) {
			// 유저가 없을 때, 비밀번호가 일치하지 않을 때 -> '유효하지 않은 계정 정보임'
			setValid(false)
			setPassword('')
			setIsPassword(false)
			// console.error('error : ' + error.message)
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

	const handleChangeEmail = (e: any) => {
		const tempEmail: string = e.target.value

		setEmail(tempEmail)
		if (validateEmail(tempEmail)) {
			setIsEmail(true)
		} else {
			setIsEmail(false)
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
		} else {
			setIsPassword(false)
		}
	}
	return (
		<Layout title="플로브 - 나의 눈을 위한 안경 큐레이션 서비스">
			<div className="loginPage">
				<div className="login">
					<h2 className="login__title">로그인</h2>
					<div className="login__form">

						<form onSubmit={(e) => {
							e.preventDefault();
							signInUser();
							window.analytics.identify({
								email: email,
							});
						}}>
							<div className="input-box">
								<input className="input-box__input" type="text" placeholder="이메일" value={email} onChange={e => handleChangeEmail(e)} required />
								<div className="input-box__btn-wrap">
									<button className="input-box__btn-erase" onClick={() => setEmail('')}>X</button>
								</div>
								{!isEmail && (
									<div className="input-box__msg-wrap">
										<span className="input-box__msg input-box__msg--err">유효하지 않은 이메일입니다.</span>
									</div>)}
							</div>

							<div className="input-box">
								<input className="input-box__input"
									type={showPassword ? "text" : "password"} placeholder="비밀번호"
									value={password} onChange={e => handlePassword(e)} required />
								<div className="input-box__btn-wrap">
									<button className={!showPassword ? `input-box__btn-display` : `input-box__btn-erase`} onClick={() => setShowPassword(!showPassword)}>{showPassword ? `X` : `표시`}</button>
								</div>
								{!isPassword && (<div className="input-box__msg-wrap">
									<div className="input-box__msg input-box__msg--err">비밀번호는 6자 이상입니다.</div>
								</div>)}
							</div>

							<div className="login__btn--submit">
								{(isEmail && email.length > 0) && (isPassword && password.length > 0) ? (<button type="submit">로그인</button>) : (
									<button className="disabled" disabled>로그인</button>
								)}
							</div>
							{!valid && (
								<div className="login__msg-wrap">
									<div className="login__msg login__msg--err">계정정보가 일치하지 않습니다.</div>
								</div>
							)}

						</form>
					</div>
					<div className="login__link">
						<span>아직, 플로브 계정이 없으신가요?</span>
						<Link href="/signup">
							<a>회원가입하기</a>
						</Link>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default LoginPage