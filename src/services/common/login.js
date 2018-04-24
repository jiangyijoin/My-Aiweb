import { request } from 'f-utils'
import config from 'config'

const { api: {login: {login: userLogin }} } = config

export async function login (data) {
  return request({
    url: userLogin,
    method: 'post',
    data,
  })
}
