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
                <p className="en">STEPHANE CHRISTIAN</p>
                <p className="ko">스테판 크리스티앙</p>
              </div>
              <div className="bgBk"></div>
              <div className="titImg"><img src="/static/img/brd/01eh-tit-big-1.jpg" alt=""/></div>
            </div>

            <div className="infoWrap">
              <p className="caption">브랜드정보</p>
              <ul className="specTable">
                <li><span>브랜드명</span><span><strong>STEPHANE CHRISTIAN</strong></span></li>
                {/*<li><span>브랜드명</span><span><strong>ASHCROFT</strong></span></li>*/}
                <li><span>제조사</span><span><strong>Stephane Christian</strong></span></li>
                <li><span>원산지</span><span><strong>CHINA</strong></span></li>
                <li><span>가격</span><span><strong>10~20만원대</strong></span></li>
              </ul>
            </div>

            <div className="modelWrap">
              <p className="caption">인기모델</p>

            </div>

            <div className="descWrap">
              <p className="caption">브랜드설명</p>
              <div className="mainImg"><img src="/static/img/brd/01eh-tit-big-1.jpg" alt=""/></div>
              <h3 className="mainTxt">프렌치 시크, 도시인이 누릴 수 있는 최상급 멋을 추구하다</h3>
              <p className="mainDesc">역사적으로 보면, 프랑스인은 세계에서 도시적인 생활양식을 가장 먼저 맛본 사람들입니다. 도시로 밀려드는 첨단 문물을 먼저 누렸기에, 멋을 구분 짓는 안목이 좋은 편이죠. 이런 안목을 가지고 몸을 꾸미는 사람들에게 사람들은 보통 ‘세련되다’라는 말을 건냅니다.</p>
              <div className="subImg"><img src="/static/img/brd/01eh-desc-big-1.jpg" alt=""/></div>
              <h4 className="subTxt">스테판 크리스티앙, 어반 라이프와 어울리는 아이웨어를 꿈꾸다</h4>
              <p className="subDesc">스테판 크리스티앙은 ‘프렌치 시크’를 추구하는 아이웨어 브랜드입니다. ‘프렌치 시크’는 프랑스 여성 특유의 세련된 멋을 묘사하는 말이죠. 문화권이 다르면 직관적으로 이해할 수 없는 표현이긴 한데, 간단히 말하면 ‘노력하지 않은 멋’이에요. 구체적인 패션을 꼽으면, 색의 온도나 명암이 튀지 않는 무채색 계열의 옷에 안경이나 목도리 같은 액세서리로 포인트를 주는 패션 스타일이죠. 프렌치 시크 아이웨어라면, 일상복과 잘 어울리면서도 착용자의 얼굴이 간직한 개성을 효과적으로 드러낼 것. 어반 라이프 스타일을 효과적으로 드러내는 심볼을 찾고 있다면, 스타일링의 포인트를 안경으로 주고 싶다면, 스테판 크리스티앙의 안경을 걸쳐보세요.</p>
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