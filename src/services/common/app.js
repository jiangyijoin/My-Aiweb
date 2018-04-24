import { request } from 'f-utils'
import config from 'config'

const { api:{ user:{resources: userResources, user:userToken} } } = config;

export async function user (params) {
  return request({
    url: userToken,
    method: 'get',
    data: params,
  })
}

export async function query (params) {
  return request({
    url: userResources,
    method: 'get',
    data: params,
  })
}
