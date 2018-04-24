import { request } from 'f-utils'

export async function queryProjectServer (params) {
  return request({
    url:"/api/v4/index/ownProjectList",
    method: 'POST',
    data: params,
    headers: {"Content-Type":"application/x-www-form-urlencoded;text/html; charset=utf-8"}
  })
}

export async function queryProjectSource (params) { //项目资源
  return request({
    url:"/api/v4/index/params?flag=:flag&sceneId=:sceneId&userName=:userName",
    method: 'POST',
    data: params,
    headers: {"Content-Type":"application/x-www-form-urlencoded;text/html; charset=utf-8"}
  })
}

export async function queryScenes (params) { //场景
  return request({
    url:"/api/v4/index/AIScenesList?userName=:userName",
    method: 'GET',
    data: params,
  })
}

export async function remove (params) { //删除
  return request({
    url:"api/v4/index/deleteById",
    method: 'POST',
    data: params,
    headers: {"Content-Type":"application/x-www-form-urlencoded; text/html; charset=utf-8"}
  })
}

