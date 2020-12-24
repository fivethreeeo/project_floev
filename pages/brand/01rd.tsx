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
                <p className="en">John Lennon</p>
                <p className="ko">존레논</p>
              </div>
              <div className="bgBk"></div>
              <div className="titImg"><img src="/static/img/brd/01rd-tit-big-1.jpg" alt=""/></div>
            </div>

            <div className="infoWrap">
              <p className="caption">브랜드정보</p>
              <ul className="specTable">
                <li><span>브랜드명</span><span><strong>John Lennon</strong></span></li>
                {/*<li><span>브랜드명</span><span><strong>ASHCROFT</strong></span></li>*/}
                <li><span>제조사</span><span><strong>John Lennon Eyewear</strong></span></li>
                <li><span>원산지</span><span><strong>FRANCE</strong></span></li>
                <li><span>가격</span><span><strong>30~40만원대</strong></span></li>
              </ul>
            </div>

            <div className="modelWrap">
              <p className="caption">인기모델</p>
 
            </div>

            <div className="descWrap">
              <p className="caption">브랜드설명</p>
              <div className="mainImg"><img src="/static/img/brd/01rd-tit-big-1.jpg" alt=""/></div>
              <h3 className="mainTxt">존 레논, 이 세상 모든 둥근테의 오리지널</h3>
              <p className="mainDesc">예술가가 떠난 자리에는 두 가지가 남습니다. 작품이 남고, ‘스타일’이 남습니다. 팬덤이 예술가의 얼을 이어받아 스타일을 발전시키죠. 시대를 초월한 패션 스타일을 오늘날의 라이프 스타일에 맞춰 재해석하는 것. 메이커가 엉뚱한 헤리티지를 정식으로 구입해 새로운 브랜드로 런칭하는 이유입니다. 프랑스의 반백년 안경메이커 KNCO가 정식으로 ‘존 레논'의 저작권을 사들였습니다.</p>
              <div className="subImg"><img src="/static/img/brd/01rd-desc-big-1.jpg" alt=""/></div>
              <h4 className="subTxt">그 이름에, 한 점 부끄럼 없기를</h4>
              <p className="subDesc">이들은 ‘존 레논’의 이름값에 정당한 가치를 지불하며, 존 레논의 아이코닉한 이미지를 현대적으로 계승합니다. KNCO의 존 레논 시리즈는 존 레논의 클래식한 둥근 안경에만 머무르지 않고 직사각형, 타원형처럼 새로운 모양도 나란히 탐구합니다. 이 모든 실험은 ‘존 레논’의 헤리티지를 의식한 채 만들어지는데, 그것은 ‘존 레논’의 이미지가 트렌드를 초월한 라이프 스타일이 된다는 믿음에서 비롯됩니다.</p>
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