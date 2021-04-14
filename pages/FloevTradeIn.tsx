import React, { useState } from 'react'
import Layout from '../layout/DefaultLayout'
import EmailModal from '../components/emailModal'
import { NEW_SERVICE } from '../lib/constants'

const FloevTradeIn = () => {
  const [modal3, setModal3] = useState<boolean>(false)

  function showModal(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, modal: string) {
    e.preventDefault(); // 修复 Android 上点击穿透
    if (modal === 'modal3') {
      setModal3(true)
    }
  }

  return (
    <Layout title="플로브 반납보상">

      <div className="page__outer">
        <div className="page__inner">

          <div className="container">

            {/* container__tradein */}
            <div className="container__tradein">

              {/* section__1 */}
              <div className="section section__1">
                <div className="img__1"><img src="/img/test8/tradein/1.jpg" alt="" /></div>
              </div>

              {/* section__2 */}
              <div className="section section__2">
                <p className="p__1"><strong>플로브 반납보상</strong></p>
                <p className="p__2"><strong>안경 반납하고 <br />현금 돌려받으세요.</strong></p>
                <p className="p__3">플로브에서 구매한 안경을 반납하면 새 안경 구매 시 사용할 수 있는 크레딧 또는 현금으로 구매금액에 최대 35%를 돌려받을 수 있어요. 아니면 렌즈를 교환하거나, 주변 지인에게 크레딧을 양도할 수도 있어요. </p>
              </div>

              {/* section__3 */}
              <div className="section section__3"><div className="img__2"><img src="/img/test8/tradein/2.jpg" alt=""/></div></div>

              {/* section__4 */}
              <div className="section section__4">
                <p className="p__1"><strong>원하는 만큼 착용한 안경,<br />반납하고 구매금액의<br />35%까지 보상받아요.</strong></p>
                <p className="p__2">플로브에서 구매한 안경을 반납하면 사용 기간과 테의 상태에 따라 크레딧 또는 현금으로 최대 35%까지 보상해드려요.</p>
              </div>

              {/* section__5 */}
              <div className="section section__5">
                <div className="div__1">
                  <span className="span__1">사용기간</span>
                  <span className="span__1">예상 크레딧</span>
                  <span className="span__1">예상 현금</span>
                </div>
                <div className="div__2">
                  <span className="span__2 lh-48">~ 6개월 미만</span>
                  <span className="span__2 lh-48 big">최대 35%</span>
                  <span className="span__2 lh-48 big">최대 30%</span>
                </div>
                <div className="line"></div>
                <div className="div__2">
                  <span className="span__2">6개월 이상<br />~ 12개월 미만</span>
                  <span className="span__2 lh-48">최대 25%</span>
                  <span className="span__2 lh-48">최대 20%</span>
                </div>
                <div className="line"></div>
                <div className="div__2">
                  <span className="span__2">12개월 이상<br />~ 18개월 미만</span>
                  <span className="span__2 lh-48">최대 15%</span>
                  <span className="span__2 lh-48">최대 10%</span>
                </div>
              </div>

              {/* section__6 */}
			<div className="section section__6">
				<div className="div__1">구매할 때</div>
				<div className="item">
					<div className="img__3"><img src="/img/test8/item__3.jpg" alt=""/></div>
					<p className="p__1"><strong>아이씨 베를린</strong></p>
					<p className="p__2">OROSHI BK</p>
					<div className="line"></div>
					<p className="p__3">68 <span className="won">만원</span></p>
				</div>
				<div className="img__4"><img src="img/test8/tradein/arrow.png" alt=""/></div>
				<div className="div__2">6개월 후</div>
				<div className="card-wrap">
					<div className="card__or">OR</div>
					<div className="card card__1">
						<span className="span__1">크레딧</span>
						<span className="span__4">만원</span>
						<span className="span__3">23.8</span>
						<span className="span__2">35%</span>
					</div>
					<div className="card card__2">
						<span className="span__1">현금</span>
						<span className="span__4">만원</span>
						<span className="span__3">20.4</span>
						<span className="span__2">30%</span>
					</div>
				</div>
				<div className="div__3">크레딧 또는 현금으로<br/>보상을 선택해보세요!</div>
			</div>

              {/* section__7 */}
              <div className="section section__7">
                <div className="div__1">
                  <p><strong>플로브 반납보상 서비스와<br />슬기로운 안경생활</strong></p>
                </div>
                <div className="div__2">
                  <div className="num"><strong>1</strong></div>
                  <p className="p__1"><strong>매번 여분 안경테가 늘어나<br />처치 곤란하신가요?</strong></p>
                  <p className="p__2">일상생활은 1~2개의 여분 안경으로도 충분해요. 앞으로는 다양한 반납 보상 혜택으로 안경을 구매해보세요.</p>
                </div>
                <div className="div__2">
                  <div className="num"><strong>2</strong></div>
                  <p className="p__1"><strong>눈 건강을 위해<br />12~18개월의 안경 주기를 추천해요.</strong></p>
                  <p className="p__2">안경 렌즈는 햇빛, 열, 스크레치의 원인으로  손상되요. 고급 렌즈보단 나에게 잘 맞는 렌즈를 자주 교체하는 게 좋아요. 플로브 반납 보상 서비스로 안경 교체의 부담을 줄여드릴게요.</p>
                </div>
                <div className="div__2 last">
                  <div className="num"><strong>3</strong></div>
                  <p className="p__1"><strong>부담없이 현금으로 돌려받으세요.</strong></p>
                  <p className="p__2">고객에게 좋고, 플로브도 반납받은 안경테를 다양한 방식으로 활용해요. 플로브 자체 공정을 거치는 리퍼비쉬 제품 또는 플로브 크루 교육에 사용될 예정이에요.</p>
                </div>
              </div>

              {/* btn-more-wrap */}
              <div className="btn-more-wrap">
                <div className="btn-more">
                  <button onClick={(e) => showModal(e, 'modal3')}>플로브 반납보상 더 알아보기</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EmailModal
        visible={modal3}
        onCancel={() => setModal3(false)}
        newService={NEW_SERVICE.TRADEIN}
      />
    </Layout>

  )
}

export default FloevTradeIn
