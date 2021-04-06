interface Hatchery {
    deviceId: string
    userId: string | null
    hatcheryId: string
    status: string
    currentSessionId: number
    birth: number | null
    gender: string | null
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
    device: any
    // ipAddress: string
}