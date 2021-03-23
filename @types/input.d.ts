
declare class MakeSurveyPurchaseRequestInput {
    userInput
    purchaseSurvey
    purchaseRequestInput
    authNumber
    constructor(userInput: UserInput, purchaseSurveyInput: PurchaseSurveyInput, purchaseRequestInput: PurchaseRequestInput, authNumber: string) {
        this.userInput = userInput
        this.purchaseSurvey = purchaseSurveyInput
        this.purchaseRequestInput = purchaseRequestInput
        this.authNumber = authNumber
    }
}