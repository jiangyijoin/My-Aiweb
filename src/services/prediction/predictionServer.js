import { request } from 'f-utils'

export async function predictionServer (params) {
  return request({
    url: "/api/v4/index/predictModel?sceneId=:sceneId&pageNo=:pageNo&limit=:limit",
    method: 'POST',
    data: params,
    headers: {"Content-Type":"application/x-www-form-urlencoded;text/html; charset=utf-8"}
  })
}

export async function queryMoldeSource (params) { //模型资源
  return request({
    url: "/api/v4/index/params?flag=:flag&sceneId=:sceneId",
    method: 'POST',
    data: params,
    headers: {"Content-Type":"application/x-www-form-urlencoded;text/html; charset=utf-8"}
  })
}

export async function queryScenes (params) { //场景
  return request({
    url: "/api/v4/index/AIScenesList?userName=:userName",
    method: 'GET',
    data: params,
  })
}

export async function predictHistory (params) { //预览历史
  return request({
    url: "/api/v4/index/predictHistory?forecastId=:forecastId&pageNo=:pageNo&limit=:limit",
    method: 'POST',
    data: params,
    headers: {"Content-Type":"application/x-www-form-urlencoded;text/html; charset=utf-8"}
  })
}

export async function resourceDownload (params) { //资源下载
  return request({
    url: "/api/v4/index/downloadFile?remotePath=:remotePath",
    method: 'POST',
    data: params,
    headers: {"Content-Type":"application/x-www-form-urlencoded;text/html; charset=utf-8"}
  })
}

export async function queryProcess (params) { //查询流程图
  return request({
    url: "/api/v4/index/processCmpts?processId=:processId",
    method: 'POST',
    data: params,
  })
}

export async function forecastProcess (params) { //预测测试
  return request({
    url: "/api/v4/index/forecastProcess?forecastId=:forecastId&userName=:userName&sourceId=:sourceId",
    method: 'POST',
    data: params,
    headers: {"Content-Type":"application/x-www-form-urlencoded;text/html; charset=utf-8"}
  })
}

export async function getForecastResult (params) { //预测测试结果
  return request({
    url: "/api/v4/index/getForecastResult?forecastId=:forecastId",
    method: 'GET',
    data: params,
    headers: {"Content-Type":"application/x-www-form-urlencoded;text/html; charset=utf-8"}
  })
}

export const downloadFileUrl = "/api/v4/index/downloadFile?remotePath="

