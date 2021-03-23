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
              <p className="en">VYCOZ</p>
              <p className="ko">바이코즈</p>
            </div>
            <div className="bgBk"></div>
            <div className="titImg"><img src="/img/brd/01en-tit-big-1.jpg" alt="" /></div>
          </div>

          <div className="infoWrap">
            <p className="caption">브랜드정보</p>
            <ul className="specTable">
              <li><span>브랜드명</span><span><strong>VYCOZ</strong></span></li>
              {/*<li><span>브랜드명</span><span><strong>ASHCROFT</strong></span></li>*/}
              <li><span>제조사</span><span><strong>Jeong's Optical</strong></span></li>
              <li><span>원산지</span><span><strong>KOREA</strong></span></li>
              <li><span>가격</span><span><strong>10~20만원대</strong></span></li>
            </ul>
          </div>

          <div className="modelWrap">
            <p className="caption">인기모델</p>

          </div>

          <div className="descWrap">
            <p className="caption">브랜드설명</p>
            <div className="mainImg"><img src="/img/brd/01en-tit-big-1.jpg" alt="" /></div>
            <h3 className="mainTxt">바이코즈, 안경은 안경사가 제일 잘 만듭니다</h3>
            <p className="mainDesc">안경은 산업 디자이너들이 만든 경우가 많습니다. 패션 아이템으로는 훌륭할 겁니다. 하지만 안경은 원래 멋으로 쓰려고 만들어진 아이템은 아니죠. 그래서 한국의 안경사들이 뭉쳤습니다. 바이코즈는 안경사가 안경사의 관점으로 디자인하는 아이웨어 브랜드입니다. 베테랑 안경사는 안경의 본질을 세 가지 단어로 짧게 압축합니다. "light, comfortable, simple"</p>
            <div className="subImg"><img src="/img/brd/01en-desc-big-1.jpg" alt="" /></div>
            <h4 className="subTxt">글로벌 바이어가 인정하는 수준 높은 안경특허기술</h4>
            <p className="subDesc">바이코즈는 ‘특허기술’을 내는데 집중하고 있어요. 안경의 기능성을 높이기 위해, 남들이 당연하게 여기는 공정을 두번 세번 곱씹어요. 바이코즈는 최근 렌즈테와 다리를 연결하는 ‘힌지’ 때문에 주목받고 있습니다. 기계공학적인 창의성이 사람 본연의 얼굴을 잘 살려준다는 평가를 받고 있어요. 덕분에 매년 해외수출량이 늘어나고 있죠. 세계로 뻗어나가는 바이코즈의 안경을 만나보세요.</p>
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