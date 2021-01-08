import React from 'react'
import Layout from '../../layout/DefaultLayout'
import Router from 'next/router'

const yeoksamPage = () => {

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
    <p>역삼성당</p>
    <p>큰 창 너머 붉은 벽돌의 역삼성당이 아름다운<br/>플로브 라운지 역삼성당 입니다.</p>
    <div className="map"><p><a className="gtm-010" target="_blank" href="http://naver.me/xH2We7TP">라운지 위치보기 &#xE001;</a></p></div>
  </div>
</div>

<div style={{marginTop:'24px'}} className="section">
  <p>라운지 역삼성당은 플로브 서비스가 발을 디딘 첫 매장으로 <br/><strong>‘we listen we care we recommend’</strong><br/> 플로브가 고객에게 전달하고 싶은 가치를 온전하게 선보이는 것에 최적화된 공간이에요.</p><br/>
  
</div>

<div className="section">
  <div className="imgWrap"><img src="/static/img/newLanding/lounge-y-2.jpg" alt=""/></div>
  <p>기존 안경원이 가진 특유의 딱딱한 판매 공간이 아닌 <strong>눈 맞추고 대화하는 것에 집중하여 나의 눈을 정확하게 알고 필요한 선택을 충분히 고민할 수 있는 공간</strong>을 만들고 싶었어요.</p>
</div>

<div className="section">
  <div className="imgWrap"><img src="/static/img/newLanding/lounge-y-3.jpg" alt=""/></div>
  <p>미리 예약한 시간에 라운지 역삼성당을 방문하면 플로브 서비스를 <strong>안경 카운셀러와 함께 1:1로 경험하며 라운지 전체를 온전하게 이용할 수 있는 점</strong>이 역삼성당 매장의 가장 큰 매력 포인트죠.</p>
</div>

<div className="section">
  <div className="imgWrap"><img src="/static/img/newLanding/lounge-y-4.jpg" alt=""/></div>
  <p>나만의 라운지에서 흘러나오는 <br/><strong>플로브의 뮤직 블랜드와 곳곳의 취향에 맞는 소품에서 소소한 재미</strong>를 발견하세요.</p>
</div>

<div className="section reco">
  <p>플로브 라운지 역삼성당, 이런 분에게 추천해요!</p>
  <p>50분 동안 오로지 나에게만 주어진 공간에서 독립된 서비스를 경험하고 싶어요.</p>
  <p>부모님이나 사랑하는 사람에게 새로운 경험과 좋은 안경을 오붓하게 선물하고 싶어요.</p>
  <p>조용하고 분위기 있는 공간에서 서비스 받고 싶어요.</p>
</div>

</div>

          <style jsx>{`
          strong {color:#64433F}
          .newColor {color:#C3512A}

          .loungeWrap {padding-bottom:80px;margin-top:48px;}
          .section .imgWrap {float:none;width:100%;margin:0 0 16px 0;}
          .section .imgWrap img {width:100%}

          .section {margin:0 0 40px}
          .section:nth-child(2) {margin:0 0 40px}
          .section p {padding:0 24px;font-size:16px;line-height:30px}
          .section img {width:100%}

          .title {position:relative}
          .title .imgWrap {float:none;width:100%;height:640px;overflow:hidden;background:url(/static/img/newLanding/lounge-y-1.jpg) center center / cover no-repeat}
          .title .bk {position:absolute;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,0.5)}
          .title .txtWrap {position:absolute;top:100px;padding:0 24px}
          .title .txtWrap p {color:#fff;font-size:32px;line-height:46px;font-weight:bold}
          .title .txtWrap p:nth-child(3) {margin:24px 0 0 4px;font-size:14px;line-height:24px;font-weight:400}
          .title .map {margin-top:24px;width:160px;height:40px;border-radius:4px;overflow:hidden;text-align:center}
          .title .map p {line-height:40px;font-size:14px;font-weight:400;color:#fff;background:#C3512a}
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

export default yeoksamPage