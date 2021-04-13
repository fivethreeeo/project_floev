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

    function handleCancel() {
        setEmail('')
        setValidEmail(true)
        setCompleted(false)
        props.onCancel()
    }

    async function handleSubmit() {
        if (email.length > 0 && validEmail) {
            await axios.post('', {
                email: email,
                testAgenda: props.testAgenda
            }).then(res => {
                console.log(res.data)
                setCompleted(true)
            }).catch(err => {
                console.error("submit email error: " + err.message)
            })

        }
    }


    return (<>
        <Modal
            className="mypage-modal-outer test8-modal"
            visible={props.visible}
            onCancel={() => handleCancel()}>

            <div className="mypage-modal">
                {!completed ? (
                    <div className="email-form">
                        <div className="desc">
                            <p className="p__1">여러분이 보신 위 서비스는<br/>플로브가 열심히 런칭 준비중인 서비스에요.</p>
                            <p className="p__2">플로브는 건강한 안경 문화를 만들기 위해 새로운 안경 서비스를 고안하고 선보이고 있어요. 여러분이 보신 플로브의 서비스에 관심이 생기셨나요? 새롭게 런칭되는 플로브 서비스를 가장 먼저 알려드릴게요!</p>
                        </div>
                        <div className="email-form__input-box">
                            <input className="email-form__input-box__input" value={email} type="text" placeholder="이메일을 입력해주세요" id="test8-input-label--email" onChange={e => handleChange(e)} tabIndex={1} />
                            {email.length > 0 ?
                                (validEmail ? (<p></p>) : (<p className="err">이메일 형식에 맞게 입력해주세요.</p>))
                                : ('')}
                        </div>
                        <div className="email-form__btn-box">
                            <button className="email-form__btn-box__submit" type="submit" onClick={handleSubmit} tabIndex={2}>이메일로 런칭 소식 받기</button>
                        </div>
                        <div className="desc__2">
                            *신청하신 페이지의 서비스는 실제 런칭시 조건이 달라질 수 있습니다.<br/>
                            *수집된 이메일은 서비스 런칭 소식 최초 안내 1회의 목적으로 사용 뒤 폐기됩니다.
                        </div>
                    </div>
                ) : (
                    <div className="complete-m">
                        <p className="p__2">{email}</p>
                        <p className="p__1">이메일 신청이 완료됐습니다.</p>
                        <div className="complete-m__btn-box"><button className="complete-m__btn-box__close" onClick={() => handleCancel()}>확인</button></div>
                    </div>
                )}
            </div>
        </Modal>
    </>)
}

export default EmailModal