import { request } from 'f-utils'


export async function AIScenesList (params) {
  return request({
    url:"api/v4/index/AIScenesList?userName=SYSTEM",
    method: 'GET'
  })
}

export async function test (params) {
  return request({
    url:"api/v4/index/AIScenesList?userName=SYSTEM",
    method: 'POST',
    data: params,
    headers: {"Content-Type":"application/x-www-form-urlencoded; text/html; charset=utf-8"}
  })
}
