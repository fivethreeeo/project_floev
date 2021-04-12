import React, { useState } from "react"
import { Modal } from "antd"
import axios from "axios"

const EmailModal = (props: EmailModal) => {
    const [email, setEmail] = useState<string>('')
    const [validEmail, setValidEmail] = useState<boolean>(true)
    const [completed, setCompleted] = useState<boolean>(false)


    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value)

        const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if (regExp.test(email)) {
            setValidEmail(true)
        } else {
            setValidEmail(false)
        }
    }

    async function handleSubmit() {
        if (email.length > 0 && validEmail) {
            await axios.post('', {
                email: email,
                testAgenda: props.testAgenda
            }).then(res => {
                setCompleted(true)
            }).catch(err => {

            })

        }
    }

    return (<>

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
            visible={props.visible}
            onCancel={() => props.onCancel()}>

            <div className="mypage-modal">
                <div className="email-form">
                    <div className="email-form__input-box">
                        <input className="email-form__input-box__input" value={email} type="text" placeholder="이메일 입력" id="test8-input-label--email" onChange={e => handleChange(e)} tabIndex={1} />
                        {email.length > 0 ?
                            (validEmail ? (<p>유효O</p>) : (<p>유효X</p>))
                            : ('')}
                    </div>
                    <div className="email-form__btn-box">
                        <button className="email-form__btn-box__submit" type="submit" onClick={handleSubmit} tabIndex={2}>신청하기</button>
                    </div>
                </div>

                {completed && (
                    <div className="complete-m">
                        <div>이메일 신청이 완료됐습니다.</div>
                        <div className="complete-m__btn-box"><button className="complete-m__btn-box__cloes" onClick={() => props.onCancel()}>확인</button></div>
                    </div>
                )}
            </div>
        </Modal>
    </>)
}

export default EmailModal