import React from 'react'
import Layout from '../layout/DefaultLayout'
import Router from 'next/router'

const EventPage = () => {

    return (
        <Layout title="플로브 - 나의 눈을 위한 안경 큐레이션 서비스">
        <div className="global640"><div className="goBackBtnWrap"><div className="goBackBtn" onClick={() => Router.back()}></div></div></div>
        <div className="wrap global640">
          {/*
          <div className="event event__1">
            <div className="title"><strong>EVENT 1</strong></div>
            <div className="h1">첫눈을 기다리는 마음<br/>안경을 기부하세요.</div>
            <div className="hr"></div>
            <div className="h2"><strong>참여자 <span className="color__yellow">5만원 할인 혜택</span></strong></div>
            <div className="h4">우리가 첫눈❄️을 기다렸던 마음을 담아<br/><strong>동남아 어린이들에게 첫눈👓을 선물</strong>하고<br/>참여해주신 분들께 <strong>5만원 할인 혜택</strong>을 드려요.</div>
            <div className="imgbx"><img src="/static/img/newLanding/event_keyvisual.png" alt="첫 눈을 기다리는 마음을 담아 안경을 기부하세요. 동남아 어린이들에게 안경을 기부하고 참여해주신 분들께 5만원 할인 혜택을 드립니다."/></div>
            <div className="title2">이벤트 안내</div>
            <div className="h5">플로브에 방문하여<br/>쓰던 안경, 쓰지않는 안경을 기부해주시면<br/>안경 구매시 5만원을 할인해드립니다.</div>
            <div classN
          */}
          <div className="event event__2">
            <div className="title"><strong>EVENT</strong></div>
            <div className="h1">리뷰 남기면 <strong>3만원 할인</strong></div>
            <div className="hr"></div>
            <div className="h3"><strong><span className="color__yellow">카카오맵, 네이버맵 리뷰 등록</span></strong>을 약속하면<br/><strong><span className="color__yellow">최대 3만원 할인 혜택</span></strong>을 드려요.</div>
            <div className="title2">이벤트 안내</div>
            <div className="h5">카카오맵(1만원), 네이버맵(2만원)<br/>리뷰 등록을 약속하면<br/>최대 3만원 할인 혜택을 드려요.<br/>참여 방법은 라운지에서 자세히 확인하세요.</div>
            <div className="h6">*할인은 결제액의 30%까지 적용가능합니다.<br/>*네이버맵/카카오맵 동시 참여 가능합니다.<br/>*1인 1회에 한해 참여 가능합니다.<br/>*해당 이벤트는 사전 고지 없이 종료될 수 있습니다.<br/>*이벤트 1과 2는 중복 참여 가능합니다.</div>
          </div>
          <style jsx>{`
                    .wrap {padding-bottom:80px;margin-top:48px;background:#64433F}
          .event {color:#fff;text-align:center}
          .event__1 {padding:64px 0 48px;background:#B0453A}
          .event__2 {padding:48px 0;background:#64433F}
          .color__yellow {color:#FDFF54}
          .imgbx img {width:100%}
  
          .title {font-family:"Radikal W01 Bold"!important;font-size:12px}
          .h1 {margin:24px 0 0;font-size:24px;font-weight:500;line-height:29px}
          .hr {margin:8px auto;width:220px;height:1px;background:#fff}
          .h2 {font-size:24px}
          .h3 {margin:0 0 48px 0;font-size:14px}
          .h4 {margin:40px 0 24px;font-size:16px;line-height:24px}
          .imgbx {margin:0 auto 64px;width:218px}
          .title2 {margin:0 auto 32px;padding:7px 0 5px;width:80px;border-radius:20px;font-size:11px;font-weight:bold;background:rgba(51,52,58,0.8)}
          .h5 {margin:0 auto 24px;width:277px;text-align:left;font-size:14px;font-weight:500}
          .h6 {margin:0 auto;width:277px;text-align:left;font-size:11px;line-height:18px}
        `}</style>
        </div>
        </Layout>
        
    )
}

export default EventPage
