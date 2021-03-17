import React, { useState } from 'react'
import { Modal, Upload } from 'antd'
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface'
import { PlusOutlined } from '@ant-design/icons'
import { getBase64 } from '../../utils/surveyUtils'

export default function Q9Prefer(props: {
    oldAnswers: Answers
    answersUpdate: (answersParam: Answers) => void
    currentStep: number
    max: number
    purchaseRequest: PurchaseRequest[]
    onPrev: () => void
    onNext: () => void
}) {
    const [prefer, setPrefer] = useState<string>(props.oldAnswers.prefer)
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [preferFileList, setPreferFileList] = useState<UploadFile[]>(props.oldAnswers.preferFileList)

    async function handlePreview(file: any) {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview)
        setPreviewVisible(true)
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    };

    function handleChangePreferPhoto(e: UploadChangeParam<UploadFile<any>>) {
        setPreferFileList(e.fileList)
        let answersParam: Answers = props.oldAnswers
        answersParam.preferFileList = e.fileList
        props.answersUpdate(answersParam)

    }
    function handleCancel() {
        setPreviewVisible(false)
    };

    function handleChangePrefer(e: any) {
        const newPrefer: string = e.target.value
        setPrefer(newPrefer)

        let answersParam: Answers = props.oldAnswers
        answersParam.prefer = newPrefer
        props.answersUpdate(answersParam)

        // for caching
        localStorage.setItem('floev[currentStep]', '9')
        localStorage.setItem('floev[prefer]', newPrefer)
    }

    return (<>
        <div className="q-wrap q9">
            <div className="q-wrap__question-main">안경에 대한 고민 또는 요청사항을 남겨주세요.</div>
            <div className="q-wrap__question-sub">선호하는 안경 색상, 모양 또는 기피 색상<br/>원하는 착용감, 스타일 등을 자유롭게 남겨주세요.</div>
            <div className="q-wrap__answer-wrap">
                <textarea className="q-wrap__textarea"
                    placeholder=" 예시)&#13; 착용감이 좋고 가벼운 메탈테를 써보고 싶어요.&#13; 색상은 화려하지 않고 차분한 느낌을 찾아요."
                    value={prefer} onChange={(e) => handleChangePrefer(e)}>
                </textarea>
                <Upload
                    // action="https://image.floev.com/upload"
                    name="upload-image"
                    className="photo_upload_test"
                    listType="picture-card"
                    fileList={preferFileList}
                    onPreview={(e) => handlePreview(e)}
                    onChange={(e) => handleChangePreferPhoto(e)}
                    beforeUpload={() => false} // setFileList(fileList.concat(file));
                >{preferFileList.length >= 3 ? null :
                    (<div>
                        <PlusOutlined />
                        <div>사진 업로드<br/>(선택입력사항)</div>
                    </div>)}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={() => handleCancel()}
                ><img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
            <div className="q-wrap__btn-wrap">
                <button className="q-wrap__btn q-wrap__btn-prev tn-0019" type="button" disabled={props.currentStep !== props.max ? false : true} onClick={() => props.onPrev()}>이전</button>
                {prefer.length === 0 ? (
                    <button className="q-wrap__btn q-wrap__btn-next q-wrap__btn-next--disabled" type="button"><span>다음</span> <img src="static/img/survey/ic-arrows-right.png" alt="" /></button>) :
                    (<button className="q-wrap__btn q-wrap__btn-next tn-q-9-1" type="button" onClick={() => props.onNext()}><span>다음</span> <img src="static/img/survey/ic-arrows-right.png" alt="" /></button>)
                }
            </div>
        </div>
    </>)
}