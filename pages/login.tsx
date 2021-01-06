import React from 'react'
import Layout from '../layout/DefaultLayout'

const LoginPage = () => {

	return (
		<Layout title="플로브 - 나의 눈을 위한 안경 큐레이션 서비스">
			<div className="loginPage">
				<div className="login">
					<h2 className="login__title">로그인</h2>
					<div className="login__form">

						<form action="">

							<div className="input-box">
								<input className="input-box__input" type="text" placeholder="이메일"/>
								<div className="input-box__btn-wrap">
									<button className="input-box__btn-erase">x</button>
								</div>
								<div className="input-box__msg-wrap">
									<div className="input-box__msg input-box__msg--err">이메일을 입력해주세요.</div>
								</div>
							</div>

							<div className="input-box">
								<input className="input-box__input" type="password" placeholder="비밀번호"/>
								<div className="input-box__btn-wrap">
									<button className="input-box__btn-erase">x</button>
									<button className="input-box__btn-display">표시</button>
								</div>
								<div className="input-box__msg-wrap">
									<div className="input-box__msg input-box__msg--err">비밀번호를 입력해주세요.</div>
								</div>
							</div>

							<div className="login__btn--submit">
								<button>로그인</button>
							</div>

							<div className="login__msg-wrap">
								<div className="login__msg login__msg--err">계정정보가 일치하지 않습니다.</div>
							</div>
						</form>
					</div>
					<div className="login__link">
						<span>아직, 플로브 계정이 없으신가요?</span>
						<a href="/signup">회원가입하기</a>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default LoginPage