import React, { useState }  from 'react'
import Layout from '../layout/DefaultLayout'
import { Modal } from "antd"

const FloevTradeIn = () => {

	const [modal3, setModal3] = useState<boolean>(false)

    function showModal(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, modal: string) {
        e.preventDefault(); // 修复 Android 上点击穿透
        if (modal === 'modal3') {
            setModal3(true)
        }
    }

	return (
		<Layout title="플로브 반납보상 서비스">
			<div className="page__outer">
				<div className="page__inner">

					<div className="container">
						<button className="btn-more" onClick={(e) => showModal(e, 'modal3')}>더 알아보기</button>
					</div>

				</div>
			</div>


			{/* 이메일 신청 모달
			
				1. modal창이 처음 켜졌을때
					- modalWrap 보임
					- complete-m 안보임
				
				2. 이메일을 입력하고 신청하기 클릭 시
					- modalWrap 안보임(사라짐)
					-complete-m 보임(나타남)

				3. modal창을 닫았다가 다시 열면 리셋

			*/}
			<Modal
                className="mypage-modal-outer test8-modal"
                visible={modal3}
                onCancel={() => setModal3(false)}>
	
                <div className="mypage-modal">

					{/* modalWrap */}
                    <div className="email-form">
						<div className="email-form__input-box"><input className="email-form__input-box__input" type="text" placeholder="이메일 입력" id="test8-input-label--email" tabIndex={1}/></div>
						<div className="email-form__btn-box"><button className="email-form__btn-box__submit" type="submit" tabIndex={2}>신청하기</button></div>
                    </div>

					{/* complete-m */}
					<div className="complete-m">
						<div>이메일 신청이 완료됐습니다.</div>
						<div className="complete-m__btn-box"><button className="complete-m__btn-box__cloes" onClick={() => setModal3(false)}>확인</button></div>
					</div>

                </div>
            </Modal>
		</Layout>

	)
}

export default FloevTradeIn
