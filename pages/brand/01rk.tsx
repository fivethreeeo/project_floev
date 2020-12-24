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
                <p className="en">MIKI BUNJI</p>
                <p className="ko">미키 분지</p>
              </div>
              <div className="bgBk"></div>
              <div className="titImg"><img src="/static/img/brd/01rk-tit-big-1.jpg" alt=""/></div>
            </div>

            <div className="infoWrap">
              <p className="caption">브랜드정보</p>
              <ul className="specTable">
                <li><span>브랜드명</span><span><strong>MIKI BUNJI</strong></span></li>
                {/*<li><span>브랜드명</span><span><strong>ASHCROFT</strong></span></li>*/}
                <li><span>제조사</span><span><strong>Nova</strong></span></li>
                <li><span>원산지</span><span><strong>JAPAN</strong></span></li>
                <li><span>가격</span><span><strong>30~40만원대</strong></span></li>
              </ul>
            </div>

            <div className="modelWrap">
              <p className="caption">인기모델</p>
            </div>

            <div className="descWrap">
              <p className="caption">브랜드설명</p>
              <div className="mainImg"><img src="/static/img/brd/01rk-tit-big-1.jpg" alt=""/></div>
              <h3 className="mainTxt">미키 분지, 사람이 더 잘 만들 수 있는 안경이 있다고 믿어요</h3>
              <p className="mainDesc">3D 프린터의 등장과 자동화 기계의 발달로, 수작업을 고집하던 안경 메이커들은 차별화를 위해 갖은 애를 써왔습니다. 기계보다 나은 사람의 솜씨는 무엇인지를 고민하면서요. 사람은 기계와 달리, 옛날을 되짚을 수 있는 지성을 갖고 있습니다. 흘러간 과거로부터 배움을 얻을 지혜가 있죠. 메이커는 결국 솔루션을 찾아냅니다.</p>
              <div className="subImg"><img src="/static/img/brd/01rk-desc-big-1.jpg" alt=""/></div>
              <h4 className="subTxt">빈티지한 매력을 자아내는 플립형 프레임</h4>
              <p className="subDesc">미키 분지는 플립형 안경테를 만드는 브랜드입니다. 플립형 구조는 안경이 맨 처음 등장할 무렵의 올드 디자인인데, 일본 수제안경메이커의 감성으로 재해석합니다. 라운드 프레임을 쌍둥이처럼 덧대, 렌즈가 들어가는 앞부분은 위로 들어 올릴 수 있어요. 렌즈를 마음대로 들었다 놨다 할 수 있으니 다양한 용도로 응용할 수 있겠죠. 미키분지의 안경은 아직 밝혀지지 않은 패션 스타일을 시도하는 사람에게 미적인 영감을 불어넣을 것으로 기대됩니다.</p>
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