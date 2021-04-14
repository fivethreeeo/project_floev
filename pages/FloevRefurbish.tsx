import React, { useState } from 'react'
import Layout from '../layout/DefaultLayout'
import EmailModal from '../components/emailModal'
import { NEW_SERVICE } from '../lib/constants'

const FloevRefurbish = () => {
  const [modal3, setModal3] = useState<boolean>(false)

  function showModal(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, modal: string) {
    e.preventDefault(); // 修复 Android 上点击穿透
    if (modal === 'modal3') {
      setModal3(true)
    }
  }

  return (
    <Layout title="플로브 리퍼비쉬">

      <div className="page__outer">
        <div className="page__inner">

          <div className="container">

            {/* container__refurbish */}
            <div className="container__refurbish">

              {/* section__1 */}
              <div className="section section__1">
                <div className="img__1"><img src="/img/test8/tradein/1.jpg" alt="" /></div>
              </div>

              {/* section__2 */}
              <div className="section section__2">
                <p className="p__1"><strong>플로브 리퍼비쉬</strong></p>
                <p className="p__2"><strong>반값에 만나는<br />브랜드 안경테</strong></p>
                <p className="p__3">플로브 리퍼비쉬는 1년 무상 보증과 엄격한 자체 공정 시스템을 거친 새것과 다름없는 제품입니다. <strong>올리버 피플스, 타르트 옵티컬, 아이씨 베를린</strong> 등의 브랜드 안경테를 신제품 대비 50% 이상 할인된 특별 가격으로 다양한 안경테를 부담 없이 구매해보세요.</p>
              </div>

              {/* section__3 */}
              <div className="section section__3">
				<p className="p__1"><strong>추천제품</strong></p>
				<div className="item">
					<div className="img__2"><img src="/img/test8/item__1.jpg" alt=""/></div>
					<p className="p__1"><strong>타르트 옵티컬</strong></p>
					<p className="p__2">ARNEL HERITAGE A1</p>
					<div className="tag__wrap">
						<div className="tag tag__1">60% 할인</div>
						<div className="tag tag__2">5개월</div>
					</div>
					<div className="line"></div>
					<p className="p__3">14.4 <span className="won">만원</span></p>
					<p className="p__4">36.0 <span className="won">만원</span></p>
				</div>
				<div className="item">
					<div className="img__2"><img src="/img/test8/item__2.jpg" alt=""/></div>
					<p className="p__1">타르트 옵티컬</p>
					<p className="p__2">ARNEL HERITAGE A3</p>
					<div className="tag__wrap">
						<div className="tag tag__1">70% 할인</div>
						<div className="tag tag__2">8개월</div>
					</div>
					<div className="line"></div>
					<p className="p__3">10.8 <span className="won">만원</span></p>
					<p className="p__4">36.0 <span className="won">만원</span></p>
				</div>
				<div className="item">
					<div className="img__2"><img src="/img/test8/item__3.jpg" alt=""/></div>
					<p className="p__1">아이씨 베를린</p>
					<p className="p__2">OROSHI BK</p>
					<div className="tag__wrap">
						<div className="tag tag__1">50% 할인</div>
						<div className="tag tag__2">11개월</div>
					</div>
					<div className="line"></div>
					<p className="p__3">34 <span className="won">만원</span></p>
					<p className="p__4">68 <span className="won">만원</span></p>
				</div>
			</div>

              {/* section__4 */}
              <div className="section section__4">
                <div className="div__10">
                  <p><strong>플로브 리퍼비쉬 제품이<br />특별한 이유</strong></p>
                  <div className="div__11">
                    <div className="div__12"><img src="/img/test8/refurbish/11.jpg" alt=""/></div>
                    <div className="div__13">소모품 및<br />파츠 교체</div>
                  </div>
                  <div className="div__11">
                    <div className="div__12"><img src="/img/test8/refurbish/12.jpg" alt=""/></div>
                    <div className="div__13">특수세척 및<br />폴리싱</div>
                  </div>
                  <div className="div__11">
                    <div className="div__12"><img src="/img/test8/refurbish/13.jpg" alt=""/></div>
                    <div className="div__13">1년 무상 보증<br />및 케어 서비스</div>
                  </div>
                  <div className="div__11">
                    <div className="div__12"><img src="/img/test8/refurbish/14.jpg" alt=""/></div>
                    <div className="div__13">50% 이상<br />할인된 가격</div>
                  </div>

                </div>
                <div className="div__2">
                  <div className="num"><strong>1</strong></div>
                  <p className="p__1"><strong>소모품 및 파츠 교체</strong></p>
                  <p className="p__2">이어팁, 코패드, 나사 등의 소모품 부터 안경 다리 등 파츠까지 교체해 신제품과 동일한 기능 표준을 충족합니다.</p>
                </div>
                <div className="div__2">
                  <div className="num"><strong>2</strong></div>
                  <p className="p__1"><strong>특수 세척 및 폴리싱</strong></p>
                  <p className="p__2">특수 세척과 폴리싱으로 기스와 사용감을 완전히 제거합니다.</p>
                </div>
                <div className="div__2">
                  <div className="num"><strong>3</strong></div>
                  <p className="p__1"><strong>1년 무상 보증 및 케어 서비스</strong></p>
                  <p className="p__2">플로브 리퍼비쉬 제품은 1년 무상 보증을 비롯한 신제품 구매 시 진행하는 케어 서비스를 동일하게 제공합니다.</p>
                </div>
                <div className="div__2 last">
                  <div className="num"><strong>4</strong></div>
                  <p className="p__1"><strong>50% 이상 할인된 가격</strong></p>
                  <p className="p__2">신제품 대비 50% 이상 저렴한 가격에 판매합니다.</p>
                </div>
              </div>

              {/* btn-more-wrap */}
              <div className="btn-more-wrap">
                <div className="btn-more">
                  <button className="tn-0055" onClick={(e) => showModal(e, 'modal3')}>리퍼비쉬 더 알아보기</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EmailModal
        visible={modal3}
        onCancel={() => setModal3(false)}
        newService={NEW_SERVICE.REFURBISH}
      />
    </Layout>

  )
}

export default FloevRefurbish
