import { gql } from "@apollo/client";

export const GET_PURCHASE_REQUEST_LIST = gql`
    query getPuchaseRequestList{
        getPuchaseRequestList{
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
            }
        }
    }
`