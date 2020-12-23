import React, { ReactNode } from 'react'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, width=device-width" />
      <meta property="og:title" content="플로브 - 나의 눈을 위한 안경 큐레이션 서비스" />
      <meta property="og:description" content="좋은 품질의 안경, 전문적인 검안과 서비스를 제공합니다." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://floev.com" />
      <meta property="og:image" content="https://floev.com/static/img/newLanding/og.jpg" />
    </Head>
    <header>
    </header>
    {children}
    <footer>
    </footer>
    <style global jsx>{`

      /* kakao channel button */
      #kakao-talk-channel-chat-button a img {display:none}
      .kakaoLinkWrap {position:fixed;bottom:0;width:100%;max-width:640px;z-index:5000}
      .kakaoBtn {position:absolute;right:16px;bottom:16px;width:48px;height:48px}
      .kakaoBtn a {position:relative;width:48px;height:48px;display:block;margin-top:-48px}
      .kakaoBtn img {position:relative;width:100%}
      #kakao-talk-channel-chat-button.btnAsk a {position:static;display:block;height:48px;margin-top:-48px}

      /* kakao channel button */
      #plusfriend-chat-button a img {display:none}
      #plusfriend-chat-button.btnAsk a {position:static;display:block;height:48px;margin-top:-48px}

    `}</style>

  </div>
)
export default Layout