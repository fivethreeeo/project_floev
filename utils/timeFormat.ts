import moment from 'moment'
const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']

function getDay(dayNumber: number) {
    const week = ['일', '월', '화', '수', '목', '금', '토']
    return week[dayNumber]
}

export function getWeekday(date: string) {
    return week[moment(date.slice(0, 10)).day()]
}

export function getOnlyDate(date: string) {
    if (date[8] === '0') {
        return date[9]
    } else {
        return date.slice(8, 10)
    }
}

export function getYMDW(date: string) {
    return date.slice(0, 4) + '년 ' + date.slice(5, 7) + '월 ' + date.slice(8, 10) + '일 ' + week[moment(date.slice(0, 10)).day()]
}

export function getMDW(date: string) {
    const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
    //return date.slice(5,7)+'월 '+date.slice(8,10)+'일 '+ week[moment(date.slice(0,10)).day()]
    // 2020.5.11 상범 임시 수정, 05월 -> 5월 로 보이게 임시 수정
    let month: string = ''
    let day: string = ''
    if (date.charAt(5) === '0') {
        month = date.slice(6, 7) + '월 '
    } else {
        month = date.slice(5, 7) + '월 '
    }
    if (date.charAt(8) === '0') {
        day = date.slice(9, 10) + '일 '
    } else {
        day = date.slice(8, 10) + '일 '
    }
    return month + day + week[moment(date.slice(0, 10)).day()]
}

export function get12hours(time: string) {
    if (parseInt(time.slice(0, 2)) > 12) {
        return '오후 ' + (parseInt(time.slice(0, 2)) - 12).toString() + time.slice(2, 5)
    } else if (parseInt(time.slice(0, 2)) === 12) {
        return '오후 ' + time
    } else {
        return '오전 ' + time
    }
}

export function getDayDate(period: number, from: number) {
    let timeData = []
    for (let i = from; i <= period; i++) {
        let now = moment().add(i * 24 - 8, 'hours').format()
        let now2 = moment().add(i * 24 - 8, 'hours').day()
        let temp = { date: "", day: "" }
        temp['date'] = now.slice(0, 4) + '-' + now.slice(5, 7) + '-' + now.slice(8, 10)
        temp['day'] = getDay(now2)
        timeData.push(temp)
    }
    return timeData
}

export function getHour(time: string) {
    if (parseInt(time.slice(11, 13)) > 12) {
        return '오후 ' + (parseInt(time.slice(11, 13)) - 12).toString() + ":" + time.slice(14, 16) + ""
    } else if (parseInt(time.slice(0, 2)) === 12) {
        return '오후 ' + (parseInt(time.slice(11, 13))).toString() + ":" + time.slice(14, 16) + ""
    } else {
        return '오전 ' + (parseInt(time.slice(11, 13))).toString() + ":" + time.slice(14, 16) + ""
    }
}

export function dayGap(targetDay: string, currentDay = moment().format('YYYY-MM-DD')) {
    return moment([targetDay.slice(0, 4), parseInt(targetDay.slice(5, 7)) - 1, targetDay.slice(8, 10)]).diff(moment([currentDay.slice(0, 4), parseInt(currentDay.slice(5, 7)) - 1, currentDay.slice(8, 10)]), 'days')
}