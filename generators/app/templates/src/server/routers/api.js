import Router from 'koa-router'

import mockData from './../../../mock/mock.json'

let apiRouter = new Router({
  prefix: '<%= baseRoute %>/api'
})

apiRouter
  .get('/mockData', async function (ctx) {
    ctx.body = mockData
  })

export default apiRouter
