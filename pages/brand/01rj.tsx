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
                <p className="en">NAITO KUMAHACHI</p>
                <p className="ko">나이토 쿠마하치</p>
              </div>
              <div className="bgBk"></div>
              <div className="titImg"><img src="/static/img/brd/01rj-tit-big-1.jpg" alt=""/></div>
            </div>

            <div className="infoWrap">
              <p className="caption">브랜드정보</p>
              <ul className="specTable">
                <li><span>브랜드명</span><span><strong>NAITO KUMAHACHI</strong></span></li>
                {/*<li><span>브랜드명</span><span><strong>ASHCROFT</strong></span></li>*/}
                <li><span>제조사</span><span><strong>Nova</strong></span></li>
                <li><span>원산지</span><span><strong>JAPAN</strong></span></li>
                <li><span>가격</span><span><strong>30~40만원대</strong></span></li>
              </ul>
            </div>

            <div className="modelWrap">
              <p className="caption">인기모델</p>
 
            </div>

            <div className="descWrap">
              <p className="caption">브랜드설명</p>
              <div className="mainImg"><img src="/static/img/brd/01rj-tit-big-1.jpg" alt=""/></div>
              <h3 className="mainTxt">나이토 쿠마하치, 그 이름도 생소한 ‘네오-클래식Neo-Classic’ 아이웨어</h3>
              <p className="mainDesc">패션 아이템에 ‘네오-클래식Neo-Classic’이라는 말이 붙으면, 물건에 화려한 장식이 달라붙을 거라 생각해주세요. 네오 클래식은 디자이너가 공들인 설계가 아이템 구석구석 균형을 이루며 배치되는 형태예요. ‘나이토 쿠마하치'는 안경테의 네오 클래식 디자인을 추구합니다.</p>
              <div className="subImg"><img src="/static/img/brd/01rj-desc-big-1.jpg" alt=""/></div>
              <h4 className="subTxt">새로운 멋은 전통의 파격적인 조합에서 태어나는 것</h4>
              <p className="subDesc">이들은 티타늄과 강화플라스틱인 아세테이트를 짝지었습니다. 전체적인 뼈대는 최경량 금속 소재인 티타늄을 쓰고, 얼굴의 인상을 결정지을 렌즈 프레임만 풍부한 색감을 간직한 아세테이트 뿔테를 입혔죠. 프레임 디자인 자체는 안경의 오래된 전통을 지키지만, 남들이 잘 시도하지 않는 재료를 파격적으로 묶어봅니다. 그러면서 누구도 본적 없는 아름다움이 하나씩 드러나는 게 ‘네오-클래식 아이템’의 매력입니다.</p>
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