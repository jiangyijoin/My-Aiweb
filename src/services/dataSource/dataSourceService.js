import { request } from 'f-utils'


export async function dataResourceList (params) {
  return request({
    url:"api/v4/index/dataResourceList",
    method: 'POST',
    data: params,
    headers: {"Content-Type":"application/x-www-form-urlencoded; text/html; charset=utf-8"}
  })
}

export async function deleteById (params) {
  return request({
    url:"api/v4/index/deleteById",
    method: 'POST',
    data: params,
    headers: {"Content-Type":"application/x-www-form-urlencoded; text/html; charset=utf-8"}
  })
}

export async function previewFileOnServer (params) {
  return request({
    url:"api/v4/index/previewFileOnServer",
    method: 'POST',
    data: params,
    headers: {"Content-Type":"application/x-www-form-urlencoded; text/html; charset=utf-8"}
  })
}
// export async function uploadFile (params) {
//   return request({
//     url:"api/v4/index/uploadFile",
//     method: 'POST',
//     data: params,
//     headers: {"Content-Type":"application/x-www-form-urlencoded; text/html; charset=utf-8"}
//   })
// }

export async function insertDataResource (params) {
  return request({
    url:"api/v4/index/insertDataResource",
    method: 'POST',
    data: params,
    headers: {"Content-Type":"application/x-www-form-urlencoded; text/html; charset=utf-8"}
  })
}

export async function AIScenesList (params) {
  return request({
    url:"api/v4/index/AIScenesList",
    method: 'GET',
    data: params,
  })
}

export async function params (params) {
  return request({
    url:"api/v4/index/params",
    method: 'POST',
    data: params,
  })
}

export async function previewFiles (params) {
  return request({
    url:"api/v4/index/previewFiles",
    method: 'POST',
    data: params,
    headers: {"Content-Type":"application/x-www-form-urlencoded; text/html; charset=utf-8"}
  })
}
//
// export async function previewExcellFile (params) {
//   return request({
//     url:"api/v4/index/previewExcellFile",
//     method: 'POST',
//     data: params,
//     headers: {"Content-Type":"application/x-www-form-urlencoded; text/html; charset=utf-8"}
//   })
// }

export async function systemDataSourcePath (params) {
  return request({
    url:"api/v4/index/systemDataSourcePath",
    method: 'POST',
    data: params,
    headers: {"Content-Type":"application/x-www-form-urlencoded; text/html; charset=utf-8"}
  })
}

export const downloadFileUrl = "/api/v4/index/downloadFile?remotePath="

export const uploadFile = "/api/v4/index/uploadFile"

export  async function repeatName (params) {
  return request({
    url:"api/v4/index/repeatName",
    method: 'POST',
    data: params,
    headers: {"Content-Type":"application/x-www-form-urlencoded; text/html; charset=utf-8"}
  })
}
