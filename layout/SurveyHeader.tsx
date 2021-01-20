import React from 'react'
import { Progress } from 'antd'


export default function SurveyHeader(props: {
    currentStep: number;
    onPrev: () => void;
    onClose: () => void;
}) {
    const chunkStep = () => {
        let step = 1
        if (props.currentStep <= 3) {
            step = 1
        } else if (props.currentStep <= 5) {
            step = 2
        } else if (props.currentStep <= 8) {
            step = 3
        } else if (props.currentStep <= 10) {
            step = 4
        } else {
            step = 5
        }
        return step
    }
    return (
        <div className="surveyHeader">
            <br />
            <br />
            <div className="inner">
                {props.currentStep !== 0 ?
                    (<button className="prevBtn gtm-014" type="button" onClick={() => props.onPrev()}>뒤로가기</button>) :
                    (<button className="prevBtn gtm-014" type="button">뒤로가기</button>)}
                <br />
                <button className="closeSurveyBtn gtm-013" type="button" onClick={() => props.onClose()}>닫기</button>
                <div className="clearfix"></div>
            </div>
            <Progress percent={((chunkStep()) / 5) * 100} />
        </div>
    )
}