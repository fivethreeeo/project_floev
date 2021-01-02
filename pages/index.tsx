import Head from 'next/head'
import Layout from '../layout/DefaultLayout'
import React, { useEffect, useState } from 'react'
import { Modal, Carousel, Accordion } from 'antd-mobile'
import { gql, useMutation } from '@apollo/client'

const CREATE_USER_MUTATION = gql`
  mutation signUpUser2($name: String, $phn: String) {
    signUpUser2(name: $name, phn: $phn) {
      id
    }
  }
`

// 타입 정의
declare global {
  // Window 객체 타입
  interface Window {
    Kakao: any
    analytics: any
    gtag: Function
  }
  interface Process {
    browser: boolean
  }
}
declare var process: Process
declare function gtag_button1(): void;
declare function gtag_button2(): void;

const IndexPage = () => {
  const [modalView, setModalView] = useState(false)
  const [name, setName] = useState('')
  const [phn, setPhn] = useState('')
  const [completed, setCompleted] = useState(false)
  const [createUser] = useMutation(CREATE_USER_MUTATION);

  const onChangeName = (e: any) => {
    setName(e.target.value)
  }
  const onChangePhn = (e: any) => {
    setPhn(e.target.value)
  }
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('12cae5545ba9f2d8993ff4d8b45478de')
    }
    window.Kakao.PlusFriend.createChatButton({
      container: '#plusfriend-chat-button',
      plusFriendId: '_qxajuT' // 플러스친구 홈 URL에 명시된 id로 설정합니다.
    })
  })


  const handleGtag1 = () => {
    if (process.browser) {
      gtag_button1()
    }
  }

  const handleGtag2 = () => {
    if (process.browser) {
      gtag_button2()
    }
  }

  return (
    <>
      {/* Google Pixel: index.js -> survey.js */}
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        function gtag_button1() {
          console.log("gtag_button1 START")
          gtag('event', 'conversion', {
              'send_to': 'AW-738487034/sJQHCJqHhuIBEPrVkeAC',
          });
          console.log("gtag_button1 END")
          return false;
        }
        function gtag_button2() {
          console.log("gtag_button2 START")
          gtag('event', 'conversion', {
              'send_to': 'AW-738487034/xtCNCOqDhuIBEPrVkeAC',
          });
          console.log("gtag_button2 END")
          return false;
        }
      `,
          }}
        />
        {/* Kakao Pixel */}
        <script type="text/javascript" charSet="UTF-8" src="//t1.daumcdn.net/adfit/static/kp.js"></script>
		<script type="text/javascript">kakaoPixel('784604748053330030').pageView('arrivehome');</script>
      </Head>
      <Layout title="플로브 - 나의 눈을 위한 안경 큐레이션 서비스">
        <Modal
          popup
          visible={modalView}
          onClose={() => {
            setModalView(false);
          }}
          animationType="slide-up"
        >
          {completed === false ? (
            <div className="modalWrap kakao__1">
              <button className="gtm-034 closeBtn" onClick={() => {setModalView(false);}}><img src="/static/img/newLanding/close-btn.png" alt="" /></button>
              <div className="modalDesc">
                <p className="main">스타일부터 불편함까지,<br /><strong>어떤 안경 고민을 가지고 계시나요?</strong></p>
                <p className="sub"><strong>안경에 대한 궁금한 모든 것</strong>을<br />무료로 카톡 상담 받아보세요.</p>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  window.analytics.identify({
                    name: name,
                    phn: phn,
                  });
                  createUser({ variables: { name: name, phn: phn } });
                  setName("");
                  setPhn("");
                  setCompleted(true);
                }}
              >
                <div className="kakaoForm">
                  <input className="name" type="text" name="name" placeholder={"이름"} maxLength={10} value={name} onChange={onChangeName}/>
                  <input className="tel" type="tel" name="phoneNumber" placeholder={"휴대폰 번호 (  '-' 없이 숫자만 입력 )"} maxLength={11} value={phn} onChange={onChangePhn}/>
                  {phn.length >= 11 && name !== "" ? (
                    <button type="submit" className="gtm-033" onClick={() => {handleGtag2();}}>안경 무료상담 받기</button>
                  ) : (
                    <button className="disabled" disabled>안경 무료상담 받기</button>
                  )}
                  <div className="policy">
                    <Accordion className="my-accordion">
                      <Accordion.Panel header="개인정보 수집·이용 동의함">
                        <div className="inner">
                          <p>본 상담 신청 고객은 개인정보 수집·이용에 대하여 동의를 거부할 권리를 가지고 있으며, 미 동의 시상담를 신청하실 수 없습니다.</p>
                          <p>개인정보 수집·이용에 대한 동의</p>
                          <p> - 목적: 상담 신청 시 본인 확인 및 개별 연락</p>
                          <p> - 항목: 이름, 휴대전화 번호</p>
                          <p> - 보유기간: 동의(신청) 시점 후 180일</p>
                        </div>
                      </Accordion.Panel>
                    </Accordion>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div className="modalWrap kakao__2">
              <div className="modalDesc">
                <p className="main">플로브의 안경 카운셀러와<br />카카오톡 상담이 시작됩니다.<br /><strong>카카오톡 어플을 확인해주세요!</strong></p>
                <p className="sub"><u>상담시간 : 오전 10시 ~ 오후 7시</u></p>
                <p className="sub__2">*상담 시간 이외에 접수된 신청은<br />순차적으로 상담 가능 시간에 연락을 드립니다.</p>
              </div>
              <button className="confirm" type="button" onClick={() => {setModalView(false);}}>확인</button>
              <button className="closeBtn" onClick={() => {setModalView(false);}}></button>
            </div>
          )}
        </Modal>

		<div className="indexPage">

			<header className="header">
				<div className="header__inner">
					<div className="header__logo"><a href="/"><img src="/static/img/newLanding/fv_logo_bk.svg" alt="" /></a></div>
					<nav className="header__nav">
						<ul>
							<li><a href="/lounge/yeoksam">라운지 역삼성당</a></li>
							<li><a href="/lounge/gangnam">라운지 강남</a></li>
							<li><a href="/brand">플로브 추천 안경</a></li>
							<li><a href="/service-policy">서비스 정책 안내</a></li>
							<li><a href="https://www.instagram.com/floev_official/" target="_blank"><img src="/static/img/newLanding/i_insta.svg" alt="" /></a></li>
						</ul>
					</nav>
				</div>
			</header>

			<div className="main-visual">
				<div className="main-visual__inner">
					<div className="main-visual__img-wrap">
						<div className="main-visual__img"><img src="/static/img/newLanding/counselor_w.gif" alt="메인 비주얼 이미지1"/></div>
					</div>
					<div className="main-visual__desc-wrap">
						<div className="desc-wrap__inner">
							<Carousel className="main-visual__title"
								vertical
								dots={false}
								autoplay
								infinite
							>
								<p className=""><strong>나에게 맞는 안경</strong>을 찾는 것,<br/>플로브에서는 쉬워요.</p>
								<p className=""><strong>나만의 안경 찾기,</strong><br/>쉽고 정확한 안경 큐레이션</p>
							</Carousel>
							<p className="main-visual__caption">잘 몰랐던 내 안경의 불편함을 발견하고<br/>진짜 나에게 어울리는 안경을 추천받는 서비스</p>
							<div className="main-visual__btn">
								<button className="gtm-001 btn-cta" onClick={() => {setModalView(true);handleGtag1();}}>안경 무료상담 받기</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="banner-event">
				<div className="banner-event__inner">
					<a href="/2020-winter-event">
						
						<div className="event-desc"><span className="event-tag">안경 기부 이벤트</span><span className="event-text">안쓰는 안경 기부하면 안경 구매시</span> <strong>최대 8만원 할인 혜택! &#xE001;</strong></div>
					</a>
				</div>
			</div>
				
			<div className="message">
				<div className="message__inner">
					<ul>
						<li><strong>we listen.</strong></li>
						<li><strong>we recommend.</strong></li>
						<li><strong>we care.</strong></li>
					</ul>
					<p>수많은 안경 속, 나에게 맞는 안경은 어떤 것일까 고민한 적 있으신가요?<br/>나의 불편함을 해결하고 나의 이미지와 취향에 맞는 안경을 큐레이션 받으세요.</p>
				</div>
			</div>

			<div className="find-story">
				<div className="find-story__title"><strong><p>이런 불편함을 <span></span>플로브를 통해 해결했어요.</p></strong></div>
				<div className="find-story__inner">
					<Carousel
					arrows
                    className="find-story__carousel"
                    selectedIndex={0}
					autoplay={false}
					infinite
					>
						<div className="find-story__card">
							<div className="find-story__img-wrap">
								<div className="find-story__img"><img src="/static/img/newLanding/find_story_2.png" alt=""/></div>
							</div>
							<div className="find-story__desc-wrap">
								<div className="find-story__tag-wrap">
									<div className="find-story__tag">고도근시</div>
								</div>
								<div className="find-story__story-title">안경테 디자인은 항상 비슷하게, 렌즈는 n번 압축 정도?</div>
								<div className="find-story__story-content">지금껏 안경을 맞출 땐 주위가 시끌벅적하고 계속 손님들이 오는 상황에서 급하게 맞추었어요. 안경테 디자인은 항상 쓰던 것과 비슷하게, 렌즈는 안과 검진표대로, 렌즈 선택은 n번 압축 정도?<br/>플로브는 정밀한 검사와 디자인 추천까지, 또 양쪽 눈 중 어느 쪽을 더 많이 사용하는지 등 하나하나 설명과 함께 나와 어울리는 안경을 찾을 수 있도록 상담해 주셔서 너무 좋았습니다.<br/><br/></div>
								<div className="find-story__customer">김** 님</div>
							</div>
						</div>
						<div className="find-story__card">
							<div className="find-story__img-wrap">
								<div className="find-story__img"><img src="/static/img/newLanding/find_story_1.png" alt=""/></div>
							</div>
							<div className="find-story__desc-wrap">
								<div className="find-story__tag-wrap">
									<div className="find-story__tag">피로감</div>
									<div className="find-story__tag">시각불편</div>
								</div>
								<div className="find-story__story-title">안과나 안경점에 갈 정도는 아니라고 생각했지만..</div>
								<div className="find-story__story-content">눈이 쉽게 피로가 오고, 항상 컴퓨터 업무를 하다 보니 앞이 갑자기 잘 안 보일 때가 있었는데요 안과나 안경점에 갈 정도는 아니라고 생각했지만..<br/> 서비스를 받고 나서 제 눈에 대해서 이해할 수 있었고 디자인 예쁜 안경을 맞출 수 있어서 외모가 더 빛을 발하는 것 같네요! 제가 좋아서 남자친구도 플로브에서 맞추게 했는데 이전 안경에서 있던 묘한 두통이 사라졌다고 하네요!<br/><br/></div>
								<div className="find-story__customer">김** 님</div>
							</div>
						</div>
						<div className="find-story__card">
							<div className="find-story__img-wrap">
								<div className="find-story__img"><img src="/static/img/newLanding/find_story_3.png" alt=""/></div>
							</div>
							<div className="find-story__desc-wrap">
								<div className="find-story__tag-wrap">
									<div className="find-story__tag">피로감</div>
									<div className="find-story__tag">라섹/라식</div>
								</div>
								<div className="find-story__story-title">라섹을 했기 때문에 보는 것에는 문제가 없지만,</div>
								<div className="find-story__story-content">이직을 준비하며 컴퓨터를 사용하는 경우가 많아져서 그런지 눈이 많이 피로하다는 것이 느껴졌어요. 사실 라섹을 했기 때문에 보는 것에는 문제가 없지만 여자친구의 추천으로 데이트 겸 플로브에 갔어요.<br/>저만을 위해 다양한 안경테를 추천해 줘서 선택의 폭이 넓었다는 게 좋았습니다. 다양한 느낌을 재미있게 착용해보니 나에게 잘 어울리는 안경이 어떤 건지 알겠더라구요!<br/><br/></div>
								<div className="find-story__customer">김** 님</div>
							</div>
						</div>
						<div className="find-story__card">
							<div className="find-story__img-wrap">
								<div className="find-story__img"><img src="/static/img/newLanding/find_story_4.png" alt=""/></div>
							</div>
							<div className="find-story__desc-wrap">
								<div className="find-story__tag-wrap">
									<div className="find-story__tag">고도근시</div>
									<div className="find-story__tag">안구건조</div>
									<div className="find-story__tag">테불편</div>
								</div>
								<div className="find-story__story-title">안경을 쓰면 하염없이 못생겨지는 사람</div>
								<div className="find-story__story-content">시력이 많이 나빠서 안경을 쓰면 하염없이 못생겨지는 사람이라 오랜 시간 일회용 콘택트렌즈를 착용했어요. 이마저도 요즘은 안구 건조증으로 힘들어져서 그나마 덜 못생겨지는 안경테를 추천해달라고 적었는데 테, 렌즈, 코 받침 높이까지 꼼꼼하게 따져서 추천해 주셨어요. 덕분에 안경을 잘 쓰고 다닙니다!<br/><br/></div>
								<div className="find-story__customer">김** 님</div>
							</div>
						</div>
						<div className="find-story__card">
							<div className="find-story__img-wrap">
								<div className="find-story__img"><img src="/static/img/newLanding/find_story_5.png" alt=""/></div>
							</div>
							<div className="find-story__desc-wrap">
								<div className="find-story__tag-wrap">
									<div className="find-story__tag">알레르기</div>
									<div className="find-story__tag">테불편</div>
								</div>
								<div className="find-story__story-title">막연하게 안경 취향을 찾고 싶었는데</div>
								<div className="find-story__story-content">직장 생활을 시작하고 안경을 늘 착용하게 되며 안경은 ‘인상’과 ‘개성’을 드러내는 물건이 되었어요. 그래서 막연하게 안경 취향을 찾고 싶었는데 플로브 큐레이션으로 표현하고 싶었던 ‘이미지’, 금속 알레르기를 유발하지 않는 ‘소재’, 끌리는 이야기를 가진 ‘브랜드’, 이 3가지의 요건을 모두 충족하는 안경을 고를 수 있었습니다. 좋아하는 옷을 입고 집 밖을 나갈 때의 설렘처럼 좋아하는 안경을 착용하니 볼 때마다 기분이 좋네요.<br/><br/></div>
								<div className="find-story__customer">김** 님</div>
							</div>
						</div>
						<div className="find-story__card">
							<div className="find-story__img-wrap">
								<div className="find-story__img"><img src="/static/img/newLanding/find_story_6.png" alt=""/></div>
							</div>
							<div className="find-story__desc-wrap">
								<div className="find-story__tag-wrap">
									<div className="find-story__tag">고도근시</div>
									<div className="find-story__tag">테불편</div>
								</div>
								<div className="find-story__story-title">항상 값싼 안경만 찾아 쓰면서 고생했을 내 눈</div>
								<div className="find-story__story-content">직장을 그만두고 공시생의 길로 들어선 제 자신에게 선물을 주고 싶었어요. 항상 값싼 안경만 찾아 쓰면서 고생했을 제 눈에게 안경은 소중한 선물이라고 생각해요. 착용 중 A/S가 필요했는데 그 과정이 정말 친절했어요! 구매한지 5개월 정도 지났는데 정말 후회 없습니다!<br/><br/></div>
								<div className="find-story__customer">김** 님</div>
							</div>
						</div>
						<div className="find-story__card">
							<div className="find-story__img-wrap">
								<div className="find-story__img"><img src="/static/img/newLanding/find_story_7.png" alt=""/></div>
							</div>
							<div className="find-story__desc-wrap">
								<div className="find-story__tag-wrap">
									<div className="find-story__tag">시각불편</div>
									<div className="find-story__tag">테불편</div>
								</div>
								<div className="find-story__story-title">평소 호피나 골드브라운 계열의 콤비만 착용했었는데,</div>
								<div className="find-story__story-content">노안이 시작되어서 독서용 안경을 맞추게 되었는데 가볍고 편안해서 더 자주 쓰고 있어요. 안경테도 평소 호피나 골드브라운 계열의 콤비만 착용했었는데 안경테 추천해 주실 때 꼼꼼하게 봐주셔서 이번에는 그레이 계열의 스틸 안경테를 시도해봤어요! 그리고 대만족이에요🤗<br/><br/></div>
								<div className="find-story__customer">김** 님</div>
							</div>
						</div>
					</Carousel>
					<div className="btn-carousel-wrap">
						<button className="btn-carousel"><img src="/static/img/newLanding/btn-left.png" alt=""/></button>
						<button className="btn-carousel"><img src="/static/img/newLanding/btn-right.png" alt=""/></button>
					</div>
				</div>
			</div>

			<div className="service__title"><strong><p>플로브 안경 큐레이션, <span></span>어떻게 받을 수 있나요?</p></strong></div>
			<div className="service">
				<div className="inner">
					<div className="descWrap">
						<div className="imgWrap">
							<div className="img"><img src="/static/img/newLanding/ser1.png" alt="" /></div>
							<div className="img"><img src="/static/img/newLanding/ser2.png" alt="" /></div>
							<div className="clearfix"></div>
						</div>
						<div className="txtWrap">
							<p className="fontR">01</p>
							<p>상담을 통해 추천되는 16가지 안경테</p>
							<p>카카오톡 사전 상담을 통해 나만의 안경 고민을 알려주세요. 플로브 라운지에서 고민을 해결할 수 있는 16가지 안경테를 만나볼 수 있습니다.</p>
							<div className="brandLink"><a href="/brand">플로브 추천 안경 보러가기 &#xE001;</a></div>
						</div>
					</div>
					<div className="descWrap">
						<div className="imgWrap">
							<div className="img"><img src="/static/img/newLanding/ser3.png" alt="" /></div>
							<div className="img"><img src="/static/img/newLanding/ser4.png" alt="" /></div>
							<div className="clearfix"></div>
						</div>
						<div className="txtWrap">
							<p className="fontR">02</p>
							<p>읽어주는 검안과 렌즈가 쉬워지는 상담</p>
							<p>전문적인 용어와 이해할 수 없는 설명은 플로브에서 찾아볼 수 없어요. 내 눈에 대해 정확하게 알고, 나의 필요에 맞게 합리적인 렌즈 선택을 할 수 있습니다.</p>
						</div>
					</div>
					<div className="descWrap">
						<div className="imgWrap">
							<div className="img"><img src="/static/img/newLanding/ser5.png" alt="" /></div>
							<div className="img"><img src="/static/img/newLanding/ser6.png" alt="" /></div>
							<div className="clearfix"></div>
						</div>
						<div className="txtWrap">
							<p className="fontR">03</p>
							<p>나에게 필요한 맞춤 상담과<br/>자유로운 안경 체험</p>
							<p>라운지는 100% 예약으로 운영되며 안경 카운셀러와 1:1로 50분간 큐레이션을 받아요. 내가 원하는 이미지, 불편함, 추천된 안경의 특징, 브랜드 이야기 등 선택을 위한 모든 큐레이션이 제공됩니다. 모든 과정은 자유롭게, 구매는 옵션, 큐레이션 서비스는 무료입니다.</p>
						</div>
					</div>
				</div>
			</div>


			<div className="lounge">
				<div className="lounge__title"><strong><p>플로브는 왜 <span></span>안경원이 아닌 라운지일까요?</p></strong></div>
				<div className="lounge__caption"><p>수많은 안경이 진열된 딱딱한 안경원이 아닌, 나에게 충분히 집중할 수 있는 1:1 서비스 공간을 즐겨보세요.</p></div>
				<div className="lounge__list">
					<div className="lounge__thumb"><a href="/lounge/yeoksam"><div><img src="/static/img/newLanding/lounge_y_0.png" alt=""/></div><p>라운지 역삼성당</p></a></div>
					<div className="lounge__thumb"><a href="/lounge/gangnam"><div><img src="/static/img/newLanding/lounge_g_0.png" alt=""/></div><p>라운지 강남</p></a></div>
				</div>
			</div>


			<div className="bottom-cta">
				<div className="bottom-cta__inner">
					<button className="gtm-002 btn-cta"onClick={() => {setModalView(true);}}>안경 무료상담 받기</button>
				</div>
			</div>

			<div className="company">
				<p className="company__name">(주)씨에이치스퀘어</p>
				<ul className="company__info">
					<li><span>대표자명</span><span>천영환</span></li>
					<li><span>사업자등록번호</span><span>699-86-01370</span></li>
					<li><span>통신판매업신고</span><span>2019-서울강남-02689</span></li>
					<li><span>주소</span><span>서울시 강남구 테헤란로4길 38-5, 6층</span></li>
					<li><span>전화/이메일</span><span>1544-8767 | contact@floev.com</span></li>
					<li><span>개인정보책임자</span><span>엄태산</span></li>
				</ul>
				<div className="company__link"><a href="http://www.ftc.go.kr/bizCommPop.do?wrkr_no=6998601370" target="_blank">사업자정보확인</a> | <a href="/service-policy"><span>서비스 정책 안내</span></a> | <a href="https://www.instagram.com/floev_official/" target="_blank">instagram</a></div>
			</div>

          </div>

      </Layout>
    </>
  );
}

export default IndexPage
