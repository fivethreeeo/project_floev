

export default function Footer() {

  const addChannel = () => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('12cae5545ba9f2d8993ff4d8b45478de')
    }
    window.Kakao.Channel.addChannel({
      channelPublicId: '_qxajuT',
    })
  }

  return (
    <footer>
      <div className="global1280">
        <div className="kakaoLinkWrap">
          <div id="channel-add-button" className="kakaoBtn" onClick={() => addChannel()}>
            <img src="/img/newLanding/kakao.png" alt="" />
          </div>
        </div>
      </div>
    </footer>
  )
}
