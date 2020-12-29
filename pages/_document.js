import Document, { Html, Head, Main, NextScript } from 'next/document'
import * as snippet from '@segment/snippet'

const {
  // This write key is associated with https://segment.com/nextjs-example/sources/nextjs.
  ANALYTICS_WRITE_KEY = 'Gey4nscOmCHkCsFHg4T3j84mjCFltDUf',
  NODE_ENV = 'development',
} = process.env

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }
  renderSnippet() {
    const opts = {
      apiKey: ANALYTICS_WRITE_KEY,
      // note: the page option only covers SSR tracking.
      // Page.js is used to track other events using `window.analytics.page()`
      page: true,
    }

    if (NODE_ENV === 'development') {
      return snippet.max(opts)
    }

    return snippet.min(opts)
  }

  render() {
    return (
      <Html>
        <Head>
          <script src="https://www.googleoptimize.com/optimize.js?id=OPT-PLBBV7J"></script>
          <script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>
          <script dangerouslySetInnerHTML={{ __html: this.renderSnippet() }} />
          <script async src="https://www.googletagmanager.com/gtag/js?id=AW-738487034"></script>
          <script dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-738487034');
            `}}
          />
          <script type="text/javascript" src="//wcs.naver.net/wcslog.js"></script>
          <script dangerouslySetInnerHTML={{
            __html: `
              if(!wcs_add) var wcs_add = {};
              wcs_add["wa"] = "4b0dd3814c87c8";
              if(window.wcs) {
                wcs_do();
              }
            `}}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument