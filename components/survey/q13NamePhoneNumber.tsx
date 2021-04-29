import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Spin } from 'antd'
import cookie from 'cookie'
import axios from 'axios'
import { useMutation } from '@apollo/client'
import path from 'path';
import moment from 'moment'
import { resetSurvey } from '../../utils/surveyUtils'
import { MAKE_SURVEY_PURCHASE_REQUEST } from '../../lib/mutation'
import { SHA256 } from '../../utils/SHA256'
import { eggTo, createCreature } from '../../lib/hatchery'
import { EVENT, ZERG } from '../../lib/constants'
import { postData, recordEvent } from '../../lib/hatcheryTemp'

const IMAGE_SERVER_URL = process.env.NODE_ENV === 'production' ? 'https://image.floev.com' : 'http://localhost:3033'
const IMAGE_ADMIN_SERVER_URL = process.env.NODE_ENV === 'production' ? 'https://imageadmin.floev.com' : 'http://localhost:3034'

export default function Q12NamePhoneNumber(props: SurveyProps) {
  const router = useRouter()
  const [name, setName] = useState<string>(props.oldAnswers.name)
  const [phoneNumber, setPhoneNumber] = useState<string>(props.oldAnswers.phoneNumber)
  const oldPhoneNumber = localStorage.getItem('floev[phoneNumber]') ?? ''
  const [isPhoneNumber, setIsPhoneNumber] = useState<boolean>(false)
  const [authNumber, setAuthNumber] = useState<string>('')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isSentAuth, setIsSentAuth] = useState<boolean>(false)
  const [leftSecond, setLeftSecond] = useState<number>(180)
  const [isActive, setIsActive] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const [preferFileNameList, setPreferFileNameList] = useState<string[]>(props.oldAnswers.preferFileNameList)
  const [photoFileNameList, setPhotoFileNameList] = useState<string[]>(props.oldAnswers.photoFileNameList)
  const [preferRequestUrls, setPreferRequestUrls] = useState<string[]>([])
  const [photoRequestUrls, setPhotoRequestUrls] = useState<string[]>([])

  function naverPixelComplete() {
    let _nasa = {
      cnv: ''
    };
    if (window.wcs) {
      _nasa["cnv"] = window.wcs.cnv("1", "1");
      window.wcs.inflow("floev.com");
      window.wcs_do(_nasa);
    }
  }

  const [makeSurveyPurchaseRequest, { loading }] = useMutation(MAKE_SURVEY_PURCHASE_REQUEST, {
    variables: {
      customer: props.oldAnswers.customer, birth: props.oldAnswers.birth,
      gender: props.oldAnswers.gender, hasWorn: props.oldAnswers.hasWorn,
      purposes: props.oldAnswers.purposes, purposeEtc: props.oldAnswers.purposeEtc,
      painDegree: props.oldAnswers.painDegree, painDegreeEtc: props.oldAnswers.painDegreeEtc,
      painTypes: props.oldAnswers.painTypes, painTypesEtc: props.oldAnswers.painTypesEtc,
      preferFrameColors: props.oldAnswers.preferFrameColors,
      preferFrameShapes: props.oldAnswers.preferFrameShapes,
      preferLensShapes: props.oldAnswers.preferLensShapes,
      preferMoods: props.oldAnswers.preferMoods,
      prefer: props.oldAnswers.prefer,
      preferRequestUrls: preferRequestUrls,
      photoRequestUrls: photoRequestUrls,
      size: props.oldAnswers.size,
      loungeCode: props.oldAnswers.loungeCode,
      requestDate: props.oldAnswers.requestDate,
      requestTime: props.oldAnswers.requestTime,
      name: name, phoneNumber: phoneNumber, authNumber: authNumber
    },
    onCompleted(data: any) {
      if (data) {
        const token = data.makeSurveyPurchaseRequest.token
        document.cookie = cookie.serialize("token", token, {
          maxAge: 12 * 60 * 60
        })
        window.analytics.identify({
          name: name,
          birth: props.oldAnswers.birth,
          gender: props.oldAnswers.gender
        });
        resetSurvey()
        fbq('track', 'Schedule');
        naverPixelComplete()

        const userId = data.makeSurveyPurchaseRequest.user.id
        let creature: Hatchery = props.hatchery
        creature.userId = userId
        creature.name = name
        creature.phoneNumber = phoneNumber
        localStorage.setItem('_uid', userId)
        if (props.hatchery.status === ZERG.EGG) {
          creature = eggTo(creature)
        } else if (oldPhoneNumber !== phoneNumber) {
          creature = createCreature()
        }
        recordEvent(postData(creature, EVENT.SURVEY.Q13.FINISH))
        router.replace('/complete')
      }
    },
    onError(error) {
      console.error(error.message)
      // 백엔드 에러와 일치시키기
      if (error.message === "not valid") {
        setIsError(true)
        setAuthNumber('')
        setIsActive(false)
        alert('인증번호가 유효하지 않습니다. 다시 시도해주세요.')
      }// 백엔드 에러와 일치시키기
      else if (error.message === "Duplicated") {
        alert('죄송합니다. 이미 예약된 시간입니다.')
        props.onPrev(EVENT.SURVEY.Q13.DUP)
      }
    }
  });

  function handleChangeName(e: any) {
    const newName: string = e.target.value
    setName(newName)

    let answersParam: Answers = props.oldAnswers
    answersParam.name = newName
    props.answersUpdate(answersParam)

    localStorage.setItem('floev[currentStep]', '13')
    localStorage.setItem('floev[name]', newName)
  }

  function handleChangePhoneNumber(e: any) {
    const newPhoneNumber: string = e.target.value

    if (validatePhoneNumber(newPhoneNumber)) {
      setPhoneNumber(newPhoneNumber)
      let answersParam: Answers = props.oldAnswers
      answersParam.phoneNumber = newPhoneNumber
      props.answersUpdate(answersParam)
      setIsPhoneNumber(true)
    } else {
      setIsPhoneNumber(false)
    }

    localStorage.setItem('floev[currentStep]', '13')
    localStorage.setItem('floev[phoneNumber]', newPhoneNumber)
  }

  function handleChangeAuthNumber(e: any) {
    const newAuthNumber = e.target.value
    setAuthNumber(newAuthNumber)
    setIsError(false) // 인증번호를 입력하는 중이니 에러메시지를 없애야겠지

    let answersParam: Answers = props.oldAnswers
    answersParam.authNumber = newAuthNumber
    props.answersUpdate(answersParam)
  }

  function validatePhoneNumber(numberString: string) {
    const regex = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]{3,4})([0-9]{4})/g
    return regex.test(numberString)
  }

  function parseSecondToMinute(num: number) {
    if ((num % 60) < 10) {
      return '0' + Math.floor(num / 60).toString() + ':0' + (num % 60).toString()
    } else {
      return '0' + Math.floor(num / 60).toString() + ':' + (num % 60).toString()
    }
  }

  useEffect(() => {
    let interval: any = null;
    if (isActive && leftSecond !== 0) {
      interval = setInterval(() => {
        setLeftSecond(leftSecond => leftSecond - 1);
      }, 1000);
    } else {
      setTimerOff()
    }
    return () => clearInterval(interval);
  }, [isActive, leftSecond]);

  const setTimerOn = () => {
    setLeftSecond(180)
    setIsActive(true)
  }

  const setTimerOff = () => {
    setIsActive(false);
    setIsAuthenticated(true)
    setLeftSecond(181);
  }

  function setPreferFileNameRequestUrl() {
    const tempPreferFileNameList: string[] = []
    const tempPreferRequestUrls: string[] = []
    for (let i = 0; i < props.oldAnswers.preferFileList.length; i++) {
      const preferFileName: string = moment().format().slice(0, 16) + "_" + SHA256(phoneNumber) + "_prefer_" + i.toString() + path.extname(props.oldAnswers.preferFileList[i].name)
      tempPreferFileNameList.push(preferFileName)

      const preferRequestUrl: string = IMAGE_ADMIN_SERVER_URL + "/api/user/" + preferFileName
      tempPreferRequestUrls.push(preferRequestUrl)
    }
    setPreferFileNameList(tempPreferFileNameList)
    setPreferRequestUrls(tempPreferRequestUrls)
  }

  function setPhotoFileNameRequestUrl() {
    const tempPhotoFileNameList: string[] = []
    const tempPhotoRequestUrls: string[] = []
    for (let i = 0; i < props.oldAnswers.photoFileList.length; i++) {
      const photoFileName: string = moment().format().slice(0, 16) + "_" + SHA256(phoneNumber) + "_" + i.toString() + path.extname(props.oldAnswers.photoFileList[i].name)
      tempPhotoFileNameList.push(photoFileName)

      const photoRequestUrl: string = IMAGE_ADMIN_SERVER_URL + "/api/user/" + photoFileName
      tempPhotoRequestUrls.push(photoRequestUrl)
    }
    setPhotoFileNameList(tempPhotoFileNameList)
    setPhotoRequestUrls(tempPhotoRequestUrls)
  }

  function setFileNameRequestUrl() {
    setPreferFileNameRequestUrl()
    setPhotoFileNameRequestUrl()
  }

  async function requestAuthNumberAndSetFileNameRequestUrl(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    recordEvent(postData(props.hatchery, e.currentTarget.value))
    setIsSentAuth(true)
    setTimerOn()
    axios.post("https://api.floev.com/auth/create", {
      phoneNumber: phoneNumber
    }).then((result: any) => {
      if (result.data["code"] === "success") {
        setAuthNumber('')
        setIsAuthenticated(true)
        new Promise(setTimerOn)
      }
    })
    setFileNameRequestUrl()
  }
  async function submitPhotoFiles() {
    for (let i = 0; i < props.oldAnswers.photoFileList.length; i++) {
      const formData = new FormData()
      const file = props.oldAnswers.photoFileList[i].originFileObj
      if (file !== undefined) {
        formData.append("upload-image", file, photoFileNameList[i])
      }
      // TODO await 제거
      await axios.post(IMAGE_SERVER_URL + '/upload', formData, {
        headers: { "content-type": "multipart/form-data" }
      }).then(res => {
        console.log(res.status)
      }).catch(err => {
        console.error(err)
      })
    }
  }
  async function submitPreferFiles() {
    for (let i = 0; i < props.oldAnswers.preferFileList.length; i++) {
      const formData = new FormData()
      const file = props.oldAnswers.preferFileList[i].originFileObj
      if (file !== undefined) {
        formData.append("upload-image", file, preferFileNameList[i])
      }
      // TODO await 제거
      await axios.post(IMAGE_SERVER_URL + '/upload', formData, {
        headers: { "content-type": "multipart/form-data" }
      }).then(res => {
        console.log(res.status)
      }).catch(err => {
        console.error(err)
      })
    }
  }

  const submitPhoto = async () => {
    submitPhotoFiles()
    submitPreferFiles()
  }
  function handleClickpPurchaseRequest() {
    submitPhoto()
    makeSurveyPurchaseRequest()
  }

  return (<>
    <div className="q-wrap q13">
      <div className="q-wrap__question-main">인증을 통해 예약을 확정해주세요.</div>
      <div className="q-wrap__answer-wrap">

        {/* 이름 입력 */}
        <input className="q-wrap__input-text" type="text" placeholder={'이름 입력'} maxLength={10} onChange={e => handleChangeName(e)} />
        {/* 휴대전화번호 입력 */}
        <input className="q-wrap__input-text" type="tel" placeholder={'휴대폰 번호 입력 (  \'-\' 없이 숫자만 )'} maxLength={11} onChange={e => handleChangePhoneNumber(e)} />
        {!isSentAuth ?
          // 인증번호 보내기 전
          isPhoneNumber ?
            (<button className="btn-num tn-0028" value={EVENT.SURVEY.Q13.AUTH} onClick={(e) => requestAuthNumberAndSetFileNameRequestUrl(e)}>인증번호전송</button>) :
            (<button className="btn-num">인증번호전송</button>) :
          // 인증번호 보낸 후
          (<div className="input-text-num">
            <input className="q-wrap__input-text" type="text" placeholder={'인증번호 4자리'} value={authNumber} onChange={e => handleChangeAuthNumber(e)} maxLength={4} />
            {isAuthenticated ?
              (<button className="btn-resend tn-0029" value={EVENT.SURVEY.Q13.REAUTH} onClick={(e) => requestAuthNumberAndSetFileNameRequestUrl(e)}>재전송</button>) :
              (<button className="btn-resend">재전송</button>)}

            {leftSecond <= 180 ?
              <div className="left-time">{parseSecondToMinute(leftSecond)}</div> :
              leftSecond === 181 ?
                <div className="left-done">만료</div> :
                leftSecond === 182 ?
                  <span className="time"></span> :
                  <div className="txtWarning">인증번호가 일치하지 않습니다. 다시 확인해주세요.</div>}
          </div>)
        } {isError && (<div className="txtWarning">인증번호가 일치하지 않습니다. 다시 확인해주세요.</div>)}

      </div>


      <div className="q-wrap__btn-wrap">
        <button className="q-wrap__btn q-wrap__btn-prev tn-0027" type="button" disabled={props.currentStep !== props.max ? false : true} onClick={() => props.onPrev(EVENT.SURVEY.Q13.PREV)}>이전</button>
        {authNumber.length !== 4 || !isActive ?
          (<button className="q-wrap__btn q-wrap__btn-next q-wrap__btn-next--disabled"><span>인증하고 예약완료하기</span> <img src="/img/survey/ic-arrows-right.png" alt="" /></button>) :
          (!loading ?
            (<button className="q-wrap__btn q-wrap__btn-next tn-0026" type={'submit'} onClick={handleClickpPurchaseRequest}><span>인증하고 예약완료하기</span> <img src="/img/survey/ic-arrows-right.png" alt="" /></button>) :
            (<Spin size="large" tip="잠시만 기다려주세요.." />))
        }
      </div>

    </div>
  </>)

}
