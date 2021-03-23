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
              <p className="en">TONYSAME:</p>
              <p className="ko">토니세임</p>
            </div>
            <div className="bgBk"></div>
            <div className="titImg"><img src="/img/brd/01rb-tit-big-1.jpg" alt="" /></div>
          </div>

          <div className="infoWrap">
            <p className="caption">브랜드정보</p>
            <ul className="specTable">
              <li><span>브랜드명</span><span><strong>TONYSAME:</strong></span></li>
              {/*<li><span>브랜드명</span><span><strong>ASHCROFT</strong></span></li>*/}
              <li><span>제조사</span><span><strong>Tonysame</strong></span></li>
              <li><span>원산지</span><span><strong>JAPAN</strong></span></li>
              <li><span>가격</span><span><strong>20~30만원대</strong></span></li>
            </ul>
          </div>

          <div className="modelWrap">
            <p className="caption">인기모델</p>

          </div>

          <div className="descWrap">
            <p className="caption">브랜드설명</p>
            <div className="mainImg"><img src="/img/brd/01rb-tit-big-1.jpg" alt="" /></div>
            <h3 className="mainTxt">토니세임, 관상을 배려하면 훌륭한 안경을 만들 수 있어요</h3>
            <p className="mainDesc">동양인의 안경테, 동양인이 공감하는 안경테가 있으면 좋겠습니다. 생각보다 이 세상의 많은 물건은 서양인의 기준에 맞춰져있거든요. 특히 안경은 여전히 서구적인 얼굴에 맞춰져 나오고 있습니다. 서양인과 동양인의 관상이 엄연히 다른데 말이에요. 다양한 얼굴형을 고려한 메이커는 그리 많지 않습니다.</p>
            <div className="subImg"><img src="/img/brd/01rb-desc-big-1.jpg" alt="" /></div>
            <h4 className="subTxt">널찍한 얼굴도, 기다란 얼굴도 상냥하게 보살피는 안경설계</h4>
            <p className="subDesc">토니세임은 동양인 안경메이커의 연합동맹입니다. 이들은 4계절마다 다양한 기후를 맞이하는 아시아인의 보편적인 얼굴을 떠올렸죠. 높이가 짧고 너비가 긴 동양인의 관상을 배려했습니다. 토니세임의 안경은 렌즈가 달린 ‘림’과 안경다리를 잇는 힌지가 넉넉히 꺾이도록 고안된 설계로, 안경이 착용자의 얼굴에 알맞게 늘어나는 구조적 특징을 갖고 있습니다.</p>
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