import React, { useState } from 'react'
import Layout from '../layout/DefaultLayout'
import EmailModal from '../components/emailModal'
import { NEW_SERVICE } from '../lib/constants'

const FloevInsurance = () => {
  const [modal3, setModal3] = useState<boolean>(false)

  function showModal(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, modal: string) {
    e.preventDefault(); // 修复 Android 上点击穿透
    if (modal === 'modal3') {
      setModal3(true)
    }
  }

  return (
    <Layout title="플로브 단순변심보장">

      <div className="page__outer">
        <div className="page__inner">

          <div className="container">

            {/* container__insurance */}
            <div className="container__insurance">

              {/* section__1 */}
              <div className="section section__1">
                <div className="img__1"><img src="/img/test8/insurance/1.jpg" alt="" /></div>
                <p><strong>"안경은 왜 환불이 어려울까?"</strong></p>
              </div>

              {/* section__2 */}
              <div className="section section__2">
                <div className="p__1">단순변심보장<br />플로브가 시작합니다.</div>
                <div className="cs-vc">
                  <div className="item">고민했던<br />다른 안경테가<br />눈에 아른거려요</div>
                  <div className="item">집에서 혼자<br />써보니 어색하고<br />선택이 후회돼요</div>
                  <div className="item">헤어스타일을<br />바꿨더니<br />안어울려요</div>
                </div>
              </div>

              {/* section__3 */}
              <div className="section section__3">
                <p>더 이상 안경, 후회하지 마세요.<br />이제 확실하게<br /><strong>마음에 드는 안경만 쓰세요.</strong></p>
              </div>

              {/* section__4 */}
              <div className="section section__4">
                <p className="p__1"><strong>플로브에서 안경 구매 후,<br /><span>2주 이내 환불 요청하면?</span></strong></p>
                <p className="p__2">(두 가지 환불 방법 중 택1)</p>
                <div className="img__3"><img src="/img/test8/insurance/3.jpg" alt="" /></div>
                <div className="img__4"><img src="/img/test8/insurance/4.jpg" alt="" /></div>
              </div>

              {/* section__5 */}
              <div className="section section__5">
                <div className="line"></div>
                <p className="p__1"><strong>플로브 크레딧이란?</strong></p>
                <p className="p__2">플로브에서 안경/안경렌즈를 구매할 때<br />현금처럼 사용할 수 있는 포인트 제도입니다.</p>
                <p className="p__3">*타인과 함께 사용 가능<br />*포인트 사용기간 제한 없음</p>
              </div>

              {/* section__6 */}
              <div className="section section__6">
                <div className="card">
                  <p className="card__p1">플로브에서 구매할 수 있는 <strong>안경테</strong>는?</p>
                  <div className="img__6"><img src="/img/test8/subscription/6.jpg" alt="" /></div>
                  <p className="card__p2"><span className="point-box"></span>애쉬크로프트부터 ic!베를린까지<br />나에게 어울리면서 퀄리티까지<br />보장되는 플로브 취급 26개 브랜드<br />(평균 안경테 가격 10~70만원대)</p>
                </div>
                <p className="card__p1">플로브에서 구매할 수 있는 <strong>안경렌즈</strong>는?</p>
                <div className="card">
                  <div className="img__6"><img src="/img/test8/subscription/7.jpg" alt="" /></div>
                  <p className="card__p2"><span className="point-box"></span>애쉬크로프트부터 ic!베를린까지<br />나에게 어울리면서 퀄리티까지<br />보장되는 플로브 취급 26개 브랜드<br />(평균 안경테 가격 10~70만원대)</p>
                </div>
              </div>

              {/* btn-more-wrap */}
              <div className="btn-more-wrap">
                <div className="btn-more">
                  <button onClick={(e) => showModal(e, 'modal3')}>플로브 단순변심보상 더 알아보기</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EmailModal
        visible={modal3}
        onCancel={() => setModal3(false)}
        newService={NEW_SERVICE.INSURANCE}
      />
    </Layout>

  )
}

export default FloevInsurance
