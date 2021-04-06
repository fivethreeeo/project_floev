import axios from "axios"
import cuid from "cuid"
import moment from "moment"
import { ZERG } from '../lib/constants'
// import DeviceDetector from 'device-detector-js'
// const deviceDetector = new DeviceDetector();

const REQUEST_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3035'
    : 'https://hatchery.floev.kr'

function getDeviceId() {
    const deviceId = localStorage.getItem('_did') ?? cuid() + "D"
    localStorage.setItem('_did', deviceId)
    return deviceId
}

function getUserId(user: User) {
    const userId = user ? user.id : localStorage.getItem('_uid')
    userId ? localStorage.setItem('_uid', userId) : ''
    return userId
}

function getSessionId() {
    return parseInt(sessionStorage.getItem('_sid') ?? '0')
    /* _sid가 0이 될 수 없으나 Type check pass 위해 삽입함 */
}

function getCurrentEventId() {
    const currentEventId = parseInt(sessionStorage.getItem('current_event') ?? '0') + 1
    sessionStorage.setItem('current_event', String(currentEventId))
    return currentEventId
}

async function getHatcheryIdWithCurrentSessionIdBy(userId: string, deviceId: string) {
    return await axios.get(REQUEST_URL + '/hatchery/user/' + userId + '/' + deviceId)
        .then(res => {
            console.log("  getHatcheryIdWithCurrentSessionIdBy res.data: " + res.data)
            return res.data
        }).catch(err => {
            console.error("  getHatcheryIdByUserId Error: " + err.message)
        })
}

async function getCurrentSessionIdBy(hatcheryId: string, deviceId: string) {
    return await axios.get(REQUEST_URL + '/hatchery/' + hatcheryId + '/current-session-id/' + deviceId)
        .then(res => {
            const currentSessionId = res.data.currentSessionId
            return currentSessionId
        }).catch(err => {
            console.error("  getCurrentSessionIdBy(hatcheryId) Error: " + err.message)
            const currentSessionId = 0
            return currentSessionId
        })
}

function createNewHatchery(hatcheryId: string, deviceId: string) {
    axios.post(REQUEST_URL + '/hatchery/' + hatcheryId + '/' + deviceId)
        .catch(err => {
            console.error("  createNewHatchery Error: " + err.message)
        })
}

function initializeEvent() {
    sessionStorage.setItem('current_event', '0')
}

// 같은 디바이스에 다른 유저가 로그인할 수도 있음 -> 이때에는 hatchery id를 보면 안 되고... No -> 무조건 로그인 시에는 유저에 해처리 아이디까지 업데이트해놓도록 해놓자. -> 그럼 캐시에 있는 해처리 아이디는 무조건 유저아이디와 연동될 수밖에 없음
// userId가 업데이트(status가 creature)되는 시점에 모두 업데이트

async function getHatcheryIdWithCurrentSessionId(userId: string | null, deviceId: string) {
    let hatcheryId = localStorage.getItem('_hid')
    let currentSessionId = 0

    if (hatcheryId) {
        const _sid = sessionStorage.getItem('_sid')
        if (_sid) {
            currentSessionId = parseInt(_sid)
        } else {
            currentSessionId = await getCurrentSessionIdBy(hatcheryId, deviceId)
            initializeEvent()
        }
    } else {
        if (userId) {
            const temp = await getHatcheryIdWithCurrentSessionIdBy(userId, deviceId)
            hatcheryId = temp.hatcheryId
            currentSessionId = temp.currentSessionId
        } else {
            hatcheryId = cuid() + "H"
            currentSessionId = 1
            createNewHatchery(hatcheryId, deviceId)
        }
        initializeEvent()
    }
    localStorage.setItem('_hid', hatcheryId ?? '')
    sessionStorage.setItem('_sid', String(currentSessionId)) // 넘겨줄 필요없이 세션 처리는 여기서 끝!
    return hatcheryId ?? ''
}

async function getStatusBy(hatcheryId: string, deviceId: string) {
    return await axios.get(REQUEST_URL + '/hatchery/' + hatcheryId + '/status/' + deviceId)
        .then(res => {
            return res.data.status
        }).catch(err => {
            console.error("  getStatusBy(hatcheryId) Error: " + err.message)
        })
}

async function getStatus(userId: string | null, hatcheryId: string, deviceId: string) {
    let status = localStorage.getItem('_sts')
    if (!status) {
        if (userId) {
            status = ZERG.CREATURE
        } else {
            status = await getStatusBy(hatcheryId, deviceId)
        }
        localStorage.setItem('_sts', status ?? '')
    }
    return status ?? ''
}

export async function initializeHatchery(user: User) {
    const deviceId = getDeviceId()
    const userId = getUserId(user)
    const hatcheryId = await getHatcheryIdWithCurrentSessionId(userId, deviceId)
    const status = await getStatus(userId, hatcheryId, deviceId)
    return {
        deviceId: deviceId,
        userId: userId,
        hatcheryId: hatcheryId,
        status: status,
    }
}

function createEventData(eventName: string) {
    // const device = deviceDetector.parse(navigator.userAgent);
    // console.log(JSON.stringify(device))

    return {
        sessionId: getSessionId(),
        eventId: getCurrentEventId(),
        eventName: eventName,
        eventTimestamp: moment().format("YYYY-MM-DDTHH:mm:ss.SSSSSS")
    }
}

export const postData = (hatchery: Hatchery, eventName: string) => {
    return {
        hatchery: hatchery,
        event: createEventData(eventName)
    }
}

export async function recordEvent(postData: PostData) {
    await axios.post(REQUEST_URL + '/event', postData)
        .then(() => {
            process.env.NODE_ENV === 'development'
                ? console.log("Record " + postData.event.eventName + " SUCCESS")
                : ''
        }).catch(err => {
            console.error("Record " + postData.event.eventName + " Error: " + err.message)
        })
}