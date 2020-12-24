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
                <p className="en">DeuMeu&</p>
                <p className="ko">드므앤</p>
              </div>
              <div className="bgBk"></div>
              <div className="titImg"><img src="/static/img/brd/01re-tit-big-1.jpg" alt=""/></div>
            </div>

            <div className="infoWrap">
              <p className="caption">브랜드정보</p>
              <ul className="specTable">
                <li><span>브랜드명</span><span><strong>DeuMeu&</strong></span></li>
                {/*<li><span>브랜드명</span><span><strong>ASHCROFT</strong></span></li>*/}
                <li><span>제조사</span><span><strong>Respect Eyewear</strong></span></li>
                <li><span>원산지</span><span><strong>KOREA</strong></span></li>
                <li><span>가격</span><span><strong>10~20만원대</strong></span></li>
              </ul>
            </div>

            <div className="modelWrap">
              <p className="caption">인기모델</p>
 
            </div>

            <div className="descWrap">
              <p className="caption">브랜드설명</p>
              <div className="mainImg"><img src="/static/img/brd/01re-tit-big-1.jpg" alt=""/></div>
              <h3 className="mainTxt">드므앤, 눈가에 비친 모습이 맑고 투명하길 바라던 조상님의 마음으로</h3>
              <p className="mainDesc">드므는 넓적하게 생긴 그릇을 이르는 순우리말이에요. 조상님들은 드므에 물을 담아, 수면에 비친 모습을 또렷하게 비추는 틀로 썼습니다. 무언가 똑바로 바라보려는 틀, 드므의 역할을 지금은 안경이 맡고 있죠. 알맞게 쓴 안경은 세상을 환하게 비추고, 안경을 쓴 사람의 멋도 환하게 비춥니다.</p>
              <div className="subImg"><img src="/static/img/brd/01re-desc-big-1.jpg" alt=""/></div>
              <h4 className="subTxt">모양이 무난하고 쓰기에도 편안한 베이직 프레임</h4>
              <p className="subDesc">드므를 세가지로 나눠 써보시는 건 어떨까요. 모서리를 신경서서 깎은 사각꼴 드므, 눈가를 부드럽게 감싸는 둥근꼴 드므, 복고적 감성을 담은 투-브릿지 드므. 특별하지 않으려 애쓴 티타늄 마감, 상황을 타지 않는 베이직 디자인을 간직한 아이웨어 브랜드, 드므앤을 소개합니다.</p>
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