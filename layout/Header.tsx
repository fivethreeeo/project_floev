import { useRouter } from "next/router";

export default function Header({
	name,
	isBack = true
}: {
	name?: string
	isBack?: boolean
}) {
	const router = useRouter()
	const logout = () => {
		document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}

	return (
		<>
			<header className="header">
				<div className="header__inner">
					{isBack && (
						<div className="header__btn-back">

						</div>
					)}
					<div className="header__logo"><a href="/"><img src="/img/newLanding/fv_logo_bk.svg" alt="" /></a></div>
					<nav className="header__nav">
						<span><a href="/lounge/yeoksam">라운지 역삼성당</a></span>
						<span><a href="/lounge/gangnam">라운지 강남</a></span>
						<span><a href="/brand">플로브 추천 안경</a></span>
						<span><a href="/service-policy">서비스 정책 안내</a></span>
					</nav>
					<nav className="header__nav--sub">
						<span className="link-text link-text--mypage" onClick={() => router.push('/mypage')}><a>예약조회</a></span>
						{!name ? (
							<span className="link-text"><a href="/login">로그인/회원가입</a></span>) :
							<span className="link-text" onClick={() => logout()}><a href="/">로그아웃</a></span>}
						<span className="hr">|</span>
						<span className="link-ico"><a href="https://www.instagram.com/floev_official/" target="_blank"></a></span>
					</nav>
				</div>
			</header>
		</>
	)
}
