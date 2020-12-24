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
                <p className="en">IC BERLIN</p>
                <p className="ko">IC 베를린</p>
              </div>
              <div className="bgBk"></div>
              <div className="titImg"><img src="/static/img/brd/01gj-tit-big-1.jpg" alt=""/></div>
            </div>

            <div className="infoWrap">
              <p className="caption">브랜드정보</p>
              <ul className="specTable">
                <li><span>브랜드명</span><span><strong>IC BERLIN</strong></span></li>
                {/*<li><span>브랜드명</span><span><strong>ASHCROFT</strong></span></li>*/}
                <li><span>제조사</span><span><strong>ic! berlin</strong></span></li>
                <li><span>원산지</span><span><strong>GERMANY</strong></span></li>
                <li><span>가격</span><span><strong>60만원대</strong></span></li>
              </ul>
            </div>

            <div className="modelWrap">
              <p className="caption">인기모델</p>
 
            </div>

            <div className="descWrap">
              <p className="caption">브랜드설명</p>
              <div className="mainImg"><img src="/static/img/brd/01gj-tit-big-1.jpg" alt=""/></div>
              <h3 className="mainTxt">ic! berlin, 독일산 제품에는 뭔가 특별한 설계가 들어있다</h3>
              <p className="mainDesc">독일산 제품은 ‘기능’이 뛰어나다는 평가를 받죠. 독일 산업계는 ‘설계’를 고민하는 메이커를 존중합니다. 메이커는 인상적인 구조를 품은 제품설계에 열심이죠. 구조의 혁신은 기능의 향상으로 이어집니다. ic! berlin의 안경테도 설계가 빼어납니다. 그것은 안경이 부러져도 끄떡없음에, 안경이 휘어지지 않는 것에서 드러나요. 나사못이나 용접으로 결합한 기성 안경테의 제작 방식을 버렸거든요.</p>
              <div className="subImg"><img src="/static/img/brd/01gj-desc-big-1.jpg" alt=""/></div>
              <h4 className="subTxt">독일축구처럼 강력한 모던 디자인</h4>
              <p className="subDesc">안경이 부러지면, 부품을 주워 다시 조립하면 됩니다. 이는 부품이 서로 절묘하게 결합되는 기계공학적인 구조를 짜는데 집중했기 때문이죠. 덕분에 ic! berlin의 안경조각은 독특한 모습으로 금형됩니다. 부품의 총합인 안경테는 디자인적으로 독특한 미감을 발생시킵니다. 금속의 차갑고 묵직한 멋을 드러낸 안경이 얼굴에 연출하는 모던한 인상을 확인해보세요.</p>
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