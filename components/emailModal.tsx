import React, { useState } from "react"
import { Modal } from "antd"
import { useMutation } from "@apollo/client"
import { HANDLE_NEW_SERVICE } from "../lib/mutation"

const EmailModal = (props: EmailModal) => {
  const [email, setEmail] = useState<string>('')
  const [validEmail, setValidEmail] = useState<boolean>(true)
  const [completed, setCompleted] = useState<boolean>(false)
  const [handleNewService] = useMutation(HANDLE_NEW_SERVICE, {
    variables: {
      email: email, newService: props.newService
    },
    onCompleted() {
      setCompleted(true)
    },
    onError(err) {
      console.error("submit email error: " + err.message)
    }
  });

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
      handleNewService()
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
        ) : (
          <div className="complete-m">
            <div>이메일 신청이 완료됐습니다.</div>
            <div className="complete-m__btn-box"><button className="complete-m__btn-box__cloes" onClick={() => handleCancel()}>확인</button></div>
          </div>
        )}
      </div>
    </Modal>
  </>)
}

export default EmailModal