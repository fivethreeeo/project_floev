import React from 'react'
import Layout from '../layout/DefaultLayout'
import Router from 'next/router'

const EventPage = () => {

    return (
        <Layout title="플로브 - 나의 눈을 위한 안경 큐레이션 서비스">
        <div className="global640"><div className="goBackBtnWrap"><div className="goBackBtn" onClick={() => Router.back()}></div></div></div>
        <div className="wrap">
        <p className="fontR" style={{fontSize:'12px',color:'#c3512a'}}>review event</p>
            <p style={{marginTop:'28px',fontSize:'28px'}}>네이버 맵/카카오 맵<br/>플로브 구매 리뷰<br/>남겨주실거죠?</p>

            <div className="clearDiv">
              <div style={{float:'left',paddingTop:'26px'}}>
                <p style={{fontSize:'10px'}}>*네이버/카카오 모두 참여 가능합니다.</p>
                <p style={{fontSize:'10px'}}>*타 할인 혜택과 중복 적용이 불가능합니다.</p>
              </div>
              <div style={{float:'right',width:'115px'}}><img src="/static/img/newLanding/kakao-naver-app.png" alt="네이버맵, 카카오맵"/></div>
            </div>

              <div style={{margin:'24px 0 0',width:'100%',height:'1px',backgroundColor:'#fff'}}></div>
              <p className="ppp" style={{textAlign:'center',fontSize:'13px',margin:'32px 0 40px'}}>최대 3만원 할인이 가능한 리뷰 혜택, 받으셨나요?<br/>플로브는 고객님의 소중한 리뷰를 기다려요.</p>

              <div>
                <div style={{margin:'0 auto 4px',width:'48px',height:'1px',backgroundColor:'#fff'}}></div>
                <p style={{textAlign:'center',fontSize:'12px',color:'#6dd400'}}>네이버 맵 리뷰</p>
                <div style={{margin:'16px 0'}} className="clearDiv">
                  <div className="clearDiv" style={{width:'calc( 50% - 8px )',float:'left',marginRight:'8px'}}>
                    <div className="fontR" style={{fontSize:'10px',float:'left',padding:'0',textAlign:'center',width:'15px',height:'15px',borderRadius:'10px',background:'#6dd400',color:'#64433F'}}>1</div>
                    <div className="fontfont" style={{float:'left',marginLeft:'4px',fontSize:'11px'}}>네이버 맵 - MY 플레이스 클릭<br/><br/></div>
                    <div style={{float:'left',width:'100%',marginTop:'6px'}}><img src="/static/img/newLanding/naver-map-1.png" alt="네이버 맵 - MY 플레이스 클릭"/></div>
                  </div>
                  <div className="clearDiv" style={{width:'calc( 50% - 8px )',float:'left',marginLeft:'8px'}}>
                    <div className="fontR" style={{fontSize:'10px',float:'left',padding:'0',textAlign:'center',width:'15px',height:'15px',borderRadius:'10px',background:'#6dd400',color:'#64433F'}}>2</div>
                    <div className="fontfont" style={{float:'left',marginLeft:'4px',fontSize:'11px'}}>영수증 인증 리뷰하기 클릭하고<br/>- 영수증 사진 촬영하면 끝!</div>
                    <div style={{float:'left',width:'100%',marginTop:'6px'}}><img src="/static/img/newLanding/naver-map-2.png" alt="영수증 인증 리뷰하기 클릭하고 영수증 사진 촬영하면 끝!"/></div>
                  </div>
                </div>
              </div>

              <div style={{marginTop:'48px'}}>
                <div style={{margin:'0 auto 4px',width:'48px',height:'1px',backgroundColor:'#fff'}}></div>
                <p style={{textAlign:'center',fontSize:'12px',color:'#ffe900'}}>카카오 맵 리뷰</p>
                <div style={{margin:'16px 0'}} className="clearDiv">
                  <div className="clearDiv" style={{width:'calc( 50% - 8px )',float:'left',marginRight:'8px'}}>
                    <div className="fontR" style={{fontSize:'11px',float:'left',padding:'0',textAlign:'center',width:'15px',height:'15px',borderRadius:'10px',background:'#ffe900',color:'#64433F'}}>1</div>
                    <div className="fontfont" style={{float:'left',marginLeft:'4px',fontSize:'11px'}}>카카오 맵 - 플로브 검색<br/><br/></div>
                    <div style={{float:'left',width:'100%',marginTop:'6px'}}><img src="/static/img/newLanding/kakao-map-3.png" alt="네이버 맵 - MY 플레이스 클릭"/></div>
                  </div>
                  <div className="clearDiv" style={{width:'calc( 50% - 8px )',float:'left',marginLeft:'8px'}}>
                    <div className="fontR" style={{fontSize:'11px',float:'left',padding:'0',textAlign:'center',width:'15px',height:'15px',borderRadius:'10px',background:'#ffe900',color:'#64433F'}}>2</div>
                    <div className="fontfont" style={{float:'left',marginLeft:'3px',fontSize:'10px'}}>플로브라운지 역삼성당/강남 클릭하고<br/>- 하단 별점리뷰 등록하면 끝!</div>
                    <div style={{float:'left',width:'100%',marginTop:'6px'}}><img src="/static/img/newLanding/kakao-map-2.png" alt="플로브라운지 역삼성당/강남 클릭하고 하단 별점리뷰 등록하면 끝!"/></div>
                  </div>
                </div>
              </div>

              <p  className="ppp" style={{textAlign:'center',marginTop:'44px'}}><strong>플로브와의 약속,</strong><br/>소중하게 생각해주신 고객님께 감사드립니다.</p>
          <style jsx>{`
          .wrap {padding:80px 20px 200px;background:#64433F}
          div, p {color:#fff}
          img {width:100%}
          .clearDiv::after {display:block;clear:both;content:''}

          @media (min-width: 640px) {
            .wrap {padding:80px 80px 200px}
            .fontfont {margin-top:-2px;font-size:12px!important}
            .ppp {font-size:15px!important}
          }
        `}</style>
        </div>
        </Layout>
        
    )
}

export default EventPage