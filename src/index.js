import { message } from 'antd'
import dva from 'dva'
import createLoading from 'dva-loading'
import createHistory from 'history/createBrowserHistory'
import 'firebrand-component/dist/main.css'

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  history: createHistory(),
  onError (error) {
    message.error(`INDEX ERROR : ${error.message} ${JSON.stringify(error)}`)
  },
})

// 2. Model
app.model(require('models/common/app'))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')
