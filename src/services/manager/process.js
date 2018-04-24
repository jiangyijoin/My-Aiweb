import { request } from 'f-utils'

export async function queryProcess (params) { //查询流程图
  return request({
    url: "/api/v4/index/processCmpts?processId=:processId",
    method: 'GET',
    data: params,
  })
}

export async function publishProcess (params) { //发布流程图
  const { userName, processId, forecastName, data = {} } = params;
  return request({
    url: "/api/v4/index/publishProcess?userName="+userName+"&processId="+processId+"&forecastName="+forecastName,
    method: 'POST',
    data: {...data},
    params: {}
  })
}

export async function saveProcess (params) { //保存流程图(另存为)
  return request({
    url: "/api/v4/index/saveProcess",
    method: 'POST',
    data: params,
    params: {}
  })
}

export async function updateProcess (params) { //更新流程图
  return request({
    url: "/api/v4/index/updateProcess",
    method: 'POST',
    data: params,
    params: {}
  })
}

export async function forecastProcess (params) { //模型预测
  return request({
    url: "/api/v4/index/forecastProcess?processId=:processId",
    method: 'POST',
    data: params,
  })
}

export async function runProcess (params) { //运行流程图
  return request({
    url: "/api/v4/index/runProcess?processId=:processId",
    method: 'GET',
    data: params,
  })
}

export async function getProcessResult (params) { //获取流程图运行结果
  return request({
    url: "/api/v4/index/getProcessResult?processId=:processId",
    method: 'GET',
    data: params,
  })
}

export async function previewPicture (params) { //预览图片
  return request({
    url: "/api/v4/index/previewPicture?path=:path",
    method: 'GET',
    data: params,
  })
}

export async function previewFiles (params) { //预览文件
  return request({
    url: "/api/v4/index/previewFiles",
    method: 'POST',
    data: params,
  })
}

export async function pageParams (params) { //查询参数
  return request({
    url: "/api/v4/index/params",
    method: 'POST',
    data: params,
  })
}

export const previewPictureUrl = "/api/v4/index/previewPicture"
