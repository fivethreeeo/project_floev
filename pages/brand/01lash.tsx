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
              <p className="en">LASH</p>
              <p className="ko">래쉬</p>
            </div>
            <div className="bgBk"></div>
            <div className="titImg"><img src="/img/brd/01lash-tit-big-1.jpg" alt="" /></div>
          </div>

          <div className="infoWrap">
            <p className="caption">브랜드정보</p>
            <ul className="specTable">
              <li><span>브랜드명</span><span><strong>LASH</strong></span></li>
              {/*<li><span>브랜드명</span><span><strong>ASHCROFT</strong></span></li>*/}
              <li><span>제조사</span><span><strong>(주)빅스타아이엔지</strong></span></li>
              <li><span>원산지</span><span><strong>CHINA</strong></span></li>
              <li><span>가격</span><span><strong>10~20만원대</strong></span></li>
            </ul>
          </div>

          <div className="modelWrap">
            <p className="caption">인기모델</p>

          </div>

          <div className="descWrap">
            <p className="caption">브랜드설명</p>
            <div className="mainImg"><img src="/img/brd/01lash-tit-big-1.jpg" alt="" /></div>
            <h3 className="mainTxt">모든 감정을 함께하는 안경</h3>
            <p className="mainDesc">LASH는 Love, Angry, Sad, Happy의 줄임말입니다. 뜻 그대로 살아가면서 느끼는 모든 감정들을 ‘아이웨어’를 통해 더욱 가까이에서, 깊고 풍부하게 경험하는 것을 생각합니다. 어떠한 틀 에도 구애받지 않고 자유롭게 전개되는 디자인은 누구나 즐거운 마음으로 착용할 수 있도록 제작되었습니다. 그 자유 분방함 속에서 잊고 있었던 당신의 감정을 다양하게 표출할 수 있기를 바랍니다.</p>
            <div className="subImg"><img src="/img/brd/01lash-desc-big-1.jpg" alt="" /></div>
            <h4 className="subTxt">대중의 취향이 된 LASH</h4>
            <p className="subDesc">트렌디 하면서도 포인트 있는 디자인, 사복 패션의 완성으로 래쉬의 뿔테 안경이 주목받았던 이유 아닐까요? 봉태규 안경으로 유명세를 이어가고 있는 래쉬는 셀럽템이자 대중템으로 자리 매김을 확실히 했습니다.</p>
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