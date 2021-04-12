import React, { useState } from 'react'
import Layout from '../layout/DefaultLayout'
import EmailModal from '../components/emailModal'
import { TEST_AGENDA } from '../lib/constants'

const FloevMembership = () => {
	const [modal3, setModal3] = useState<boolean>(false)

	function showModal(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, modal: string) {
		e.preventDefault(); // 修复 Android 上点击穿透
		if (modal === 'modal3') {
			setModal3(true)
		}
	}

	return (
		<Layout title="플로브 멤버십">

			<div className="page__outer">
				<div className="page__inner">
					<div className="container">

						{/* container__membership */}
						<div className="container__membership">
							
							{/* section__1 */}
							<div className="section section__1">
								<div className="img__1"><img src="/img/test8/membership/1.jpg" alt=""/></div>
								<div className="title">
									<p className="p__1">가성비를 생각하면서도<br/>눈이 걱정되는 당신에게</p>
									<div className="line"></div>
									<p className="p__2"><strong>플로브<br/>멤버십</strong></p>
									<div className="line"></div>
									<p className="p__3">가격과 품질을 고민하는 당신을 위한<br/>합리적인 안경 멤버십 서비스</p>
								</div>
							</div>

							{/* section__2 */}
							<div className="section section__2">
								<div className="img__2"><img src="/img/test8/membership/2.jpg" alt=""/></div>
							</div>

							{/* section__3 */}
							<div className="section section__3">
								<div className="p__1">플로브 멤버십으로 <strong>최대 40% 할인</strong> 받고 안경 선택에 대한 고민과 눈에 대한 걱정 모두 줄여보세요.</div>
							</div>

							{/* section__4 */}
							<div className="section section__4">
								<p className="p__1"><strong>가격대별 멤버십 혜택 안내</strong></p>
								<div className="card__1">
									<div className="left">
										<div className="part__1"><strong>30만원</strong></div>
										<div className="part__2"><strong>웰컴 멤버십</strong></div>
										<div className="part__3">#첫구매_최고혜택</div>
									</div>
									<div className="right">
										<div className="part__1">첫 구매시<br/>안경테/안경렌즈 <strong>40%</strong>할인</div>
										<div className="part__2">두번째 구매부터 15%추가 할인</div>
									</div>
								</div>
							</div>

							{/* section__5 */}
							<div className="section section__5">
								<div className="same left">
									<div className="part__1">
										<div className="left"><strong>50만원</strong></div>
										<div className="right"> <strong>프렌즈 멤버십</strong><p>#2인가족_추천</p></div>
									</div>
									<div className="part__2">
										<p className="p__1">안경테/안경렌즈 항상 <strong>25%</strong>할인</p>
										<p className="p__2">블루라이트 차단 렌즈 무료 업그레이드</p>
										<div className="line"></div>
									</div>
								</div>
								<div className="same right">
									<div className="part__1">
										<div className="left"><strong>100만원</strong></div>
										<div className="right"><strong>패밀리 멤버십</strong><p>#온가족안경_추천</p></div>
									</div>
									<div className="part__2">
										<p className="p__1">안경테/안경렌즈 항상 <strong>30%</strong>할인</p>
										<p className="p__2">블루라이트 차단 렌즈 무료 업그레이드</p>
										<div className="line"></div>
									</div>
								</div>
							</div>

							{/* section__6 */}
							<div className="section section__6">
								<div className="card">
									<p className="card__p1">플로브에서 구매할 수 있는 <strong>안경테</strong>는?</p>
									<div className="img__6"><img src="/img/test8/subscription/6.jpg" alt=""/></div>
									<p className="card__p2"><span className="point-box"></span>애쉬크로프트부터 ic!베를린까지<br/>나에게 어울리면서 퀄리티까지<br/>보장되는 플로브 취급 26개 브랜드<br/>(평균 안경테 가격 10~70만원대)</p>
								</div>
									<p className="card__p1">플로브에서 구매할 수 있는 <strong>안경렌즈</strong>는?</p>
								<div className="card">
									<div className="img__6"><img src="/img/test8/subscription/7.jpg" alt=""/></div>
									<p className="card__p2"><span className="point-box"></span>애쉬크로프트부터 ic!베를린까지<br/>나에게 어울리면서 퀄리티까지<br/>보장되는 플로브 취급 26개 브랜드<br/>(평균 안경테 가격 10~70만원대)</p>
								</div>
							</div>

							{/* btn-more-wrap */}
							<div className="btn-more-wrap">
								<div className="btn-more">
									<button onClick={(e) => showModal(e, 'modal3')}>더 알아보기</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>



			<EmailModal
				visible={modal3}
				onCancel={() => setModal3(false)}
				testAgenda={TEST_AGENDA.BUY_NOW_PAY_LATER}
			/>
		</Layout>

	)
}

export default FloevMembership
