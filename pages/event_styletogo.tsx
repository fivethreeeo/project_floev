import React from 'react'
import Layout from '../layout/DefaultLayout'
import Router from 'next/router'

const EventPage = () => {

  return (
    <Layout title="플로브 - 나의 눈을 위한 안경 큐레이션 서비스">
      <div className="global640"><div className="goBackBtnWrap"><div className="goBackBtn" onClick={() => Router.back()}></div></div></div>
      <div className="wrap global640">

        <div className="event event__2">
          <div className="title"><strong>EVENT</strong></div>
          <div className="h1">잘 몰랐던 안경 취향을 찾아가는 새로운 즐거움</div>
          <div className="hr_outer"><div className="hr"></div></div>
          <div className="h2">플로브에서 발견한 <span className="color__yellow">나만의 안경이 담긴 스타일가이드togo</span>를 공유해주세요!</div>
          <div className="imgbx"><img src="/img/togo_1.png" alt="" /></div>
          <div className="desc1"><div><span>스타일가이드togo?</span>나를 위해 추천된 안경테와 추천 스타일 키워드가 담긴 종이에요. 안경을 더 쉽고 즐겁게 선택할 수 있는 나만의 안경 추천 해설지라고 할 수 있어요!</div></div>
          <div className="title2">혜택</div>
          <div className="desc2">
            <p>구매자 대상 라운지에서 <span className="color__yellow">3만원 즉시 할인</span></p>
            <p>*구매/비구매 고객 모두 포함</p>
          </div>
          <div className="title3">참여방법</div>
          <div className="desc3">
            <p>1. 스타일가이드togo를 찍는다!</p>
            <p>2. 필수 해시태그와 함께 개인 인스타그램에 업로드한다.<br /></p>
            <p>*필수 해시태그 :<br /><strong>#FindYourFloev #안경추천서비스 #플로브</strong></p>
          </div>

        </div>

        <style jsx>{`
          .wrap {padding-bottom:80px;margin-top:48px;background:#64433F}
          .event {color:#fff;text-align:center;background:#64433F;padding-top:40px}
          .color__yellow {color:#FDFF54}
          .imgbx img {width:100%}
  
          .title {font-family:"Radikal W01 Bold"!important;font-size:12px}
          .h1 {margin:24px auto 0;width:100%;max-width:440px;padding:0 24px;font-size:20px;font-weight:500;word-break:keep-all}
          .h2 {margin:0 auto;width:100%;max-width:440px;padding:0 24px;font-weight:500;font-size:18px;word-break:keep-all}
          .hr_outer {margin:12px auto;padding:0 24px;width:100%;max-width:440px}
          .hr_outer_2 {margin:64px auto 24px;padding:0 24px;width:100%;max-width:440px}
          .hr {height:1px;background:#fff}
          .imgbx {margin:24px auto 0;width:100%;max-width:400px;padding:0 64px}
          .desc1 {margin:24px auto 0;width:100%;max-width:400px;padding:0 48px}
          .desc1 div{padding:11px 12px 9px;font-size:12px;text-align:left;background:rgba(0,0,0,0.3);border-radius:8px}
          .desc1 span {font-weight:700;display:block;padding-bottom:4px;}
          .title2 {margin:40px auto 16px;padding:7px 0 5px;width:56px;border-radius:20px;font-size:12px;font-weight:bold;background:rgba(51,52,58,0.9)}
          .desc2 {text-align:center;margin:0 auto;width:320px;font-weight:500}
          .desc2 p {font-size:16px;line-height:1.8}
          .desc2 p:last-child {font-weight:400;font-size:14px;margin-top:-3px}
          .title3 {margin:40px auto 16px;padding:7px 0 5px;width:80px;border-radius:20px;font-size:12px;font-weight:bold;background:rgba(51,52,58,0.9)}
          .desc3 {margin:0 auto;width:320px;text-align:left;font-weight:500}
          .desc3 p {font-size:16px;line-height:1.8}
          .desc3 p:last-child {font-weight:400;font-size:14px;margin-top:12px;line-height:1.4}
          .desc3 div {font-weight:400;font-size:14px;margin-bottom:8px}

          .h6 {margin:0 auto;width:300px;text-align:left;font-size:12px;line-height:1.75}
        `}</style>
      </div>
    </Layout>

  )
}

export default EventPage
