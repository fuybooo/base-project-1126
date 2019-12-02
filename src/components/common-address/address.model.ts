export interface Address {
  area: string[]
  areaObj: {
    provinceCode: string
    provinceName: string
    cityCode?: string
    cityName?: string
    countyCode?: string
    countyName?: string
  },
  detail: string
}

export function formatAddress (address: Address) {
  return `${ address.areaObj.provinceName }${ address.areaObj.cityName || '' }${ address.areaObj.countyName || '' }${ address.detail }`
}

// tslint:disable-next-line:ban-types
export function addressRequiredFn (rule: any, value: any, callback: Function) {
  if (!value) {
    callback(new Error('必填项'))
  } else if (!value.detail || !value.area || !value.area.length) {
    callback(new Error('必填项'))
  } else {
    callback()
  }
}

export const addressRequiredRuleProp = {
  formItemProps: {
    rules: [
      { validator: addressRequiredFn, trigger: [ 'change', 'blur' ] },
    ],
  },
}
