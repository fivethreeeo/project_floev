import { LOUNGE } from '../lib/constants'

export function availablePurchaseRequestTime(targetDate: string, targetLounge: number, inputTime: PurchaseRequest[]) {
    // 해당 날짜에 예약된 스케쥴 골라내기
    const occupiedTimeArray: PurchaseRequest[] = inputTime.filter((item: PurchaseRequest) => item.date.slice(0, 10) === targetDate && item.loungeCode === targetLounge)

    // 시간 발라내기
    let occupiedTime: string[] = []
    occupiedTimeArray.forEach(item => {
        occupiedTime.push(item.date.slice(11, 16))
    })

    let dupCheck = (arr: string[]) => arr.filter((item, index) => arr.indexOf(item) != index)

    let nonOccupiedList: Slot[] = [] // initialize
    if (targetLounge === LOUNGE.GANGNAM) {
        let occupiedTimeToRemove = dupCheck(occupiedTime)

        for (let i = 11; i < 21; i++)
            nonOccupiedList.push({ time: (i.toString() + ":00"), loungeCode: LOUNGE.GANGNAM })

        nonOccupiedList = nonOccupiedList.filter(item => !occupiedTimeToRemove.includes(item.time))
    } else if (targetLounge === LOUNGE.YEUKSAM) {
        nonOccupiedList = [
            { time: "11:00", loungeCode: LOUNGE.YEUKSAM },
            { time: "12:00", loungeCode: LOUNGE.YEUKSAM },
            { time: "14:30", loungeCode: LOUNGE.YEUKSAM },
            { time: "15:30", loungeCode: LOUNGE.YEUKSAM },
            { time: "16:30", loungeCode: LOUNGE.YEUKSAM },
            { time: "18:30", loungeCode: LOUNGE.YEUKSAM },
            { time: "19:30", loungeCode: LOUNGE.YEUKSAM }
        ]
        nonOccupiedList = nonOccupiedList.filter(item => !occupiedTime.includes(item.time))
    }
    return nonOccupiedList
}

export function availablePickupFittingRequestTime(targetDate: string, loungeCode: number, purchaseRequest: PickupRequest[]) {
    // 인자로 받은 스케쥴에서 예약하고자 하는 날짜에 해당하는 일정만 받아옴
    let occupiedTimeArray = purchaseRequest.filter(schedule =>
        (schedule.date.slice(0, 10) === targetDate) && (schedule.lounge === loungeCode))

    //그 일정에서 시간만 뽑아냄
    let occupiedTime: any[] = []
    occupiedTimeArray.forEach(element =>
        occupiedTime.push(element.date.slice(11, 16)))

    // 라운지별 전체 시간 초기화
    let nonOccupiedList: any[] = []
    if (loungeCode === 1) {
        nonOccupiedList = [
            { label: "11:31", value: "11:30" },
            { label: "12:31", value: "12:30" },
            { label: "15:01", value: "15:00" },
            { label: "16:01", value: "16:00" },
            { label: "17:01", value: "17:00" },
            { label: "19:01", value: "19:00" },
            { label: "20:01", value: "20:00" }
        ]
    } else if (loungeCode === 2) {
        nonOccupiedList = [
            { label: "11:01", value: "11:00" },
            { label: "11:31", value: "11:30" },
            { label: "12:01", value: "12:00" },
            { label: "12:31", value: "12:30" },
            { label: "13:01", value: "13:00" },
            { label: "13:31", value: "13:30" },
            { label: "14:01", value: "14:00" },
            { label: "14:31", value: "14:30" },
            { label: "15:01", value: "15:00" },
            { label: "15:31", value: "15:30" },
            { label: "16:01", value: "16:00" },
            { label: "16:31", value: "16:30" },
            { label: "17:01", value: "17:00" },
            { label: "17:31", value: "17:30" },
            { label: "18:01", value: "18:00" },
            { label: "18:31", value: "18:30" },
            { label: "19:01", value: "19:00" },
            { label: "19:31", value: "19:30" },
            { label: "20:01", value: "20:00" }
        ]
    }
    // 전체시간에서 예약된 시간 제거함
    nonOccupiedList = nonOccupiedList.filter(item => !occupiedTime.includes(item.label))

    return nonOccupiedList
}

export const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export const resetSurvey = () => {
    if (process.browser) {
        localStorage.removeItem('floev[currentStep]')
        localStorage.removeItem('floev[customer]')
        localStorage.removeItem('floev[birth]')
        localStorage.removeItem('floev[gender]')
        localStorage.removeItem('floev[hasWorn]')
        localStorage.removeItem('floev[purposes]')
        localStorage.removeItem('floev[purposeEtc]')
        localStorage.removeItem('floev[painDegree]')
        localStorage.removeItem('floev[painDegreeEtc]')
        localStorage.removeItem('floev[painTypes]')
        localStorage.removeItem('floev[painTypesEtc]')
        localStorage.removeItem('floev[prefer]')
        localStorage.removeItem('floev[size]')
        localStorage.removeItem('floev[loungeCode]')
        localStorage.removeItem('floev[requestDate]')
        localStorage.removeItem('floev[requestTime]')
        localStorage.removeItem('floev[name]')
        localStorage.removeItem('floev[phoneNumber]')
    }
}