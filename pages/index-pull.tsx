import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import Layout from '../layout/DefaultLayout'
import { Carousel, Collapse, Modal } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
import { CHECKUP_USER } from '../lib/query'
import { createApolloClient } from '../lib/apolloClient'
import { resetSurvey } from '../utils/surveyUtils'
import ServiceTab from '../components/index/serviceTab'

// 타입 정의
declare global {
	// Window 객체 타입
	interface Window {
		Kakao: any
		analytics: any
		gtag: Function
	}
	function fbq(track: string, event: string): void;
}

const IndexPage = (props: {
	user: User
}) => {
	const router = useRouter()
	const [tabIdx, setTabIdx] = useState<number>(0)
	const [surveyModal, setSurveyModal] = useState<boolean>(false)

	const collapseCallback = (key: string | string[]) => { key }

	const serviceTabs = () => {
		let component
		switch (tabIdx) {
			case 0:
				component = <ServiceTab
					tabName="무료 상담, 무료 추천"
					title={["안경상담부터 추천", "큐레이션까지 모두 무료!"]}
					caption="카톡 안경 상담, 라운지 안경 큐레이션 서비스까지 모두 무료로 체험할 수 있어요."
					imgNum="1" />
				break;
			case 1:
				component = <ServiceTab
					tabName="맞춤 안경박스"
					title={["고민이 사라지는", "맞춤 안경박스"]}
					caption="나에게 맞춘 16개의 안경이 담긴 안경박스를 플로브 라운지에서 즐겨보세요."
					imgNum="2" />
				break;
			case 2:
				component = <ServiceTab
					tabName="안경 카운셀러"
					title={["안경 카운셀러와", "쉽고 정확한 안경 찾기"]}
					caption="읽어주는 검안으로 쉬워지는 렌즈, 시각문제, 스타일까지 안경 카운셀러가 대신 고민하고 추천해드려요."
					imgNum="3" />
				break;
			case 3:
				component = <ServiceTab
					tabName="렌즈 무료 교환"
					title={["실패 없는 안경", "렌즈 2회 무료 교환"]}
					caption="교정시력에 딱 맞춰볼까? 불편한 렌즈는 한달 이내 무료로 2회 교환이 가능해요."
					imgNum="4" />
				break;
		}
		return component
	}

	function didYouVisit() {
		if (localStorage.getItem('floev[currentStep]') !== null) {
			setSurveyModal(true)
		} else {
			fbq('track', 'Search');
			router.push('/survey')
		}
	}
	function surveyFromMiddle() {
		const currentStep = parseInt(localStorage.getItem('floev[currentStep]') ?? '0')
		if (currentStep > 9) {
			localStorage.setItem('floev[currentStep]', '9')
		}
		fbq('track', 'Search');
		router.push('/survey')
	}
	function surveyFromStart() {
		resetSurvey()
		fbq('track', 'Search');
		router.push('/survey')
	}

	return (<>
		<Layout title="플로브 - 나의 눈을 위한 안경 큐레이션 서비스" name={props.user ? props.user.name : undefined}>
			<div className="indexPage">
				<div className="landing_1_02">
					<div><img src="/img/home/landing_1.png" alt="" /></div>
					<div><img src="/img/home/landing_2.png" alt="" /></div>
					<div><img src="/img/home/landing_3.png" alt="" /></div>
					<div><img src="/img/home/landing_4.png" alt="" /></div>
					<div><img src="/img/home/landing_5.png" alt="" /></div>
					<div className="main-visual__btn">
						<button className="tn-0003 gtm-001 btn-cta btn-test" onClick={() => didYouVisit()}>20,000원 혜택받고 서비스 신청하기</button>
						<Modal
							className="modal-cookie"
							visible={surveyModal}
							centered
							width="320px"
							onCancel={() => {
								setSurveyModal(false);
							}}
						>
							<p>전에 작성해둔 설문내역이 있어요!<br />이어서 작성할까요?</p>
							<div className="modal-btn-wrap">
								<button type="button" className="modal-btn tn-0001" value="start" onClick={() => surveyFromStart()}>처음부터 할게요</button>
								<button type="button" className="modal-btn continue tn-0002" onClick={() => surveyFromMiddle()}>이어서 작성할게요</button>
							</div>
						</Modal>
					</div>
				</div>

				<div className="main-visual">
					<div className="main-visual__inner">
						<div className="main-visual__img-wrap">
							<div className="main-visual__img"><img src="/img/home/counselor_both.png" alt="메인 비주얼 이미지1" /></div>
						</div>
						<div className="main-visual__desc-wrap">
							<div className="desc-wrap__inner">
								<div className="main-visual__title">
									<p className=""><strong>아직도 얼굴형으로<br />안경 고르세요?</strong></p>
								</div>
								<p className="main-visual__caption">안경 고민을 설문하세요.<br />진짜 나에게 맞는 안경 추천 서비스</p>
								<div className="main-visual__btn">
									<button className="tn-0003 gtm-001 btn-cta btn-test" onClick={() => didYouVisit()}>시작하기</button>
									<Modal
										className="modal-cookie"
										visible={surveyModal}
										centered
										width="320px"
										onCancel={() => {
											setSurveyModal(false);
										}}
									>
										<p>전에 작성해둔 설문내역이 있어요!<br />이어서 작성할까요?</p>
										<div className="modal-btn-wrap">
											<button type="button" className="modal-btn tn-0001" value="start" onClick={() => surveyFromStart()}>처음부터 할게요</button>
											<button type="button" className="modal-btn continue tn-0002" onClick={() => surveyFromMiddle()}>이어서 작성할게요</button>
										</div>
									</Modal>
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
								<span className="event-text">리뷰 남기면</span>
								<strong><span className="event-strong-m-only">리뷰 남기면, </span>최대 3만원 할인 혜택! &#xE001;</strong>
							</div>
						</a>
					</div>
				</div>

				<div className="score">
					<div className="score__inner">
						<div className="score__date">(2021/1/31 기준)</div>
						<div className="score__title">플로브에서 <span className="num">1,775명</span>이 <span className="br"></span><span>안경 추천상담</span>을 받았어요.</div>
						<div className="score__board">
							<div className="score__each">
								<div className="score__glasses"><span className="num">28,400</span><span className="type">장</span></div>
								<div className="score__name">추천된 안경</div>
							</div>
							<div className="line"></div>
							<div className="score__each">
								<div className="score__time"><span className="num">106,500</span><span className="type">분</span></div>
								<div className="score__name">추천상담 시간</div>
							</div>
							<div className="line"></div>
							<div className="score__each">
								<div className="score__per"><span className="num">90.8</span><span className="type">%</span></div>
								<div className="score__name">서비스 만족도</div>
							</div>
						</div>
						<div className="score__desc">
							<div className="left">
								<div>추천상담 만족도 평균 <span>9.1 / 10점</span></div>
								<div>시력상담 만족도 평균 <span>9.0 / 10점</span></div>
							</div>
							<div className="right">
								<div>서비스 추천지수 평균 <span>8.4 / 10점</span></div>
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
									<div className="find-story__img"><img src="/img/home/find_story_1.jpg" alt="" /></div>
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
									<div className="find-story__img"><img src="/img/home/find_story_2.jpg" alt="" /></div>
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
									<div className="find-story__img"><img src="/img/home/find_story_3.jpg" alt="" /></div>
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
									<div className="find-story__img"><img src="/img/home/find_story_4.jpg" alt="" /></div>
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
									<div className="find-story__img"><img src="/img/home/find_story_5.jpg" alt="" /></div>
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
									<div className="find-story__img"><img src="/img/home/find_story_6.jpg" alt="" /></div>
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
									<div className="find-story__img"><img src="/img/home/find_story_7.jpg" alt="" /></div>
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
									<div className="find-story__img"><img src="/img/home/find_story_1.jpg" alt="" /></div>
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
									<div className="find-story__img"><img src="/img/home/find_story_2.jpg" alt="" /></div>
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
									<div className="find-story__img"><img src="/img/home/find_story_3.jpg" alt="" /></div>
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
									<div className="find-story__img"><img src="/img/home/find_story_4.jpg" alt="" /></div>
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
									<div className="find-story__img"><img src="/img/home/find_story_5.jpg" alt="" /></div>
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
									<div className="find-story__img"><img src="/img/home/find_story_6.jpg" alt="" /></div>
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
									<div className="find-story__img"><img src="/img/home/find_story_7.jpg" alt="" /></div>
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
										<div className="title">안경상담부터 추천<br />큐레이션까지 모두 무료!</div>
										<div className="caption">홈페이지 설문, 더 디테일한 카톡 상담, 라운지 안경 큐레이션 서비스까지 모두 무료로 체험할 수 있어요.</div>
									</div>
								</div>
								<div className="content-img">
									<div className="content-img__inner">
										<img src="/img/home/home_service_1.jpg" alt="" />
									</div>
								</div>
							</div>
							<div className="service__slide">
								<div className="content-txt">
									<div className="content-txt__inner">
										<div className="tabname">맞춤 안경박스</div>
										<div className="title">고민이 사라지는<br />맞춤 안경박스</div>
										<div className="caption">나에게 맞춘 16개의 안경이 담긴 안경박스를 플로브 라운지에서 즐겨보세요.</div>
									</div>
								</div>
								<div className="content-img">
									<div className="content-img__inner">
										<img src="/img/home/home_service_2.jpg" alt="" />
									</div>
								</div>
							</div>
							<div className="service__slide">
								<div className="content-txt">
									<div className="content-txt__inner">
										<div className="tabname">안경 카운셀러</div>
										<div className="title">안경 카운셀러와<br />쉽고 정확한 안경 찾기</div>
										<div className="caption">읽어주는 검안으로 쉬워지는 렌즈, 시각문제, 스타일까지 안경 카운셀러가 대신 고민하고 추천해드려요.</div>
									</div>
								</div>
								<div className="content-img">
									<div className="content-img__inner">
										<img src="/img/home/home_service_3.jpg" alt="" />
									</div>
								</div>
							</div>
							<div className="service__slide">
								<div className="content-txt">
									<div className="content-txt__inner">
										<div className="tabname">렌즈 무료 교환</div>
										<div className="title">실패 없는 안경<br />렌즈 2회 무료 교환</div>
										<div className="caption">교정시력에 딱 맞춰볼까?<br />불편한 렌즈는 한달 이내 무료로 2회 교환이 가능해요.</div>
									</div>
								</div>
								<div className="content-img">
									<div className="content-img__inner">
										<img src="/img/home/home_service_4.jpg" alt="" />
									</div>
								</div>
							</div>
						</Carousel>
					</div>
				</div>

				<div>
					<div className="lounge">
						<div className="lounge__title"><strong><p>안경을 만나는 그 순간까지 <span></span>고려한 '플로브 라운지'</p></strong></div>
						<div className="lounge__caption"><p>플로브 라운지 스토리부터 각 지점별 정보를 확인하세요.</p></div>
						<div className="lounge__list">
							<div className="lounge__thumb"><a href="/lounge/yeoksam"><div><img src="/img/home/lounge_y_0.jpg" alt="" /></div><p>라운지 역삼성당</p></a></div>
							<div className="lounge__thumb"><a href="/lounge/gangnam"><div><img src="/img/home/lounge_g_0.jpg" alt="" /></div><p>라운지 강남</p></a></div>
							<div className="lounge__thumb"><div><img src="/img/home/new_lounge.jpg" alt="" /></div></div>
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
								<Collapse.Panel header="추천을 받고 구매하지 않아도 되나요?" key="1">
									<div className="faq__answer">네 구매하지 않으셔도 됩니다.<br />안경 추천을 비롯한 서비스 비용은 모두 무료이며 안경/렌즈 구매는 선택입니다.</div>
								</Collapse.Panel>
								<Collapse.Panel header="받을 수 있는 가격 할인 혜택이 있나요?" key="2">
									<div className="faq__answer">네 있습니다. 우선 기본적으로 플로브 정책 가는 아래의 할인이 적용되어 있어요.<br /><strong>안경테 10~20% / 안경 렌즈 20%</strong><br />추가로 플로브 할인 이벤트를 통해 최소 3만 원의 할인 혜택을 받을 수 있습니다.</div>
								</Collapse.Panel>
								<Collapse.Panel header="오늘 예약하고 바로 방문할 수 있나요?" key="3">
									<div className="faq__answer">네, 당일 오후 3시 이전까지 예약이 가능합니다.</div>
								</Collapse.Panel>
								<Collapse.Panel header="친구와 함께 추천받을 수 있나요?" key="4">
									<div className="faq__answer">네 함께 추천받을 수 있어요.<br />동시 서비스는 최대 2명까지 가능하고 총 서비스 시간은 100분입니다.</div>
								</Collapse.Panel>
								<Collapse.Panel header="안경을 선물하고 싶은데, 어떻게 예약해야 하나요?" key="5">
									<div className="faq__answer">성공적인 선물을 위한 상담을 카카오톡으로 진행해요.<br />홈페이지 설문이 아닌 플로브 카카오톡 채널로 문의해주세요!</div>
								</Collapse.Panel>
								<Collapse.Panel header="구매한 안경을 당일에 받을 수 있나요?" key="6">
									<div className="faq__answer">선택한 렌즈 사양에 따라 달라져요.<br />렌즈 브랜드 및 추가하는 옵션에 따라 렌즈 주문이 필요할 수 있어요. 이 경우 수령 날짜를 라운지에서 안내받을 수 있습니다.</div>
								</Collapse.Panel>
								<Collapse.Panel header="예약 없이 방문할 수 있나요?" key="7">
									<div className="faq__answer">플로브는 100% 예약제로 운영됩니다.<br />플로브는 일반적인 안경원과 달라요. 안경을 구매하는 새로운 방식을 제안합니다. 나만을 위한 안경박스를 추천받기 위해서 홈페이지 설문을 꼭 진행해 주세요!</div>
								</Collapse.Panel>
								<Collapse.Panel header="안경을 원래 쓰지 않는데, 방문해도 되나요?" key="8">
									<div className="faq__answer">네 가능해요.<br />내 눈에 대한 고민은 시력적인 불편함뿐만 아니라 보호하고 싶은 걱정스러운 마음도 포함됩니다.</div>
								</Collapse.Panel>
								<Collapse.Panel header="구매한 안경의 수리도 플로브에서 받을 수 있나요?" key="9">
									<div className="faq__answer">네 가능해요.<br />카카오톡 채널로 문의해 주시면 접수 가능한 링크를 전달드려요.<br />플로브는 어려운 수리 판단과 안경 브랜드사와의 복잡한 소통을 고객님을 대신해서 진행해드립니다.</div>
								</Collapse.Panel>
								<Collapse.Panel header="맞춘 렌즈에 적응이 어려운데, 교환이 가능한가요?" key="10">
									<div className="faq__answer">네 가능해요.<br />플로브는 렌즈로 인한 불편함을 해소하기 위해 한 달 이내 2회까지 동급 렌즈로 무상 교환해드립니다.</div>
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
				</div>

				<div className="bottom-cta">
					<div className="bottom-cta__inner">
						<button className="gtm-001 btn-cta tn-0004" onClick={() => didYouVisit()}><span>시작하기</span></button>
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
							<li><span>개인정보책임자</span><span>장인배</span></li>
						</ul>
						<div className="company__link"><a href="http://www.ftc.go.kr/bizCommPop.do?wrkr_no=6998601370" target="_blank">사업자정보확인</a> | <a href="/service-policy"><span>서비스 정책 안내</span></a> | <a href="https://www.instagram.com/floev_official/" target="_blank">instagram</a></div>
					</div>
				</div>
			</div>
		</Layout>
	</>);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
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
