import axios from "axios"
import cuid from "cuid"
import moment from "moment"
import { utmInit, ZERG } from '../lib/constants'
import DeviceDetector from 'device-detector-js'
const deviceDetector = new DeviceDetector();

const REQUEST_URL = process.env.NODE_ENV === 'development'
  // ? 'https://htest.floev.kr'
  ? 'http://localhost:3035'
  : 'https://hatchery.floev.kr'

function getCurrentSessionId() {
  return parseInt(sessionStorage.getItem('_sid') ?? '0')
  /* _sid가 0이 될 수 없으나 Type check pass 위해 삽입함 */
}
function getCurrentEventId() {
  const currentEventId = parseInt(sessionStorage.getItem('current_event') ?? '0') + 1
  sessionStorage.setItem('current_event', String(currentEventId))
  return currentEventId
}

function createEventData(eventName: string) {
  return {
    sessionId: getCurrentSessionId(),
    eventId: getCurrentEventId(),
    eventName: eventName,
    eventTimestamp: moment().format("YYYY-MM-DDTHH:mm:ss.SSSSSS"),
  }
}

export const postData = (hatchery: Hatchery, eventName: string, utm: Utm = utmInit) => {
  return {
    hatchery: hatchery,
    event: createEventData(eventName),
    device: deviceDetector.parse(navigator.userAgent),
    utm: utm
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

function createLava() {
  const deviceId = cuid() + "D"
  const userId = null
  const hatcheryId = cuid() + "H"
  const status = ZERG.LAVA
  const currentSessionId = 1
  const birth = null
  const gender = null
  const name = null
  const phoneNumber = null
  return new HatcheryImpl(deviceId, userId, hatcheryId,
    status, currentSessionId,
    birth, gender, name, phoneNumber)
}

function initializeSessionWith(sessionId: number) {
  sessionStorage.setItem('_sid', String(sessionId))
  sessionStorage.setItem('current_event', '0')
}

function cacheToBrowserWithNewSession(hatchery: HatcheryImpl) {
  localStorage.setItem('hatchery', JSON.stringify(hatchery))
  initializeSessionWith(hatchery.currentSessionId)
}

function buildNew(hatchery: HatcheryImpl) {
  axios.post(REQUEST_URL + '/hatchery/new', hatchery)
    .then(() => {
      process.env.NODE_ENV === 'development'
        ? console.log("  buildNew(hatchery) SUCCESS") : ''
    }).catch(err => {
      console.error("  buildNew(hatchery) Error: " + err.message)
    })
}
function updateCurrentSessionIdIn(hatchery: HatcheryImpl) {
  axios.put(REQUEST_URL + '/hatchery/current-session-id', hatchery)
    .then(() => {
      process.env.NODE_ENV === 'development'
        ? console.log("  updateCurrentSessionIdIn(hatchery) SUCCESS") : ''
    }).catch(err => {
      console.error("  updateCurrentSessionIdIn(hatchery) Error: " + err.message)
    })
}

export async function initializeHatchery() {
  let hatchery: HatcheryImpl = createLava()
  const _hatchery = localStorage.getItem('hatchery')
  if (!_hatchery) {
    cacheToBrowserWithNewSession(hatchery)
    buildNew(hatchery)
  } else if (_hatchery) {
    const _sid = sessionStorage.getItem('_sid')
    if (!_sid) {
      hatchery = JSON.parse(_hatchery)
      hatchery.currentSessionId = hatchery.currentSessionId + 1
      cacheToBrowserWithNewSession(hatchery)
      updateCurrentSessionIdIn(hatchery)
    } else { /* session id가 있으면 nothing to do */ }
  }
  return hatchery
}

export class HatcheryImpl implements Hatchery {
  deviceId: string
  userId: string | null
  hatcheryId: string
  status: string
  currentSessionId: number
  birth: number | null
  gender: string | null
  name: string | null
  phoneNumber: string | null
  constructor(deviceId: string, userId: string | null, hatcheryId: string,
    status: string, currentSessionId: number,
    birth: number | null, gender: string | null,
    name: string | null, phoneNumber: string | null
  ) {
    this.deviceId = deviceId
    this.userId = userId
    this.hatcheryId = hatcheryId
    this.status = status
    this.currentSessionId = currentSessionId
    this.birth = birth
    this.gender = gender
    this.name = name
    this.phoneNumber = phoneNumber
  }
}