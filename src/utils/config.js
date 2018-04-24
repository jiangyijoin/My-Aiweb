const MOCK_PFX = '/mock'
const API_V2 = '/api/v2'
const API_LOGIN = '/api/login'

module.exports = {
  name: '人工智能云平台',
  prefix: 'eastcom',
  footerText: '© 2018 杭州东方通信软件技术有限公司  地址：浙江省杭州市西湖区文三路398号东信大厦9楼',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  openPages: ['/error', '/cas'],
  apiPrefix: MOCK_PFX,
  MOCK_PFX,
  API_V2,
  loginUrlDef: '/login',
  sso:{
    enable: false ,
    loginUrl: 'http://10.8.132.163:8283/login',
    logoutUrl: 'http://10.8.132.163:8283/logout',
  },
  api: {
    login: {
      // login: `${MOCK_PFX}/user/login`,
      // logout: `${MOCK_PFX}/user/logout`
      login: `${API_LOGIN}/login`,
      logout: `${API_LOGIN}/user/logout`
    },
    user: {
      users: `${API_V2}/users`,
      user: `${API_V2}/users/username/token`,
      resources:`${API_V2}/users/username/:username/resources`
    },
    resource:{
      resource: `${API_V2}/resources`
    }
  },
};
