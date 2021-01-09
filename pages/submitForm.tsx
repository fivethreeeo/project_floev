import Head from 'next/head'
import Layout from '../layout/DefaultLayout'
import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
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
  const [modalView, setModalView] = useState(true)
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
    if (phn.length === 10) {
      setPhn(phn.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'))
    }
    if (phn.length === 13) {
      setPhn(phn.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'))
    }
  }, [phn])

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
          kakaoPixel('784604748053330030').pageView('submitForm');
        </script>
      </Head>
      <Layout title="플로브 - 나의 눈을 위한 안경 큐레이션 서비스">
        <div>
          <Modal
            centered
            width="100%"
            visible={modalView}
            onCancel={() => {
              setModalView(false);
            }}
          >
            {completed === false ? (
              <div className="modalWrap kakao__1 submitFormWrap">
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
                            <div className="inner">
                              <p>본 상담 신청 고객은 개인정보 수집·이용에 대하여 동의를 거부할 권리를 가지고 있으며, 미 동의 시상담를 신청하실 수 없습니다.</p>
                              <p>개인정보 수집·이용에 대한 동의</p>
                              <p> - 목적: 상담 신청 시 본인 확인 및 개별 연락</p>
                              <p> - 항목: 이름, 휴대전화 번호</p>
                              <p> - 보유기간: 동의(신청) 시점 후 180일</p>
                            </div>
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
                  <a href="/" className="confirm" style={{ display: 'block', lineHeight: '44px' }} type="button">확인</a>
                </div>
              )}
          </Modal>
        </div>
      </Layout>
    </>
  )
}

export default IndexPage
