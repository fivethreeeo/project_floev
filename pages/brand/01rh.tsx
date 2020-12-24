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
                <p className="en">KINJIRO</p>
                <p className="ko">긴지로</p>
              </div>
              <div className="bgBk"></div>
              <div className="titImg"><img src="/static/img/brd/01rh-tit-big-1.jpg" alt=""/></div>
            </div>

            <div className="infoWrap">
              <p className="caption">브랜드정보</p>
              <ul className="specTable">
                <li><span>브랜드명</span><span><strong>KINJIRO</strong></span></li>
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
              <div className="mainImg"><img src="/static/img/brd/01rh-tit-big-1.jpg" alt=""/></div>
              <h3 className="mainTxt">긴지로, 금속에서 느낄 수 없는 플라스틱 질감에 매력을 느낀다면</h3>
              <p className="mainDesc">셀룰로이드와 아세테이트는 사람들이 흔히 뿔테라 부르는 안경 재료입니다. 플라스틱이죠. 플라스틱은 액체 상태에서 다양한 재료와 섞인 채 굳어진다고 해요. 안경에 쓰는 고급 플라스틱은 다양한 재료와 배합됩니다. 그래서 고급 뿔테안경엔 독특한 질감이 드러나는 편이죠. 혹시 독보적인 컬러감을 드러내는 뿔테안경을 찾으시나요?</p>
              <div className="subImg"><img src="/static/brd/01rh-desc-big-1.jpg" alt=""/></div>
              <h4 className="subTxt">일평생 뿔테주의자, PLASTIC LOVE</h4>
              <p className="subDesc">‘KINJIRO’는 일본 안경장인의 본명입니다. ‘마쓰나가 긴지로増永 金治郎’씨는 반백년을 안경 연마에만 집중해왔습니다. 일평생 수만 개의 안경을 직접 손으로 깎았다고 해요. 10년, 20년, 30년, 50년. 시간을 머금고, 기술은 쑥쑥 자랍니다. 장인 중에서도 진정한 의미로 물건과 하나 되어 사는 사람은 드물죠. 아마 긴지로씨가 찾아낸 색은 오직 뿔테안경에서만 느낄 수 있는 색일 겁니다.</p>
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