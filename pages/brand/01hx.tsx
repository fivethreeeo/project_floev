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
              <p className="en">HAND MADE ITEM</p>
              <p className="ko">핸드메이드 아이템</p>
            </div>
            <div className="bgBk"></div>
            <div className="titImg"><img src="/img/brd/01hx-tit-big-1.jpg" alt="" /></div>
          </div>

          <div className="infoWrap">
            <p className="caption">브랜드정보</p>
            <ul className="specTable">
              <li><span>브랜드명</span><span><strong>HAND MADE ITEM</strong></span></li>
              {/*<li><span>브랜드명</span><span><strong>ASHCROFT</strong></span></li>*/}
              <li><span>제조사</span><span><strong>Nova</strong></span></li>
              <li><span>원산지</span><span><strong>JAPAN</strong></span></li>
              <li><span>가격</span><span><strong>20~30만원대</strong></span></li>
            </ul>
          </div>

          <div className="modelWrap">
            <p className="caption">인기모델</p>

          </div>

          <div className="descWrap">
            <p className="caption">브랜드설명</p>
            <div className="mainImg"><img src="/img/brd/01hx-tit-big-1.jpg" alt="" /></div>
            <h3 className="mainTxt">핸드 메이드 아이템, 전통을 고집하는 수제안경명인의 손길로</h3>
            <p className="mainDesc">일본의 수공예문화는 로컬과 긴밀히 이어진다 해요. 잘 만든 지역특산품이 명성을 얻으면, 동네사람이 모두 달라붙어 품질관리에 들어가는 편인데, 안경도 마찬가지라고 해요. 혼슈 서북부의 안경마을, 후쿠이현 사바에시. 이곳엔 전통적인 방식을 고집하며 수제로 안경을 만드는 메이커들이 무리지어 살고 있습니다. 대를 이어 지역에 뿌리내린 사람들이 분업으로 안경을 한땀한땀 만들고 있습니다.</p>
            <div className="subImg"><img src="/img/brd/01hx-desc-big-1.jpg" alt="" /></div>
            <h4 className="subTxt">흐트러짐 없이 전통을 고수하는 일본의 수공예문화를 담아</h4>
            <p className="subDesc">핸드메이드아이템은 이런 일본수제안경의 제작과정에 충실한 브랜드입니다. 양산품은 감히 흉내낼 수 없는 제조공정을 고스란히 지킵니다. 수십년 경력의 제작자들이 각자 맡은 바 분업에 충실하게 안경부품을 만들어요. 효과적인 분업으로 지어낸 물건의 섬세함은 안경을 이리저리 뒤집어보면 단박에 알아 챌 수 있죠. 꼼꼼하게 검토한 안경부품으로 조립한 수제안경은 기계가 도달할 수 없는 빈티지한 매력을 자아냅니다.</p>
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