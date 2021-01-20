import React, { useState } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { createApolloClient } from '../lib/apolloClient'
import { gql } from '@apollo/client'
import SurveyHeader from '../layout/SurveyHeader'
import Layout from '../layout/DefaultLayout'
import moment from 'moment'

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
        loungeCode: number
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
        loungeCode: number
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
    Q10Photo, Q11Photo,
    Q12Reservation, Q13NamePhoneNumber
]
const max = steps.length

const SurveyPage = (props: {
    schedule: Schedule[]
}) => {
    const [currentStep, setCurrentStep] = useState<number>(
        parseInt(process.browser ? localStorage.getItem('floev[currentStep]') ?? '0' : '0'));
    const [answers, setAnswers] = useState<Answers>({
        customer: parseInt(process.browser ? localStorage.getItem('floev[customer]') ?? '-1' : '-1'),
        birth: parseInt(process.browser ? localStorage.getItem('floev[birth]') ?? '-1' : '-1'),
        gender: process.browser ? localStorage.getItem('floev[gender]') ?? '' : '',
        hasWorn: parseInt(process.browser ? localStorage.getItem('floev[hasWorn]') ?? '-1' : '-1'),
        purposes: process.browser ? (localStorage.getItem('floev[purposes]') ?? '').split(',') : [],
        purposeEtc: process.browser ? localStorage.getItem('floev[purposeEtc]') ?? '' : '',
        painDegree: parseInt(process.browser ? localStorage.getItem('floev[painDegree]') ?? '-1' : '-1'),
        painDegreeEtc: process.browser ? localStorage.getItem('floev[painDegreeEtc]') ?? '' : '',
        painTypes: (process.browser ? localStorage.getItem('floev[painTypes]') ?? '' : '').split(','),
        painTypesEtc: process.browser ? localStorage.getItem('floev[painTypesEtc]') ?? '' : '',
        prefer: process.browser ? localStorage.getItem('floev[preger]') ?? '' : '',
        size: process.browser ? localStorage.getItem('floev[size]') ?? '' : '',
        loungeCode: parseInt(process.browser ? localStorage.getItem('floev[lounge]') ?? '2' : '2'),
        reservationDate: process.browser ? localStorage.getItem('floev[reservationDate]') ?? moment().add(15, 'hours').format().slice(0, 10) : moment().add(15, 'hours').format().slice(0, 10),
        reservationTime: process.browser ? localStorage.getItem('floev[reservationTime]') ?? '' : '',
        name: process.browser ? localStorage.getItem('floev[name]') ?? '' : '',
        phoneNumber: process.browser ? localStorage.getItem('floev[phoneNumber]') ?? '' : '',
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

        console.log("answers.customer: " + answers.customer)
        console.log("answers.birth: " + answers.birth)
        console.log("answers.gender: " + answers.gender)
        console.log("answers.hasWorn: " + answers.hasWorn)
        console.log("answers.purposes: " + JSON.stringify(answers.purposes))
        console.log("answers.purposeEtc: " + answers.purposeEtc)
        console.log("answers.painDegree: " + answers.painDegree)
        console.log("answers.painDegreeEtc: " + answers.painDegreeEtc)
        console.log("answers.painTypes: " + JSON.stringify(answers.painTypes))
        console.log("answers.painTypesEtc: " + answers.painTypesEtc)
        console.log("answers.prefer: " + answers.prefer)
        console.log("answers.size: " + answers.size)
        console.log("answers.loungeCode: " + answers.loungeCode)
        console.log("answers.reservationDate: " + answers.reservationDate)
        console.log("answers.reservationTime: " + answers.reservationTime)
        console.log("answers.name: " + answers.name)
        console.log("answers.phoneNumber: " + answers.phoneNumber)
        console.log("answers.authNumber: " + answers.authNumber)
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
                    onPrev={() => handlePrev()}
                    onClose={() => onClose()}
                />
                <StepComponent
                    oldAnswers={answers}
                    answersUpdate={() => handleAnswersUpdate(answers)}
                    currentStep={currentStep}
                    max={max}
                    schedule={props.schedule}
                    onPrev={() => handlePrev()}
                    onNext={() => handleNext()}
                />
            </Layout>
        </>
    )
}

const RESERVATION_SCHEDULE_LIST = gql`
    query getReservationScheduleList{
        getReservationScheduleList{
            date
            loungeCode
        }
    }
`

export const getServerSideProps: GetServerSideProps = async (context) => { //{ req }: { req: any }
    const startTime = Date.now();
    const client = createApolloClient(context)
    const { schedule } = await client.query({ query: RESERVATION_SCHEDULE_LIST })
        .then(({ data }) => {
            console.log("Survey Page elapsed time: " + (Date.now() - startTime) + "ms");
            return { schedule: data.getReservationScheduleList };
        })
        .catch((error) => {
            console.log("Survey Page elapsed time: " + (Date.now() - startTime) + "ms");
            console.error("Schedule data fetch ERROR" + error.message)
            return { schedule: null };
        });

    return {
        props: {
            // this hydrates the clientside Apollo cache in the `withApollo` HOC
            apolloStaticCache: client.cache.extract(),
            schedule
        },
    }
}

export default SurveyPage