export enum REQUEST {
    PURCHASE,
    TRIAL,
    PICKUP,
    FITTING,
    CARE,
    REPAIR
}

export enum LOUNGE {
    INIT,
    YEUKSAM,
    GANGNAM
}

export enum PAINDEGREE {
    NEVER,
    SOMETIMES,
    OFTEN,
    ALWAYS,
    NOIDEA
}

export const zerg: Hatchery = {
    deviceId: '',
    userId: '',
    hatcheryId: '',
    status: ''
}

export const EVENT = {
    LOADED_A_PAGE: "Loaded a page",
    CTA: {
        TOP: "상단 CTA 클릭",
        BOTTOM: "하단 CTA 클릭",
    },
    SURVEY: {
        FROM_MIDDLE: "이어서 작성할게요",
        FROM_START: "처음부터 할게요",
        Q0: { START: "q0 start - 시작하기" },
        Q1: { NEXT: "q1 customer - 다음", PREV: "q1 customer - 이전" },
        Q2: { NEXT: "q2 customerWith - 다음", PREV: "q2 customerWith - 이전" },
        Q4: { NEXT: "q4 birthGender - 다음", PREV: "q4 birthGender - 이전" },
        Q5: { NEXT: "q5 hasworn - 다음", PREV: "q5 hasworn - 이전" },
        Q6: { NEXT: "q6 purposes - 다음", PREV: "q6 purposes - 이전" },
        Q7: { NEXT: "q7 painDegree - 다음", PREV: "q7 painDegree - 이전" },
        Q8: { NEXT: "q8 painTypes - 다음", PREV: "q8 painTypes - 이전" },
        Q9_1: { NEXT: "q9_1 color - 다음", PREV: "q9_1 color - 이전" },
        Q9_2: { NEXT: "q9_2 frameShape - 다음", PREV: "q9_2 frameShape - 이전" },
        Q9_3: { NEXT: "q9_3 lensShape - 다음", PREV: "q9_3 lensShape - 이전" },
        Q9_4: { NEXT: "q9_4 mood - 다음", PREV: "q9_4 mood - 이전" },
        Q9_5: { NEXT: "q9 prefer - 다음", PREV: "q9 prefer - 이전" },
        Q10: { NEXT: "q10 photo - 다음", PREV: "q10 photo - 이전" },
        Q11: { NEXT: "q11 size - 다음", PREV: "q11 size - 이전" },
        Q12: { NEXT: "q12 request - 다음", PREV: "q12 request - 이전" },
        Q13: {
            PREV: "q13 namePhone - 이전", AUTH: "q13 namePhone - 인증번호 전송",
            REAUTH: "q13 namePhone - 재전송", FINISH: "q13 namePhone - 인증하고 예약완료하기"
        },
    }
}

export const ZERG = {
    LAVA: "lava",
    EGG: "egg",
    CREATURE: "creature"
}