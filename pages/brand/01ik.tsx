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
              <p className="en">RAYBAN</p>
              <p className="ko">레이밴</p>
            </div>
            <div className="bgBk"></div>
            <div className="titImg"><img src="/img/brd/01ik-tit-big-1.jpg" alt="" /></div>
          </div>

          <div className="infoWrap">
            <p className="caption">브랜드정보</p>
            <ul className="specTable">
              <li><span>브랜드명</span><span><strong>RAYBAN</strong></span></li>
              {/*<li><span>브랜드명</span><span><strong>ASHCROFT</strong></span></li>*/}
              <li><span>제조사</span><span><strong>Luxottica</strong></span></li>
              <li><span>원산지</span><span><strong>CHINA</strong></span></li>
              <li><span>가격</span><span><strong>10만원대</strong></span></li>
            </ul>
          </div>

          <div className="modelWrap">
            <p className="caption">인기모델</p>

          </div>

          <div className="descWrap">
            <p className="caption">브랜드설명</p>
            <div className="mainImg"><img src="/img/brd/01ik-tit-big-1.jpg" alt="" /></div>
            <h3 className="mainTxt">레이밴, ‘라이방’ 선글라스로 세계인의 사랑을 받아온 안경명가</h3>
            <p className="mainDesc">안경은 항공우주산업의 발전과 함께 성장했습니다. 대기권을 돌파하는 비행기는 눈을 제대로 뜰 수 없을 만큼 거친 환경이어서, 파일럿을 보호하려는 노력이 끊이질 않았다고 해요. 우주의 해로운 광선으로부터 눈을 보호하려는 연구 실험이 안경 디자인의 혁신으로 이어졌어요. 미국 공군 본부에 납품됐던 잠자리 눈알 모양의 레이밴 안경은 큼지막해서 효과적으로 눈을 보호했다고 합니다.</p>
            <div className="subImg"><img src="/img/brd/01ik-desc-big-1.jpg" alt="" /></div>
            <h4 className="subTxt">미국산 안경테의 큼지막한 멋에 이탈리아 패션그룹의 꼼꼼함을 더하다</h4>
            <p className="subDesc">21세기 들어 레이밴은 세계 최대 규모의 안경 그룹인 ‘룩소티카’그룹에 인수됐습니다. 패션의 본고장인 이탈리아 모기업의 영향을 받으며, 패션업계 최전선의 유행을 적극 받아들이고 있습니다. 덕분에 안경에 쓰이는 재료나 부품의 배합이 무척 다양해졌어요. 파일럿은 레이밴의 기능성을 사랑했지만 사람들은 레이밴의 다양한 멋을 선택하죠. 그래서 레이밴은 선글라스 디자인의 큼지막한 느낌을 살린 일반 안경테 라인업도 꾸준히 발매하고 있습니다.</p>
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