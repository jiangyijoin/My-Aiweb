import { request } from 'f-utils'
import config from 'config'
//菜单从资源菜单导出
const { api:{user:{resources:menus}} } = config

export async function query (params) {
  return request({
    url: menus,
    method: 'get',
    data: params,
  })
}
