import React, { useState } from 'react'
import Layout from '../layout/DefaultLayout'
import EmailModal from '../components/emailModal'
import { TEST_AGENDA } from '../lib/constants'

const FloevDelivery = () => {
	const [modal3, setModal3] = useState<boolean>(false)

	function showModal(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, modal: string) {
		e.preventDefault(); // 修复 Android 上点击穿透
		if (modal === 'modal3') {
			setModal3(true)
		}
	}

	return (
		<Layout title="플로브 새벽피팅&케어">

			<div className="page__outer">
				<div className="page__inner">

					<div className="container">

						{/* container__delivery */}
						<div className="container__delivery">

							{/* section__1 */}
							<div className="section section__1">
								<p className="p__1">새벽피팅 서비스</p>
								<p className="p__2">오늘 밤 신청한<br/><strong>안경피팅</strong></p>
							</div>

							{/* section__2 */}
							<div className="section section__2">
								<p className="p__1"><strong>새벽이면 도착!</strong></p>
								<p className="p__2">흘러내리고 꽉 끼는 안경<br/><strong>출근 전 피팅완료</strong></p>
							</div>

							{/* section__3 */}
							<div className="section section__3">
								<p><strong>새벽배송으로 받는<br/>나의 안경 피팅/케어</strong></p>
								<div className="img__3"><img src="/img/test8/delivery/3.jpg" alt="" /></div>
							</div>

							{/* section__4 */}
							<div className="section section__4">
								<p className="p__1">새벽피팅 서비스 안내</p>
								<div>
									<div className="num"><strong>1</strong></div>
									<p className="p__1"><strong>홈페이지 간편신청</strong></p>
									<p className="p__2">밤 11시 이전까지 플로브<br/>홈페이지에서 피팅/케어 신청</p>
								</div>
								<div>
									<div className="num"><strong>2</strong></div>
									<p className="p__1"><strong>안경을 현관 앞에</strong></p>
									<p className="p__2">내 안경을 안전하게 박스에<br/>넣어 우리집 문 앞에 내어두기</p>
								</div>
								<div>
									<div className="num"><strong>3</strong></div>
									<p className="p__1"><strong>출근 전 안경 수령</strong></p>
									<p className="p__2">오전 6시, 피팅/케어가 완료된<br/>안경이 우리집 문 앞으로 배송</p>
								</div>
							</div>

							{/* section__5 */}
							<div className="section section__5">
								<p><strong>피팅/케어를 통해 내 안경의<br/>이런 상태를 점검해요</strong></p>
								<div className="img__4"><img src="/img/test8/delivery/4.jpg" alt="" /></div>
							</div>

							{/* section__6 */}
							<div className="section section__6">
								<div className="div__1">
									<p><strong>직접 가지 않고 피팅이 가능할까?</strong></p>
								</div>
								<div className="div__2">
									<div className="num"><strong>1</strong></div>
									<p className="p__1"><strong>플로브 라운지에서<br/>최초 1회 오프라인 피팅</strong></p>
									<p className="p__2">플로브에서 안경을 구매/수령할 때<br/>피팅 상담을 진행하며 나에게 맞는 핏(fit)을 찾아요.</p>
								</div>
								<div className="div__2">
									<div className="num"><strong>2</strong></div>
									<p className="p__1"><strong>피팅 완료 된 안경<br/>3D 스캐닝 - 기록</strong></p>
									<p className="p__2">나에게 맞게 조정된 안경의 구체적인 수치와 형태를<br/>3D 스캐닝을 통해 데이터를 기록해요.</p>
								</div>
								<div className="div__2 last">
									<div className="num"><strong>3</strong></div>
									<p className="p__1"><strong>나의 3D 데이터로<br/>안경 피팅</strong></p>
									<p className="p__2">처음 피팅을 받았던 편안한 착용감 그대로<br/>나의 안경을 조정해요.</p>
								</div>
							</div>

							{/* section__7 */}
							<div className="section section__7">
								<div className="div__1"><strong>이런 분에게 추천하는 서비스</strong></div>
								<div className="div__2">
									<p className="p__1"><strong>추천1</strong></p>
									<p className="p__2">플로브 위치가 직장/집에서 먼 분</p>
								</div>
								<div className="div__2">
									<p className="p__1"><strong>추천2</strong></p>
									<p className="p__2">동네 안경원에 가자니 눈치가 보이는 분</p>
								</div>
								<div className="div__2">
									<p className="p__1"><strong>추천3</strong></p>
									<p className="p__2">바쁜 생활로 따로 시간 내기가 어려운 분</p>
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

export default FloevDelivery
