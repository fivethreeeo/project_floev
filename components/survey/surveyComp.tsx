import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import SurveyHeader from '../../layout/SurveyHeader'
import Layout from '../../layout/DefaultLayout'
import moment from 'moment'
import { CUSTOMER, HASWORN, drone, EVENT } from '../../lib/constants'
import { initializeHatchery, recordEvent, postData } from '../../lib/hatchery'

import Q0Start from './q0Start'
import Q1Customer from './q1Customer'
import Q2CustomerWith from './q2CustomerWith'
import Q3CustomerOther from './q3CustomerOther'
import Q4BirthGender from './q4BirthGender'
import Q5HasWorn from './q5HasWorn'
import Q6Purpose from './q6Purposes'
import Q7PainDegree from './q7PainDegree'
import Q8PainTypes from './q8PainTypes'
import Q9_1PreferFrameColors from './q9_1preferFrameColors'
import Q9_2PreferFrameShapes from './q9_2preferFrameShapes'
import Q9_3PreferLensShapes from './q9_3preferLensShapes'
import Q9_4PreferMoods from './q9_4preferMoods'
import Q9_5Prefer from './q9_5prefer'
import Q10Photo from './q10Photo'
import Q12Request from './q12Request'
import Q13NamePhoneNumber from './q13NamePhoneNumber'
import { useRouter } from 'next/router'

const steps = [
    Q0Start,
    Q1Customer, Q2CustomerWith, Q3CustomerOther,
    Q4BirthGender, Q5HasWorn, Q6Purpose,
    Q7PainDegree, Q8PainTypes,
    Q9_1PreferFrameColors, // currentStep 91, stepIndex 9
    Q9_2PreferFrameShapes, // currentStep 92, stepIndex 10
    Q9_3PreferLensShapes, // currentStep 93, stepIndex 11
    Q9_4PreferMoods, // currentStep 94, stepIndex 12
    Q9_5Prefer,  // currentStep 95, stepIndex 13
    Q10Photo, // currentStep 10, stepIndex 14
    Q12Request, // currentStep 12, stepIndex 15
    Q13NamePhoneNumber // currentStep 13, stepIndex 16
]
const max = steps.length

