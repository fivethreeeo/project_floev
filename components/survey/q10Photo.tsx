import React, { useState } from 'react'
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { HASWORN } from '../../lib/constants';
import { getBase64 } from '../../utils/surveyUtils'
import { EVENT } from '../../lib/constants'

export default function Q10Photo(props: SurveyProps) {
    const photoTitle = () => {
        let title
        if (props.oldAnswers.hasWorn === HASWORN.YES) {
            title = <div className="q-wrap__question-main">안경을 쓰고 촬영한 얼굴 사진, 요청드려도 될까요?</div>
        } else if (props.oldAnswers.hasWorn === HASWORN.NO) {
            title = <div className="q-wrap__question-main">안경 추천을 위해 얼굴 사진, 요청드려도 될까요?</div>
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

    function naverPixelPhoto() {
        let _nasa = {
            cnv: ''
        };
        if (window.wcs) {
            _nasa["cnv"] = window.wcs.cnv("3", "1");
            window.wcs.inflow("floev.com");
            window.wcs_do(_nasa);
        }
    }

    function handleClickNext() {
        naverPixelPhoto()
        props.onNext(EVENT.SURVEY.Q10.NEXT)
    }

    return (<>
        <div className="q-wrap q10">
            {photoTitle()}
            <div className="q-wrap__question-sub">얼굴의 사이즈와 눈 사이 거리, 균형감을 체크해요.<br />지금 쓰는 안경과 내 불편함의 원인을 체크해요.<br />나의 이미지에 맞는 안경을 더 정확하게 추천해요.<br/>(선택사항)</div>
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
            </div>
            <div className="q-wrap__btn-wrap">
                <button className="q-wrap__btn q-wrap__btn-prev tn-0021" type="button" disabled={props.currentStep !== props.max ? false : true} onClick={() => props.onPrev(EVENT.SURVEY.Q10.PREV)}>이전</button>
                <button className="q-wrap__btn q-wrap__btn-next tn-0020" type="button" onClick={handleClickNext}><span>다음</span> <img src="/img/survey/ic-arrows-right.png" alt="" /></button>
                {/*
                {photoFileList.length === 0 ? (
                    <button className="q-wrap__btn q-wrap__btn-next q-wrap__btn-next--disabled" type="button"><span>다음</span> <img src="/img/survey/ic-arrows-right.png" alt="" /></button>) :
                    (<button className="q-wrap__btn q-wrap__btn-next tn-0020" type="button" onClick={handleClickNext}><span>다음</span> <img src="/img/survey/ic-arrows-right.png" alt="" /></button>)
                }
                */}
            </div>
        </div>
    </>)
}