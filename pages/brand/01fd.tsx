import React from 'react'
import Layout from '../../layout/DefaultLayout'
import Router from 'next/router'

const BrandPage = () => {

  return (
    <Layout title="플로브 - 나의 눈을 위한 안경 큐레이션 서비스">
      <div className="global640"><div className="goBackBtnWrap"><div className="goBackBtn" onClick={() => Router.back()}></div></div></div>
      <div className="wrap">

        <div className="brandWrap">

          <div className="titWrap">
            <div className="titTxt">
              <p className="en">BARTON PERREIRA</p>
              <p className="ko">바톤 페레이라</p>
            </div>
            <div className="bgBk"></div>
            <div className="titImg"><img src="/img/brd/01fd-tit-big-1.jpg" alt="" /></div>
          </div>

          <div className="infoWrap">
            <p className="caption">브랜드정보</p>
            <ul className="specTable">
              <li><span>브랜드명</span><span><strong>BARTON PERREIRA</strong></span></li>
              {/*<li><span>브랜드명</span><span><strong>ASHCROFT</strong></span></li>*/}
              <li><span>제조사</span><span><strong>Barton Perreira</strong></span></li>
              <li><span>원산지</span><span><strong>JAPAN</strong></span></li>
              <li><span>가격</span><span><strong>30~40만원대</strong></span></li>
            </ul>
          </div>

          <div className="modelWrap">
            <p className="caption">인기모델</p>

          </div>

          <div className="descWrap">
            <p className="caption">브랜드설명</p>
            <div className="mainImg"><img src="/img/brd/01fd-tit-big-1.jpg" alt="" /></div>
            <h3 className="mainTxt">바톤 페레이라, 뿔테안경을 잘 만드는 디자이너들이 뭉치다</h3>
            <p className="mainDesc">바톤 페레이라는 미국 뿔테안경을 중심으로 신선한 디자인을 시도하고 있는 디자이너 중심 브랜드입니다. 바톤 페레이라의 시그니처 디자인으로는 와이어-링이 있어요. 플라스틱 프레임에는 금속으로 된 얇은 줄이 선처럼 렌즈 부분을 장식합니다. 이는 독특한 인상을 줄 뿐만이 아니라, 프레임이 착용자의 얼굴에 알맞게 안착하는데 기여하죠.</p>
            <div className="subImg"><img src="/img/brd/01fd-desc-big-1.jpg" alt="" /></div>
            <h4 className="subTxt">뿔테에 들어가는 재료를 특별히 신경 써서 골랐어요</h4>
            <p className="subDesc">이들은 최근 안경메이커의 숙원인 프레임의 경량화를 효과적으로 달성하고 있어요. '자일로나이트' 라고 하는 희귀 플라스틱을 사용하는데, 이 재료는 기존 뿔테에 들어가는 재료와 비교하면 절반정도 가볍습니다. 또 자일로나이트를 매끄럽게 연마하면, 기존 뿔테안경에서 볼 수 없는 독특한 광택 마감이 나타나죠. 안경테 표면의 오묘한 질감은 재료에서 나오는 물성을 중히 여기는 안경 애호가에게 많은 호기심을 불러일으키고 있습니다.</p>
          </div>

        </div>


        <style jsx>{`
          .wrap {width:100%;max-width:640px;display:block;margin:0 auto;}
        `}</style>
      </div>
    </Layout>

  )
}

export default BrandPage