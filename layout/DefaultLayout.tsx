import React, { ReactNode } from 'react'
import Head from 'next/head'
import Header from './Header'

const addChannel = () => {
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init('12cae5545ba9f2d8993ff4d8b45478de')
  }
  window.Kakao.Channel.addChannel({
    channelPublicId: '_qxajuT',
  })
}

const Layout = ({
  children,
  title = '플로브 - 나의 눈을 위한 안경 큐레이션 서비스',
  name,
}: {
  children?: ReactNode
  title?: string
  name?: string
  requests?: PurchaseRequest[]
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, width=device-width, user-scalable=0" />
      <meta property="og:title" content="플로브 - 나의 눈을 위한 안경 큐레이션 서비스" />
      <meta property="og:description" content="좋은 품질의 안경, 전문적인 검안과 서비스를 제공합니다." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://floev.com" />
      <meta property="og:image" content="https://floev.com/static/img/newLanding/og.jpg" />
      <meta name="facebook-domain-verification" content="h2rt1xuljax0nvwa9e821ig88cstv4" />
    </Head>
    <Header name={name} isBack={true}></Header>
    {children}
    <footer>
      <div className="global1280">
        <div className="kakaoLinkWrap">
          <div id="channel-add-button" className="kakaoBtn" onClick={() => addChannel()}>
            <img src="/static/img/newLanding/kakao.png" alt="" />
          </div>
        </div>
      </div>
    </footer>
  </div>
)
export default Layout