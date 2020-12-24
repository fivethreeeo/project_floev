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
                <p className="en">STEELBAUM</p>
                <p className="ko">스틸바움</p>
              </div>
              <div className="bgBk"></div>
              <div className="titImg"><img src="/static/img/brd/01rg-tit-big-1.jpg" alt=""/></div>
            </div>

            <div className="infoWrap">
              <p className="caption">브랜드정보</p>
              <ul className="specTable">
                <li><span>브랜드명</span><span><strong>STEELBAUM</strong></span></li>
                {/*<li><span>브랜드명</span><span><strong>ASHCROFT</strong></span></li>*/}
                <li><span>제조사</span><span><strong>Steelbaum</strong></span></li>
                <li><span>원산지</span><span><strong>KOREA</strong></span></li>
                <li><span>가격</span><span><strong>10~20만원대</strong></span></li>
              </ul>
            </div>

            <div className="modelWrap">
              <p className="caption">인기모델</p>
 
            </div>

            <div className="descWrap">
              <p className="caption">브랜드설명</p>
              <div className="mainImg"><img src="/static/img/brd/01rg-tit-big-1.jpg" alt=""/></div>
              <h3 className="mainTxt">스틸바움, 금속의 물성을 살린 강철의 안경술사</h3>
              <p className="mainDesc">티타늄은 오늘날 안경테의 핵심재료입니다. 강도, 탄성, 중량 모두, 안경에 적합한 물성을 갖고 있기 때문이죠. 다만 가공이 까다롭기 때문에 안경메이커들은 티타늄 가공 기술을 높이려 안간힘을 쓰고 있어요. 티타늄 중에서도 최상급으로 분류되는 X-TITANIUM을 사용해, 가벼우면서 세련된 라인으로 많은 사랑을 받고 있습니다. 출시하는 모델을 모두 15g 이하의 제품으로만 만든다는 스틸바움입니다.</p>
              <div className="subImg"><img src="/static/img/brd/01rg-desc-big-1.jpg" alt=""/></div>
              <h4 className="subTxt">모양빠진 티타늄은 이제 그만! 밋밋한 디자인이여 안녕</h4>
              <p className="subDesc">스틸바움은 현재 안경메이커 중에서도 손꼽히는 티타늄 메이커. 말 그대로 강철의 안경술사입니다. 티타늄을 기상천외한 방식으로 구부릴 수 있는 기술력을 갖고 있죠. 림과 안경다리를 잇는 엔드피스 부위를 물결 모양으로 구부린다거나, 금속을 개성 있게 깎아 내 독특한 미감을 자극하죠. 콧잔등에 얹힌 렌즈의 무게를 덜어주는 날씬한 파트너입니다.</p>
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