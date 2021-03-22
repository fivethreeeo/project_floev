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
              <p className="en">TART OPTICAL</p>
              <p className="ko">타르트 옵티컬</p>
            </div>
            <div className="bgBk"></div>
            <div className="titImg"><img src="/img/brd/01iy-tit-big-1.jpg" alt="" /></div>
          </div>

          <div className="infoWrap">
            <p className="caption">브랜드정보</p>
            <ul className="specTable">
              <li><span>브랜드명</span><span><strong>TART OPTICAL</strong></span></li>
              {/*<li><span>브랜드명</span><span><strong>ASHCROFT</strong></span></li>*/}
              <li><span>제조사</span><span><strong>RAINCOAT</strong></span></li>
              <li><span>원산지</span><span><strong>JAPAN</strong></span></li>
              <li><span>가격</span><span><strong>20~40만원대</strong></span></li>
            </ul>
          </div>

          <div className="modelWrap">
            <p className="caption">인기모델</p>

          </div>

          <div className="descWrap">
            <p className="caption">브랜드설명</p>
            <div className="mainImg"><img src="/img/brd/01iy-tit-big-1.jpg" alt="" /></div>
            <h3 className="mainTxt">타르트 옵티컬, 플라스틱 안경테를 유행시킨 안경 역사의 산증인</h3>
            <p className="mainDesc">오늘날 사랑받는 안경디자인의 대부분은 20세기 중반 미국에서 완성됐다고 해요. 20세기 중반은 보급형 안경의 전성기였죠. 그때부터 플라스틱이 가성비 좋은 재료로 채택됐습니다. 다양한 메이커가 앞다퉈 뿔테안경을 만들어냈어요, 당시에 대유행한 스타일은 지금도 뿔테안경의 정석으로 손꼽히고 있죠. 타르트 옵티컬은 당시 미국 안경업계를 이끈 트렌드 세터였어요. 아쉽게도 20세기 후반에 회사의 문을 닫았지만요.</p>
            <div className="subImg"><img src="/img/brd/01iy-desc-big-1.jpg" alt="" /></div>
            <h4 className="subTxt">역사 속으로 사라진 브랜드를 다시 복원하다</h4>
            <p className="subDesc">레인코트라는 안경메이커가 타르트 옵티컬의 국내 상표권을 갖고 있습니다. 타르트 옵티컬의 헤리티지를 이으려는 노력을 하고 있죠. 이들은 당시에 유행한 빈티지 디자인을 복각하되, 우수한 플라스틱 재료를 채택하고 있어요. 다양한 패턴을 지닌 플라스틱을 들여와, 같은 디자인에 다양한 컬러를 가진 제품을 줄 세우고 있죠. 옛 모습에 충실한 복각판 안경에서 개성 있는 색감을 가진 개량형 디자인까지 두루 살펴볼 수 있다는 게 특장점입니다.</p>
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