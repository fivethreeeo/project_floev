import React, { useState } from 'react'
import { Modal, Upload } from 'antd'
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface'
import { PlusOutlined } from '@ant-design/icons';
import { getBase64 } from '../../utils/getBase64'

export default function Q9Prefer(props: {
    oldAnswers: Answers
    answersUpdate: (answersParam: Answers) => void
    currentStep: number
    max: number
    schedule: Schedule[]
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
        localStorage.setItem('floev[preger]', newPrefer)
    }

    return (<>
                <div className="q-wrap q9">
                    <div className="q-wrap__question-main">안경에 대한 고민,<br/>플로브에게 요청하고 싶은 내용을 자유롭게 남겨주세요.</div>
                    <div className="q-wrap__answer-wrap">
                        <textarea className="q-wrap__textarea" placeholder="원하는 분위기, 스타일, 기피 색상, 기피 스타일, 불편해도 스타일리쉬하게, 무조건 편한거, 선호하는 브랜드 등" value={prefer} onChange={(e) => handleChangePrefer(e)}></textarea>
                        <Upload
                    // action="https://image.floev.com/upload"
                    name="upload-image"
                    listType="picture-card"
                    fileList={preferFileList}
                    onPreview={(e) => handlePreview(e)}
                    onChange={(e) => handleChangePreferPhoto(e)}
                    beforeUpload={() => false} // setFileList(fileList.concat(file));
                >{preferFileList.length >= 3 ? null :
                    (<div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>)}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={() => handleCancel()}
                ><img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
                    <p><strong>이미지 고민</strong><br />
                &#34;회사에서 존재감 있는 사람이 되고싶은데 안경으로 이미지 변신을 하고싶어요!&#34;<br />
                    <strong>스타일 고민</strong><br />
                &#34;무채색 안경을 선호하지만 검정색은 별로에요&#34;<br />
                &#34;첫 안경이라 어떤게 어울리는지 잘 모르겠어요. 최대한 다양하게 경험해볼래요!&#34;<br />
                    <strong>사이즈&#38;디자인 고민</strong><br />
                &#34;주로 후드티,청바지,티셔츠 등 캐주얼한 옷을 입어요. 무난하게 어울리는 안경이 필요해요&#34;<br />
                &#34;저는 뿔테는 너무 무거워서 싫고 금속테 위주로 보고싶어요&#34;
                        </p>
                    </div>
                    <div className="q-wrap__btn-wrap">
                        <button className="q-wrap__btn q-wrap__btn-prev" type="button" disabled={props.currentStep !== props.max ? false : true} onClick={() => props.onPrev()}>이전</button>
                        {prefer.length === 0 ? (
                            <button className="q-wrap__btn q-wrap__btn-next q-wrap__btn-next--disabled" type="button"><span>다음</span> <img src="static/img/survey/ic-arrows-right.png" alt=""/></button>) :
                            (<button className="q-wrap__btn q-wrap__btn-next" type="button" onClick={() => props.onNext()}><span>다음</span> <img src="static/img/survey/ic-arrows-right.png" alt=""/></button>)
                        }
                    </div>
                </div>
    </>)
}