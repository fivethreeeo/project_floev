interface Hatchery {
    deviceId: string
    userId: string | null
    hatcheryId: string
    status: string
    currentSessionId: number
    birth: number | null
    gender: string | null
    name: string | null
    phoneNumber: string | null
}

interface HatcheryEvent {
    sessionId: number
    eventId: number
    eventName: string
    eventTimestamp: string
    status: string
}

interface Utm {
    utm_source: string | string[] | undefined
    utm_medium: string | string[] | undefined
    utm_campaign: string | string[] | undefined
    utm_term: string | string[] | undefined
    utm_content: string | string[] | undefined
}

interface PostData {
    hatchery: Hatchery
    event: HatcheryEvent
    device: any
    // ipAddress: string
    utm: Utm
}