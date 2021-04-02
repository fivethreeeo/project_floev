import axios from "axios"
import cuid from "cuid"
import moment from "moment"
import { ZERG } from '../lib/constants'
// import DeviceDetector from 'device-detector-js'
// const deviceDetector = new DeviceDetector();

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
    const sessionId = sessionStorage.getItem('_sid') ?? cuid() + "S"
    sessionStorage.setItem('_sid', sessionId)
    return sessionId
}

function getCurrentEventId() {
    const currentEventId = parseInt(sessionStorage.getItem('current_event') ?? '0') + 1
    sessionStorage.setItem('current_event', String(currentEventId))
    return currentEventId
}

async function getHatcheryIdBy(userId: string) {
    return await axios.get('http://localhost:3035/user/hatchery-id/' + userId)
        .then(res => {
            return res.data.hatcheryId
        }).catch(err => {
            console.error("  getHatcheryIdByUserId Error: " + err.message)
        })
}

async function getHatcheryId(userId: string | null) {
    let hatcheryId: string = ''
    if (userId) {
        hatcheryId = await getHatcheryIdBy(userId)
    } else {
        hatcheryId = localStorage.getItem('_hid') ?? cuid() + "H"
    }
    localStorage.setItem('_hid', hatcheryId)
    return hatcheryId
}

async function getStatusBy(hatcheryId: string) {
    return await axios.get('http://localhost:3035/user/status/' + hatcheryId)
        .then(res => {
            return res.data.status
        }).catch(err => {
            console.error("  getStatusBy(hatcheryId) Error: " + err.message)
        })
}
async function getStatus(userId: string | null, hatcheryId: string) {
    let status = localStorage.getItem('_sts')
    if (!status) {
        if (userId) {
            status = ZERG.CREATURE
        } else {
            status = await getStatusBy(hatcheryId)
            // 백엔드에서 status를 null로 넘기는 경우는 없으나 type checking 위해 추가함
            if (!status) {
                status = ZERG.LAVA
            }
        }
        localStorage.setItem('_sts', status)
    }
    return status
}

export async function initHatchery(user: User) {
    const deviceId = getDeviceId()
    const userId = getUserId(user)
    const hatcheryId = await getHatcheryId(userId)
    const status = await getStatus(userId, hatcheryId)
    return {
        deviceId: deviceId,
        userId: userId,
        hatcheryId: hatcheryId,
        status: status
    }
}

export function createPostDataOf(eventName: string) {
    // const device = deviceDetector.parse(navigator.userAgent);
    // console.log(JSON.stringify(device))
    return {
        sessionId: getSessionId(),
        eventId: getCurrentEventId(),
        eventName: eventName,
        eventTimestamp: moment().format("YYYY-MM-DDTHH:mm:ss.SSSSSS")
    }
}

export async function recordEvent(postData: PostData) {
    await axios.post('http://localhost:3035/event', postData)
        .then(() => {
            process.env.NODE_ENV === 'development'
                ? console.log("Record " + postData.event.eventName + " SUCCESS")
                : ''
        }).catch(err => {
            console.error("Record " + postData.event.eventName + " Error: " + err.message)
        })
}