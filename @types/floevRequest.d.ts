
declare interface FloevRequest {
    [x: string]: any
    id: string
    date: string
    loungeCode: number
    type: number
    status?: string
}
declare interface PurchaseRequest extends FloevRequest { }
declare interface PickupRequest extends FloevRequest { }
declare interface FittingRequest extends FloevRequest { }