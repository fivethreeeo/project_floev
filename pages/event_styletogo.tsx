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
            <div className="imgbx"><img src="/static/img/togo_1.png" alt=""/></div>
            <div className="desc1"><div><span>스타일가이드togo?</span>나를 위해 추천된 안경테와 추천 스타일 키워드가 담긴 종이에요. 안경을 더 쉽고 즐겁게 선택할 수 있는 나만의 안경 추천 해설지라고 할 수 있어요!</div></div>
            <div className="title2">혜택</div>
            <div className="desc2">
              <p>1. 구매자 대상 라운지에서 <span className="color__yellow">3만원 즉시 할인</span></p>
              <p>2. 추첨을 통해 <span className="color__yellow">플로브 크레딧 20만원 제공</span><br/></p>
              <p>*구매/비구매 고객 모두 포함</p>
            </div>
            <div className="title3">참여방법</div>
            <div className="desc3">
              <p>1. 스타일가이드togo를 찍는다!</p>
              <p>2. 필수 해시태그와 함께 개인 인스타그램에 업로드한다.<br/></p>
              <p>*필수 해시태그 :<br/><strong>#FindYourFloev #안경추천서비스 #플로브</strong></p>
            </div>
            <div className="hr_outer_2"><div className="hr"></div></div>
            <div className="h6">
              <strong>세부사항</strong>
              <br/>*크레딧은 타인에게 양도하실 수 있습니다.
              <br/>*크레딧의 유효기간은 2021년 12월 31일입니다.
              <br/>*크레딧 사용시 다른 할인 이벤트와 중복 적용이 불가합니다.
              <br/>*크레딧 적립을 위해 당첨된 고객분들의 개인 정보 수집을 요청할 수 있습니다.
              <br/>*전체 공개 계정만 참여 가능합니다. (비공개계정 참여 불가)
              <br/>*부정한 방법으로 참여할 시에 당첨이 취소될 수 있습니다.
              <br/>*당첨된 게시물은 마케팅 용도로 활용될 수 있습니다.
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
          .desc2 {margin:0 auto;width:300px;text-align:left;font-weight:500}
          .desc2 p {font-size:16px;line-height:1.8}
          .desc2 p:last-child {font-weight:400;font-size:14px;margin-top:-3px}
          .title3 {margin:40px auto 32px;padding:7px 0 5px;width:80px;border-radius:20px;font-size:12px;font-weight:bold;background:rgba(51,52,58,0.9)}
          .desc3 {margin:0 auto;width:300px;text-align:left;font-weight:500}
          .desc3 p {font-size:16px;line-height:1.8}
          .desc3 p:last-child {font-weight:400;font-size:14px;margin-top:12px;line-height:1.4}

          .h6 {margin:0 auto;width:300px;text-align:left;font-size:12px;line-height:1.75}
        `}</style>
        </div>
        </Layout>
        
    )
}

export default EventPage
