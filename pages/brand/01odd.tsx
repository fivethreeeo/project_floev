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
                <p className="en">Odd-eyewear</p>
                <p className="ko">오드아이웨어</p>
              </div>
              <div className="bgBk"></div>
              <div className="titImg"><img src="/static/img/brd/01odd-tit-big-1.jpg" alt=""/></div>
            </div>

            <div className="infoWrap">
              <p className="caption">브랜드정보</p>
              <ul className="specTable">
                <li><span>브랜드명</span><span><strong>Odd-eyewear</strong></span></li>
                {/*<li><span>브랜드명</span><span><strong>ASHCROFT</strong></span></li>*/}
                <li><span>제조사</span><span><strong>b&k옵틱</strong></span></li>
                <li><span>원산지</span><span><strong>KOREA</strong></span></li>
                <li><span>가격</span><span><strong>10~20만원대</strong></span></li>
              </ul>
            </div>

            <div className="modelWrap">
              <p className="caption">인기모델</p>
 
            </div>

            <div className="descWrap">
              <p className="caption">브랜드설명</p>
              <div className="mainImg"><img src="/static/img/brd/01odd-tit-big-1.jpg" alt=""/></div>
              <h3 className="mainTxt">고객을 듣고 안경을 이야기한 안경사의 노하우.</h3>
              <p className="mainDesc">오드아이웨어는 20년간 안경사로 고객들과 소통한 노하우를 바탕으로 만들어진 안경 전문 브랜드입니다. 고객을 들었던 경험은 자유로운 피팅을 통한 편안함으로 기능하였고, 편안한 일상 속에서 안경의 작은 디테일을 느낄 수 있는 디자인으로 당신에게 다가갑니다. 매일 착용하는 편안한 안경, 하지만 그 속에서도 즐거운 디테일을 경험할 수 있습니다.</p>
              <div className="subImg"><img src="/static/img/brd/01odd-desc-big-1.jpg" alt=""/></div>
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