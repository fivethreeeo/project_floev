import React, { useState } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import SurveyHeader from '../layout/SurveyHeader'
import Layout from '../layout/DefaultLayout'

import Q0Start from '../components/survey/q0Start'
import Q1Customer, { CUSTOMER } from '../components/survey/q1Customer'
import Q2CustomerWith from '../components/survey/q2CustomerWith'
import Q3CustomerOther from '../components/survey/q3CustomerOther'
import Q4BirthGender from '../components/survey/q4BirthGender'
import Q5HasWorn, { HASWORN } from '../components/survey/q5HasWorn'
import Q6Purpose from '../components/survey/q6Purposes'
import Q7PainDegree from '../components/survey/q7PainDegree'
import Q8PainTypes from '../components/survey/q8PainTypes'
import Q9Prefer from '../components/survey/q9Prefer'
import Q10Photo from '../components/survey/q10Photo'
import Q11Photo from '../components/survey/q11Size'
import Q12Reservation from '../components/survey/q12Reservation'
import Q13NamePhoneNumber from '../components/survey/q13NamePhoneNumber'

// 타입 정의
declare global {
    interface Schedule {
        [x: string]: any
        date: string
        lounge: number
    }
    // 설문, 예약 답변 양식
    interface Answers {
        customer: number // 0: 본인, 1: 동행, 2: 타인
        birth: number
        gender: string
        hasWorn: number // 1: yes(쓰고 있음), 2: no(쓴적 없음)
        purposes: string[]
        purposeEtc: string
        painDegree: number, painDegreeEtc: string
        painTypes: string[], painTypesEtc: string
        prefer: string
        size: string
        lounge: number
        reservationDate: string
        reservationTime: string
        name: string
        phoneNumber: string
        authNumber: string
    }
}

const steps = [
    Q0Start,
    Q1Customer, Q2CustomerWith, Q3CustomerOther,
    Q4BirthGender, Q5HasWorn, Q6Purpose,
    Q7PainDegree, Q8PainTypes, Q9Prefer,
    Q10Photo, Q11Photo, Q12Reservation, Q13NamePhoneNumber
]
const max = steps.length

const SurveyPage = () => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [answers, setAnswers] = useState<Answers>({
        customer: -1,
        birth: -1,
        gender: "",
        hasWorn: -1,
        purposes: [], purposeEtc: "",
        painDegree: -1, painDegreeEtc: "",
        painTypes: [], painTypesEtc: "",
        prefer: "",
        size: "",
        lounge: 0,
        reservationDate: "",
        reservationTime: "",
        name: "",
        phoneNumber: "",
        authNumber: ""
    });

    function handleAnswersUpdate(answersParam: Answers) {
        setAnswers(answersParam)
    }

    let StepComponent = steps[currentStep]
    function handleNext() {
        if (currentStep === 1) {
            if (answers.customer === CUSTOMER.SELF) {
                setCurrentStep(4)
            } else if (answers.customer === CUSTOMER.WITH) {
                setCurrentStep(2)
            } else if (answers.customer === CUSTOMER.OTHER) {
                setCurrentStep(3)
            }
        } else if (currentStep === 2) {
            setCurrentStep(4)
        } else if (currentStep === 6) {
            if (answers.hasWorn === HASWORN.YES) {
                setCurrentStep(7)
            } else if (answers.hasWorn === HASWORN.NO) {
                setCurrentStep(9)
            }
        } else if (currentStep === 10) {
            if (answers.hasWorn === HASWORN.YES) {
                setCurrentStep(11)
            } else if (answers.hasWorn === HASWORN.NO) {
                setCurrentStep(12)
            }
        } else {
            setCurrentStep(currentStep + 1)
        }

        // if (currentStep === 1) {
        //     window.analytics.identify({
        //         name: localStorage.getItem('floev[name]')
        //     })
        // } else if (currentStep === 2) {
        //     window.analytics.identify({
        //         name: localStorage.getItem('floev[name]'),
        //         gender: localStorage.getItem('floev[gender]')
        //     })
        // } else if (currentStep === 3) {
        //     window.analytics.identify({
        //         name: localStorage.getItem('floev[name]'),
        //         gender: localStorage.getItem('floev[gender]'),
        //         // age: parseInt(localStorage.getItem('floev[age]'))
        //     })
        // }
    }

    function handlePrev() {
        if (currentStep === 3) {
            setCurrentStep(1)
        } else if (currentStep === 4) {
            if (answers.customer === CUSTOMER.SELF) {
                setCurrentStep(1)
            } else if (answers.customer === CUSTOMER.WITH) {
                setCurrentStep(2)
            } else if (answers.customer === CUSTOMER.OTHER) {
                setCurrentStep(3)
            }
        } else if (currentStep === 9) {
            if (answers.hasWorn === HASWORN.YES) {
                setCurrentStep(8)
            } else if (answers.hasWorn === HASWORN.NO) {
                setCurrentStep(6)
            }
        } else if (currentStep === 12) {
            if (answers.hasWorn === HASWORN.YES) {
                setCurrentStep(11)
            } else if (answers.hasWorn === HASWORN.NO) {
                setCurrentStep(10)
            }
        } else {
            setCurrentStep(currentStep - 1)
        }
        localStorage.removeItem('floev[reservationDate]')
        localStorage.removeItem('floev[reservationTime]')
    }

    function onClose() {
        Router.push('/')
    }

    return (
        <>
            <Head>
                {/* survey.js -> complete.js */}
                <script dangerouslySetInnerHTML={{
                    __html: `
              function gtag_report_conversion(url) {
                console.log("gtag_report_conversion START")
                var callback = function () {
                  if (typeof (url) != 'undefined') {
                      window.location = url;
                  }
                };
                gtag('event', 'conversion', {
                    'send_to': 'AW-738487034/xtCNCOqDhuIBEPrVkeAC',
                    'event_callback': callback
                });
                console.log("gtag_report_conversion END")
                return false;
              }
            `}}
                />
            </Head>
            <Layout>
                <SurveyHeader
                    currentStep={currentStep}
                    max={max}
                    onPrev={() => handlePrev()}
                    onClose={() => onClose()}
                />
                <StepComponent
                    oldAnswers={answers}
                    answersUpdate={() => handleAnswersUpdate(answers)}
                    currentStep={currentStep}
                    max={max}
                    onPrev={() => handlePrev()}
                    onNext={() => handleNext()}
                />
            </Layout>
        </>
    )
}

export default SurveyPage