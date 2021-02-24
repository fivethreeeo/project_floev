import { gql } from "@apollo/client";

export const GET_PURCHASE_REQUEST_LIST = gql`
    query getRequestList{
        getRequestList(requestType: 0){ 
            date
            loungeCode
        }
    }
`

export const GET_PICKUP_FITTING_REQUEST_LIST = gql`
    query getPickupFittingRequestList{
        getPickupFittingRequestList{ 
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