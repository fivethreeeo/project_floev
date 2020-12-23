export default function Custom404() {
  return (
    <div>
      <p>404</p>
      <p>찾을 수 없는 페이지 입니다.<br/>요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨어요:)</p>
      <a href='/'>홈으로 가기</a>
      <style jsx>{`
  div {
    width: 100%;
    max-width: 640px;
    margin: 0 auto;
    padding: 0 40px;
    line-height:1.5;
  }

  p:first-child {
    margin-top: 160px;
    font-size: 40px;
    text-align: center;
    line-height:1.5;
  }

  p:nth-child(2) {
    margin-top: 16px;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    line-height:1.5;
  }

  a {
    margin: 40px auto;
    display: block;
    font-size: 16px;
    width: 120px;
    height: 48px;
    line-height:48px;
    text-align: center;
    background: #33343a;
    color: #fff;
    border-radius:40px;
  }
        `}</style>
    </div>
    )
}