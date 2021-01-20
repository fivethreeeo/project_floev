import React, { useState } from 'react'
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';
import { HASWORN } from './q5HasWorn'

function getBase64(file: any) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

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
            title = <p className="qDesc">안경을 쓰고 촬영한 얼굴 사진, 요청드려도 될까요?</p>
        } else if (props.oldAnswers.hasWorn === HASWORN.NO) {
            title = <p className="qDesc">당신만을 위한 추천을 위해 얼굴 사진, 요청드려도 될까요?</p>
        } else {
            title = <p>안경 씀 여부를 확인해주세요~!</p>
        }
        return title
    }
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [fileList, setFileList] = useState<UploadFile[]>([])

    async function handlePreview(file: any) {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview)
        setPreviewVisible(true)
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    };

    function handleChange(e: any) {
        setFileList(e.fileList)
    }
    function handleCancel() {
        setPreviewVisible(false)
    };
    // const submitFiles = async () => {
    //     const fd = new FormData()
    //     for (let i = 0; i < fileList.length; i++) {
    //         fd.append("uploadImage", fileList[i], moment().format().slice(0, 16) + '_' + props.oldAnswers.birth + '_' + props.oldAnswers.gender)
    //     }
    //     await axios.post('https://apollotest.floev.com/uplaod', fd)
    //         .then(res => {
    //             console.log(res)
    //         })
    //         .catch(err => {
    //             console.error(err)
    //         })
    // }
    return (<>
        <div className="contentWrap">
            {photoTitle()}
            <p>-얼굴의 사이즈와 눈 사이 거리, 균형감을 체크해요.</p>
            <p>-지금 쓰는 안경과 내 불편함의 원인을 체크해요.</p>
            <p>-나의 이미지에 맞는 안경을 더 정확하게 추천해요.</p>
            <Upload
                action="https://image.floev.com/upload"
                name="upload-image"
                listType="picture-card"
                fileList={fileList}
                onPreview={(e) => handlePreview(e)}
                onChange={(e) => handleChange(e)}
            >{fileList.length >= 3 ? null :
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
            {/* <button type="button" onClick={() => submitFiles()}>사진 업로드</button> */}
        </div>
        {/* <div className="btnWrap">
            {photo === null ?
                (<button className="btnNext disabled" type="button" disabled>다음</button>) :
                (<button className="btnNext gtm-021" type="button" onClick={() => props.onNext()}>다음</button>)}
            {photo}
        </div> */}
    </>)
}