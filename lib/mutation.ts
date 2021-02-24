import { gql } from "@apollo/client";

export const MAKE_SURVEY_PURCHASE_REQUEST = gql`
  mutation makeSurveyPurchaseRequest(
        $customer: Int!, $birth: Int!, $gender: String!, $hasWorn: Int!,
        $purposes: [String!], $purposeEtc: String,
        $painDegree: Int!, $painDegreeEtc: String,
        $painTypes: [String!], $painTypesEtc: String,
        $prefer: String!, $size: String, $loungeCode: Int!,
        $requestDate: String!, $requestTime: String!,
        $name: String!, $phoneNumber: String!, $authNumber: String!) {
    makeSurveyPurchaseRequest(
        customer: $customer, birth: $birth, gender: $gender, hasWorn: $hasWorn,
        purposes: $purposes, purposeEtc: $purposeEtc,
        painDegree: $painDegree, painDegreeEtc: $painDegreeEtc,
        painTypes: $painTypes, painTypesEtc: $painTypesEtc,
        prefer: $prefer, size: $size, loungeCode: $loungeCode
        requestDate: $requestDate, requestTime: $requestTime,
        name: $name, phoneNumber: $phoneNumber, authNumber: $authNumber) {
    token
        user{
            id
            requests{
                id
                date
                loungeCode
            }
        }
    }
  }`

export const CHANGE_PURCHASE_REQUEST = gql`
    mutation changePurchaseRequest(
        $requestId: String!
        $loungeCode: Int!
        $requestDate: String!
        $requestTime: String!
    ){
        changePurchaseRequest(
            requestId: $requestId
            loungeCode: $loungeCode
            requestDate: $requestDate
            requestTime: $requestTime
        ){
            id
            date
            loungeCode
        }
  }`


export const CANCEL_PURCHASE_REQUEST = gql`
mutation cancelPurchaseRequest($requestId: String!){
    cancelPurchaseRequest(requestId: $requestId)
}`

export const MAKE_PICKUP_REQUEST = gql`
mutation makePickupRequest(
        $phoneNumber: String!
        $loungeCode: Int!
        $requestDate: String!
        $requestTime: String!
    ){
    makePickupRequest(
        phoneNumber: $phoneNumber
        loungeCode: $loungeCode
        requestDate: $requestDate
        requestTime: $requestTime
    ){
        id
        date
        loungeCode
    }
}`

export const CHANGE_PICKUP_REQUEST = gql`
    mutation changePickupRequest(
        $requestId: String!
        $loungeCode: Int!
        $requestDate: String!
        $requestTime: String!
    ){
        changePickupRequest(
            requestId: $requestId
            loungeCode: $loungeCode
            requestDate: $requestDate
            requestTime: $requestTime
        ){
            id
            date
            loungeCode
        }
  }`

export const CANCEL_PICKUP_REQUEST = gql`
mutation cancelPickupRequest($requestId: String!){
    cancelPickupRequest(requestId: $requestId)
}`

export const MAKE_FITTING_REQUEST = gql`
mutation makeFittingRequest(
        $phoneNumber: String!
        $loungeCode: Int!
        $requestDate: String!
        $requestTime: String!
    ){
      makeFittingRequest(
        phoneNumber: $phoneNumber
        loungeCode: $loungeCode
        requestDate: $requestDate
        requestTime: $requestTime
    ){
        id
        date
        loungeCode
    }
}`

export const CHANGE_FITTING_REQUEST = gql`
    mutation changeFittingRequest(
        $requestId: String!
        $loungeCode: Int!
        $requestDate: String!
        $requestTime: String!
    ){
      changeFittingRequest(
            requestId: $requestId
            loungeCode: $loungeCode
            requestDate: $requestDate
            requestTime: $requestTime
        ){
            id
            date
            loungeCode
        }
  }`

export const CANCEL_FITTING_REQUEST = gql`
mutation cancelFittingRequest($requestId: String!){
  cancelFittingRequest(requestId: $requestId)
}`

export const SIGN_IN_WITH_PHONENUMBER = gql`
mutation signInWithPhoneNumber($phoneNumber: String! $authNumber: String!){
    signInWithPhoneNumber(phoneNumber: $phoneNumber authNumber: $authNumber){
        token
        user{
            id
            name
        }
    }
}`

export const CREATE_USER_MUTATION = gql`
  mutation createUser($name: String!, $phn: String!) {
    createUser(name: $name, phn: $phn) {
      id
    }
  }`

export const SIGN_UP_USER = gql`
mutation signUpUser($email: String!, $password: String!, $name: String!, $phoneNumber: String!) {
  signUpUser(email: $email, password: $password, name: $name, phoneNumber: $phoneNumber) {
    token
    user{
        name
        email
    }
  }
}
`
export const CHECK_EMAIL_DUP = gql`
mutation checkEmailDup($email: String!){
  checkEmailDup(email: $email)
}
`

export const SIGN_IN_USER = gql`
  mutation signInUser($email: String!, $password: String!) {
    signInUser(email: $email, password: $password) {
      token
      user{
          name
          email
      }
    }
  }
`