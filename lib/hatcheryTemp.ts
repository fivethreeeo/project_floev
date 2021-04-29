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

function updateEggTo(creature: HatcheryImpl) {
  axios.put(REQUEST_URL + '/hatchery/egg/creature', creature)
    .then(() => {
      process.env.NODE_ENV === 'development'
        ? console.log("  updateEggTo(creature) SUCCESS") : ''
    }).catch(err => console.error("  updateEggTo(creature) Error: " + err.message))
}

export function eggTo(creature: HatcheryImpl) {
  cacheLocalStorage(creature)
  updateEggTo(creature)
  return creature
}

function updateLaveTo(egg: HatcheryImpl) {
  axios.put(REQUEST_URL + '/hatchery/lava/egg', egg)
    .then(() => {
      process.env.NODE_ENV === 'development'
        ? console.log("  updateLaveTo(egg) SUCCESS") : ''
    }).catch(err => console.error("  updateLaveTo(egg) Error: " + err.message))
}

export function lavaTo(egg: HatcheryImpl) {
  cacheLocalStorage(egg)
  updateLaveTo(egg)
  return egg
}

function getLava() {
  const deviceId = cuid() + "D"
  const userId = null
  const hatcheryId = cuid() + "H"
  const status = ZERG.LAVA
  const currentSessionId = 1
  const birth = null
  const gender = null
  const name = null
  const phoneNumber = null
  return new HatcheryImpl(deviceId, userId, hatcheryId, status, currentSessionId,
    birth, gender, name, phoneNumber)
}

function getEggFrom(hatchery: HatcheryImpl) {
  const deviceId = hatchery.deviceId
  const userId = null
  const hatcheryId = cuid() + "H"
  const status = ZERG.EGG
  const currentSessionId = 1
  const birth = hatchery.birth
  const gender = hatchery.gender
  const name = null
  const phoneNumber = null
  return new HatcheryImpl(deviceId, userId, hatcheryId, status, currentSessionId,
    birth, gender, name, phoneNumber)
}

function getCreatureFrom(hatchery: HatcheryImpl) {
  const deviceId = hatchery.deviceId
  const userId = hatchery.userId
  const hatcheryId = cuid() + "H"
  const status = ZERG.CREATURE
  const currentSessionId = 1
  const birth = hatchery.birth
  const gender = hatchery.gender
  const name = hatchery.name
  const phoneNumber = hatchery.phoneNumber
  return new HatcheryImpl(deviceId, userId, hatcheryId, status, currentSessionId,
    birth, gender, name, phoneNumber)
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

function saveNew(hatchery: HatcheryImpl) {
  axios.post(REQUEST_URL + '/hatchery/new', hatchery)
    .then(() => {
      process.env.NODE_ENV === 'development'
        ? console.log("  saveNew(" + hatchery.status + ") SUCCESS") : ''
    }).catch(err => {
      console.error("  saveNew(" + hatchery.status + ") Error: " + err.message)
    })
}

function cacheSessionStorage(sessionId: number) {
  sessionStorage.setItem('_sid', String(sessionId))
  sessionStorage.setItem('current_event', '0')
}

function cacheLocalStorage(hatchery: HatcheryImpl) {
  localStorage.setItem('hatchery', JSON.stringify(hatchery))
}

function cache(hatchery: HatcheryImpl) {
  cacheLocalStorage(hatchery)
  cacheSessionStorage(hatchery.currentSessionId)
}

export function createNew(hatchery: HatcheryImpl) {
  if (hatchery.status === ZERG.LAVA) {
    hatchery = hatchery
  } else if (hatchery.status === ZERG.EGG) {
    hatchery = getEggFrom(hatchery)
  } else if (hatchery.status === ZERG.CREATURE) {
    hatchery = getCreatureFrom(hatchery)
  }
  cache(hatchery)
  saveNew(hatchery)
  return hatchery
}

export async function initializeHatchery() {
  let hatchery: HatcheryImpl
  const _hatchery = localStorage.getItem('hatchery')
  if (!_hatchery) {
    hatchery = createNew(getLava())
  } else {
    hatchery = JSON.parse(_hatchery)
    const _sid = sessionStorage.getItem('_sid')
    if (!_sid) {
      hatchery.currentSessionId = hatchery.currentSessionId + 1
      cache(hatchery)
      updateCurrentSessionIdIn(hatchery)
    }
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