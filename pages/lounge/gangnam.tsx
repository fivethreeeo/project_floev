import React from 'react'
import Layout from '../../layout/DefaultLayout'
import Router from 'next/router'

const gangnamPage = () => {

    return (
        <Layout title="플로브 - 나의 눈을 위한 안경 큐레이션 서비스">
        <div className="global640"><div className="goBackBtnWrap"><div className="goBackBtn" onClick={() => Router.back()}></div></div></div>
        <div className="wrap">
        <div className="loungeWrap global640">

<div className="title">
  <div className="imgWrap"></div>
  <div className="bk"></div>
  <div className="txtWrap">
    <p>라운지</p>
    <p>강남</p>
    <p>복잡한 강남 가운데서 담백하게 쉼을 제안하는 곳,<br/>플로브 라운지 강남입니다.</p>
    <div className="map"><p><a className="gtm-010" target="_blank" href="http://naver.me/xfa1CFMZ">라운지 위치보기 &#xE001;</a></p></div>
  </div>
</div>

<div style={{marginTop:'24px'}} className="section">
  <p>플로브는 자신의 취향을 발견하는 것도 서비스의 중요한 가치라고 생각해요. 오늘 당장 마음에 드는 안경을 발견하지 못해도 괜찮아요.<br/><br/><strong>나의 취향과 라이프스타일에 맞게 안경을 선택해낼 수 있다는 것</strong> 그 자체로도 가치가 있죠.</p>
</div>

<div className="section">
  <div className="imgWrap"><img src="/static/img/newLanding/lounge-g-2.jpg" alt=""/></div>
  <p><strong>'어떻게 하면 더 많은 사람이 플로브를 통해 가치있는 발견을 할 수 있을까?',<br/>'어떻게 하면 필요한 만큼 편리하게 플로브 서비스를 더 이용할 수 있을까?'</strong><br/><br/>이 두 가지를 고민했고,<br/>다양한 시도 끝에 보다 확장된 플로브를 경험할 수 있는 라운지가 탄생했어요.</p>
</div>

<div className="section">
  <div className="imgWrap"><img src="/static/img/newLanding/lounge-g-5.jpg" alt=""/></div>
  <p>확장된 라운지에서는 충분히 독립된 상담 공간에서 이전처럼 플로브 서비스를 집중해서 온전히 받을 수 있고 <strong>상담 데스크 이외에 커뮤니티 데스크와 피팅 데스크, 대기공간이 있어 큐레이션 이외의 플로브 케어를 더욱 편리하게 이용할 수 있어요.</strong></p>
</div>

<div className="section">
  <div className="imgWrap"><img src="/static/img/newLanding/lounge-g-6.jpg" alt=""/></div>
  <p>한층 더 밝고 세련된 무드를 가진 라운지 강남에서도 역삼과 동일한 플로브 시그니처 상담 데스크를 발견할 수 있고, 동일한 플로브 뮤직 블랜드를 경험할 수 있답니다.</p><br/>
  <p>우리는 어려운 서비스를 지향하지 않아요. 당신에게 보다 세심하게 다가가고 싶어요. 플로브가 지향하는 ‘발견하는 즐거움'을 새로운 공간에서 경험하세요.</p>
</div>

<div className="section reco">
  <p>플로브 라운지 강남, 이런 분에게 추천해요!</p>
  <p>좀 더 나에게 필요한 시간에 라운지를 이용하고 싶어요.</p>
  <p>다양하게 주어진 시간대를 나의 일정에 맞추어 활용하고 싶어요.</p>
  <p>피팅이나 수리 등 다른 케어 서비스를 자주 편하게 예약하고 싶어요.</p>
  <p>부담없이 자유로운 분위기에서 서비스 받고 싶어요.</p>
</div>

</div>
          <style jsx>{`
          strong {color:#64433F}
          .newColor {color:#d24816}

          .loungeWrap {margin-top:48px;padding-bottom:80px}
          .section .imgWrap {float:none;width:100%;margin:0 0 16px 0;}
          .section .imgWrap img {width:100%}

          .section {margin:0 0 40px}
          .section:nth-child(2) {margin:0 0 40px}
          .section p {padding:0 24px;font-size:16px;line-height:30px}
          .section img {width:100%}

          .title {position:relative}
          .title .imgWrap {float:none;width:100%;height:640px;overflow:hidden;background:url(/static/img/newLanding/lounge-g-1.jpg) center center / cover no-repeat}
          .title .bk {position:absolute;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,0.3)}
          .title .txtWrap {position:absolute;top:100px;padding:0 24px}
          .title .txtWrap p {color:#fff;font-size:32px;line-height:46px;font-weight:bold}
          .title .txtWrap p:nth-child(3) {margin:24px 0 0 4px;font-size:14px;line-height:24px;font-weight:400}
          .title .map {margin-top:24px;width:160px;height:40px;border-radius:4px;overflow:hidden;text-align:center}
          .title .map p {line-height:40px;font-size:14px;font-weight:400;color:#fff;background:#d24816}
          .title .map p a {display:block;color:#fff}
          
          .end {padding-bottom:40px}
          .reco {display:none;background:#64433f}
          .reco p {color:#fff}
          @media (min-width: 640px) {
            .imgWrap img {border-radius:2px}
            .title {margin:0 auto}
            .title .txtWrap {top:200px;padding:0 48px}
            .title .imgWrap {overflow:hidden;border-bottom-left-radius:2px;border-bottom-right-radius:2px}
            .title .bk {overflow:hidden;border-bottom-left-radius:2px;border-bottom-right-radius:2px}
            .section p {padding:0 16px}
          }
        `}</style>
        </div>
        </Layout>
        
    )
}

export default gangnamPage