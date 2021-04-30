import axios from "axios"
import cuid from "cuid"
import { REQUEST_URL, ZERG } from './constants'
import HatcheryImpl from './HatcheryImpl'

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