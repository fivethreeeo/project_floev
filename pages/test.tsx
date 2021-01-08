import React from 'react'
import { gql } from '@apollo/client'

const TestPage = ({ user }: { user: any }) => {
    const userName = user !== null ? user.name : ''
    return (
        <>
            <p>hello world!</p>
            {userName}
        </>
    )
}

export default TestPage