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
                <p className="en">YELLOWS PLUS</p>
                <p className="ko">옐로우즈 플러스</p>
              </div>
              <div className="bgBk"></div>
              <div className="titImg"><img src="/static/img/brd/01jj-tit-big-1.jpg" alt=""/></div>
            </div>

            <div className="infoWrap">
              <p className="caption">브랜드정보</p>
              <ul className="specTable">
                <li><span>브랜드명</span><span><strong>YELLOWS PLUS</strong></span></li>
                {/*<li><span>브랜드명</span><span><strong>ASHCROFT</strong></span></li>*/}
                <li><span>제조사</span><span><strong>G.A. YELLOWS</strong></span></li>
                <li><span>원산지</span><span><strong>JAPAN</strong></span></li>
                <li><span>가격</span><span><strong>40~50만원대</strong></span></li>
              </ul>
            </div>

            <div className="modelWrap">
              <p className="caption">인기모델</p>
 
            </div>

            <div className="descWrap">
              <p className="caption">브랜드설명</p>
              <div className="mainImg"><img src="/static/img/brd/01jj-tit-big-1.jpg" alt=""/></div>
              <h3 className="mainTxt">옐로우즈 플러스, 정성 하나로 일궈낸 프리미엄 안경테</h3>
              <p className="mainDesc">옐로우즈 플러스의 모든 안경에는 ‘hand finish’란 문구가 새겨져 있어요. 숙련된 기술자의 눈썰미와 손끝 기술을 거쳐 새겨진 문구입니다. 어렵게, 그리고 정성껏 만들었으니 부디 알아달라는 뜻이겠지요. 도장으로 새긴 메이커의 뜻은 너그러운 착용감을 위한 ‘설계’에서 잘 드러납니다. 피부색이나 골격의 차이를 골고루 포괄하려는 디자인을 짜거든요.</p>
              <div className="subImg"><img src="/static/img/brd/01jj-desc-big-1.jpg" alt=""/></div>
              <h4 className="subTxt">모양은 고정시키고 다양한 빛과 색을 담아내다</h4>
              <p className="subDesc">이들의 안경은 색이 진하고 톤이 쨍한 게 특징이에요. 도전을 두려워하지 않는 기술자들이 새로운 발색과 까다로운 마감칠을 시도하기 때문이에요. 시그니처 셰이프인 육각형 디자인을 정석으로 두고, 다양한 컬러 블렌딩을 시도하는 게 눈에 띕니다. 풍성하게 배치된 색감은 착용자의 감성을 풍요롭게 합니다.</p>
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