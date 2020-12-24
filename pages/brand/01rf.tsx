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
                <p className="en">SAVILE ROW</p>
                <p className="ko">새빌로우</p>
              </div>
              <div className="bgBk"></div>
              <div className="titImg"><img src="/static/img/brd/01rf-tit-big-1.jpg" alt=""/></div>
            </div>

            <div className="infoWrap">
              <p className="caption">브랜드정보</p>
              <ul className="specTable">
                <li><span>브랜드명</span><span><strong>SAVILE ROW</strong></span></li>
                {/*<li><span>브랜드명</span><span><strong>ASHCROFT</strong></span></li>*/}
                <li><span>제조사</span><span><strong>Algha Group</strong></span></li>
                <li><span>원산지</span><span><strong>United Kingdom</strong></span></li>
                <li><span>가격</span><span><strong>40~60만원대</strong></span></li>
              </ul>
            </div>

            <div className="modelWrap">
              <p className="caption">인기모델</p>
 
            </div>

            <div className="descWrap">
              <p className="caption">브랜드설명</p>
              <div className="mainImg"><img src="/static/img/brd/01rf-tit-big-1.jpg" alt=""/></div>
              <h3 className="mainTxt">새빌로우, 영국신사의 헤리티지를 끌어안은 안경메이커</h3>
              <p className="mainDesc">새빌로우의 전신은 앨거-웍스라는 영국을 대표하는 안경명가입니다. 영국은 세계대전과 복지제도 때문에, 나라가 특정 회사에 안경제작을 몰아서 맡긴 독특한 역사를 갖고 있는데요. 앨거-웍스는 나라가 맡긴 임무를 100여 년간 성실히 수행하며, 21세기까지 축적한 안경제조전통을 자랑스러워합니다. 헤리티지를 진정성 있게 전달하기 위해 새빌로우라는 수제 안경메이커로 변신했어요.</p>
              <div className="subImg"><img src="/static/img/brd/01rf-desc-big-1.jpg" alt=""/></div>
              <h4 className="subTxt">한 땀 한 땀, 부지런히 공들여서 만든 수제안경</h4>
              <p className="subDesc">새빌로우는 클래식한 모양을 고수하되, 유니크한 재료를 안경부품에 넣어 개성 있게 조합하는 일에 집중했어요. 유니크한 디자인을 사용자 취향에 알맞게 개조하는 비스포크 방식을 발달시켰죠. 고객 한 사람이 원하는 취향을 제품에 반영하는 일을 할 수 있는 메이커는 지극히 드물며, 새빌로우의 커스터마이징 솜씨는 안경업계 탑-티어로 손꼽힙니다.</p>
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