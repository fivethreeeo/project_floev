import { gql } from "@apollo/client";

// requestType
// PURCHASE: 0
// PICKUP: 2

export const GET_PURCHASE_REQUEST_LIST = gql`
    query getRequestList{
        getRequestList(requestType: 0){ 
            date
            loungeCode
        }
    }
`

export const GET_PICKUP_REQUEST_LIST = gql`
    query getRequestList{
        getRequestList(requestType: 2){ 
            date
            loungeCode
        }
    }
`

export const CHECKUP_USER = gql`
	query checkUpUser{
		checkUpUser{
            id
            name
            email
            phoneNumber
            requests{
                id
                date
                loungeCode
                type
                status
            }
        }
    }
`