
declare interface FloevRequest {
    [x: string]: any
    id?: string
    date: string
    loungeCode: number
    type: number
    status?: string
}
declare interface PurchaseRequest extends FloevRequest { }
declare interface PickupRequest extends FloevRequest { }
declare interface FittingRequest extends FloevRequest { }

declare class PurchaseRequestInput {
    requestDate
    requestTime
    loungeCode
    type
    constructor(requestDate: string, requestTime: string, loungeCode: number, type: number) {
        this.requestDate = requestDate
        this.requestTime = requestTime
        this.loungeCode = loungeCode
        this.type = type
    }
}