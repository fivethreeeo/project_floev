import { getMDW } from './timeFormat'
import moment from 'moment'

export function availableDate(period: number) {
    let nonWorkingDateList = [
        '2020-01-25'
    ]
    let availableDateList = []
    for (let i = 0; i <= period; i++) {
        let tempTime = moment(Date.now() + i * 24 * 60 * 60 * 1000).format().slice(0, 10)
        availableDateList.push({ label: getMDW(tempTime), value: tempTime })
    }

    availableDateList = availableDateList.filter(item => !nonWorkingDateList.includes(item.value))

    return availableDateList
}

export function availableTime(targetDate: string, loungeCode: number, inputTime: Schedule[]) {
    const occupiedTimeArray: Schedule[] = inputTime[0].filter((item: Schedule) => item.date.slice(0, 10) === targetDate && item.lounge === loungeCode)
    let occupiedTime: any[] = []
    occupiedTimeArray.forEach(element => {
        occupiedTime.push(element.date.slice(11, 16))
    })
    let dupCheck = (arr: any[]) => arr.filter((item, index) => arr.indexOf(item) != index)
    if (loungeCode === 2) {
        let occupiedTimeToRemove = dupCheck(occupiedTime)
        let nonOccupiedList = [
            { label: "11:00 ~ 12:00", value: "11:00" },
            { label: "12:00 ~ 13:00", value: "12:00" },
            { label: "13:00 ~ 14:00", value: "13:00" },
            { label: "14:00 ~ 15:00", value: "14:00" },
            { label: "15:00 ~ 16:00", value: "15:00" },
            { label: "16:00 ~ 17:00", value: "16:00" },
            { label: "17:00 ~ 18:00", value: "17:00" },
            { label: "18:00 ~ 19:00", value: "18:00" },
            { label: "19:00 ~ 20:00", value: "19:00" },
            { label: "20:00 ~ 21:00", value: "20:00" }
        ]
        nonOccupiedList = nonOccupiedList.filter(item => !occupiedTimeToRemove.includes(item.value))
        return nonOccupiedList
    } else if (loungeCode === 1) {
        let nonOccupiedList = [
            { label: "11:00 ~ 12:00", value: "11:00" },
            { label: "12:00 ~ 13:00", value: "12:00" },
            { label: "14:30 ~ 15:30", value: "14:30" },
            { label: "15:30 ~ 16:30", value: "15:30" },
            { label: "16:30 ~ 17:30", value: "16:30" },
            { label: "18:30 ~ 19:30", value: "18:30" },
            { label: "19:30 ~ 20:30", value: "19:30" }
        ]
        nonOccupiedList = nonOccupiedList.filter(item => !occupiedTime.includes(item.value))
        return nonOccupiedList
    }
}
export function availableHalfTime(targetDate: string, loungeCode: number, schedules: Schedule[]) {
    // 인자로 받은 스케쥴에서 예약하고자 하는 날짜에 해당하는 일정만 받아옴
    let occupiedTimeArray = schedules.filter(schedule =>
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