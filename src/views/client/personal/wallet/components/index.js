import { timeFormat } from "@/util/index"


export function getMonths() {
  return ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
}

export function getYears() {
  let currentYear = parseInt(timeFormat(new Date(), 'yyyy'));
  let res = [];
  for (let i = 0; i < 20; i++) {
    res.push(currentYear + i)
  }
  return res
}
