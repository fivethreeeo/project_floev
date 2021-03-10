import { REQUEST } from "../lib/constants";

export function isPurchaseRequest(requestType: REQUEST) {
    return requestType === REQUEST.PURCHASE
}

export function isPickupRequest(requestType: REQUEST) {
    return requestType === REQUEST.PICKUP
}

export function isFittingRequest(requestType: REQUEST) {
    return requestType === REQUEST.FITTING
}

export function isRequestCanceled(request: FloevRequest) {
    return request.status === 'cancel'
}

export function isRequestListEmpty(requestList: FloevRequest[]) {
    return requestList.length === 0
}