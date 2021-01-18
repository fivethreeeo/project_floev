import React, { useState } from 'react'
import { HASWORN } from './q5HasWorn'

export default function Q10Photo(props: {
    oldAnswers: Answers
    answersUpdate: (answersParam: Answers) => void
    currentStep: number
    max: number
    onPrev: () => void
    onNext: () => void
}) {
    const [photo, setPhoto] = useState<File>()
    const handleChangeFile = (e: any) => {
        const newPhoto = e.target.files[0]
        setPhoto(newPhoto)
        console.log(e.target.files[0])

        // let answersParam: Answers = props.oldAnswers
        // answersParam.photo = newPhoto
        // props.answersUpdate(answersParam)

        // for caching
        localStorage.setItem('floev[currentStep]', '10')
        localStorage.setItem('floev[photo]', newPhoto)
    }
    const onClickFile = () => {
        const fd = new FormData()
        if (photo) {
            console.log('it works!')
            fd.append('first_image', photo, photo.name)
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
            title = <p className="qDesc">더 나은 추천을 위해 얼굴 사진, 요청드려도 될까요?</p>
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
        </div>
    </>)
}

/*
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ImagePicker, WingBlank, SegmentedControl } from 'antd-mobile'

export default class GetPhotos extends Component {

    static propTypes = {
        answers: PropTypes.object.isRequired,
        answersUpdate: PropTypes.func.isRequired,
        currentStep: PropTypes.number,
        max: PropTypes.number,
        schedule: PropTypes.array,
        onPrev: PropTypes.func.isRequired,
        onNext: PropTypes.func.isRequired
    }

    state = {
        warningSign: false,
        files: [],
        multiple: false
    }

    onChange = (files, type, index) => {
        console.log(files, type, index)
        this.setState({
          files,
        })
        localStorage.setItem('floev[currentStep]', 14)
        localStorage.setItem('floev[photos]', 'Yes')
    }

    onSegChange = (e) => {
        const index = e.nativeEvent.selectedSegmentIndex
        this.setState({
          multiple: index === 1,
        })
    }

    handleWarning = e => {
        this.setState({warningSign: true})
    }

    render() {
        const { currentStep, max,onNext} = this.props
        const { warningSign, files } = this.state

        return(
            <React.Fragment>
                <div className="contentWrap">
                    <p className="qDesc">고객님의 얼굴이 나온 사진을 보내주세요.</p>
                    <p className="qDesc2">얼굴형과 피부톤, 헤어스타일 등을 파악해 정교한 추천이 가능해요.</p>
                    <div className="qLine"></div>
                    <ImagePicker
                        files={files}
                        onChange={this.onChange}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        multiple={this.state.multiple}
                    />
                     <p>* 안경을 착용하신 사진이 추천에 더 도움이 돼요.</p>
                     <p>* 보내주신 사진은 안경 추천 외에 어떠한 용도로도 사용되지 않습니다.</p>
                </div>
                <div className="btnWrap">
                {
                    files.length === null || files.length === 0 ? (
                        <button className="btnNext disabled" type="button" onClick={e => this.handleWarning(e)}>다음</button>
                    ) : (
                        <button className="btnNext gtm-test-photo-next" type="button" disabled={currentStep === max ? 1 : 0 || !files} onClick={onNext}>다음</button>
                    )
                }
                </div>
            </React.Fragment>
        )
    }
}
 */