import axios from "axios"
import cuid from "cuid"
import moment from "moment"
import { ZERG } from '../lib/constants'
import DeviceDetector from 'device-detector-js'
const deviceDetector = new DeviceDetector();

const REQUEST_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3035'
    : 'https://hatchery.floev.kr'

function getDeviceId() {
    const deviceId = localStorage.getItem('_did') ?? cuid() + "D"
    localStorage.setItem('_did', deviceId)
    return deviceId
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

async function findHatcheryAndSession(hatcheryInput: Hatchery) {
    return await axios.post(REQUEST_URL + '/hatchery/user/', hatcheryInput)
        .then(res => {
            console.log("  findHatchery res.data: " + res.data)
            return res.data
        }).catch(err => {
            console.error("  findHatchery Error: " + err.message)
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

function initializeEvent() {
    sessionStorage.setItem('current_event', '0')
}

async function getStatusByHatcheryId() {
    const hatcheryId = localStorage.getItem('_hid')
    return await axios.get(REQUEST_URL + '/hatchery/' + hatcheryId + '/status')
        .then(res => {
            return res.data.status
        }).catch(err => {
            console.error("  getStatusBy(hatcheryId) Error: " + err.message)
        })
}

export async function initializeHatchery() {
    const deviceId = getDeviceId()
    const userId = localStorage.getItem('_uid')

    if (!userId) {
        const hatcheryId = localStorage.getItem('_hid')
        if (!hatcheryId) {
            const lava: Hatchery = {
                deviceId: deviceId,
                userId: null,
                hatcheryId: cuid() + 'H',
                currentSessionId: 1,
                status: ZERG.LAVA,
                birth: null,
                gender: null,
                name: null,
                phoneNumber: null,
            }
            createLava(lava)
            localStorage.setItem('_hid', lava.hatcheryId)
            sessionStorage.setItem('_sid', String(lava.currentSessionId))
            initializeEvent()
            localStorage.setItem('_sts', lava.status)
        } else {
            const _sid = sessionStorage.getItem('_sid')
            let currentSessionId
            if (!_sid) {
                currentSessionId = await getCurrentSessionIdBy(hatcheryId, deviceId)
                sessionStorage.setItem('_sid', String(currentSessionId))
                initializeEvent()
            } else {
                currentSessionId = parseInt(_sid)
            }
            let status = localStorage.getItem('_sts')
            if (!status) {
                status = await getStatusByHatcheryId()
                localStorage.setItem('_sts', status ?? '')
            }
        }
    } else {
        localStorage.setItem('_sts', ZERG.CREATURE)
        let hatcheryId = localStorage.getItem('_hid')
        if (!hatcheryId) {
            const hatcheryInput: Hatchery = {
                deviceId: deviceId,
                userId: userId,
                hatcheryId: 'No data', // Dummy 값
                currentSessionId: 0, // Dummy 값
                status: ZERG.CREATURE,
                birth: parseInt(localStorage.getItem('floev[birth]') ?? '-1'),
                gender: localStorage.getItem('floev[gender]'),
                name: localStorage.getItem('floev[name]'),
                phoneNumber: localStorage.getItem('floev[phoneNumber]'),
            }
            const hatcheryOutput = await findHatcheryAndSession(hatcheryInput)
            localStorage.setItem('_hid', hatcheryOutput.hatcheryId ?? '')
            sessionStorage.setItem('_sid', String(hatcheryOutput.currentSessionId))
            initializeEvent()
        } else {
            const _sid = sessionStorage.getItem('_sid')
            let currentSessionId
            if (!_sid) {
                currentSessionId = await getCurrentSessionIdBy(hatcheryId, deviceId)
                sessionStorage.setItem('_sid', String(currentSessionId))
                initializeEvent()
            } else {
                currentSessionId = parseInt(_sid)
            }
        }
    }
    return {
        deviceId: deviceId,
        userId: userId,
        hatcheryId: localStorage.getItem('_hid') ?? '',
        currentSessionId: getSessionId(),
        status: localStorage.getItem('_sts') ?? '',
        birth: parseInt(localStorage.getItem('floev[birth]') ?? '-1'),
        gender: localStorage.getItem('floev[gender]'),
        name: localStorage.getItem('floev[name]'),
        phoneNumber: localStorage.getItem('floev[phoneNumber]')
    }
}

function createLava(lava: Hatchery) {
    axios.post(REQUEST_URL + '/hatchery/lava', lava)
        .then(() => {
            console.log("  createLava SUCCESS")
        }).catch(err => {
            console.error("  createLava Error: " + err.message)
        })
}

export function createEgg(egg: Hatchery) {
    axios.post(REQUEST_URL + '/hatchery/egg', egg)
        .then(() => {
            process.env.NODE_ENV === 'development'
                ? console.log("  createEgg SUCCESS") : ''
        }).catch(err => console.error("  createEgg Error: " + err.message))
}

export function createCreature(creature: Hatchery) {
    axios.post(REQUEST_URL + '/hatchery/creature', creature)
        .then(() => {
            process.env.NODE_ENV === 'development'
                ? console.log("  createCreature SUCCESS") : ''
        }).catch(err => console.error("  createEgg Error: " + err.message))
}


export function lavaTo(egg: Hatchery) {
    axios.post(REQUEST_URL + '/hatchery/lava/egg', egg)
        .then(() => {
            process.env.NODE_ENV === 'development'
                ? console.log("  lavaToEgg SUCCESS") : ''
        }).catch(err => console.error("  lavaToEgg Error: " + err.message))
}

export function eggTo(creature: Hatchery) {
    axios.post(REQUEST_URL + '/hatchery/egg/creature', creature)
        .then(() => {
            process.env.NODE_ENV === 'development'
                ? console.log("  eggToCreature SUCCESS") : ''
        }).catch(err => console.error("  eggToCreature Error: " + err.message))
}

function createEventData(eventName: string) {
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
        event: createEventData(eventName),
        device: deviceDetector.parse(navigator.userAgent)
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