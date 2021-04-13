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
    <Layout title="플로브 무제한 안경 구독">

      <div className="page__outer">
        <div className="page__inner">

          <div className="container">

            {/* container__subscription */}
            <div className="container__subscription">

              {/* section__1 */}
              <div className="section section__1">
                <div className="img__1"><img src="/img/test8/subscription/1.png" alt="" /></div>
                <h2>무제한 안경 구독</h2>
                <p>안경, 더 이상 고민하지 말고 교환하세요.</p>
                <p><strong>플로브 안경 구독 서비스</strong></p>
              </div>

              {/* section__2 */}
              <div className="section section__2">
                <div className="img__2"><img src="/img/test8/subscription/2.png" alt="" /></div>
              </div>

              {/* section__3 */}
              <div className="section section__3">
                <div className="img__3"><img src="/img/test8/subscription/3.png" alt="" /></div>
                <ul className="desc-list">
                  <li className="desc-item">
                    <p className="desc-item__p1">어울리는 안경만<br />쉽게 추천받고</p>
                    <div className="img__4"><img src="/img/test8/subscription/4.png" alt="" /></div>
                    <p className="desc-item__p2">플로브 라운지에서<br />안경 카운셀러와 함께<br />나만의 안경 추천받기</p>
                  </li>
                  <li className="desc-item">
                    <p className="desc-item__p1">가격 부담 없이<br />구독 가격만 결제</p>
                    <div className="img__4"><img src="/img/test8/subscription/4.png" alt="" /></div>
                    <p className="desc-item__p2">마음에 드는 안경<br />고르고 구독 신청하면?<br />구독 가격만 결제!</p>
                  </li>
                  <li className="desc-item">
                    <p className="desc-item__p1">시력건강 무료<br />정기 체크는 덤</p>
                    <div className="img__4"><img src="/img/test8/subscription/4.png" alt="" /></div>
                    <p className="desc-item__p2">항상 나의 시력에<br />딱 맞는 렌즈로 교환!<br />쉽게 눈을 관리해요</p>
                  </li>
                </ul>
                <div className="img__5"><img src="/img/test8/subscription/5.png" alt="" /></div>
              </div>

              {/* section__4 */}
              <div className="section section__4">
                <div className="card">
                  <p className="card__p1">플로브에서 구독할 수 있는 <strong>안경테</strong>는?</p>
                  <div className="img__6"><img src="/img/test8/subscription/6.png" alt="" /></div>
                  <p className="card__p2">애쉬크로프트부터 ic!베를린까지<br />나에게 어울리면서 퀄리티까지<br />보장되는 플로브 취급 26개 브랜드<br />(평균 안경테 가격 10~70만원대)</p>
                </div>
                <div className="card">
                  <p className="card__p1">플로브에서 구독할 수 있는 <strong>안경테</strong>는?</p>
                  <div className="img__6"><img src="/img/test8/subscription/7.png" alt="" /></div>
                  <p className="card__p2">애쉬크로프트부터 ic!베를린까지<br />나에게 어울리면서 퀄리티까지<br />보장되는 플로브 취급 26개 브랜드<br />(평균 안경테 가격 10~70만원대)</p>
                </div>
              </div>

            </div>

            {/* container__btn-more-wrap */}
            <div className="container__btn-more-wrap">
              <div className="btn-more">
                <button onClick={(e) => showModal(e, 'modal3')}>더 알아보기</button>
              </div>
            </div>

          </div>

        </div>
      </div>

      <EmailModal
        visible={modal3}
        onCancel={() => setModal3(false)}
        newService={NEW_SERVICE.BUY_NOW_PAY_LATER}
      />
    </Layout>

  )
}

export default FloevTradeIn
