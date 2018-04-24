import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from 'routes/common/app'

const { ConnectedRouter } = routerRedux

const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/common/error')
  });
  const cas = dynamic({
    app,
    models: () => [import('models/common/cas')],
    component: () => import('routes/common/cas'),
  });
  const routes = [{
    path: '/login',
    models: () => [import('models/common/login')],
    component: () => import('routes/common/login/'),
  },
    {
      path: '/dashboard',
      component: () => import('routes/dashboard/'),
    },
    {
      path: '/example',
      component: () => import('routes/example/'),
    },
    {
      path: '/dataSource',
      component: () => import('routes/dataSource/'),
      models: () => [import('models/dataSource/dataSource')]
    },
    {
      path: '/aiScene',
      component: () => import('routes/aiScene/'),
      models: () => [import('models/aiScene/aiScene')]
    },
    {
      path: '/aiTeach',
      component: () => import('routes/aiTeach/'),
      models: () => [import('models/aiTeach/aiTeach')]
    },
    /*{
      path: '/predictionModel',
      component: () => import('routes/predictionModel/'),
      models: () => [import('models/prediction/predictionModel')],
    },*/ // 废弃
    {
      path: '/prediction',
      component: () => import('routes/prediction/'),
      models: () => [import('models/prediction/predictionModel')],
    },
    {
      path: '/myProject',
      component: () => import('routes/myProject/'),
      models: () => [import('models/myProject/projectModel')],
    },
    {
      path: '/model',
      component: () => import('routes/model/'),
      models: () => [import('models/manager/model')],
    }
  ];

  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/dashboard" />)} />
          {
            routes.map(({ path, ...dynamics }, key) => (
              <Route key={key}
                     exact
                     path={path}
                     component={dynamic({
                       app,
                       ...dynamics,
                     })}
              />
            ))
          }
          <Route exact path="/cas" component={cas} />
          <Route component={error} />
        </Switch>
      </App>
    </ConnectedRouter>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
