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
                <p className="en">EYEVAN 7285</p>
                <p className="ko">아이반 7285</p>
              </div>
              <div className="bgBk"></div>
              <div className="titImg"><img src="/static/img/brd/01fw-tit-big-1.jpg" alt=""/></div>
            </div>

            <div className="infoWrap">
              <p className="caption">브랜드정보</p>
              <ul className="specTable">
                <li><span>브랜드명</span><span><strong>EYEVAN 7285</strong></span></li>
                {/*<li><span>브랜드명</span><span><strong>ASHCROFT</strong></span></li>*/}
                <li><span>제조사</span><span><strong>Optec Japan</strong></span></li>
                <li><span>원산지</span><span><strong>JAPAN</strong></span></li>
                <li><span>가격</span><span><strong>30~50만원대</strong></span></li>
              </ul>
            </div>

            <div className="modelWrap">
              <p className="caption">인기모델</p>
 
            </div>

            <div className="descWrap">
              <p className="caption">브랜드설명</p>
              <div className="mainImg"><img src="/static/img/brd/01fw-tit-big-1.jpg" alt=""/></div>
              <h3 className="mainTxt">아이반 7285, 안경이 예술작품이 되기를 소망하다</h3>
              <p className="mainDesc">뛰어난 수공예 장인은 탁월한 미적 감각을 갖고 있습니다. 그들이 센스를 키우는 비결은 예술기록자료에 있다고 해요. 수집된 빈티지 아이템, 박물관에 있을 법한 유물 유적을 살피며 물건에 담을 디자인 패턴을 추출하죠. 또 자연이나 건축물에서 관찰자에게 쾌감을 주는 독특한 문양을 발견해, 그것을 창작에 녹여냅니다.</p>
              <div className="subImg"><img src="/static/img/brd/01fw-desc-big-1.jpg" alt=""/></div>
              <h4 className="subTxt">너 안경, 그저 아름답기를</h4>
              <p className="subDesc">안경이 시간, 장소, 상황을 고려한 패션 아이템으로서 각광받기 시작한 건 21세기의 일입니다만, EYEVAN 7285는 그보다 수십 년을 앞질러갔습니다. 그들은 안경의 아름다움이 시간, 장소, 상황에 구애받지 않기를 소망하며 작업을 이어왔거든요. 세공과 발색이 수려한 안경테를 찾는 사람들의 많은 사랑을 받고 있습니다.</p>
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