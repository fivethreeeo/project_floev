import React, { useState } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import SurveyHeader from '../../layout/SurveyHeader'
import Layout from '../../layout/DefaultLayout'
import moment from 'moment'

import Q0Start from './q0Start'
import Q1Customer, { CUSTOMER } from './q1Customer'
import Q2CustomerWith from './q2CustomerWith'
import Q3CustomerOther from './q3CustomerOther'
import Q4BirthGender from './q4BirthGender'
import Q5HasWorn, { HASWORN } from './q5HasWorn'
import Q6Purpose from './q6Purposes'
import Q7PainDegree from './q7PainDegree'
import Q8PainTypes from './q8PainTypes'
import Q9Prefer from './q9Prefer'
import Q10Photo from './q10Photo'
import Q11Photo from './q11Size'
import Q12Request from './q12Request'
import Q13NamePhoneNumber from './q13NamePhoneNumber'

const steps = [
    Q0Start,
    Q1Customer, Q2CustomerWith, Q3CustomerOther,
    Q4BirthGender, Q5HasWorn, Q6Purpose,
    Q7PainDegree, Q8PainTypes, Q9Prefer,
    Q10Photo, Q11Photo,
    Q12Request, Q13NamePhoneNumber
]
const max = steps.length

const SurveyPage = (props: {
    schedule: Schedule[]
}) => {
    const [currentStep, setCurrentStep] = useState<number>(
        parseInt(localStorage.getItem('floev[currentStep]') ?? '0'));
    const [answers, setAnswers] = useState<Answers>({
        customer: parseInt(localStorage.getItem('floev[customer]') ?? '-1'),
        birth: parseInt(localStorage.getItem('floev[birth]') ?? '-1'),
        gender: localStorage.getItem('floev[gender]') ?? '',
        hasWorn: parseInt(localStorage.getItem('floev[hasWorn]') ?? '-1'),
        purposes: (localStorage.getItem('floev[purposes]') ?? '').split(','),
        purposeEtc: localStorage.getItem('floev[purposeEtc]') ?? '',
        painDegree: parseInt(localStorage.getItem('floev[painDegree]') ?? '-1'),
        painDegreeEtc: localStorage.getItem('floev[painDegreeEtc]') ?? '',
        painTypes: (localStorage.getItem('floev[painTypes]') ?? '').split(','),
        painTypesEtc: localStorage.getItem('floev[painTypesEtc]') ?? '',
        prefer: localStorage.getItem('floev[preger]') ?? '',
        preferFileList: [],
        photoFileList: [],
        size: localStorage.getItem('floev[size]') ?? '',
        loungeCode: parseInt((localStorage.getItem('floev[loungeCode]') ?? '2')),
        requestDate: localStorage.getItem('floev[requestDate]') ?? moment().add(15, 'hours').format().slice(0, 10),
        requestTime: localStorage.getItem('floev[requestTime]') ?? '',
        name: localStorage.getItem('floev[name]') ?? '',
        phoneNumber: localStorage.getItem('floev[phoneNumber]') ?? '',
        authNumber: ""
    });

    function handleAnswersUpdate(answersParam: Answers) {
        setAnswers(answersParam)
    }

    let StepComponent = steps[currentStep]
    function updateStep(step: number) {
        setCurrentStep(step)
        localStorage.setItem('floev[currentStep]', String(step))
    }
    function handleNext() {
        if (currentStep === 1) {
            if (answers.customer === CUSTOMER.SELF) {
                updateStep(4)
            } else if (answers.customer === CUSTOMER.WITH) {
                updateStep(2)
            } else if (answers.customer === CUSTOMER.OTHER) {
                updateStep(3)
            } else {
                updateStep(4)
            }
        } else if (currentStep === 2) {
            updateStep(4)
        } else if (currentStep === 6) {
            if (answers.hasWorn === HASWORN.YES) {
                updateStep(7)
            } else if (answers.hasWorn === HASWORN.NO) {
                updateStep(9)
            } else {
                updateStep(7)
            }
        } else if (currentStep === 10) {
            if (answers.hasWorn === HASWORN.YES) {
                updateStep(11)
            } else if (answers.hasWorn === HASWORN.NO) {
                updateStep(12)
            }
        } else {
            updateStep(currentStep + 1)
        }

        if (currentStep === 4) {
            window.analytics.identify({
                gender: localStorage.getItem('floev[gender]'),
                age: localStorage.getItem('floev[birth]')
            })
        } else if (currentStep === 13) {
            window.analytics.identify({
                gender: localStorage.getItem('floev[gender]'),
                age: localStorage.getItem('floev[birth]'),
                name: localStorage.getItem('floev[name]')
            })
        }
    }

    function handlePrev() {
        if (currentStep === 3) {
            updateStep(1)
        } else if (currentStep === 4) {
            if (answers.customer === CUSTOMER.SELF) {
                updateStep(1)
            } else if (answers.customer === CUSTOMER.WITH) {
                updateStep(2)
            } else if (answers.customer === CUSTOMER.OTHER) {
                updateStep(3)
            } else {
                updateStep(1)
            }
        } else if (currentStep === 9) {
            if (answers.hasWorn === HASWORN.YES) {
                updateStep(8)
            } else if (answers.hasWorn === HASWORN.NO) {
                updateStep(6)
            } else {
                updateStep(6)
            }
        } else if (currentStep === 12) {
            if (answers.hasWorn === HASWORN.YES) {
                updateStep(11)
            } else if (answers.hasWorn === HASWORN.NO) {
                updateStep(10)
            } else {
                updateStep(10)
            }
        } else {
            updateStep(currentStep - 1)
        }
        localStorage.removeItem('floev[requestDate]')
        localStorage.removeItem('floev[requestTime]')
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
                <div className="survey">
                    {currentStep > 0 &&
                        <SurveyHeader
                            currentStep={currentStep}
                            onPrev={() => handlePrev()}
                            onClose={() => onClose()}
                        />}
                    <StepComponent
                        oldAnswers={answers}
                        answersUpdate={() => handleAnswersUpdate(answers)}
                        currentStep={currentStep}
                        max={max}
                        schedule={props.schedule}
                        onPrev={() => handlePrev()}
                        onNext={() => handleNext()}
                    />
                </div>
            </Layout>
        </>
    )
}

export default SurveyPage