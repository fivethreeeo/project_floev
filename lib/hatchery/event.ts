import axios from "axios"
import moment from "moment"
import { REQUEST_URL, utmInit } from './constants'
import DeviceDetector from 'device-detector-js'
const deviceDetector = new DeviceDetector();

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