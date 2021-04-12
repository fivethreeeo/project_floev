
interface SurveyProps {
    hatchery: Hatchery
    updateHatchery: (newHatchery: Hatchery) => void
    oldAnswers: Answers
    answersUpdate: (answers: Answers) => void
    currentStep: number
    max: number
    purchaseRequest: PurchaseRequest[]
    onPrev: (eventName: string) => void
    onNext: (eventName: string) => void
}

declare class PurchaseSurveyInput {
    hasWorn
    purposes
    purposeEtc
    painDegree
    painDegreeEtc
    painTypes
    painTypesEtc
    preferFrameColors
    preferFrameShapes
    preferLensShapes
    preferMoods
    size
    imageUrls

    constructor(hasWorn: number, purposes: string[], purposeEtc: string, painDegree: number, painDegreeEtc: string, painTypes: string[], painTypesEtc: string, preferFrameColors: string[], preferFrameShapes: string[], preferLensShapes: string[], preferMoods: string[], size: string, imageUrls: ImageUrls) {
        this.hasWorn = hasWorn
        this.purposes = purposes
        this.purposeEtc = purposeEtc
        this.painDegree = painDegree
        this.painDegreeEtc = painDegreeEtc
        this.painTypes = painTypes
        this.painTypesEtc = painTypesEtc
        this.preferFrameColors = preferFrameColors
        this.preferFrameShapes = preferFrameShapes
        this.preferLensShapes = preferLensShapes
        this.preferMoods = preferMoods
        this.size = size
        this.imageUrls = imageUrls
    }
}

declare class ImageUrls {
    preferUrls
    photoUrls
    constructor(preferUrls: string[], photoRequestUrls: string[]) {
        this.preferUrls = preferUrls
        this.photoUrls = photoRequestUrls
    }
}

interface EmailModal {
    visible: boolean
    onCancel: () => void
    testAgenda: string
}