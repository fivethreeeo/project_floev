import Head from 'next/head'
import Layout from '../layout/DefaultLayout'
import React, { useEffect, useState } from 'react'
import { Modal, WingBlank, Carousel, Accordion } from 'antd-mobile'
import { gql, useMutation } from '@apollo/client'

const CREATE_USER_MUTATION = gql`
  mutation signUpUser2($name: String, $phn: String) {
    signUpUser2(name: $name, phn: $phn) {
      id
    }
  }
`

// 타입 정의
declare global {
  // Window 객체 타입
  interface Window {
    Kakao: any
    analytics: any
    gtag: Function
  }
  interface Process {
    browser: boolean
  }
}
declare var process: Process
declare function gtag_button1(): void;
declare function gtag_button2(): void;

const IndexPage = () => {
  const [modalView, setModalView] = useState(false)
  const [name, setName] = useState('')
  const [phn, setPhn] = useState('')
  const [completed, setCompleted] = useState(false)
  const [createUser] = useMutation(CREATE_USER_MUTATION);

  const onChangeName = (e: any) => {
    setName(e.target.value)
  }
  const onChangePhn = (e: any) => {
    setPhn(e.target.value)
  }
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('12cae5545ba9f2d8993ff4d8b45478de')
    }
    window.Kakao.PlusFriend.createChatButton({
      container: '#plusfriend-chat-button',
      plusFriendId: '_qxajuT' // 플러스친구 홈 URL에 명시된 id로 설정합니다.
    })
  })

  useEffect(() => {
    if (phn.length === 10) {
      setPhn(phn.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'))
    }
    if (phn.length === 13) {
      setPhn(phn.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'))
    }
  }, [phn])

  const handleGtag1 = () => {
    if (process.browser) {
      gtag_button1()
    }
  }

  const handleGtag2 = () => {
    if (process.browser) {
      gtag_button2()
    }
  }

  return (
    <>
      {/* Google Pixel: index.js -> survey.js */}
      <Head>
        <script dangerouslySetInnerHTML={{
          __html: `
        function gtag_button1() {
          console.log("gtag_button1 START")
          gtag('event', 'conversion', {
              'send_to': 'AW-738487034/sJQHCJqHhuIBEPrVkeAC',
          });
          console.log("gtag_button1 END")
          return false;
        }
        function gtag_button2() {
          console.log("gtag_button2 START")
          gtag('event', 'conversion', {
              'send_to': 'AW-738487034/xtCNCOqDhuIBEPrVkeAC',
          });
          console.log("gtag_button2 END")
          return false;
        }
      `}}
        />
        {/* Kakao Pixel */}
        <script type="text/javascript" charSet="UTF-8" src="//t1.daumcdn.net/adfit/static/kp.js"></script>
        <script type="text/javascript">
          kakaoPixel('784604748053330030').pageView('arrivehome');
        </script>
      </Head>
      <Layout title="플로브 - 나의 눈을 위한 안경 큐레이션 서비스">
        <Modal
          popup
          visible={modalView}
          onClose={() => { setModalView(false) }}
          animationType="slide-up"
        >
          {completed === false ? (
            <div className="modalWrap kakao__1">
              <button className="gtm-034 closeBtn" onClick={() => { setModalView(false) }}><img src="/static/img/newLanding/close-btn.png" alt="" /></button>
              <div className="modalDesc">
                <p className="main">내 안경이 불편한 이유<br />안경은 나에게 어울리지 않는다는 편견,<br /><strong>어떤 안경 고민을 가지고 계시나요?</strong></p>
                <p className="sub">나의 안경에 대해 알아가는 첫걸음을<br /><strong>플로브 안경 카운셀러</strong>와 시작하세요.</p>
              </div>
              <form
                onSubmit={e => {
                  e.preventDefault()
                  window.analytics.identify({
                    name: name,
                    phn: phn,
                  })
                  createUser({ variables: { name: name, phn: phn } })
                  setName('')
                  setPhn('')
                  setCompleted(true)
                }}
              >
                <div className="kakaoForm">
                  <input className="name data-hj-allow" type="text" name="name" placeholder={'이름'} maxLength={20} value={name} onChange={onChangeName} />
                  <input className="tel data-hj-allow" type="tel" name="phoneNumber" placeholder={'휴대폰 번호 (  \'-\' 없이 숫자만 입력 )'} maxLength={13} value={phn} onChange={onChangePhn} />
                  {phn.length >= 12 && name !== '' ? (
                    <button type="submit" className="gtm-033" onClick={() => { handleGtag2() }}>안경 무료상담 받기</button>
                  ) : (
                      <button className="disabled" disabled>안경 무료상담 받기</button>
                    )}
                  <div className="policy">
                    <Accordion className="my-accordion" >
                      <Accordion.Panel header="개인정보 수집·이용 동의함">
                        <div className="inner">
                          <p>본 상담 신청 고객은 개인정보 수집·이용에 대하여 동의를 거부할 권리를 가지고 있으며, 미 동의 시 상담를 신청하실 수 없습니다.</p>
                          <p>개인정보 수집·이용에 대한 동의</p>
                          <p> - 목적: 상담 신청 시 본인 확인 및 개별 연락</p>
                          <p> - 항목: 이름, 휴대전화 번호</p>
                          <p> - 보유기간: 동의(신청) 시점 후 180일</p>
                        </div>
                      </Accordion.Panel>
                    </Accordion>
                  </div>
                </div>
              </form>
            </div>
          ) : (
              <div className="modalWrap kakao__2">
                <div className="modalDesc">
                  <p className="main">플로브의 안경 카운셀러와<br />카카오톡 상담이 시작됩니다.<br /><strong>카카오톡 어플을 확인해주세요!</strong></p>
                  <p className="sub"><u>상담시간 : 오전 10시 ~ 오후 7시</u></p>
                  <p className="sub__2">*상담 시간 이외에 접수된 신청은<br />순차적으로 상담 가능 시간에 연락을 드립니다.</p>
                </div>
                <button className="confirm" type="button" onClick={() => { setModalView(false) }}>확인</button>
                <button className="closeBtn" onClick={() => { setModalView(false) }}><img src="/static/img/newLanding/close-btn.png" alt="" /></button>
              </div>
            )}
        </Modal>


        <div className="indexWrap">
          <div className="top">
            <div className="banner"><a href="/2020-winter-event">[안경 기부 이벤트] 최대 8만원 할인 혜택 &#xE001;</a></div>
            <div className="con">
              <div className="inner">
                <p className="txt">나의 눈을 위한<br />안경 큐레이션 서비스</p>
                <button className="gtm-001 cta" onClick={() => {
                  setModalView(true)
                  handleGtag1()
                }}>안경 무료상담 받기</button>
              </div>
              <div className="scroll-arrow"><div className="img"><img src="/static/img/newLanding/vv_w.png" alt="" /></div></div>
            </div>
          </div>

          <div className="middle">

            <div className="sec pod">
              <p>we listen. we recommend. we care.</p>
              <p>수많은 안경 속, 나에게 맞는 안경은 어떤 것일까 고민한 적 있으신가요?<br />나의 불편함을 해결하고 나의 이미지와 취향에 맞는 안경을 큐레이션 받으세요.</p>
            </div>

            <div className="sec story">
              <div className="sec__name">
                <p className="fontR">find story</p>
                <div className="underline"></div>
              </div>
              <div className="inner">
                <WingBlank>
                  <Carousel className="space-carousel"
                    frameOverflow="visible"
                    cellSpacing={24}
                    slideWidth="240px"
                    selectedIndex={1}
                    autoplay
                    autoplayInterval={4000}
                  >

                    <div className="cardStory gtm-011">
                      <p className="customer">정OO님<span>33 / 여</span></p>
                      <p className="main">" 첫 안경인데 친절하게 설명해주셔서 고민없이 구매할 수 있어서 좋았어요. "</p>
                      <p className="sub">인테리어가 깔끔하고 이뻐요. 그리고 너무너무 친절해서 좋았어요.</p>
                      <div className="img"><img src="/static/img/newLanding/glasses-10.jpg" alt="" /></div>
                      <p className="brand">로우로우</p>
                      <p className="model">420 black &amp; antique gold</p>
                    </div>

                    <div className="cardStory gtm-011">
                      <p className="customer">유OO님<span>31 / 여</span></p>
                      <p className="main">" 디테일하게 눈의 상태와 시력을 측정해주셔서 너무 좋았습니다. "</p>
                      <p className="sub">지금까지 맞춘 안경 중 가장 제 눈에 맞는 안경을 한것 같아 굉장히 만족스럽습니다.</p>
                      <div className="img"><img src="/static/img/newLanding/glasses-11.jpg" alt="" /></div>
                      <p className="brand">로우로우</p>
                      <p className="model">205 adg</p>
                    </div>

                    <div className="cardStory gtm-011">
                      <p className="customer">서OO님<span>30 / 여</span></p>
                      <p className="main">" 혼자 안경을 고를 수 있어서 어수선하지 않고 좋았습니다. "</p>
                      <p className="sub">제 스타일의 안경만 볼 수 있어서 시간 절약도 되었구요~</p>
                      <div className="img"><img src="/static/img/newLanding/glasses-9.jpg" alt="" /></div>
                      <p className="brand">스틸바움</p>
                      <p className="model">pirlo 4 c.2</p>
                    </div>

                    <div className="cardStory gtm-011">
                      <p className="customer">유OO님<span>31 / 여</span></p>
                      <p className="main">" 매장이 굉장히 깔끔하고 고급스러운 느낌이 좋았습니다! "</p>
                      <p className="sub">주신 차가 진짜 맛있었어요.... 다음에 갈때는 사진 많이 찍어서 인스타그램에 잔뜩 올리고싶습니다 ㅎㅎ</p>
                      <div className="img"><img src="/static/img/newLanding/glasses-8.jpg" alt="" /></div>
                      <p className="brand">IC베를린</p>
                      <p className="model">baram gra</p>
                    </div>

                    <div className="cardStory gtm-011">
                      <p className="customer">박OO님<span>30 / 여</span></p>
                      <p className="main">" 안경사님이 세심하게 상태를 체크해주셔서 케어 받는다는 느낌 "</p>
                      <p className="sub">보통여러 손님을 한 번에 응대하고 약간의 부산스러운 느낌이 있는데, 플로브에서는 없어서 좋았습니다.</p>
                      <div className="img"><img src="/static/img/newLanding/glasses-1.jpg" alt="" /></div>
                      <p className="brand">레이밴</p>
                      <p className="model">rb 4246v 5762</p>
                    </div>

                    <div className="cardStory gtm-011">
                      <p className="customer">고OO님<span>29/ 남</span></p>
                      <p className="main">" 평소 접해보지 못한 안경 매장과 구매 방식이 새롭습니다. "</p>
                      <p className="sub">기왕 안경 구매할거면 프라이빗 맞춤 서비스 안경점에서 구매하고 싶다는 생각이 듭니다.</p>
                      <div className="img"><img src="/static/img/newLanding/glasses-5.jpg" alt="" /></div>
                      <p className="brand">타르트옵티컬</p>
                      <p className="model">arnel heritage a8</p>
                    </div>

                    <div className="cardStory gtm-011">
                      <p className="customer">최OO님<span>34 / 남</span></p>
                      <p className="main">" 괜찮은 브랜드의 테들을 써볼수 있어서 좋았어요 "</p>
                      <p className="sub"></p>
                      <div className="img"><img src="/static/img/newLanding/glasses-6.jpg" alt="" /></div>
                      <p className="brand">애쉬크로프트</p>
                      <p className="model">a.ginsberg 1</p>
                    </div>

                    <div className="cardStory gtm-011">
                      <p className="customer">이OO님<span>48 / 남</span></p>
                      <p className="main">" 아주 유니크하고 신선한 컨셉이었습니다. "</p>
                      <p className="sub"></p>
                      <div className="img"><img src="/static/img/newLanding/glasses-4.jpg" alt="" /></div>
                      <p className="brand">아이반7285</p>
                      <p className="model">563 7060 51</p>
                    </div>

                    <div className="cardStory gtm-011">
                      <p className="customer">정OO님<span>33 / 남</span></p>
                      <p className="main">" 대우받는 느낌으로 편하게 안경을 맞출수 있었습니다. "</p>
                      <p className="sub"></p>
                      <div className="img"><img src="/static/img/newLanding/glasses-3.jpg" alt="" /></div>
                      <p className="brand">드므앤</p>
                      <p className="model">in out #02 3</p>
                    </div>

                    <div className="cardStory gtm-011">
                      <p className="customer">강OO님<span>27 / 여</span></p>
                      <p className="main">" 1:1상담으로 편안한 분위기에서 볼 수 있어 좋았음 "</p>
                      <p className="sub"></p>
                      <div className="img"><img src="/static/img/newLanding/glasses-2.jpg" alt="" /></div>
                      <p className="brand">드므앤</p>
                      <p className="model">in out #02 1</p>
                    </div>

                    <div className="cardStory gtm-11">
                      <p className="customer">원OO님<span>37 / 여</span></p>
                      <p className="main">" 너무 친절한 상담 검사 너무 만족해서 저는 더이상 바랄게 없네요 화이팅~!!! "</p>
                      <p className="sub"></p>
                      <div className="img"><img src="/static/img/newLanding/glasses-7.jpg" alt="" /></div>
                      <p className="brand">IC베를린</p>
                      <p className="model">oroshi gra</p>
                    </div>

                  </Carousel>
                </WingBlank>
              </div>
            </div>

            <div className="sec service">
              <div className="sec__name">
                <p className="fontR">service guide</p>
                <div className="underline"></div>
              </div>
              <div className="inner">
                <div className="descWrap">
                  <div className="imgWrap">
                    <div className="img"><img src="/static/img/newLanding/service_1.jpg" alt="" /></div>
                    <div className="img"><img src="/static/img/newLanding/service_2.jpg" alt="" /></div>
                    <div className="clearfix"></div>
                  </div>
                  <div className="txtWrap">
                    <p className="fontR">01</p>
                    <p>설문을 통해 준비된 추천 안경테</p>
                    <p>설문을 통해 라이프 스타일, 시력 문제, 평소의 고민을 알려주세요.<br />플로브와 약속한 시간에 라운지에 방문하시면 설문을 바탕으로 추천된 16개의 브랜드 안경테를 받아볼 수 있습니다.</p>
                    <div className="brandLink"><a className="gtm-004" href="/brand">플로브 <span className="fontR">MD</span>가 선택한 브랜드 &#xE001;</a></div>
                  </div>
                </div>
                <div className="descWrap">
                  <div className="imgWrap">
                    <div className="img"><img src="/static/img/newLanding/service_3.jpg" alt="" /></div>
                    <div className="img"><img src="/static/img/newLanding/service_4.jpg" alt="" /></div>
                    <div className="clearfix"></div>
                  </div>
                  <div className="txtWrap">
                    <p className="fontR">02</p>
                    <p>전문적인 검안과 알맞는 렌즈 알아보기</p>
                    <p>검안에 최적화된 공간에서 1대1로 꼼꼼히 검사를 받아요.<br />설문 내용과 검안 결과를 참고하여 내 눈에 필요한 렌즈가 어떤 것인지 설명들을 수 있습니다.</p>
                  </div>
                </div>
                <div className="descWrap">
                  <div className="imgWrap">
                    <div className="img"><img src="/static/img/newLanding/service_5.jpg" alt="" /></div>
                    <div className="img"><img src="/static/img/newLanding/service_6.jpg" alt="" /></div>
                    <div className="clearfix"></div>
                  </div>
                  <div className="txtWrap">
                    <p className="fontR">03</p>
                    <p>자유로운 안경 체험과 상담</p>
                    <p>추천 받은 다양한 브랜드 안경을 자유롭게 체험해요.<br />브랜드에 대한 스토리도 함께 알아가면서 편안한 상담을 할 수 있습니다.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="sec message">
              <div className="inner">
                <p className="fontR">" find your floev "</p>
                <p className="desc">나에게 딱 알맞는 안경을 찾아보세요!<br />오늘이 아니어도 괜찮습니다.<br />내 눈은 충분히 고려 되어야 하니까요.</p>
              </div>
            </div>

            <div className="sec lounge">
              <div className="sec__name">
                <p className="fontR">lounge</p>
                <div className="underline"></div>
              </div>
              <div className="inner">
                <WingBlank>
                  <Carousel className="space-carousel"
                    frameOverflow="visible"
                    cellSpacing={8}
                    slideWidth={0.9}
                  >
                    <div className="cardLounge one"><a href="/lounge/yeoksam"><p className="gtm-006">라운지 역삼성당 &#xE001;</p></a></div>
                    <div className="cardLounge two"><a href="/lounge/gangnam"><p className="gtm-006">라운지 강남 &#xE001;</p></a></div>
                  </Carousel>
                </WingBlank>
              </div>
            </div>

          </div>

          <div className="bottom">
            <div className="con">
              <div className="inner">
                <button className="gtm-002 cta" onClick={() => { setModalView(true) }}>안경 무료상담 받기</button>
              </div>
            </div>
            <div className="footer">
              <p>(주)씨에이치스퀘어 사업자 정보</p>
              <ul>
                <li><span>대표자명</span><span>천영환</span></li>
                <li><span>사업자등록번호</span><span>699-86-01370</span></li>
                <li><span>통신판매업신고</span><span>2019-서울강남-02689</span></li>
                <li><span>주소</span><span>서울시 강남구 테헤란로4길 38-5, 6층</span></li>
                <li><span>전화/이메일</span><span><span>1544-8767</span> | contact@floev.com</span></li>
                <li><span>개인정보책임자</span><span>엄태산</span></li>
              </ul>
              <div>
                <a href="http://www.ftc.go.kr/bizCommPop.do?wrkr_no=6998601370" target="_blank">사업자정보확인</a>|<a href="/service-policy"><span>서비스 정책 안내</span></a>
              </div>
            </div>
          </div>

        </div>

      </Layout>
    </>
  )
}

export default IndexPage
