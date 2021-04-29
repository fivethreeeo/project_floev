import axios from "axios"
import cuid from "cuid"
import { ZERG } from '../lib/constants'

const REQUEST_URL = process.env.NODE_ENV === 'development'
  // ? 'https://htest.floev.kr'
  ? 'http://localhost:3035'
  : 'https://hatchery.floev.kr'

function getDeviceId() {
  const deviceId = localStorage.getItem('_did') ?? cuid() + "D"
  localStorage.setItem('_did', deviceId)
  return deviceId
}
function getUserId() {
  return localStorage.getItem('_uid')
}
function getHatcheryId() {
  return localStorage.getItem('_hid') ?? ''
}
function getCurrentSessionId() {
  return parseInt(sessionStorage.getItem('_sid') ?? '0')
  /* _sid가 0이 될 수 없으나 Type check pass 위해 삽입함 */
}
function getStatus() {
  return localStorage.getItem('_sts') ?? ''
}
function setHatcheryId(hatcheryId: string) {
  localStorage.setItem('_hid', hatcheryId)
}
function setSessionId(currentSessionId: string) {
  sessionStorage.setItem('_sid', currentSessionId)
}
function setEventIdToInit() {
  sessionStorage.setItem('current_event', '0')
}
function setStatus(status: string) {
  localStorage.setItem('_sts', status)
}

function getHatchery() {
  return {
    deviceId: getDeviceId(),
    userId: getUserId(),
    hatcheryId: getHatcheryId(),
    currentSessionId: getCurrentSessionId(),
    status: getStatus(),
    birth: parseInt(localStorage.getItem('floev[birth]') ?? '-1'),
    gender: localStorage.getItem('floev[gender]'),
    name: localStorage.getItem('floev[name]'),
    phoneNumber: localStorage.getItem('floev[phoneNumber]')
  }
}

