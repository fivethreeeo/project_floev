import Head from 'next/head'
import Layout from '../layout/DefaultLayout'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Modal, Carousel, Collapse } from 'antd'
import { gql, useMutation } from '@apollo/client'
import { GetServerSideProps } from 'next'
import { createApolloClient } from '../lib/apolloClient'
// import CollapsePanel from 'antd/lib/collapse/CollapsePanel'
import { CaretRightOutlined } from '@ant-design/icons'

const CREATE_USER_MUTATION = gql`
  mutation createUser($name: String!, $phn: String!) {
    createUser(name: $name, phn: $phn) {
      id
    }
  }
`
const CHECKUP_USER = gql`
	query checkUpUser{
		checkUpUser{
			name
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

const IndexPage = ({
	user
}: {
	user: any
}) => {
	const router = useRouter()
	const [modalView, setModalView] = useState(false)
	const [tabIdx, setTabIdx] = useState(0)

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
		// window.Kakao.PlusFriend.createChatButton({
		// 	container: '#plusfriend-chat-button',
		// 	plusFriendId: '_qxajuT' // 플러스친구 홈 URL에 명시된 id로 설정합니다.
		// })
		window.Kakao.Channel.createAddChannelButton({
			container: '#create-channel-add-button',
			channelPublicId: '_xcLqmC',
		})
	})

	useEffect(() => {
		if (user) {
			router.push('/')
		}
	}, [user])


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

	const collapseCallback = (key: any) => {
		console.log("collapse key: " + key)
		setTabIdx(key)
	}

	const serviceTabs = () => {
		let component
		switch (tabIdx) {
			case 0:
				component = <> <div className="service__slide">
					<div className="content-txt">
						<div className="content-txt__inner">
							<div className="tabname">무료 상담, 무료 추천</div>
							<div className="title">안경상담부터 추천<br />큐레이션까지 모두 무료!</div>
							<div className="caption">카톡 안경 상담, 라운지 안경 큐레이션 서비스까지 모두 무료로 체험할 수 있어요.</div>
						</div>
					</div>
					<div className="content-img">
						<div className="content-img__inner">
							<img src="/static/img/home/home_service_1.jpg" alt="" />
						</div>
					</div>
				</div>
				</>
				break;
			case 1:
				component = <> <div className="service__slide">
					<div className="content-txt">
						<div className="content-txt__inner">
							<div className="tabname">맞춤 안경박스</div>
							<div className="title">고민이 사라지는<br />맞춤 안경박스</div>
							<div className="caption">나에게 맞춘 16개의 안경이 담긴 안경박스를 플로브 라운지에서 즐겨보세요.</div>
						</div>
					</div>
					<div className="content-img">
						<div className="content-img__inner">
							<img src="/static/img/home/home_service_2.jpg" alt="" />
						</div>
					</div>
				</div>
				</>
				break;
			case 2:
				component = <><div className="service__slide">
					<div className="content-txt">
						<div className="content-txt__inner">
							<div className="tabname">안경 카운셀러</div>
							<div className="title">안경 카운셀러와<br />쉽고 정확한 안경 찾기</div>
							<div className="caption">읽어주는 검안으로 쉬워지는 렌즈, 시각문제, 스타일까지 안경 카운셀러가 대신 고민하고 추천해드려요.</div>
						</div>
					</div>
					<div className="content-img">
						<div className="content-img__inner">
							<img src="/static/img/home/home_service_3.jpg" alt="" />
						</div>
					</div>
				</div>
				</>
				break;
			case 3:
				component = <> <div className="service__slide">
					<div className="content-txt">
						<div className="content-txt__inner">
							<div className="tabname">렌즈 무료 교환</div>
							<div className="title">실패 없는 안경<br />렌즈 2회 무료 교환</div>
							<div className="caption">교정시력에 딱 맞춰볼까?<br />불편한 렌즈는 한달 이내 무료로 2회 교환이 가능해요.</div>
						</div>
					</div>
					<div className="content-img">
						<div className="content-img__inner">
							<img src="/static/img/home/home_service_4.jpg" alt="" />
						</div>
					</div>
				</div></>
				break;
		}
		return component
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
			<Layout title="플로브 - 나의 눈을 위한 안경 큐레이션 서비스" name={user ? user.name : null}>
				<Modal
					centered
					width="100%"
					visible={modalView}
					onCancel={() => {
						setModalView(false);
					}}
				>
					{completed === false ? (
						<div className="modalWrap kakao__1">
							<button className="gtm-034 closeBtn" onClick={() => { setModalView(false); }}><img src="/static/img/newLanding/close-btn.png" alt="" /></button>
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
									<input className="name" type="text" name="name" placeholder={"이름"} maxLength={10} value={name} onChange={onChangeName} />
									<input className="tel" type="tel" name="phoneNumber" placeholder={"휴대폰 번호 (  '-' 없이 숫자만 입력 )"} maxLength={11} value={phn} onChange={onChangePhn} />
									{phn.length >= 11 && name !== "" ? (
										<button type="submit" className="gtm-033" onClick={() => { handleGtag2(); }}>안경 무료상담 받기</button>
									) : (
											<button className="disabled" disabled>안경 무료상담 받기</button>
										)}
									<div className="policy">
										<Collapse className="my-accordion" onChange={collapseCallback} expandIconPosition={'right'} ghost>
											<Collapse.Panel header="개인정보 수집·이용 동의함" key="1">
												<div className="inner">
													<p>본 상담 신청 고객은 개인정보 수집·이용에 대하여 동의를 거부할 권리를 가지고 있으며, 미 동의 시상담를 신청하실 수 없습니다.</p>
													<p>개인정보 수집·이용에 대한 동의</p>
													<p> - 목적: 상담 신청 시 본인 확인 및 개별 연락</p>
													<p> - 항목: 이름, 휴대전화 번호</p>
													<p> - 보유기간: 동의(신청) 시점 후 180일</p>
												</div>
											</Collapse.Panel>
										</Collapse>
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
								<button className="confirm" type="button" onClick={() => { setModalView(false); }}>확인</button>
								<button className="closeBtn" onClick={() => { setModalView(false); }}></button>
							</div>
						)}
				</Modal>

				<div className="indexPage">
					<div className="main-visual">
						<div className="main-visual__inner">
							<div className="main-visual__img-wrap">
								<div className="main-visual__img"><img src="/static/img/home/counselor_both.png" alt="메인 비주얼 이미지1" /></div>
							</div>
							<div className="main-visual__desc-wrap">
								<div className="desc-wrap__inner">
									<div className="main-visual__title">
										<p className=""><strong>나에게 잘 맞는 안경<br />무료로 추천 받아볼까?</strong></p>
									</div>
									<p className="main-visual__caption">잘 맞는 렌즈, 잘 맞는 사이즈, 잘 맞는 착용감<br />모든 고민이 해결되는 안경 추천 서비스 플로브</p>
									<div className="main-visual__btn">
										<button className="gtm-001 btn-cta" onClick={() => { setModalView(true); handleGtag1(); }}>안경추천 신청하기</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="banner-event">
						<div className="banner-event__inner">
							<a href="/2020-winter-event">

								<div className="event-desc">
									<span className="event-tag">이벤트</span>
									<span className="event-text">안쓰는 안경 기부하면 안경 구매시</span>
									<strong><span className="event-strong-m-only">안경기부, </span>최대 8만원 할인 혜택! &#xE001;</strong>
								</div>
							</a>
						</div>
					</div>

					<div className="score">
						<div className="score__inner">
							<div className="score__title">플로브에서 <span className="num">1,644명</span>이 <span className="br"></span><span>안경 추천상담</span>을 받았어요.</div>
							<div className="score__board">
								<div className="score__each">
									<div className="score__glasses"><span className="num">26,304</span><span className="type">장</span></div>
									<div className="score__name">추천된 안경</div>
								</div>
								<div className="line"></div>
								<div className="score__each">
									<div className="score__time"><span className="num">82,200</span><span className="type">분</span></div>
									<div className="score__name">추천상담 시간</div>
								</div>
								<div className="line"></div>
								<div className="score__each">
									<div className="score__per"><span className="num">87</span><span className="type">%</span></div>
									<div className="score__name">서비스 만족도</div>
								</div>
							</div>
							<div className="score__desc">
								<div className="left">
									<div>추천상담 만족도 평균 <span>8.9 / 10점</span></div>
									<div>시력상담 만족도 평균 <span>8.9 / 10점</span></div>
								</div>
								<div className="right">
									<div>서비스 추천지수 평균 <span>8.3 / 10점</span></div>
									<div>네이버/카카오맵 별점 평균 <span>4.9 / 5점</span></div>
								</div>
							</div>
						</div>
					</div>

					<div className="hashtags">
						<div className="hashtags__unit">#눈을알고_테를알면_백전백승</div>
						<div className="hashtags__unit">#나의_첫_큐레이션</div>
						<div className="hashtags__unit">#정말_필요했던_설명</div>
						<div className="hashtags__unit">#시각문제해결</div>
						<div className="hashtags__unit">#처음본안경테</div>
						<div className="hashtags__unit">#선물하고_싶은_경험</div>
						<div className="hashtags__unit">#기능을_넘어선_안경</div>
						<div className="hashtags__unit">#이미지에_맞는_안경</div>
					</div>

					<div className="find-story find-story__1">
						<div className="find-story__inner">
							<Carousel
								className="find-story__carousel"
								arrows
								autoplay
								infinite
								slidesToShow={3}
							>
								<div className="find-story__card">
									<div className="find-story__img-wrap">
										<div className="find-story__img"><img src="/static/img/home/find_story_1.jpg" alt="" /></div>
									</div>
									<div className="find-story__desc-wrap">
										<div className="find-story__story-title">평소 호피나 골드브라운 계열의 콤비만 착용했었는데,</div>
										<div className="find-story__story-content">노안이 시작되어서 독서용 안경을 맞추게 되었는데 가볍고 편안해서 더 자주 쓰고 있어요. 안경테도 평소 호피나 골드브라운 계열의 콤비만 착용했었는데 안경테 추천해 주실 때 꼼꼼하게 봐주셔서 이번에는 그레이 계열의 스틸 안경테를 시도해봤어요! 그리고 대만족이에요🤗</div>
									</div>
									<div className="find-story__tag-wrap">
										<div className="find-story__tag">시각불편</div>
										<div className="find-story__tag">테불편</div>
									</div>
								</div>
								<div className="find-story__card">
									<div className="find-story__img-wrap">
										<div className="find-story__img"><img src="/static/img/home/find_story_2.jpg" alt="" /></div>
									</div>
									<div className="find-story__desc-wrap">
										<div className="find-story__story-title">안경을 쓰면 하염없이 못생겨지는 사람</div>
										<div className="find-story__story-content">시력이 많이 나빠서 안경을 쓰면 하염없이 못생겨지는 사람이라 오랜 시간 일회용 콘택트렌즈를 착용했어요. 이마저도 요즘은 안구 건조증으로 힘들어져서 그나마 덜 못생겨지는 안경테를 추천해달라고 적었는데 테, 렌즈, 코 받침 높이까지 꼼꼼하게 따져서 추천해 주셨어요. 덕분에 안경을 잘 쓰고 다닙니다!</div>
									</div>
									<div className="find-story__tag-wrap">
										<div className="find-story__tag">고도근시</div>
										<div className="find-story__tag">안구건조</div>
										<div className="find-story__tag">테불편</div>
									</div>
								</div>
								<div className="find-story__card">
									<div className="find-story__img-wrap">
										<div className="find-story__img"><img src="/static/img/home/find_story_3.jpg" alt="" /></div>
									</div>
									<div className="find-story__desc-wrap">
										<div className="find-story__story-title">항상 값싼 안경만 찾아 쓰면서 고생했을 내 눈</div>
										<div className="find-story__story-content">직장을 그만두고 공시생의 길로 들어선 제 자신에게 선물을 주고 싶었어요. 항상 값싼 안경만 찾아 쓰면서 고생했을 제 눈에게 안경은 소중한 선물이라고 생각해요. 착용 중 A/S가 필요했는데 그 과정이 정말 친절했어요! 구매한지 5개월 정도 지났는데 정말 후회 없습니다!</div>
									</div>
									<div className="find-story__tag-wrap">
										<div className="find-story__tag">고도근시</div>
										<div className="find-story__tag">테불편</div>
									</div>
								</div>
								<div className="find-story__card">
									<div className="find-story__img-wrap">
										<div className="find-story__img"><img src="/static/img/home/find_story_4.jpg" alt="" /></div>
									</div>
									<div className="find-story__desc-wrap">
										<div className="find-story__story-title">라섹을 했기 때문에 보는 것에는 문제가 없지만,</div>
										<div className="find-story__story-content">이직을 준비하며 컴퓨터를 사용하는 경우가 많아져서 그런지 눈이 많이 피로하다는 것이 느껴졌어요. 사실 라섹을 했기 때문에 보는 것에는 문제가 없지만 여자친구의 추천으로 데이트 겸 플로브에 갔어요. 저만을 위해 다양한 안경테를 추천해 줘서 선택의 폭이 넓었다는 게 좋았습니다. 다양한 느낌을 재미있게 착용해보니 나에게 잘 어울리는 안경이 어떤 건지 알겠더라구요!</div>
									</div>
									<div className="find-story__tag-wrap">
										<div className="find-story__tag">피로감</div>
										<div className="find-story__tag">라섹/라식</div>
									</div>
								</div>
								<div className="find-story__card">
									<div className="find-story__img-wrap">
										<div className="find-story__img"><img src="/static/img/home/find_story_5.jpg" alt="" /></div>
									</div>
									<div className="find-story__desc-wrap">
										<div className="find-story__story-title">막연하게 안경 취향을 찾고 싶었는데</div>
										<div className="find-story__story-content">직장 생활을 시작하고 안경을 늘 착용하게 되며 안경은 ‘인상’과 ‘개성’을 드러내는 물건이 되었어요.  그래서 막연하게 안경 취향을 찾고 싶었는데 플로브 큐레이션으로 표현하고 싶었던 ‘이미지’, 금속 알레르기를 유발하지 않는 ‘소재’, 끌리는 이야기를 가진 ‘브랜드’, 이 3가지의 요건을 모두 충족하는 안경을 고를 수 있었습니다. 좋아하는 옷을 입고 집 밖을 나갈 때의 설렘처럼 좋아하는 안경을 착용하니 볼 때마다 기분이 좋네요.</div>
									</div>
									<div className="find-story__tag-wrap">
										<div className="find-story__tag">알레르기</div>
										<div className="find-story__tag">테불편</div>
									</div>
								</div>
								<div className="find-story__card">
									<div className="find-story__img-wrap">
										<div className="find-story__img"><img src="/static/img/home/find_story_6.jpg" alt="" /></div>
									</div>
									<div className="find-story__desc-wrap">
										<div className="find-story__story-title">안경테 디자인은 항상 비슷하게, 렌즈는 n번 압축 정도?</div>
										<div className="find-story__story-content">지금껏 안경을 맞출 땐 주위가 시끌벅적하고 계속 손님들이 오는 상황에서 급하게 맞추었어요. 안경테 디자인은 항상 쓰던 것과 비슷하게, 렌즈는 안과 검진표대로, 렌즈 선택은 n번 압축 정도? 플로브는 정밀한 검사와 디자인 추천까지, 또 양쪽 눈 중 어느 쪽을 더 많이 사용하는지 등 하나하나 설명과 함께 나와 어울리는 안경을 찾을 수 있도록 상담해 주셔서 너무 좋았습니다.</div>
									</div>
									<div className="find-story__tag-wrap">
										<div className="find-story__tag">고도근시</div>
									</div>
								</div>
								<div className="find-story__card">
									<div className="find-story__img-wrap">
										<div className="find-story__img"><img src="/static/img/home/find_story_7.jpg" alt="" /></div>
									</div>
									<div className="find-story__desc-wrap">
										<div className="find-story__story-title">안과나 안경점에 갈 정도는 아니라고 생각했지만..</div>
										<div className="find-story__story-content">눈이 쉽게 피로가 오고, 항상 컴퓨터 업무를 하다 보니 앞이 갑자기 잘 안 보일 때가 있었는데요 안과나 안경점에 갈 정도는 아니라고 생각했지만.. 서비스를 받고 나서 제 눈에 대해서 이해할 수 있었고 디자인 예쁜 안경을 맞출 수 있어서 외모가 더 빛을 발하는 것 같네요! 제가 좋아서 남자친구도 플로브에서 맞추게 했는데 이전 안경에서 있던 묘한 두통이 사라졌다고 하네요!</div>
									</div>
									<div className="find-story__tag-wrap">
										<div className="find-story__tag">피로감</div>
										<div className="find-story__tag">시각불편</div>
									</div>
								</div>
							</Carousel>
						</div>
					</div>

					<div className="find-story find-story__2">
						<div className="find-story__inner">
							<Carousel
								className="find-story__carousel"
								arrows
								autoplay
								infinite
								slidesToShow={1}
							>
								<div className="find-story__card">
									<div className="find-story__img-wrap">
										<div className="find-story__img"><img src="/static/img/home/find_story_1.jpg" alt="" /></div>
									</div>
									<div className="find-story__desc-wrap">
										<div className="find-story__story-title">평소 호피나 골드브라운 계열의 콤비만 착용했었는데,</div>
										<div className="find-story__story-content">노안이 시작되어서 독서용 안경을 맞추게 되었는데 가볍고 편안해서 더 자주 쓰고 있어요. 안경테도 평소 호피나 골드브라운 계열의 콤비만 착용했었는데 안경테 추천해 주실 때 꼼꼼하게 봐주셔서 이번에는 그레이 계열의 스틸 안경테를 시도해봤어요! 그리고 대만족이에요🤗</div>
									</div>
									<div className="find-story__tag-wrap">
										<div className="find-story__tag">시각불편</div>
										<div className="find-story__tag">테불편</div>
									</div>
								</div>
								<div className="find-story__card">
									<div className="find-story__img-wrap">
										<div className="find-story__img"><img src="/static/img/home/find_story_2.jpg" alt="" /></div>
									</div>
									<div className="find-story__desc-wrap">
										<div className="find-story__story-title">안경을 쓰면 하염없이 못생겨지는 사람</div>
										<div className="find-story__story-content">시력이 많이 나빠서 안경을 쓰면 하염없이 못생겨지는 사람이라 오랜 시간 일회용 콘택트렌즈를 착용했어요. 이마저도 요즘은 안구 건조증으로 힘들어져서 그나마 덜 못생겨지는 안경테를 추천해달라고 적었는데 테, 렌즈, 코 받침 높이까지 꼼꼼하게 따져서 추천해 주셨어요. 덕분에 안경을 잘 쓰고 다닙니다!</div>
									</div>
									<div className="find-story__tag-wrap">
										<div className="find-story__tag">고도근시</div>
										<div className="find-story__tag">안구건조</div>
										<div className="find-story__tag">테불편</div>
									</div>
								</div>
								<div className="find-story__card">
									<div className="find-story__img-wrap">
										<div className="find-story__img"><img src="/static/img/home/find_story_3.jpg" alt="" /></div>
									</div>
									<div className="find-story__desc-wrap">
										<div className="find-story__story-title">항상 값싼 안경만 찾아 쓰면서 고생했을 내 눈</div>
										<div className="find-story__story-content">직장을 그만두고 공시생의 길로 들어선 제 자신에게 선물을 주고 싶었어요. 항상 값싼 안경만 찾아 쓰면서 고생했을 제 눈에게 안경은 소중한 선물이라고 생각해요. 착용 중 A/S가 필요했는데 그 과정이 정말 친절했어요! 구매한지 5개월 정도 지났는데 정말 후회 없습니다!</div>
									</div>
									<div className="find-story__tag-wrap">
										<div className="find-story__tag">고도근시</div>
										<div className="find-story__tag">테불편</div>
									</div>
								</div>
								<div className="find-story__card">
									<div className="find-story__img-wrap">
										<div className="find-story__img"><img src="/static/img/home/find_story_4.jpg" alt="" /></div>
									</div>
									<div className="find-story__desc-wrap">
										<div className="find-story__story-title">라섹을 했기 때문에 보는 것에는 문제가 없지만,</div>
										<div className="find-story__story-content">이직을 준비하며 컴퓨터를 사용하는 경우가 많아져서 그런지 눈이 많이 피로하다는 것이 느껴졌어요. 사실 라섹을 했기 때문에 보는 것에는 문제가 없지만 여자친구의 추천으로 데이트 겸 플로브에 갔어요. 저만을 위해 다양한 안경테를 추천해 줘서 선택의 폭이 넓었다는 게 좋았습니다. 다양한 느낌을 재미있게 착용해보니 나에게 잘 어울리는 안경이 어떤 건지 알겠더라구요!</div>
									</div>
									<div className="find-story__tag-wrap">
										<div className="find-story__tag">피로감</div>
										<div className="find-story__tag">라섹/라식</div>
									</div>
								</div>
								<div className="find-story__card">
									<div className="find-story__img-wrap">
										<div className="find-story__img"><img src="/static/img/home/find_story_5.jpg" alt="" /></div>
									</div>
									<div className="find-story__desc-wrap">
										<div className="find-story__story-title">막연하게 안경 취향을 찾고 싶었는데</div>
										<div className="find-story__story-content">직장 생활을 시작하고 안경을 늘 착용하게 되며 안경은 ‘인상’과 ‘개성’을 드러내는 물건이 되었어요.  그래서 막연하게 안경 취향을 찾고 싶었는데 플로브 큐레이션으로 표현하고 싶었던 ‘이미지’, 금속 알레르기를 유발하지 않는 ‘소재’, 끌리는 이야기를 가진 ‘브랜드’, 이 3가지의 요건을 모두 충족하는 안경을 고를 수 있었습니다. 좋아하는 옷을 입고 집 밖을 나갈 때의 설렘처럼 좋아하는 안경을 착용하니 볼 때마다 기분이 좋네요.</div>
									</div>
									<div className="find-story__tag-wrap">
										<div className="find-story__tag">알레르기</div>
										<div className="find-story__tag">테불편</div>
									</div>
								</div>
								<div className="find-story__card">
									<div className="find-story__img-wrap">
										<div className="find-story__img"><img src="/static/img/home/find_story_6.jpg" alt="" /></div>
									</div>
									<div className="find-story__desc-wrap">
										<div className="find-story__story-title">안경테 디자인은 항상 비슷하게, 렌즈는 n번 압축 정도?</div>
										<div className="find-story__story-content">지금껏 안경을 맞출 땐 주위가 시끌벅적하고 계속 손님들이 오는 상황에서 급하게 맞추었어요. 안경테 디자인은 항상 쓰던 것과 비슷하게, 렌즈는 안과 검진표대로, 렌즈 선택은 n번 압축 정도? 플로브는 정밀한 검사와 디자인 추천까지, 또 양쪽 눈 중 어느 쪽을 더 많이 사용하는지 등 하나하나 설명과 함께 나와 어울리는 안경을 찾을 수 있도록 상담해 주셔서 너무 좋았습니다.</div>
									</div>
									<div className="find-story__tag-wrap">
										<div className="find-story__tag">고도근시</div>
									</div>
								</div>
								<div className="find-story__card">
									<div className="find-story__img-wrap">
										<div className="find-story__img"><img src="/static/img/home/find_story_7.jpg" alt="" /></div>
									</div>
									<div className="find-story__desc-wrap">
										<div className="find-story__story-title">안과나 안경점에 갈 정도는 아니라고 생각했지만..</div>
										<div className="find-story__story-content">눈이 쉽게 피로가 오고, 항상 컴퓨터 업무를 하다 보니 앞이 갑자기 잘 안 보일 때가 있었는데요 안과나 안경점에 갈 정도는 아니라고 생각했지만.. 서비스를 받고 나서 제 눈에 대해서 이해할 수 있었고 디자인 예쁜 안경을 맞출 수 있어서 외모가 더 빛을 발하는 것 같네요! 제가 좋아서 남자친구도 플로브에서 맞추게 했는데 이전 안경에서 있던 묘한 두통이 사라졌다고 하네요!</div>
									</div>
									<div className="find-story__tag-wrap">
										<div className="find-story__tag">피로감</div>
										<div className="find-story__tag">시각불편</div>
									</div>
								</div>
							</Carousel>
						</div>
					</div>

					<div className="service service__1">
						<div className="service__inner">

							<div className="service__tabs">
								<div className={tabIdx === 0 ? `service__tab service__tab--selected` : `service__tab`} onClick={() => setTabIdx(0)}>무료 상담, 무료 추천</div>
								<div className={tabIdx === 1 ? `service__tab service__tab--selected` : `service__tab`} onClick={() => setTabIdx(1)}>맞춤 안경박스</div>
								<div className={tabIdx === 2 ? `service__tab service__tab--selected` : `service__tab`} onClick={() => setTabIdx(2)}>안경 카운셀러</div>
								<div className={tabIdx === 3 ? `service__tab service__tab--selected` : `service__tab`} onClick={() => setTabIdx(3)}>렌즈 무료 교환</div>
							</div>
							{serviceTabs()}
						</div>
					</div>
					<div className="service service__2">
 						<div className="service__inner">

							<Carousel
								arrows
								className="service__carousel"
								infinite
							>
								<div className="service__slide">
									<div className="content-txt">
										<div className="content-txt__inner">
										<div className="tabname">무료 상담, 무료 추천</div>
											<div className="title">안경상담부터 추천<br/>큐레이션까지 모두 무료!</div>
											<div className="caption">카톡 안경 상담, 라운지 안경 큐레이션 서비스까지 모두 무료로 체험할 수 있어요.</div>
										</div>
									</div>
									<div className="content-img">
										<div className="content-img__inner">
											<img src="/static/img/home/home_service_1.jpg" alt=""/>
										</div>
									</div>
								</div>
								<div className="service__slide">
									<div className="content-txt">
										<div className="content-txt__inner">
											<div className="tabname">맞춤 안경박스</div>
											<div className="title">고민이 사라지는<br/>맞춤 안경박스</div>
											<div className="caption">나에게 맞춘 16개의 안경이 담긴 안경박스를 플로브 라운지에서 즐겨보세요.</div>
										</div>
									</div>
									<div className="content-img">
										<div className="content-img__inner">
											<img src="/static/img/home/home_service_2.jpg" alt=""/>
										</div>
									</div>
								</div>
								<div className="service__slide">
									<div className="content-txt">
										<div className="content-txt__inner">
											<div className="tabname">안경 카운셀러</div>
											<div className="title">안경 카운셀러와<br/>쉽고 정확한 안경 찾기</div>
											<div className="caption">읽어주는 검안으로 쉬워지는 렌즈, 시각문제, 스타일까지 안경 카운셀러가 대신 고민하고 추천해드려요.</div>
										</div>
									</div>
									<div className="content-img">
										<div className="content-img__inner">
											<img src="/static/img/home/home_service_3.jpg" alt=""/>
										</div>
									</div>
								</div>
								<div className="service__slide">
									<div className="content-txt">
										<div className="content-txt__inner">
											<div className="tabname">렌즈 무료 교환</div>
											<div className="title">실패 없는 안경<br/>렌즈 2회 무료 교환</div>
											<div className="caption">교정시력에 딱 맞춰볼까?<br/>불편한 렌즈는 한달 이내 무료로 2회 교환이 가능해요.</div>
										</div>
									</div>
									<div className="content-img">
										<div className="content-img__inner">
											<img src="/static/img/home/home_service_4.jpg" alt=""/>
										</div>
									</div>
								</div>
							</Carousel>
 						</div>
 					</div>



					<div className="lounge">
						<div className="lounge__title"><strong><p>안경을 만나는 그 순간까지 <span></span>고려한 '플로브 라운지'</p></strong></div>
						<div className="lounge__caption"><p>플로브 라운지 스토리부터 각 지점별 정보를 확인하세요.</p></div>
						<div className="lounge__list">
							<div className="lounge__thumb"><a href="/lounge/yeoksam"><div><img src="/static/img/home/lounge_y_0.jpg" alt="" /></div><p>라운지 역삼성당</p></a></div>
							<div className="lounge__thumb"><a href="/lounge/gangnam"><div><img src="/static/img/home/lounge_g_0.jpg" alt="" /></div><p>라운지 강남</p></a></div>
							<div className="lounge__thumb"><div><img src="/static/img/home/lounge_g_0.jpg" alt="" /></div></div>
						</div>
					</div>

					<div className="faq">
								<div className="faq__title"><strong><p>플로브 서비스, 이런 점이 궁금해요!</p></strong></div>
								<div className="faq__caption"><p>궁금한 내용을 클릭하시면 내용을 확인할 수 있습니다.</p></div>
							<div className="faq__collapse">
								<Collapse
									className="my-accordion"
									accordion
									onChange={collapseCallback}
									expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 270 : 90} />}
									expandIconPosition={'right'}
									ghost
								>
									<Collapse.Panel header="상담을 받고 구매하지 않아도 되나요?" key="1">
										<div className="faq__answer">네 구매하지 않으셔도 됩니다.<br />안경 상담 비용은 모두 무료이며 부담 없이 플로브 서비스를 체험할 수 있어요.</div>
									</Collapse.Panel>
									<Collapse.Panel header="받을 수 있는 가격 할인 혜택이 있나요?" key="2">
										<div className="faq__answer">기본적으로 안경테는 정가에서 10~20% / 안경 렌즈는 브랜드사와 관계없이 20% 할인된 플로브 정책 가로 판매하고 있어요.<br />또한 상시로 진행하는 플로브 이벤트를 통해 최소 3만 원의 할인 혜택을 추가로 받을 수 있어요.</div>
									</Collapse.Panel>
									<Collapse.Panel header="오늘 예약하고 바로 방문할 수 있나요?" key="3">
										<div className="faq__answer">네 가능해요. 안경 추천을 위해 카톡 상담은 필수이며 상담원에게 '당일 예약'을 요청해 주세요.</div>
									</Collapse.Panel>
									<Collapse.Panel header="친구와 함께 상담하고 구매할 수 있나요?" key="4">
										<div className="faq__answer">동시 상담은 최대 2명까지 가능해요.<br />예약 시간을 100분 연속으로 제공하며 검안과 추천 상담을 모두 함께 받으실 수 있습니다. 카톡 상담은 필수이며 상담원에게 '2인 동시 상담'을 요청해 주세요.</div>
									</Collapse.Panel>
									<Collapse.Panel header="부모님 혹은 연인에게 선물하고 싶은데, 어떻게 예약해야 하나요?" key="5">
										<div className="faq__answer">카톡 상담을 신청한 후, 선물하고 싶은 분의 추천 관련 정보를 카톡 상담원에게 알려주세요. 막막한 안경 선물을 센스 있게 도와드려요.</div>
									</Collapse.Panel>
									<Collapse.Panel header="구매한 안경을 당일에 받을 수 있나요?" key="6">
										<div className="faq__answer">선택한 렌즈 사양과 방문하신 라운지의 가공 상황에 따라 달라져요.<br />렌즈의 경우 선택하신 브랜드와 기능에 따라 주문이 필요할 수 있기에 정확한 안내가 어려워요.</div>
									</Collapse.Panel>
									<Collapse.Panel header="카톡 상담은 필수인가요? 방문 예약을 상담 없이 바로 할 수 있나요?" key="7">
										<div className="faq__answer">카톡 상담은 필수에요.<br />라운지에서 나에게 맞춘 최상의 큐레이션을 만날 수 있도록 나의 안경을 발견하는 여정, 카톡 상담으로 시작하세요!</div>
									</Collapse.Panel>
									<Collapse.Panel header="안경을 원래 쓰지 않는데, 방문해도 되나요?" key="8">
										<div className="faq__answer">네 가능해요.<br />내 눈에 대한 고민은 시력적인 불편함뿐만 아니라 보호하고 싶은 걱정스러운 마음도 포함됩니다.</div>
									</Collapse.Panel>
									<Collapse.Panel header="수리/피팅 등 구매 후 서비스도 예약해야 하나요?" key="9">
										<div className="faq__answer">플로브 카카오톡 채널로 문의해 주시면 접수가 가능한 링크를 보내드립니다.<br />구매한 안경과 검안 정보를 확인하여 편안한 수리/피팅 서비스를 맞춤으로 준비하기 위해 예약은 필수에요.</div>
									</Collapse.Panel>
									<Collapse.Panel header="맞춘 렌즈에 적응이 어려운데, 교환이 가능한가요?" key="10">
										<div className="faq__answer">네 가능해요.<br />불편함을 해소하기 위해 한 달 이내 2회까지 동급 렌즈로 무상 교환해드려요.</div>
									</Collapse.Panel>
								</Collapse>
							</div>
					</div>

					<div className="banner-brand">
						<div className="banner-brand__inner">
							<a href="/brand">
								<div className="event-desc">
									<span className="event-text">어떤 안경을 추천받을지 궁금하신가요?</span>
									<strong>플로브 추천 안경 브랜드 보러가기</strong>
								</div>
							</a>
						</div>
					</div>

					<div className="bottom-cta">
						<div className="bottom-cta__inner">
							<button className="gtm-002 btn-cta" onClick={() => { setModalView(true); }}>안경추천 시작하기</button>
						</div>
					</div>

					<div className="company">
						<div className="company__inner">
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

				</div>
				{/*
				<div className="font-test-10">폰트사이즈 12px - 0.5em</div>
				<div className="font-test-12">폰트사이즈 12px - 0.75em</div>
				<div className="font-test-14">폰트사이즈 14px - 0.875em</div>
				<div className="font-test-16">폰트사이즈 16px - 1em</div>
				<div className="font-test-18">폰트사이즈 18px - 1.125em</div>
				<div className="font-test-20">폰트사이즈 20px - 1.25em</div>
				<div className="font-test-24">폰트사이즈 24px - 1.5em</div>
				<div className="font-test-28">폰트사이즈 28px - 1.75em</div>
				<div className="font-test-32">폰트사이즈 32px - 2.em</div>
				*/}
			</Layout>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => { //{ req }: { req: any }
	const client = createApolloClient(context)
	const { user } = await client.query({ query: CHECKUP_USER })
		.then(({ data }) => {
			return { user: data.checkUpUser };
		})
		.catch(() => {
			// Fail gracefully
			return { user: null };
		});

	return {
		props: {
			// this hydrates the clientside Apollo cache in the `withApollo` HOC
			apolloStaticCache: client.cache.extract(),
			user
		},
	}
}

export default IndexPage