const SurveyPage = (props: {
    user: User
    purchaseRequest: PurchaseRequest[]
}) => {
    const router = useRouter()
    const [hatchery, setHatchery] = useState<Hatchery>(drone)
    const utm = {
        utm_source: router.query.utm_source,
        utm_medium: router.query.utm_medium,
        utm_campaign: router.query.utm_medium,
        utm_term: router.query.utm_term,
        utm_content: router.query.utm_content
    }

    useEffect(() => {
        const createHatchery = async () => {
            const newHatchery: Hatchery = await initializeHatchery()
            setHatchery(newHatchery)
            recordEvent(postData(newHatchery, EVENT.SURVEY.PAGE, utm))
        }
        createHatchery()
    }, [])

    function handleUpdateHatchery(newHatchery: Hatchery) {
        setHatchery(newHatchery)
    }

    const tempPurposes = (localStorage.getItem('floev[purposes]') ?? '').split(',')
    const tempPainTypes = (localStorage.getItem('floev[painTypes]') ?? '').split(',')
    const tempPreferFrameColors = (localStorage.getItem('floev[preferFrameColors]') ?? '').split(',')
    const tempPreferFrameShapes = (localStorage.getItem('floev[preferFrameShapes]') ?? '').split(',')
    const tempPreferLensShapes = (localStorage.getItem('floev[preferLensShapes]') ?? '').split(',')
    const tempPreferMoods = (localStorage.getItem('floev[preferMoods]') ?? '').split(',')
    const tempCurrentStep: number = parseInt(localStorage.getItem('floev[currentStep]') ?? '0')
    const [currentStep, setCurrentStep] = useState<number>(tempCurrentStep >= 10 && tempCurrentStep < 91 ? 10 : tempCurrentStep);
    function currentStepToStepIndex(currentStep: number) {
        let index = currentStep
        if (currentStep > 90) {
            index = currentStep - 90 + 8
        } else if (currentStep === 10) {
            index = 14
        } else if (currentStep >= 12) {
            index = currentStep + 3
        }
        return index
    }
    const [stepIndex, setStepIndex] = useState<number>(currentStepToStepIndex(currentStep))

    const [answers, setAnswers] = useState<Answers>({
        customer: parseInt(localStorage.getItem('floev[customer]') ?? '-1'),
        birth: parseInt(localStorage.getItem('floev[birth]') ?? '-1'),
        gender: localStorage.getItem('floev[gender]') ?? '',
        hasWorn: parseInt(localStorage.getItem('floev[hasWorn]') ?? '-1'),
        purposes: tempPurposes[0] === "" ? [] : tempPurposes,
        purposeEtc: localStorage.getItem('floev[purposeEtc]') ?? '',
        painDegree: parseInt(localStorage.getItem('floev[painDegree]') ?? '-1'),
        painDegreeEtc: localStorage.getItem('floev[painDegreeEtc]') ?? '',
        painTypes: tempPainTypes[0] === "" ? [] : tempPainTypes,
        painTypesEtc: localStorage.getItem('floev[painTypesEtc]') ?? '',
        preferFrameColors: tempPreferFrameColors[0] === "" ? [] : tempPreferFrameColors,
        preferFrameShapes: tempPreferFrameShapes[0] === "" ? [] : tempPreferFrameShapes,
        preferLensShapes: tempPreferLensShapes[0] === "" ? [] : tempPreferLensShapes,
        preferMoods: tempPreferMoods[0] === "" ? [] : tempPreferMoods,
        prefer: localStorage.getItem('floev[painDegreeEtc]') ?? '',
        preferFileList: [],
        preferFileNameList: [],
        photoFileList: [],
        photoFileNameList: [],
        size: localStorage.getItem('floev[size]') ?? '',
        loungeCode: parseInt((localStorage.getItem('floev[loungeCode]') ?? '0')),
        requestDate: localStorage.getItem('floev[requestDate]') ?? moment().subtract(9, 'hours').format().slice(0, 10),
        requestTime: localStorage.getItem('floev[requestTime]') ?? '',
        name: localStorage.getItem('floev[name]') ?? '',
        phoneNumber: localStorage.getItem('floev[phoneNumber]') ?? '',
        authNumber: ""
    });

    function handleAnswersUpdate(answersParam: Answers) {
        setAnswers(answersParam)
    }

    function updateStep(step: number) {
        setCurrentStep(step)
        localStorage.setItem('floev[currentStep]', String(step))
        setStepIndex(currentStepToStepIndex(step))
    }

    function handleNext(eventName: string) {
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
                updateStep(91)
            } else {
                updateStep(7)
            }
        } else if (currentStep === 8) {
            updateStep(91)
        } else if (currentStep === 95) {
            updateStep(10)
        } else if (currentStep === 10) {
            updateStep(12)
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
        recordEvent(postData(hatchery, eventName))
    }

    function handlePrev(eventName: string) {
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
        } else if (currentStep === 91) {
            if (answers.hasWorn === HASWORN.YES) {
                updateStep(8)
            } else if (answers.hasWorn === HASWORN.NO) {
                updateStep(6)
            } else {
                updateStep(6)
            }
        } else if (currentStep === 10) {
            updateStep(95)
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

        recordEvent(postData(hatchery, eventName))
    }

    let StepComponent = steps[stepIndex]

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
            <Layout title="플로브 - 안경 설문">
                <div className="survey">
                    {currentStep > 0 &&
                        <SurveyHeader stepIndex={stepIndex} />
                    }
                    <StepComponent
                        hatchery={hatchery}
                        updateHatchery={(newHatchery: Hatchery) => handleUpdateHatchery(newHatchery)}
                        oldAnswers={answers}
                        answersUpdate={() => handleAnswersUpdate(answers)}
                        currentStep={currentStep}
                        max={max}
                        purchaseRequest={props.purchaseRequest}
                        onPrev={(eventName: string) => handlePrev(eventName)}
                        onNext={(eventName: string) => handleNext(eventName)}
                    />
                </div>
            </Layout>
        </>
    )
}

export default SurveyPage