import React, { useState } from 'react'
import { Modal, Upload } from 'antd'
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface'
import { PlusOutlined } from '@ant-design/icons';
import { getBase64 } from '../../utils/surveyUtils'
import * as Creep from '../../lib/hatchery'
import { EVENT } from '../../lib/constants'

export default function Q9_5Prefer(props: SurveyProps) {
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

        localStorage.setItem('floev[currentStep]', '95')
        localStorage.setItem('floev[prefer]', newPrefer)
    }
    async function handleClickPrev() {
        await Creep.recordEvent({
            hatchery: props.hatchery,
            event: Creep.createPostDataOf(EVENT.SURVEY.Q9_5.PREV)
        })
        props.onPrev()
    }
    async function handleClickNext() {
        await Creep.recordEvent({
            hatchery: props.hatchery,
            event: Creep.createPostDataOf(EVENT.SURVEY.Q9_5.NEXT)
        })
        props.onNext()
    }

    return (<>
        <div className="q-wrap q9">
            <div className="q-wrap__question-main">안경에 대한 고민, 플로브에게 요청하고 싶은 내용을 자유롭게 남겨주세요.</div>
            <div className="q-wrap__question-sub">선호하는 스타일, 색상 또는 기피하는 색상. 원하는 분위기, 착용감 등을 자유롭게 남겨주세요. 이미지를 보내주셔도 좋아요. (선택사항)</div>
            <div className="q-wrap__answer-wrap">
                <textarea className="q-wrap__textarea"
                    placeholder='예시) 착용감이 좋고 가벼운 메탈테를 써보고 싶어요.'
                    value={prefer} onChange={(e) => handleChangePrefer(e)}>
                </textarea>
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
                        <div>사진 업로드</div>
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
                <button className="q-wrap__btn q-wrap__btn-prev tn-0019" type="button" disabled={props.currentStep !== props.max ? false : true} onClick={handleClickPrev}>이전</button>
                <button className="q-wrap__btn q-wrap__btn-next tn-0020" type="button" onClick={handleClickNext}><span>다음</span> <img src="/img/survey/ic-arrows-right.png" alt="" /></button>
            </div>
        </div>
    </>)
}