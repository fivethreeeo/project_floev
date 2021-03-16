import React from 'react'
import Layout from '../layout/DefaultLayout'
import Router from 'next/router'

const policyPage = () => {

    return (
        <Layout title="플로브 - 나의 눈을 위한 안경 큐레이션 서비스">
        <div className="global640"><div className="goBackBtnWrap"><div className="goBackBtn" onClick={() => Router.back()}></div></div></div>
        <div className="wrap">
        <p className="pageTitle">서비스 정책 안내</p>

<div className="serPolWrap">
  <div className="guide-1 inner-wrap">
    <div className="tit-bx">
      <p className="tit-bx-p-1">알맞게 안경을 착용해요.</p>
      <p className="tit-bx-p-2">안경 착용 및 피팅</p>
      <div className="tit-bx-img img1"><img src="/static/img/newLanding/serPol-1.jpg" alt=""/></div>
      <div className="clearfix"></div>
    </div>
    <div className="con-bx con-bx-1">
      <p className="con-tit">1. 새로운 안경이 어지러워요.</p>
      <p className="con-p-1">기존 안경과 새로운 안경 렌즈의 도수가 서로 다르기 때문에 발생하는 증상이에요.</p>
      <div className="con-divide-line"></div>
      <p className="con-p-2">플로브는 검안 결과에 따라 장기적인 시력 건강에 맞는 도수로 렌즈를 처방해요. 기존 도수에 익숙한 안구 근육이 새로운 도수에 적응하는 과정에서 불편함을 느끼실 수 있어요.<br/>보통 1주일 이내에 해소가 되지만 계속해서 불편함이 느껴지신다면 <strong>플로브는 1개월 이내에 2번까지 무상으로 렌즈를 교환해드립니다.</strong></p>
    </div>
    <div className="con-bx con-bx-2">
      <p className="con-tit">2. 오래 쓰니 아프고 불편해요.</p>
      <p className="con-p-1">안경은 시간이 지날수록 온도, 습도, 외부의 압력에 의해 변형이 일어나요.</p>
      <div className="con-divide-line"></div>
      <p className="con-p-2">세밀한 피팅을 받았어도 주기적으로 내 얼굴에 맞게 맞춰주어야 가장 최적화된 형태로 편안하게 착용할 수 있죠.<br/>직접 조정하는 경우 잘못된 변형으로 더 불편해질 수 있으니 피팅은 전문가에게 맡겨주세요. <strong>플로브는 2년간 무상으로 피팅 서비스를 제공합니다.</strong></p>
    </div>
    <div className="con-bx con-bx-3">
      <p className="con-tit">3. 흘러내려서 불편해요.</p>
      <p className="con-p-1">안경테에 렌즈의 무게가 더해지면 균형감이 달라져요.</p>
      <div className="con-divide-line"></div>
      <p className="con-p-2">플로브는 안경테를 고를 때부터 렌즈의 두께나 균형감을 고려하여 상담해 드리고 있어요.<br/>이미 완성된 안경이 계속 흘러내린다면 <strong>추가 피팅이나 코 받침대를 마찰 있는 소재로 교체하는 등의 개선을 도와드리며 구매 후 2년까지 무상으로 제공합니다.</strong></p>
    </div>
  </div>

  <div className="guide-2 inner-wrap">
    <div className="tit-bx">
      <p className="tit-bx-p-1">올바르게 안경을 착용해요.</p>
      <p className="tit-bx-p-2">안경 관리</p>
      <div className="tit-bx-img img2"><img src="/static/img/newLanding/serPol-2.jpg" alt=""/></div>
      <div className="clearfix"></div>
    </div>
    <div className="con-bx con-bx-1">
      <p className="con-tit">1. 렌즈의 교체 주기가 궁금해요.</p>
      <p className="con-p-1">1년 반~ 2년 반을 권장해요.</p>
      <div className="con-divide-line"></div>
      <p className="con-p-2">렌즈의 소재는 플라스틱이에요. 플라스틱은 열과 스크래치에 약하기 때문에 일반적 교체 주기의 경우 1년 반에서 2년 반을 권장하고 있어요.<br/>손상된 렌즈를 계속 착용하는 경우 난반사로 인해 눈의 피로도가 증가하고 심한 경우 두통이나 구토를 유발하기도 해요.</p>
    </div>
    <div className="con-bx con-bx-2">
      <p className="con-tit">2. 그럼 렌즈 상태는 어떻게 확인해요?</p>
      <p className="con-p-1">형광등에 비추어 간단하게 확인하세요.</p>
      <div className="con-divide-line"></div>
      <p className="con-p-2">일반적인 스크래치는 위 방법으로 가능하지만 전용 클리너로 닦거나 세척을 해도 선명하게 보이지 않는다면  스크래치가 심한 경우에 속해요.<br/>특히 코팅이 손상되어 가로등 불빛이 번져 보이거나 렌즈 색상이 변색되는 현상이 있다면  눈 건강을 위해 렌즈를 꼭 교체해 주세요.</p>
    </div>
  </div>

  <div className="after-service inner-wrap">
    <div className="tit-bx">
      <p className="tit-bx-p-2"><span className="fontR">AS</span> 정책</p>
      <div className="clearfix"></div>
    </div>
    <div className="con-bx con-bx-1">
      <p className="con-tit">일상을 함께하는 안경은 자주 망가져요.<br/><strong>플로브는 구매 후 2년간 유/무상 수리를 보증하고 있으니 마음 편히 위탁 수리 서비스를 이용하세요.</strong></p>
      <div className="con-divide-line"></div>
      <div className="how-to">
        <p className="how-to-tit">접수방법</p>
        <p><span className="order-num">1</span> 카카오톡으로 수리가 필요한 안경사진을 전송하기</p>
        <p className="sub">수리가 필요한 안경테의 사진을 플로브 카카오톡으로 보내주시면 수리의 형태를 판단해요.</p>
        <p><span className="order-num">2</span> 플로브로 직접 안경 보내기</p>
        <p className="sub">라운지 방문 혹은 택배 접수도 가능해요. 접수받은 안경을 플로브가 해당 브랜드에 위탁 수리를 진행합니다.</p>
        <p><span className="order-num">3</span> 위탁 수리가 끝난 안경 전달받기</p>
        <p className="sub">위탁 수리가 끝난 안경을 직접 혹은 택배로 수령해요.</p>
        <p className="sub2">*추가적인 안경 부속 제공은 브랜드별 정책을 확인한 후 도와드리고 있어요. 고객센터 상담을 통해 확인하세요.</p>
      </div>
    </div>
  </div>

  <div className="exchange-refund inner-wrap">
    <div className="tit-bx">
      <p className="tit-bx-p-2">교환/환불 정책</p>
      <div className="clearfix"></div>
    </div>
    <div className="con-bx con-bx-1">
      <p className="con-tit">안경에 문제가 있으신가요?</p>
      <p className="con-p-1">플로브에서는 입고부터 가공 과정까지 수차례에 걸쳐 제품을 검수해요. 안경 수령 후 1주일 이내에 하자가 발견된 경우 교환/환불이 가능합니다.</p>
      <div className="con-divide-line"></div>
      <p className="con-p-2"><strong><span className="red">하지만,</span> 단순 변심에 의한 교환/환불은 불가능합니다.</strong><br/>안경은 반제품의 특성을 가지고 있어요. 온전히 고객님에게 맞춘 렌즈 가공, 섬세한 피팅으로 완성한 이미 ‘사용된'안경이기에 플로브 정책상 재판매가 불가능해요. 위의 이유로 안경 자체의 문제가 아닌 경우 교환/환불은 불가능해요.</p>
    </div>
  </div>

  <div className="repurchase inner-wrap"></div>


</div>

<style jsx>{`

.wrap {width:100%;max-width:640px;margin:0 auto;margin-top:56px;}
.pageTitle {font-size: 20px;font-weight: bold;text-align: center;margin-bottom: 40px;}

strong {color:#d24816}
.red {color:#d24816}

.serPolWrap {padding:80px 16px 80px}
.inner-wrap {padding-bottom:24px}

.pageTitle {padding:24px 0 0}

.main-tit {font-weight:700;text-align:center}

.tit-bx {margin-bottom:48px}
.tit-bx-p-1 {float:left;font-size:16px;color:#d24816}
.tit-bx-p-2 {clear:left;float:left;font-size:28px;font-weight:700}
.tit-bx-img {float:left;height:102px} 
.tit-bx-img.img1 {width:100px;margin:-54px 0 0 20px} 
.tit-bx-img.img2 {width:111px;margin:-42px 0 0 88px}
.tit-bx-img img {width:100%}

.con-p-1, .con-p-2 {line-height:1.75}

.con-bx {margin-bottom:80px}
.con-tit {font-size:17px;font-weight:700}
.con-p-1 {margin-top:15px;font-size:16px}
.con-p-2 {font-size:15px}
.con-divide-line {margin:16px 0;width:100%;height:1px;display:block;background:#d6d7d8}

.after-service .tit-bx, .exchange-refund .tit-bx {margin-bottom:24px}
.after-service .con-tit {font-size:15px;font-weight:400}

.how-to p {font-size:15px;font-weight:700;color:#64433f}
.how-to-tit {font-weight:700;margin-bottom:16px;color:#33343a!important}
.order-num {margin-top:-1px;margin-right:2px;display:inline-block;color:#fff;background:#64433F;width:22px;text-align:center;font-weight:700;border-radius:16px}
.sub {margin:4px 0 16px 28px;font-size:14px!important;font-weight:400!important;color:#33343a!important}
.sub2 {font-size:13px!important;font-weight:400!important}

@media (min-width: 640px) {
  .inner-wrap {padding-bottom:64px}
  .tit-bx-img.img1 {width:160px;margin:-77px 0 0 233px;height:auto} 
  .tit-bx-img.img2 {width:160px;margin:-74px 0 0 303px;height:auto}
}          

@media (max-width: 351px) {
  .tit-bx-img {display:none} 
}

.clearfix {display:block;content:'';clear:both}

`}</style>
        </div>
        </Layout>
        
    )
}

export default policyPage