function setHatchery(hatchery: Hatchery) {
  setHatcheryId(hatchery.hatcheryId)
  setSessionId(String(hatchery.currentSessionId))
  setEventIdToInit()
  setStatus(hatchery.status)
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

async function findCurrentSessionIdBy(hatcheryId: string, deviceId: string) {
  return await axios.post(REQUEST_URL + '/hatchery/current-session-id', {
    hatcheryId: hatcheryId,
    deviceId: deviceId // lava 생성시 필요함
  }).then(res => {
    const currentSessionId = res.data.currentSessionId
    return currentSessionId
  }).catch(err => {
    console.error("  getCurrentSessionIdBy(hatcheryId) Error: " + err.message)
    const currentSessionId = 0
    return currentSessionId
  })
}

async function findStatusByHatcheryId() {
  const hatcheryId = localStorage.getItem('_hid')
  let status = ''
  return await axios.get(REQUEST_URL + '/hatchery/' + hatcheryId + '/status')
    .then(res => {
      status = res.data.status
      return status
    }).catch(err => {
      console.error("  getStatusBy(hatcheryId) Error: " + err.message)
      return status
    })
}

function newLava() {
  return {
    deviceId: getDeviceId(),
    userId: null,
    hatcheryId: cuid() + 'H',
    currentSessionId: 1,
    status: ZERG.LAVA,
    birth: null,
    gender: null,
    name: null,
    phoneNumber: null,
  }
}

function newEgg() {
  return {
    deviceId: getDeviceId(),
    userId: null,
    hatcheryId: cuid() + 'H',
    currentSessionId: 1,
    status: ZERG.EGG,
    birth: parseInt(localStorage.getItem('floev[birth]') ?? '-1'),
    gender: localStorage.getItem('floev[gender]'),
    name: null,
    phoneNumber: null,
  }
}

function newCreature() {
  return {
    deviceId: getDeviceId(),
    userId: localStorage.getItem('_uid'),
    hatcheryId: cuid() + 'H',
    currentSessionId: 1,
    status: ZERG.CREATURE,
    birth: parseInt(localStorage.getItem('floev[birth]') ?? '-1'),
    gender: localStorage.getItem('floev[gender]'),
    name: localStorage.getItem('floev[name]'),
    phoneNumber: localStorage.getItem('floev[phoneNumber]'),
  }
}

export async function initializeHatchery() {
  const deviceId = getDeviceId()
  const userId = localStorage.getItem('_uid')
  let hatchery: Hatchery = getHatchery()

  if (!userId) {
    const hatcheryId = localStorage.getItem('_hid')
    if (!hatcheryId) {
      hatchery = createLava()
    } else {
      const _sid = sessionStorage.getItem('_sid')
      let currentSessionId
      if (!_sid) {
        currentSessionId = await findCurrentSessionIdBy(hatcheryId, deviceId)
        hatchery.currentSessionId = currentSessionId
        setHatchery(hatchery)
      } else {
        currentSessionId = parseInt(_sid)
      }
      let status = localStorage.getItem('_sts')
      if (!status) {
        status = await findStatusByHatcheryId()
        hatchery.status = status
        setStatus(status)
      }
    }
  } else {
    hatchery.status = ZERG.CREATURE
    setStatus(hatchery.status)
    const hatcheryId = localStorage.getItem('_hid')
    if (!hatcheryId) {
      const hatcheryInput: Hatchery = {
        deviceId: deviceId,
        userId: userId,
        hatcheryId: '', // Dummy 값
        currentSessionId: 0, // Dummy 값
        status: ZERG.CREATURE,
        birth: parseInt(localStorage.getItem('floev[birth]') ?? '-1'),
        gender: localStorage.getItem('floev[gender]'),
        name: localStorage.getItem('floev[name]'),
        phoneNumber: localStorage.getItem('floev[phoneNumber]'),
      }
      const hatcheryOutput = await findHatcheryAndSession(hatcheryInput)
      hatchery.hatcheryId = hatcheryOutput.hatcheryId
      hatchery.currentSessionId = hatcheryOutput.currentSessionId
      setHatchery(hatchery)
    } else {
      const _sid = sessionStorage.getItem('_sid')
      let currentSessionId
      if (!_sid) {
        currentSessionId = await findCurrentSessionIdBy(hatcheryId, deviceId)
        hatchery.currentSessionId = currentSessionId
        setHatchery(hatchery)
      } else {
        currentSessionId = parseInt(_sid)
      }
    }
  }
  return hatchery
}

function createLava() {
  let lava = newLava()
  setHatchery(lava)
  axios.post(REQUEST_URL + '/hatchery/lava', lava)
    .then(() => {
      process.env.NODE_ENV === 'development'
        ? console.log("  createLava SUCCESS") : ''
    }).catch(err => {
      console.error("  createLava Error: " + err.message)
    })
  return lava
}

export function createEgg() {
  localStorage.removeItem('_uid')
  let egg = newEgg()
  setHatchery(egg)
  axios.post(REQUEST_URL + '/hatchery/egg', egg)
    .then(() => {
      process.env.NODE_ENV === 'development'
        ? console.log("  createEgg SUCCESS") : ''
    }).catch(err => console.error("  createEgg Error: " + err.message))
  return egg
}

export function createCreature() {
  let creature = newCreature()
  setHatchery(creature)
  axios.post(REQUEST_URL + '/hatchery/creature', creature)
    .then(() => {
      process.env.NODE_ENV === 'development'
        ? console.log("  createCreature SUCCESS") : ''
    }).catch(err => console.error("  createEgg Error: " + err.message))
  return creature
}

export function lavaTo(egg: Hatchery) {
  egg.status = ZERG.EGG
  setStatus(egg.status)
  axios.post(REQUEST_URL + '/hatchery/lava/egg', egg)
    .then(() => {
      process.env.NODE_ENV === 'development'
        ? console.log("  lavaToEgg SUCCESS") : ''
    }).catch(err => console.error("  lavaToEgg Error: " + err.message))
  return egg
}

export function eggTo(creature: Hatchery) {
  creature.status = ZERG.CREATURE
  setStatus(creature.status)
  axios.post(REQUEST_URL + '/hatchery/egg/creature', creature)
    .then(() => {
      process.env.NODE_ENV === 'development'
        ? console.log("  eggToCreature SUCCESS") : ''
    }).catch(err => console.error("  eggToCreature Error: " + err.message))
  return creature
}
