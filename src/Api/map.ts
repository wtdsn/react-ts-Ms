import request, { axiosPromise } from '@/utils/request'


interface mapdata {
  features: any,
  type: string
}
export function getMap(adcode: string | number): axiosPromise<mapdata> {
  //  台湾没有 full
  let isTW = adcode === 710000

  return request({
    url: `https://geo.datav.aliyun.com/areas_v3/bound/${adcode}${isTW ? '' : '_full'}.json`
  })
}