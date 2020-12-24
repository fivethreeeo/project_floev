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
                <p className="en">SUGIMOTO KEI</p>
                <p className="ko">스기모토 케이</p>
              </div>
              <div className="bgBk"></div>
              <div className="titImg"><img src="/static/img/brd/01rc-tit-big-1.jpg" alt=""/></div>
            </div>

            <div className="infoWrap">
              <p className="caption">브랜드정보</p>
              <ul className="specTable">
                <li><span>브랜드명</span><span><strong>SUGIMOTO KEI</strong></span></li>
                {/*<li><span>브랜드명</span><span><strong>ASHCROFT</strong></span></li>*/}
                <li><span>제조사</span><span><strong>Sugimoto Kei</strong></span></li>
                <li><span>원산지</span><span><strong>JAPAN</strong></span></li>
                <li><span>가격</span><span><strong>40~70만원대</strong></span></li>
              </ul>
            </div>

            <div className="modelWrap">
              <p className="caption">인기모델</p>
            </div>

            <div className="descWrap">
              <p className="caption">브랜드설명</p>
              <div className="mainImg"><img src="/static/img/brd/01rc-tit-big-1.jpg" alt=""/></div>
              <h3 className="mainTxt">스기모토 케이, 천하제일안경대회를 제패한 실력자</h3>
              <p className="mainDesc">‘동경 국제 안경 박람회(IOFT)’는 전 세계의 안경메이커가 모이는 글로벌 컨퍼런스입니다. 이곳에 모인 안경 장인들은 각자 열심히 준비한 신상품을 선보이는데요. 행사가 끝날 무렵이 되면, 박람회에 출품한 안경 중에서도 가장 빼어난 안경을 뽑는 그랑프리 대회가 열립니다. 사실상 매해 열리는 안경 월드컵이죠. 스기모토 케이는 2009년도 IOFT 그랑프리를 따낸 메이커입니다.</p>
              <div className="subImg"><img src="/static/img/brd/01rc-desc-big-1.jpg" alt=""/></div>
              <h4 className="subTxt">세계의 강호를 꺾은 비결은 ‘안경 입체감 살리기’</h4>
              <p className="subDesc">이들은 두꺼운 아세테이트 원단을 사용해 입체감을 살린 디자인에 능숙합니다. 뿔테안경 특유의 밋밋한 질감을 없애는 대신, 뿔테에 깃든 선을 풍부한 색채로 물들였는데, 이는 디자인과 재료 가공면에서 독보적인 완성도를 보여주고 있어요. 스기모토 케이는 이 완성도를 뿔테 뿐만 아니라 금속 재질에도 발휘하며, 묵직한 윤곽을 선호하는 안경매니아의 열렬한 지지를 받고 있습니다.</p>
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