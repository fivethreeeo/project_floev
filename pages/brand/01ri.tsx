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
                <p className="en">NIWA MASAHIKO</p>
                <p className="ko">니와 마사히코</p>
              </div>
              <div className="bgBk"></div>
              <div className="titImg"><img src="/static/img/brd/01ri-tit-big-1.jpg" alt=""/></div>
            </div>

            <div className="infoWrap">
              <p className="caption">브랜드정보</p>
              <ul className="specTable">
                <li><span>브랜드명</span><span><strong>NIWA MASAHIKO</strong></span></li>
                {/*<li><span>브랜드명</span><span><strong>ASHCROFT</strong></span></li>*/}
                <li><span>제조사</span><span><strong>Nova</strong></span></li>
                <li><span>원산지</span><span><strong>JAPAN</strong></span></li>
                <li><span>가격</span><span><strong>40~50만원대</strong></span></li>
              </ul>
            </div>

            <div className="modelWrap">
              <p className="caption">인기모델</p>
 
            </div>

            <div className="descWrap">
              <p className="caption">브랜드설명</p>
              <div className="mainImg"><img src="/static/img/brd/01ri-tit-big-1.jpg" alt=""/></div>
              <h3 className="mainTxt">니와 마사히코, 훌륭한 레트로는 시대를 정확하게 겨냥한다</h3>
              <p className="mainDesc">‘쇼와 시대’는 20세기 중후반의 일본을 가리킵니다. 일본인들은 쇼와 시대를 가파른 경제성장에 힘입어 다양한 문화가 싹텄던 시절로 추억해요. ‘니와 마사히코’는 쇼와 시대를 조명하는 레트로 안경 브랜드입니다. 쇼와 시대의 안경은 합금을 꼼꼼하게 세공한 안경테가 많아, 수공예품스러운 마감 처리가 두드러집니다. 수작업으로 둥글게 철사를 감아 기본 골격을 만들고, 귀 끝과 코 끝에 걸리는 부품에 독특한 질감의 아세테이트를 입혀 약간 빛바랜 톤으로 마감합니다.</p>
              <div className="subImg"><img src="/static/img/brd/01ri-desc-big-1.jpg" alt=""/></div>
              <h4 className="subTxt">복고안경의 본질은 과거와 현대의 성공적인 융합</h4>
              <p className="subDesc">이들은 복고적인 디자인에만 집착해, 오늘날의 기술발전을 놓치는 실수를 범하지 않습니다. 얼굴 전체에 골고루 무게를 분산 시켜 안경 전체의 무게중심을 맞추는 인체공학적 설계는 ‘니와 마사히코'가 성공적인 레트로 메이커라는 사실을 증명합니다. 흘러간 과거의 제품 디자인을 모방하는데 그치지 않고, 가장 최신의 과학을 제품에 반영하니까요. 이는 현대인이 레트로 디자인에서 느끼는 아름다움이기도 합니다.</p>
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