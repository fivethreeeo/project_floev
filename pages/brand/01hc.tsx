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
              <p className="en">KIO YAMATO</p>
              <p className="ko">키오 야마토</p>
            </div>
            <div className="bgBk"></div>
            <div className="titImg"><img src="/img/brd/01hc-tit-big-1.jpg" alt="" /></div>
          </div>

          <div className="infoWrap">
            <p className="caption">브랜드정보</p>
            <ul className="specTable">
              <li><span>브랜드명</span><span><strong>KIO YAMATO</strong></span></li>
              {/*<li><span>브랜드명</span><span><strong>ASHCROFT</strong></span></li>*/}
              <li><span>제조사</span><span><strong>Lamy</strong></span></li>
              <li><span>원산지</span><span><strong>JAPAN</strong></span></li>
              <li><span>가격</span><span><strong>30~50만원대</strong></span></li>
            </ul>
          </div>

          <div className="modelWrap">
            <p className="caption">인기모델</p>

          </div>

          <div className="descWrap">
            <p className="caption">브랜드설명</p>
            <div className="mainImg"><img src="/img/brd/01hc-tit-big-1.jpg" alt="" /></div>
            <h3 className="mainTxt">티타늄을 썼다는 이유만으로 고급 안경테로 인정받는 시대는 끝났다</h3>
            <p className="mainDesc">고급 티타늄 안경테로 인정받으려면 무엇을 해야 할까요? 최근 안경업계는 고급 메탈 프레임을 만들 때, 대부분 티타늄을 사용합니다. 모양을 잡는 게 까다로운 금속이지만, 안경메이커는 회사의 모든 역량을 티타늄 가공 기술에 집중시키고 있어요. 티타늄을 쓴다는 게 당연하게 됐다면, 이제 단박에 눈에 띄는 요소로 차이를 빚어내야 하지 않을까요? 디자인이나 컬러처럼 보면 바로 알아챌 수 있는 요소 말이지요.</p>
            <div className="subImg"><img src="/img/brd/01hc-desc-big-1.jpg" alt="" /></div>
            <h4 className="subTxt">키오 야마토, 척 보면 아름다운 안경테를 추구하는 영-브랜드</h4>
            <p className="subDesc">키오 야마토는 미국에서 디자인을 공부해, 일본에서 제품을 생산하는 젊은 안경메이커 집단입니다. 이들은 최근 아세테이트 플라스틱과 금속재료의 활용도를 높이는데 투자를 아끼지 않았다고 해요. 투자는 가공 기술의 혁신으로 이어졌습니다. 기하학적으로 배치된 힌지의 결합은 비주얼에 있어 단박에 개성을 알아챌법한 설계요소입니다. 또한 마감 처리에 신경 써, 다른 티타늄 베이스 안경테에서 보기 힘든 신비한 질감, 영롱한 색감이 제품라인업 전체에 고르게 퍼져있습니다.</p>
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