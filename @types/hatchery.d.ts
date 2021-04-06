interface Hatchery {
    deviceId: string
    userId: string | null
    hatcheryId: string
    status: string
}

interface HatcheryEvent {
    sessionId: number
    eventId: number
    eventName: string
    eventTimestamp: string
}

interface PostData {
    hatchery: Hatchery
    event: HatcheryEvent
}