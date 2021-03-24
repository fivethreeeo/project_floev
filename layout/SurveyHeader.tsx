import React from 'react'
import { Progress } from 'antd'


export default function SurveyHeader(props: {
    currentStep: number;
    onPrev: () => void;
    onClose: () => void;
}) {
    // const [currentStep, setCurrentStep] = useState(props.currentStep)
    const chunkStep = () => {
        let step = 0
        if (props.currentStep <= 1) {
            step = 2
        } else if (props.currentStep <= 2) {
            step = 2
        } else if (props.currentStep <= 3) {
            step = 2
        } else if (props.currentStep <= 4) {
            step = 3
        } else if (props.currentStep <= 5) {
            step = 4
        } else if (props.currentStep <= 6) {
            step = 5
        } else if (props.currentStep <= 7) {
            step = 6
        } else if (props.currentStep <= 8) {
            step = 7
        } else if (props.currentStep <= 9) {
            step = 8
        } else if (props.currentStep <= 10) {
            step = 9
        } else if (props.currentStep <= 11) {
            step = 10
        } else if (props.currentStep <= 12) {
            step = 11
        } else {
            step = 12
        }
        return step
    }
    return (<>
        <div className="survey-header">
            <div className="progress">
                <Progress percent={((chunkStep()) / 13) * 100} showInfo={false} className="progress__bar" />

                <div className="progress__steps">

                    {/* q1, q2, q3, q4 -> className에 각각 progress__step-name--active, progress__step-arrow--active 추가 */}
                    <div className={props.currentStep > 0 ? "progress__step-name progress__step-name--active" : "progress__step-name"}>기본정보</div>
                    <div className={props.currentStep > 0 ? "progress__step-arrow progress__step-arrow--active" : "progress__step-arrow"}>&#xE001;</div>

                    {/* q5, q6, q7, q8 -> className에 각각 progress__step-name--active, progress__step-arrow--active 추가 */}
                    <div className={props.currentStep >= 5 ? "progress__step-name progress__step-name--active" : "progress__step-name"}>안경생활</div>
                    <div className={props.currentStep >= 5 ? "progress__step-arrow progress__step-arrow--active" : "progress__step-arrow"}>&#xE001;</div>

                    {/* q9 -> className에 각각 progress__step-name--active, progress__step-arrow--active 추가 */}
                    <div className={props.currentStep >= 9 ? "progress__step-name progress__step-name--active" : "progress__step-name"}>취향</div>
                    <div className={props.currentStep >= 9 ? "progress__step-arrow progress__step-arrow--active" : "progress__step-arrow"}>&#xE001;</div>

                    {/* q10, q11 -> className에 각각 progress__step-name--active, progress__step-arrow--active 추가 */}
                    <div className={props.currentStep >= 10 ? "progress__step-name progress__step-name--active" : "progress__step-name"}>내 안경</div>
                    <div className={props.currentStep >= 10 ? "progress__step-arrow progress__step-arrow--active" : "progress__step-arrow"}>&#xE001;</div>

                    {/* q12, q13 -> className에 각각 progress__step-name--active 추가 */}
                    <div className={props.currentStep >= 12 ? "progress__step-name progress__step-name--active" : "progress__step-name"}>일정예약</div>
                </div>
            </div>
        </div>
    </>)
}
