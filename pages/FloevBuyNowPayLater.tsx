import React, { useState } from 'react'
import Layout from '../layout/DefaultLayout'
import EmailModal from '../components/emailModal'
import { NEW_SERVICE } from '../lib/constants'

const FloevBuyNowPayLater = () => {
  const [modal3, setModal3] = useState<boolean>(false)

  function showModal(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, modal: string) {
    e.preventDefault(); // 修复 Android 上点击穿透
    if (modal === 'modal3') {
      setModal3(true)
    }
  }

  return (
    <Layout title="플로브 약정구매">
      <div className="page__outer">
        <div className="page__inner">
          <div className="container">
            {/* container__buynowpaylater */}
            <div className="container__buynowpaylater">
              {/* section__1 */}
              <div className="section section__1">
                <p className="p__1"><strong>플로브 약정구매 서비스</strong></p>
                <p className="p__2">30만원 안경 <br /><strong>월 8,800원</strong>에<br />구매하세요.</p>
              </div>

              {/* section__2 */}
              <div className="section section__2">
                <p className="p__1"><strong>원하는 안경 오늘, 구매는 부담없이</strong></p>
                <p className="p__2">약정선택 예시</p>
                <div className="card">
                  <div className="tag"><strong>A</strong></div>
                  <div className="img__2"><img src="/img/test8/buynowpaylater/2.jpg" alt="" /></div>
                  <p className="p__1">36만원 안경테 + 14만원 렌즈</p>
                  <p className="p__2"><strong>= 총 50만원/24개월 선택</strong></p>
                  <div className="img__arrow"><img src="/img/test8/buynowpaylater/arrow1.png" alt="" /></div>
                  <p className="p__3"><strong>당일 15만원 결제</strong></p>
                  <p className="p__4"><strong>이후 월 14,583원<span>/24개월</span></strong></p>
                </div>
                <div className="card b">
                  <div className="tag"><strong>B</strong></div>
                  <div className="img__3"><img src="/img/test8/buynowpaylater/3.jpg" alt="" /></div>
                  <p className="p__1">22만원 안경테 + 8만원 렌즈</p>
                  <p className="p__2"><strong>= 총 30만원/24개월 선택</strong></p>
                  <div className="img__arrow"><img src="/img/test8/buynowpaylater/arrow2.png" alt="" /></div>
                  <p className="p__3"><strong>당일 9만원 결제</strong></p>
                  <p className="p__4"><strong>이후 <span className="color">월 8,800원</span><span>/24개월</span></strong></p>
                </div>
                <div className="card">
                  <div className="tag"><strong>C</strong></div>
                  <div className="img__4"><img src="/img/test8/buynowpaylater/4.jpg" alt="" /></div>
                  <p className="p__1">32만원 안경테 + 40만원 렌즈</p>
                  <p className="p__2"><strong>= 총 72만원/12개월 선택</strong></p>
                  <div className="img__arrow"><img src="/img/test8/buynowpaylater/arrow1.png" alt="" /></div>
                  <p className="p__3"><strong>당일 21.6만원 결제</strong></p>
                  <p className="p__4"><strong>이후 월 42,000원<span>/12개월</span></strong></p>
                </div>
              </div>

              {/* section__3 */}
              <div className="section section__3">
                <div className="div__1"><strong>플로브 약정구매 서비스</strong></div>
                <div className="div__2">
                  <div><strong>Buy Now</strong></div>
                  <p className="p__1"><strong>30%만 지금,</strong></p>
                  <p className="p__2">30만원짜리 안경 <strong>오늘은 9만원만</strong></p>
                </div>
                <div className="div__2">
                  <div><strong>Pay Later</strong></div>
                  <p className="p__1"><strong>나머지는 나누어 내세요</strong></p>
                  <p className="p__2">12~24개월 <strong>원하는만큼 나눠서 결제</strong></p>
                </div>
              </div>

              {/* section__4 */}
              <div className="section section__4">
                <div className="div__1">
                  <p><strong>가장 합리적인 구매 방법<br />플로브 약정구매 서비스</strong></p>
                </div>
                <div className="div__2">
                  <div className="num"><strong>1</strong></div>
                  <p className="p__1"><strong>플로브 가격 그대로<br />할인 혜택도 그대로</strong></p>
                  <p className="insert">장기 할부가 가능한 대신<br />원래 가격을 더 비싸게 받는 것 아닌가요?</p>
                  <p className="p__2">아니요!<br />플로브 가격은 일반 소비자가에서 10-15%할인된 가격이고<br />진행중인 할인 이벤트의 혜택도 그대로 적용이 가능해요.</p>
                </div>
                <div className="div__2">
                  <div className="num"><strong>2</strong></div>
                  <p className="p__1"><strong>원하는대로<br />내 안경 금액만</strong></p>
                  <p className="p__2">약정을 위한 최소 구매금액, 약정 가입비 등<br />약정구매를 위한 어떠한 구매 조건도 없습니다.<br />내가 원하는 안경/안경렌즈로 선택하세요.</p>
                </div>
                <div className="div__2 last">
                  <div className="num"><strong>3</strong></div>
                  <p className="p__1"><strong>할부 수수료 제로<br />늘어난 할부기간 선택</strong></p>
                  <p className="p__2">플로브 약정구매는 카드사 제공 할부 기간보다 길고<br />할부 수수료는 없습니다.</p>
                </div>
              </div>

              {/* section__5 */}
              <div className="section section__5">
                <div className="div__1"><strong>이런 분에게 추천하는 서비스</strong></div>
                <div className="div__2">
                  <p className="p__1"><strong>추천1</strong></p>
                  <p className="p__2">안경은 마음에 드는데 가격 때문에 망설이는 분</p>
                </div>
                <div className="div__2">
                  <p className="p__1"><strong>추천2</strong></p>
                  <p className="p__2">시력이 나빠서 매번 고가의 렌즈를 구매하는 분</p>
                </div>
                <div className="div__2">
                  <p className="p__1"><strong>추천3</strong></p>
                  <p className="p__2">큰 지출이 부담스러워 매번 할부 결제를 하는 분</p>
                </div>
              </div>

              {/* btn-more-wrap */}
              <div className="btn-more-wrap">
                <div className="btn-more">
                  <button className="tn-0051" onClick={(e) => showModal(e, 'modal3')}>약정구매 더 알아보기</button>
                </div>
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

export default FloevBuyNowPayLater
