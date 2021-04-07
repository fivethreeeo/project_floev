interface User {
    id: string
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