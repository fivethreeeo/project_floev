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

export enum CUSTOMER {
  SELF,
  WITH,
  OTHER
}

export enum PAINDEGREE {
  NEVER,
  SOMETIMES,
  OFTEN,
  ALWAYS,
  NOIDEA
}

export enum HASWORN {
  YES,
  NO
}

export const drone: Hatchery = {
  deviceId: '',
  userId: '',
  hatcheryId: '',
  currentSessionId: 0,
  status: '',
  birth: 0,
  gender: '',
  name: '',
  phoneNumber: ''
}

export const utmInit = {
  utm_source: undefined,
  utm_medium: undefined,
  utm_campaign: undefined,
  utm_term: undefined,
  utm_content: undefined
}

export const EVENT = {
  INDEX: {
    PAGE: "Loaded index page",
    CTA: {
      TOP: "상단 CTA 클릭",
      BOTTOM: "하단 CTA 클릭",
    },
  },
  SURVEY: {
    PAGE: "Loaded survey page",
    FROM_MIDDLE: "이어서 작성할게요",
    FROM_START: "처음부터 할게요",
    Q0: { START: "q0 start - 시작하기" },
    Q1: { NEXT: "q1 customer - 다음", PREV: "q1 customer - 이전" },
    Q2: { NEXT: "q2 customerWith - 다음", PREV: "q2 customerWith - 이전" },
    Q3: { PREV: "q3 customerOther - 이전" },
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
      REAUTH: "q13 namePhone - 재전송", FINISH: "q13 namePhone - 인증하고 예약완료하기",
      DUP: "q13 시간 중복으로 q12로 이동"
    },
  }
}

export const ZERG = {
  LAVA: "lava",
  EGG: "egg",
  CREATURE: "creature"
}

export const NEW_SERVICE = {
  BUY_NOW_PAY_LATER: "BUY_NOW_PAY_LATER",
  DELIVERY: "DELIVERY",
  INSURANCE: "INSURANCE",
  MEMBERSHIP: "MEMBERSHIP",
  REFURBISH: "REFURBISH",
  SUBSCRIPTION: "SUBSCRIPTION",
  TOGETHER_PLAN: "TOGETHER_PLAN",
  TRADE_IN: "TRADE_IN"
}

const NEW_SERVICE_ARRAY = ["BUY_NOW_PAY_LATER", "DELIVERY", "INSURANCE", "MEMBERSHIP", "REFURBISH", "SUBSCRIPTION", "TOGETHER_PLAN", "TRADE_IN"]

const NEW_SERVICE_NAME = ["약정구매", "택배점검", "파손보험", "멤버십", "리퍼비시", "구독", "결합할인", "단순변심보장"]

export function getNewServiceName(newService: string) {
  const isThatService = (element: string) => element === newService
  const index = NEW_SERVICE_ARRAY.findIndex(isThatService)
  const newServiceName = NEW_SERVICE_NAME[index]
  return newServiceName
}

