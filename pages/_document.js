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
          <script dangerouslySetInnerHTML={{ __html: this.renderSnippet() }} />
          <script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>
          <script async src="https://www.googletagmanager.com/gtag/js?id=AW-738487034"></script>
          {/* 페이스북 픽셀 */}
          <script dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '468879750384716');
              fbq('track', 'PageView');`}} />
          <noscript dangerouslySetInnerHTML={{
            __html: `<img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=468879750384716&ev=PageView&noscript=1"/>` }} />
            {/* Google Optimize */}
            <style jsx>{`
              .async-hide { opacity: 0 !important}
            `}</style>
            <script dangerouslySetInnerHTML={{
              __html: `
                (function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
                h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
                (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
                })(window,document.documentElement,'async-hide','dataLayer',4000,
                {'GTM-K2ZP9MN':true});
              `}} />
            <script src="https://www.googleoptimize.com/optimize.js?id=GTM-K2ZP9MN"></script>
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