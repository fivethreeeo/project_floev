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
              <p className="en">ASHCROFT</p>
              <p className="ko">애쉬크로프트</p>
            </div>
            <div className="bgBk"></div>
            <div className="titImg"><img src="/img/brd/01rl-tit-big-1.jpg" alt="" /></div>
          </div>

          <div className="infoWrap">
            <p className="caption">브랜드정보</p>
            <ul className="specTable">
              <li><span>브랜드명</span><span><strong>ASHCROFT</strong></span></li>
              {/*<li><span>브랜드명</span><span><strong>ASHCROFT</strong></span></li>*/}
              <li><span>제조사</span><span><strong>COMMANDER NINE</strong></span></li>
              <li><span>원산지</span><span><strong>CHINA</strong></span></li>
              <li><span>가격</span><span><strong>10만원대</strong></span></li>
            </ul>
          </div>

          <div className="modelWrap">
            <p className="caption">인기모델</p>

          </div>

          <div className="descWrap">
            <p className="caption">브랜드설명</p>
            <div className="mainImg"><img src="/img/brd/01rl-tit-big-2.jpg" alt="" /></div>
            <h3 className="mainTxt">애쉬크로프트, 문화를 얼굴에 쓴다</h3>
            <p className="mainDesc">훌륭한 안경메이커는 ‘정확한 안경’을 만듭니다. 이것은 불량품이 하나도 없는 안경을 말하는 게 아니에요. 정확한 안경은 메이커가 안경에 담으려는 메시지가 근사하기 때문에, 메이커의 철학이 물건에 고스란히 드러나기에 다른 브랜드로 대체될 수 없는 안경입니다. 그런 점에서 한국의 안경메이커 애쉬크로프트는 문화적인 메시지가 꽤 근사한 아이웨어를 내고 있습니다.</p>
            <div className="subImg"><img src="/img/brd/01rl-desc-big-1.jpg" alt="" /></div>
            <h4 className="subTxt">스토리텔링을 담아낸 안경디자인의 매력</h4>
            <p className="subDesc">애쉬크로프트는 늘 ‘작품’을 ‘제품’ 앞에 세워요. 메이커가 존경하는 작가의 작품, 메이커가 동경하는 역사의 한 장면을 ‘안경’에 반영해요. 특히 안경의 설계와 마감은 창작자가 고른 작품의 내용과 긴밀히 이어져 있답니다. 영웅의 심벌, 이야기의 주제를 안경부품의 마감이나 도색에 짝지어요. 이런 독특한 제작과정이 애쉬크로포트 특유의 유니크한 디자인이 됩니다.</p>
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