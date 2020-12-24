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
                <p className="en">RAWROW</p>
                <p className="ko">로우로우</p>
              </div>
              <div className="bgBk"></div>
              <div className="titImg"><img src="/static/img/brd/01rm-tit-big-1.jpg" alt=""/></div>
            </div>

            <div className="infoWrap">
              <p className="caption">브랜드정보</p>
              <ul className="specTable">
                <li><span>브랜드명</span><span><strong>RAWROW</strong></span></li>
                {/*<li><span>브랜드명</span><span><strong>ASHCROFT</strong></span></li>*/}
                <li><span>제조사</span><span><strong>RAWROW</strong></span></li>
                <li><span>원산지</span><span><strong>KOREA</strong></span></li>
                <li><span>가격</span><span><strong>10만원대</strong></span></li>
              </ul>
            </div>

            <div className="modelWrap">
              <p className="caption">인기모델</p>
 
            </div>

            <div className="descWrap">
              <p className="caption">브랜드설명</p>
              <div className="mainImg"><img src="/static/img/brd/01rm-tit-big-1.jpg" alt=""/></div>
              <h3 className="mainTxt">로우로우, 안경의 본질적인 쓰임새를 고민하다</h3>
              <p className="mainDesc">한국 라이프 웨어 브랜드 로우로우가 최근 안경을 열심히 만들고 있어요. 로우로우는 일상에 유용한 물건을 자신이 잘 만들 수 있다는 판단이 들면, 주저 없이 뛰어드는 메이커로 알려져 있습니다. 로우로우는 디자인 철학을 ‘본질’이라 말합니다. 조금 모호하게 느껴지기도 하지만, 쉽게 풀면 결국 물건의 쓰임새를 고민하는 셈이죠.</p>
              <div className="subImg"><img src="/static/img/brd/01rm-desc-big-1.jpg" alt=""/></div>
              <h4 className="subTxt">가성비를 알차게 달성하는 베타-티타늄 안경테의 매력</h4>
              <p className="subDesc">안경의 쓰임새는 결국 ‘시력교정’에 있어요. 눈 건강을 위한 ‘의료용 장비'라는 걸 의식한 고민이 로우로우 안경 곳곳에 묻어있죠. 이들은 도구의 경량화를 위해 가장 가벼운 소재를 찾다가 가성비와 피부건강까지 배려할 수 있는 베타 티타늄을 재료로 채택했는데요. 금속을 아주 얇고 가늘게 가공하는 디자인을 도입해 착용감이 편안한 안경으로 입소문을 타고 있습니다.</p>
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