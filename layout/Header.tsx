export default function Header() {
  return (
<header className="header">
      <div className="header__inner">
        <div className="header__logo"><a href="/"><img src="/static/img/newLanding/fv_logo_bk.svg" alt="" /></a></div>
        <nav className="header__nav">
          <span><a href="/lounge/yeoksam">라운지 역삼성당</a></span>
          <span><a href="/lounge/gangnam">라운지 강남</a></span>
          <span><a href="/brand">플로브 추천 안경</a></span>
          <span><a href="/service-policy">서비스 정책 안내</a></span>
          <span><a href="https://www.instagram.com/floev_official/" target="_blank"><img src="/static/img/newLanding/i_insta.svg" alt="" /></a></span>
        </nav>
      </div>
      <div className="global1280">
        <div className="kakaoLinkWrap">
          <div id="plusfriend-chat-button" className="kakaoBtn">
            <img src="/static/img/newLanding/kakao.png" alt="" />
          </div>
        </div>
      </div>
</header>

  )
}
