const {config} = require('./common')
const Mock = require('mockjs')

const {apiPrefix} = config

const data1 = Mock.mock({
  'data|10':[{
    "id|+1": 1,
    "createTime": "@date(yyyy-MM-DD HH:mm:ss)",
    "kind": "0",
    "name": "@last",
    "nameCn": "@cname",
    "order": "@integer",
    "status": "1",
    "parentId": "",
    "url": "/first"
  }]
});

const data2 = Mock.mock({
  'data|20':[{
    "id|+1": 100,
    "createTime": "@date(yyyy-MM-DD HH:mm:ss)",
    "kind": "0",
    "name": "@last",
    "nameCn": "@cname",
    "order": "@integer",
    "status": "1",
    "parentId|1-10": 1,
    "url": "/@first"
  }]
})

const data3 = Mock.mock({
  'data|30':[{
    "id|+1": 200,
    "createTime": "@date(yyyy-MM-DD HH:mm:ss)",
    "kind": "0",
    "name": "@last",
    "nameCn": "@cname",
    "order": "@integer",
    "status": "1",
    "parentId|100-120": 1,
    "url": "/@first"
  }]
})

const data = {
  data: data1.data.concat(data2.data).concat(data3.data).concat([{
    id:"009",
    name:'dashboard',
    nameCn:'主页',
    url:'/dashboard'
  },{
    id:"020",
    name:'server232',
    nameCn:'232服务器',
    server:'http://10.8.132.221:8026',
    url:'/group'
  },{
    id:"010",
    name:'example',
    nameCn:'样例',
    url:'/example'
  }]).map(item => {
    item.id = item.id+""; item.parentId&&(item.parentId = item.parentId+"");
    return item;
  })
}

module.exports = {
  [`GET ${apiPrefix}/resources`] (req, res) {
    res.status(200).json({
      code: 1000,
      msg: '请求成功',
      data: data.data
    })
  },

  [`GET ${apiPrefix}/users/username/:username/resources`] (req, res) {
    res.status(200).json({
      code: 1000,
      msg: '请求成功',
      data: data.data
    })
  }
}
