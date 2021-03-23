declare interface Answers {
    customer: number // 0: 본인, 1: 동행, 2: 타인
    birth: number
    gender: string
    hasWorn: number // 1: yes(쓰고 있음), 2: no(쓴적 없음)
    purposes: string[]
    purposeEtc: string
    painDegree: number, painDegreeEtc: string
    painTypes: string[], painTypesEtc: string
    preferFrameColors: string[]
    preferFrameShapes: string[]
    preferLensShapes: string[]
    preferMoods: string[]
    prefer: string
    preferFileList: UploadFile[]
    preferFileNameList: string[]
    photoFileList: UploadFile[]
    photoFileNameList: string[]
    size: string
    loungeCode: number
    requestDate: string
    requestTime: string
    name: string
    phoneNumber: string
    authNumber: string
}

declare interface Slot {
    time: string
    loungeCode: number
}