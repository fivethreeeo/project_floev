import React, { useState } from 'react'
import Layout from '../layout/DefaultLayout'
import EmailModal from '../components/emailModal'
import { NEW_SERVICE } from '../lib/constants'

const FloevTogetherPlan = () => {
  const [modal3, setModal3] = useState<boolean>(false)

  function showModal(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, modal: string) {
    e.preventDefault(); // 修复 Android 上点击穿透
    if (modal === 'modal3') {
      setModal3(true)
    }
  }

  return (
    <Layout title="플로브 투게더 플랜">
      <div className="eraser">

      </div>
      <div className="page__outer">
        <div className="page__inner">

          <div className="container">

            {/* container__togetherplan */}
            <div className="container__togetherplan">

              {/* section__1 */}
              <div className="section section__1">
                <div className="img__1"><img src="/img/test8/tradein/1.jpg" alt="" /></div>
              </div>

              {/* section__2 */}
              <div className="section section__2">
                <p className="p__1"><strong>함께하면 더 많은 혜택<br />플로브 투게더 플랜</strong></p>
                <p className="p__2">필요한 혜택만 선택해 최대 40% 할인</p>
              </div>

              {/* section__3 */}
              <div className="section section__3">
                <p className="p__1"><strong>최대 40% 할인과 다양한 혜택</strong></p>
                <p className="p__2">선택한 플랜에 따라 결제금액 30~40% 할인과 개인별 맞춤 선택형 혜택을 드려요.</p>
              </div>

              {/* section__4 */}
              <div className="section section__4">
                <div className="p__1">플랜 A</div>
                <div className="plan plan__1">
                  <div className="p__2">총 금액의 <span className="plan__1">40%</span><span className="plan__2"> 할인</span></div>
                  <div className="line"></div>
                  <p className="p__3">철수 (테+렌즈 20만원) + 영희 (테+렌즈 30만원)</p>
                  <p className="p__4">= 총 금액 40만원 &gt;&gt; 결제금액 24만원</p>
                </div>
                <div className="p__1 p2">플랜 B</div>
                <div className="plan plan__2">
                  <div className="p__2">총 금액의 <span className="plan__1">25%</span><span className="plan__2"> 할인</span></div>
                  <div className="img__3"><img src="/img/test8/togetherplan/plus.png" alt="" /></div>
                  <div className="p__5">개인별 무료 맞춤 선택</div>
                  <div className="card card__1">다초점 렌즈</div>
                  <div className="card card__1">블루라이트 렌즈</div>
                  <div className="card card__1">6개월 단위 시력 케어 서비스</div>
                  <div className="line"></div>
                  <p className="p__3">철수 (테 20만원 / 다초점렌즈 20만원) +<br />영희 (테 20만원 / 블루라이트렌즈 5만원)</p>
                  <p className="p__4">= 총 금액 65만원 &gt;&gt; 결제금액 30만원</p>
                </div>
              </div>

              {/* btn-more-wrap */}
              <div className="btn-more-wrap">
                <div className="btn-more">
                  <button className="tn-0057" onClick={(e) => showModal(e, 'modal3')}>투게더 플랜 더 알아보기</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EmailModal
        visible={modal3}
        onCancel={() => setModal3(false)}
        newService={NEW_SERVICE.TRADE_IN}
      />
    </Layout>

  )
}

export default FloevTogetherPlan
