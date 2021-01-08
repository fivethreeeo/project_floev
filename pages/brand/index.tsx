import React from 'react'
import Layout from '../../layout/DefaultLayout'
import Router from 'next/router'

const BrandPage = () => {

    return (
        <Layout title="플로브 - 나의 눈을 위한 안경 큐레이션 서비스">
        <div className="global640"><div className="goBackBtnWrap"><div className="goBackBtn" onClick={() => Router.back()}></div></div></div>
        <div className="wrap">

        <div className="brandList">
            <div className="top">
              <p>플로브 추천 안경</p>
              <p>2년 이상 튼튼하게 사용할 수 있는 품질, 내 얼굴에 딱 맞춰 편하게 사용할 수 있는 구조적 견고함, 딱 봐도 끌리는 디자인을 가진 안경 브랜드를 플로브에서 만날 수 있어요.</p>
            </div>
            <div className="listWrap">
              <ul>
                <li><a href="/brand/01rl">
                  <div className="img"><img src="/static/img/brd/01rl-logo-small.jpg" alt=""/></div>
                  <div className="desc"><p>애쉬크로프트 &#xE001;</p><p>ASHCROFT</p><p>문화를 얼굴에 쓴다</p></div>
                  </a></li>
                <li><a href="/brand/01rm">
                  <div className="img"><img src="/static/img/brd/01rm-logo-small.jpg" alt=""/></div>
                  <div className="desc"><p>로우로우 &#xE001;</p><p>RAWROW</p><p>안경의 본질적인 쓰임새를 고민하다</p></div>
                </a></li>
                <li><a href="/brand/01fw">
                  <div className="img"><img src="/static/img/brd/01fw-logo-small.jpg" alt=""/></div>
                  <div className="desc"><p>아이반7285 &#xE001;</p><p>EVEVAN 7285</p><p>안경이 예술작품이 되기를 소망하다</p></div>
                </a></li>
                <li><a href="/brand/01gj">
                  <div className="img"><img src="/static/img/brd/01gj-logo-small.jpg" alt=""/></div>
                  <div className="desc"><p>IC베를린 &#xE001;</p><p>IC! BERLIN</p><p>독일산 제품에는 뭔가 특별한 설계가 들어있다</p></div>
                </a></li>
                <li><a href="/brand/01iy">
                  <div className="img"><img src="/static/img/brd/01iy-logo-small-1.jpg" alt=""/></div>
                  <div className="desc"><p>타르트 옵티컬 &#xE001;</p><p>TART OPTICAL</p><p>플라스틱 안경테를 유행시킨 안경 역사의 산증인</p></div>
                </a></li>
                <li><a href="/brand/01lash">
                  <div className="img"><img src="/static/img/brd/01lash-logo-small.jpg" alt=""/></div>
                  <div className="desc"><p>래쉬 &#xE001;</p><p>LASH</p><p>모든 감정을 함께하는 안경</p></div>
                </a></li>
                <li><a href="/brand/01odd">
                  <div className="img"><img src="/static/img/brd/01odd-logo-small.jpg" alt=""/></div>
                  <div className="desc"><p>오드아이웨어 &#xE001;</p><p>ODD-EYEWEAR</p><p>고객을 듣고 안경을 이야기한 안경사의 노하우</p></div>
                </a></li>
                <li><a href="/brand/01ik">
                  <div className="img"><img src="/static/img/brd/01ik-logo-small.jpg" alt=""/></div>
                  <div className="desc"><p>레이밴 &#xE001;</p><p>RAYBAN</p><p>‘라이방’ 선글라스로 세계인의 사랑을 받아온 안경명가</p></div>
                </a></li>
                <li><a href="/brand/01en">
                  <div className="img"><img src="/static/img/brd/01en-logo-small.jpg" alt=""/></div>
                  <div className="desc"><p>바이코즈 &#xE001;</p><p>VYCOZ</p><p>안경은 안경사가 제일 잘 만듭니다</p></div>
                </a></li>
                <li><a href="/brand/01re">
                  <div className="img"><img src="/static/img/brd/01re-logo-small.jpg" alt=""/></div>
                  <div className="desc"><p>드므앤 &#xE001;</p><p>DEUMEU&</p><p>눈가에 비친 모습이 맑고 투명하길 바라던 조상님의 마음으로</p></div>
                </a></li>
                <li><a href="/brand/01rb">
                  <div className="img"><img src="/static/img/brd/01rb-logo-small.jpg" alt=""/></div>
                  <div className="desc"><p>토니세임 &#xE001;</p><p>TONYSAME:</p><p>관상을 배려하면 훌륭한 안경을 만들 수 있어요</p></div>
                </a></li>
                <li><a href="/brand/01jj">
                  <div className="img"><img src="/static/img/brd/01jj-logo-small.jpg" alt=""/></div>
                  <div className="desc"><p>옐로우즈 플러스 &#xE001;</p><p>YELLOWS PLUS</p><p>정성 하나로 일궈낸 프리미엄 안경테</p></div>
                </a></li>
                <li><a href="/brand/01hx">
                  <div className="img"><img src="/static/img/brd/01hx-logo-small.jpg" alt=""/></div>
                  <div className="desc"><p>핸드메이드아이템 &#xE001;</p><p>HAND MADE ITEM</p><p>전통을 고집하는 수제안경명인의 손길</p></div>
                </a></li>
                <li><a href="/brand/01eh">
                  <div className="img"><img src="/static/img/brd/01eh-logo-small.jpg" alt=""/></div>
                  <div className="desc"><p>스테판 크리스티앙 &#xE001;</p><p>STEPHANE CHRISTIAN</p><p>프렌치 시크, 도시인이 누릴 수 있는 최상급 멋을 추구하다</p></div>
                </a></li>
                <li><a href="/brand/01rg">
                  <div className="img"><img src="/static/img/brd/01rg-logo-small.jpg" alt=""/></div>
                  <div className="desc"><p>스틸바움 &#xE001;</p><p>STEELBAUM</p><p>금속의 물성을 살린 강철의 안경술사</p></div>
                </a></li>
                <li><a href="/brand/01ff">
                  <div className="img"><img src="/static/img/brd/01ff-logo-small.jpg" alt=""/></div>
                  <div className="desc"><p>BJ클래식 &#xE001;</p><p>BJ CLASSIC</p><p>흘러가는 역사를 붙잡는 전통지킴이</p></div>
                </a></li>
                <li><a href="/brand/01rd">
                  <div className="img"><img src="/static/img/brd/01rd-logo-small.jpg" alt=""/></div>
                  <div className="desc"><p>존레논 &#xE001;</p><p>JOHN LENNON</p><p>이 세상 모든 둥근테의 오리지널</p></div>
                </a></li>
                <li><a href="/brand/01ri">
                  <div className="img"><img src="/static/img/brd/01ri-logo-small.jpg" alt=""/></div>
                  <div className="desc"><p>니와 마사히코 &#xE001;</p><p>NIWA MASAHIKO</p><p>훌륭한 레트로는 시대를 정확하게 겨냥한다</p></div>
                </a></li>
                <li><a href="/brand/01rh">
                  <div className="img"><img src="/static/img/brd/01rh-logo-small.jpg" alt=""/></div>
                  <div className="desc"><p>긴지로 &#xE001;</p><p>KINJIRO</p><p>금속에서 느낄 수 없는 플라스틱 질감에 매력을 느낀다면</p></div>
                </a></li>
                <li><a href="/brand/01rf">
                  <div className="img"><img src="/static/img/brd/01rf-logo-small.jpg" alt=""/></div>
                  <div className="desc"><p>새빌로우 &#xE001;</p><p>SAVILLE ROW</p><p>영국신사의 헤리티지를 끌어안은 안경메이커</p></div>
                </a></li>
                <li><a href="/brand/01rj">
                  <div className="img"><img src="/static/img/brd/01rj-logo-small.jpg" alt=""/></div>
                  <div className="desc"><p>나이토 쿠마하치 &#xE001;</p><p>NAITO KUMAHACHI</p><p>화려한 장식미를 추구하는  ‘네오-클래식Neo-Classic’ 아이웨어</p></div>
                </a></li>
                <li><a href="/brand/01hc">
                  <div className="img"><img src="/static/img/brd/01hc-logo-small.jpg" alt=""/></div>
                  <div className="desc"><p>키오 야마토 &#xE001;</p><p>KIO YAMATO</p><p>척 보면 아름다운 안경테를 추구하는 영-브랜드</p></div>
                </a></li>
                <li><a href="/brand/01fd">
                  <div className="img"><img src="/static/img/brd/01fd-logo-small.jpg" alt=""/></div>
                  <div className="desc"><p>바톤 페레이라 &#xE001;</p><p>BARTON PERREIRA</p><p>뿔테안경을 잘 만드는 디자이너들이 뭉치다</p></div>
                </a></li>
                <li><a href="/brand/01rk">
                  <div className="img"><img src="/static/img/brd/01rk-logo-small.jpg" alt=""/></div>
                  <div className="desc"><p>미키분지 &#xE001;</p><p>MIKI BUNJI</p><p>사람이 더 잘 만들 수 있는 안경이 있다고 믿어요</p></div>
                </a></li>
                <li><a href="/brand/01rc">
                  <div className="img"><img src="/static/img/brd/01rc-logo-small.jpg" alt=""/></div>
                  <div className="desc"><p>스기모토 케이 &#xE001;</p><p>SUGIMOTO KEI</p><p>천하제일안경대회를 제패한 실력자</p></div>
                </a></li>
              </ul>
            </div>

          </div>

          <style jsx>{`
          .wrap {width:100%;max-width:640px;margin:0 auto;margin-top:56px;}
          .brandList {padding:64px 24px 80px}
          .brandList .top {margin:32px 0 24px}
          .brandList .top p:first-child {font-size:24px;font-weight:bold}
          .brandList .top p:last-child {font-size:16px;margin-top:16px;line-height:28px;word-break:keep-all}
          .listWrap li {padding:12px 8px;border-bottom:1px solid #d6d7d8}
          .listWrap li:after {display:block;clear:both;content:''}
          .listWrap .img {float:left;width:80px;height:80px;background:#000}
          .listWrap .img img {width:100%}
          .listWrap .desc {float:left;margin:8px 0 0 16px;width:calc(100% - 96px)}
          .listWrap .desc p:nth-child(1) {font-size:15px;font-weight:bold;line-height:16px;color:#33343a}
          .listWrap .desc p:nth-child(2) {margin:6px 0 10px;font-size:12px;color:#848889;line-height:14px}
          .listWrap .desc p:nth-child(3) {font-size:13px;line-height:16px;word-break:keep-all;color:#33343a}
        `}</style>
        </div>
        </Layout>
        
    )
}

export default BrandPage