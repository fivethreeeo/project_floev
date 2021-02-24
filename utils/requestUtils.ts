import { REQUEST } from "../lib/constants";

export function isPickupRequest(requestType: REQUEST) {
    if (requestType === REQUEST.PICKUP) {
        return true
    }
    return false
}

export function isFittingRequest(requestType: REQUEST) {
    if (requestType === REQUEST.FITTING) {
        return true
    }
    return false
}

export function isRequestCanceled(request: FloevRequest) {
    if (request.status === 'cancel') {
        return true
    }
    return false
}

export function isRequestListEmpty(requestList: FloevRequest[]) {
    if (requestList.length === 0) {
        return true
    }
    return false
}