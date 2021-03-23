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
              <p className="en">BJ CLASSIC</p>
              <p className="ko">BJ 클래식</p>
            </div>
            <div className="bgBk"></div>
            <div className="titImg"><img src="/img/brd/01ff-tit-big-1.jpg" alt="" /></div>
          </div>

          <div className="infoWrap">
            <p className="caption">브랜드정보</p>
            <ul className="specTable">
              <li><span>브랜드명</span><span><strong>BJ CLASSIC</strong></span></li>
              {/*<li><span>브랜드명</span><span><strong>ASHCROFT</strong></span></li>*/}
              <li><span>제조사</span><span><strong>Bros Japan</strong></span></li>
              <li><span>원산지</span><span><strong>JAPAN</strong></span></li>
              <li><span>가격</span><span><strong>30~40만원대</strong></span></li>
            </ul>
          </div>

          <div className="modelWrap">
            <p className="caption">인기모델</p>

          </div>

          <div className="descWrap">
            <p className="caption">브랜드설명</p>
            <div className="mainImg"><img src="/img/brd/01ff-tit-big-1.jpg" alt="" /></div>
            <h3 className="mainTxt">BJ 클래식, 흘러가는 역사를 붙잡는 전통지킴이</h3>
            <p className="mainDesc">안경역사 칠백년, 시간이 흐르고 세계 각지에서 많은 안경이 만들어져 왔습니다. 사람들은 좀 더 쾌적하고, 보다 기능적인 안경을 선택해 왔죠. 20세기 들어 안경의 모습이 대체로 비슷해지자 사람들은 그것을 ‘클래식’이라 불렀습니다.</p>
            <div className="subImg"><img src="/img/brd/01ff-desc-big-1.jpg" alt="" /></div>
            <h4 className="subTxt">안경에 애정을 담아, 존경을 담아</h4>
            <p className="subDesc">BJ클래식은 멸종위기에 처한 안경테를 멋지게 복원해내는 복각 전문 메이커입니다. 수십년 전에 유행했지만, 흔적을 찾기 힘들게 된 안경을 현대적으로 재해석합니다. 제작자가 스스로 밝히길, “스스로가 감동하는 물건만 계속 만들고 싶다”고 합니다. 클래식만 신경쓰고 클래식에 구애받고 싶었다는 메이커. 그렇게 만든 복각판 안경을 소중히 여기는 메이커라면, ‘클래식’이라는 대담한 어휘를 뽐내더라도, 꽤 믿음직스럽네요.</p>
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