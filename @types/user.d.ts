interface User {
    id: string | undefined
    name: string | undefined
    email: string | undefined
    password: string | undefined
    phoneNumber: string | undefined
    gender: string | undefined
    birth: number | undefined
    status: string | undefined
    clickUpProfileId: string | undefined
    requests: PurchaseRequest[]
}

class UserInput {
    birth
    gender
    name
    phoneNumber
    constructor(birth: number, gender: string, name: string, phoneNumber: string) {
        this.birth = birth
        this.gender = gender
        this.name = name
        this.phoneNumber = phoneNumber
    }
}


class TempUser {
    tempUserId
    userId
    deviceId
    deviceType
    OS
    version
    platform
    ipAddress
    sessions
    currentEventId
    gender
    birth
    name
    phoneNumber
    status
    language
    country
    state
    city
    constructor(tempUserId: string, userId: string, deviceId: string, OS: string, version: string, platform: string, idAddress: string, sessions: string[], currentEventId: number, gender: string, birth: number, name: string, phoneNumber: string, status: string, language: string, country: string, state: string, city: string) {
        this.tempUserId = tempUserId
        this.userId = userId
        this.deviceId = deviceId
        this.deviceType = deviceType
        this.OS = OS
        this.version = version
        this.platform = platform
        this.ipAddress = this.ipAddress
        this.sessions = sessions
        this.currentEventId = currentEventId
        this.gender = gender
        this.birth = birth
        this.name = name
        this.phoneNumber = phoneNumber
        this.status = status
        this.language = language
        this.country = country
        this.state = state
        this.city = city
    }
}