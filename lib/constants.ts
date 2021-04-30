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

