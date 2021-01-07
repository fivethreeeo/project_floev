import Layout from '../layout/DefaultLayout'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { gql, useMutation } from '@apollo/client'
import Link from 'next/link'
import cookie from 'cookie'

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
	const [isSignedUp, setIsSignedUp] = useState(true)
	const [password, setPassword] = useState('');
	const [isPassword, setIsPassword] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [validPassword, setValidPassword] = useState(true)
	const [signInUser] = useMutation(SIGN_IN_USER, {
		variables: {
			email: email, password: password
		},
		onCompleted(data) {
			if (data) {
				const token = data.signInUser.token
				console.log('token in completed: ' + token)
				document.cookie = cookie.serialize("token", token, {
					maxAge: 12 * 60 * 60
				})
				window.analytics.identify({
					email: email,
				});
				router.push('/')
			}
		},
		onError(error) {
			// 유저가 없을 때
			if (error.message === "No User") {
				setIsSignedUp(false)
			}// 비밀번호가 일치하지 않을 때
			else if (error.message === "Not valid password") {
				setValidPassword(false)
			}
		}
	});

	// useEffect(() => {
	// 	const tempCookie = cookie.parse(document.cookie)
	// 	if (tempCookie !== null) {
	// 		if (tempCookie.token !== '') {
	// 			router.push('/')
	// 		}
	// 	}
	// })

	return (
		<Layout title="플로브 - 나의 눈을 위한 안경 큐레이션 서비스">
			<div className="loginPage">
				<div className="login">
					<h2 className="login__title">로그인</h2>
					<div className="login__form">

						<form onSubmit={(e) => {
							e.preventDefault();
							let isMutate: boolean = true

							if (email.length === 0) {
								setIsEmail(false)
								isMutate = false
							}
							if (password.length === 0) {
								setIsPassword(false)
								isMutate = false
							}
							if (isMutate) {
								signInUser();
							}
						}}>
							<div className="input-box">
								<input className={!isEmail ? `input-box__input input-box__input--err` : `input-box__input`} type="text" placeholder="이메일" value={email} onFocus={() => setIsEmail(true)} onChange={e => setEmail(e.target.value)} tabIndex={1} />
								<div className="input-box__btn-wrap">
									{email.length > 0 && (
										<span className="input-box__btn-erase" onClick={() => setEmail('')}>X</span>
									)}
								</div>

								<div className="input-box__msg-wrap">
									{!isEmail && (
										<span className="input-box__msg input-box__msg--err">이메일을 입력해주세요.</span>
									)}
								</div>
							</div>

							<div className="input-box">
								<input className={!isPassword ? `input-box__input input-box__input--err` : `input-box__input`}
									type={showPassword ? "text" : "password"} placeholder="비밀번호"
									value={password} onFocus={() => setIsPassword(true)} onChange={e => setPassword(e.target.value)} tabIndex={2} />
								<div className="input-box__btn-wrap">
									{!isPassword && (
										<>
											<span className="input-box__btn-erase" onClick={() => setPassword('')}>X</span>
											<span className="input-box__btn-display" onClick={() => setShowPassword(!showPassword)}>{showPassword ? `가리기` : `표시`}</span>
										</>
									)}
								</div>
								<div className="input-box__msg-wrap">
									{!isPassword && (
										<span className="input-box__msg input-box__msg--err">비밀번호를 입력해주세요.</span>
									)}
								</div>
							</div>

							<div className="login__btn--submit">
								<button type="submit" tabIndex={3}>로그인</button>
								{(isEmail && email.length > 0) && (isPassword && password.length > 0) ? (<button type="submit">로그인</button>) : (
									<button className="disabled" disabled>로그인</button>
								)}
							</div>
							<div className="login__msg-wrap">
								{!isSignedUp ? (
									<div className="login__msg login__msg--err">등록되지 않은 이메일입니다.</div>) : (!validPassword ? (<div className="login__msg login__msg--err">비밀번호가 일치하지 않습니다.</div>) : (''))
								}
							</div>

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