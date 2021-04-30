
class HatcheryImpl implements Hatchery {
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

export default HatcheryImpl