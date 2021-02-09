import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import Layout from '../layout/DefaultLayout'
import { Modal } from 'antd'
import { CHECKUP_USER } from '../lib/query'
import { createApolloClient } from '../lib/apolloClient'
import { resetSurvey } from '../utils/surveyUtils'

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
	const [surveyModal, setSurveyModal] = useState<boolean>(false)

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
			<div className="indexPage" style={{ width: '100%', maxWidth: '640px', margin: '0 auto', paddingBottom: '53px' }}>
				<div className="landing_1_02">
					<div><img src="/static/img/home/landing_1.png" alt="" /></div>
					<div><img src="/static/img/home/landing_2.png" alt="" /></div>
					<div><img src="/static/img/home/landing_3.png" alt="" /></div>
					<div><img src="/static/img/home/landing_4.png" alt="" /></div>
					<div><img src="/static/img/home/landing_5.png" alt="" /></div>
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

				<div style={{ padding: '48px 0' }}>
					<div className="lounge">
						<div style={{ marginBottom: '8px' }} className="lounge__title"><strong>플로브 라운지 안내</strong></div>
						<div className="lounge__list">
							<div className="lounge__thumb"><a href="/lounge/yeoksam"><div><img src="/static/img/home/lounge_y_0.jpg" alt="" /></div><p>라운지 역삼성당</p></a></div>
							<div className="lounge__thumb"><a href="/lounge/gangnam"><div><img src="/static/img/home/lounge_g_0.jpg" alt="" /></div><p>라운지 강남</p></a></div>
							<div className="lounge__thumb"><div><img src="/static/img/home/new_lounge.jpg" alt="" /></div></div>
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
