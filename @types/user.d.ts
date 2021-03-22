declare interface User {
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