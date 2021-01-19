import React, { useState } from 'react'
import { HASWORN } from './q5HasWorn'

export default function Q10Photo(props: {
    oldAnswers: Answers
    answersUpdate: (answersParam: Answers) => void
    currentStep: number
    max: number
    schedule: Schedule[]
    onPrev: () => void
    onNext: () => void
}) {
    const [photo, setPhoto] = useState(null)
    const handleChangeFile = (e: any) => {
        const newPhoto = e.target.files[0]
        setPhoto(newPhoto)
        console.log(e.target.files[0])

        // let answersParam: Answers = props.oldAnswers
        // answersParam.photo = newPhoto
        // props.answersUpdate(answersParam)

        // for caching
        localStorage.setItem('floev[currentStep]', '10')
        localStorage.setItem('floev[photo]', 'Yes')
    }
    const onClickFile = () => {
        const fd = new FormData()
        if (photo) {
            console.log('it works!')
            // fd.append('first_image', photo, photo.name)
            // axios.post('https://apollotest.floev.com/uplaod', fd)
            //     .then(res => {
            //         console.log(res)
            //     })
            //     .catch(err => {
            //         console.error(err)
            //     })
        }
    }
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

    return (<>
        <div className="contentWrap">
            {photoTitle()}
            <p>-얼굴의 사이즈와 눈 사이 거리, 균형감을 체크해요.</p>
            <p>-지금 쓰는 안경과 내 불편함의 원인을 체크해요.</p>
            <p>-나의 이미지에 맞는 안경을 더 정확하게 추천해요.</p>
            <div className="personal">
                <input type="file" multiple={true} onChange={e => handleChangeFile(e)} />
                <button type="button" onClick={() => onClickFile()}>사진 업로드</button>
            </div>
        </div>
        <div className="btnWrap">
            {photo === null ?
                (<button className="btnNext disabled" type="button" disabled>다음</button>) :
                (<button className="btnNext gtm-021" type="button" onClick={() => props.onNext()}>다음</button>)}
            {photo}
        </div>
    </>)
}