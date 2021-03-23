import React from 'react'
import { Progress } from 'antd'


export default function SurveyHeader(props: {
    stepIndex: number;
    onPrev: () => void;
    onClose: () => void;
}) {
    const chunkStep = () => {
        let step = 0
        if (props.stepIndex <= 3) {
            step = 2
        } else if (props.stepIndex < 21) {
            step = props.stepIndex - 1
        } else {
            step = 21
        }
        return step
    }
    return (<>
        <div className="survey-header">
            <div className="progress">
                <Progress percent={((chunkStep()) / 17) * 100} showInfo={false} className="progress__bar" />

                <div className="progress__steps">

                    {/* q1, q2, q3, q4 -> className에 각각 progress__step-name--active, progress__step-arrow--active 추가 */}
                    <div className={props.stepIndex > 0 ? "progress__step-name progress__step-name--active" : "progress__step-name"}>기본정보</div>
                    <div className={props.stepIndex > 0 ? "progress__step-arrow progress__step-arrow--active" : "progress__step-arrow"}>&#xE001;</div>

                    {/* q5, q6, q7, q8 -> className에 각각 progress__step-name--active, progress__step-arrow--active 추가 */}
                    <div className={props.stepIndex >= 5 ? "progress__step-name progress__step-name--active" : "progress__step-name"}>안경생활</div>
                    <div className={props.stepIndex >= 5 ? "progress__step-arrow progress__step-arrow--active" : "progress__step-arrow"}>&#xE001;</div>

                    {/* q9_1, q9_2, q9_3, q9_4 -> className에 각각 progress__step-name--active, progress__step-arrow--active 추가 */}
                    <div className={props.stepIndex >= 9 ? "progress__step-name progress__step-name--active" : "progress__step-name"}>취향</div>
                    <div className={props.stepIndex >= 9 ? "progress__step-arrow progress__step-arrow--active" : "progress__step-arrow"}>&#xE001;</div>

                    {/* q10, q11 -> className에 각각 progress__step-name--active, progress__step-arrow--active 추가 */}
                    <div className={props.stepIndex >= 14 ? "progress__step-name progress__step-name--active" : "progress__step-name"}>내 안경</div>
                    <div className={props.stepIndex >= 14 ? "progress__step-arrow progress__step-arrow--active" : "progress__step-arrow"}>&#xE001;</div>

                    {/* q12, q13 -> className에 각각 progress__step-name--active 추가 */}
                    <div className={props.stepIndex >= 16 ? "progress__step-name progress__step-name--active" : "progress__step-name"}>일정예약</div>
                </div>
            </div>
        </div>
    </>)
}