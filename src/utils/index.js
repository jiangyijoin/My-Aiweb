
import config from './config'
import uuid from 'node-uuid'
//驼峰转换法
function camelCase(s){return s.replace(/_([\da-z])/gi, function(all, letter) {return letter.toUpperCase();})}
const getFileType = (filename) => /\.xls(x?)$/i.test(filename) ? 'EXCEL' : /\.csv$/i.test(filename) ? 'CSV' : 'OTHER'

export {
  config,
  uuid,
  camelCase,
  getFileType
}
