import React, { useState } from 'react'
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { HASWORN } from './q5HasWorn'
import { getBase64 } from '../../utils/getBase64'

export default function Q10Photo(props: {
    oldAnswers: Answers
    answersUpdate: (answersParam: Answers) => void
    currentStep: number
    max: number
    schedule: Schedule[]
    onPrev: () => void
    onNext: () => void
}) {
    const photoTitle = () => {
        let title
        if (props.oldAnswers.hasWorn === HASWORN.YES) {
            title = <div className="q-wrap__question-main">안경을 쓰고 촬영한 얼굴 사진, 요청드려도 될까요?</div>
        } else if (props.oldAnswers.hasWorn === HASWORN.NO) {
            title = <div className="q-wrap__question-main">당신만을 위한 추천을 위해 얼굴 사진, 요청드려도 될까요?</div>
        } else {
            title = <p>안경 씀 여부를 확인해주세요~!</p>
        }
        return title
    }
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [photoFileList, setPhotoFileList] = useState<UploadFile[]>(props.oldAnswers.photoFileList)

    async function handlePreview(file: any) {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview)
        setPreviewVisible(true)
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    };

    function handleChange(e: UploadChangeParam<UploadFile<any>>) {
        setPhotoFileList(e.fileList)

        let answersParam: Answers = props.oldAnswers
        answersParam.photoFileList = e.fileList
        props.answersUpdate(answersParam)
    }
    function handleCancel() {
        setPreviewVisible(false)
    };

    return (<>
        <div className="q-wrap q10">
            {photoTitle()}
            <p>얼굴의 사이즈와 눈 사이 거리, 균형감을 체크해요.</p>
            <p>지금 쓰는 안경과 내 불편함의 원인을 체크해요.</p>
            <p>나의 이미지에 맞는 안경을 더 정확하게 추천해요.</p>
            <div className="q-wrap__answer-wrap">
                <div className="q-wrap__upload-wrap">
                    <Upload
                        // action="https://image.floev.com/upload"
                        name="upload-image"
                        listType="picture-card"
                        fileList={photoFileList}
                        onPreview={(e) => handlePreview(e)}
                        onChange={(e) => handleChange(e)}
                        beforeUpload={() => false} // setFileList(fileList.concat(file));
                    >{photoFileList.length >= 3 ? null :
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
                </div>
            </div>
            <div className="btnWrap">
                {photoFileList.length === 0 ?
                    (<button className="btnNext disabled" type="button" disabled>다음</button>) :
                    (<button className="btnNext gtm-021" type="button" onClick={() => props.onNext()}>다음</button>)}
                <button className="btn btn01 gtm-012" style={{ fontSize: '16px', borderRadius: '24px' }} type="button" disabled={props.currentStep !== props.max ? false : true} onClick={() => props.onPrev()}>뒤로</button>
            </div>
        </div>
    </>)
}