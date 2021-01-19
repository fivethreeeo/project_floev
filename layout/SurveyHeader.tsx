import React from 'react'
import { Progress } from 'antd'

export default function SurveyHeader(props: {
    currentStep: number;
    max: number;
    onPrev: () => void;
    onClose: () => void;
}) {

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
                <p className="orderNum">{props.currentStep} of {props.max - 1}</p>
                <div className="clearfix"></div>
            </div>
            <Progress percent={((props.currentStep) / props.max) * 100} status="active" />
        </div>
    )
}