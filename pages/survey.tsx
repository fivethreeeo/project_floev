import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const SurveyPage = () => {
    const router = useRouter()
    useEffect(() => {
        router.push('/')
    })
    return (
        <div>
        </div>
    )
}

export default SurveyPage