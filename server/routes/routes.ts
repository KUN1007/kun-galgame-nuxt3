import combineRoutes from 'koa-combine-routers'
import Router from 'koa-router'

// 加载目录中的Router中间件
const moduleFiles = require.context('./modules', true, /\.ts$/)

// reduce方法去拼接 koa-combine-router所需的数据结构 Object[]
const modules: Array<Router> = moduleFiles
  .keys()
  .reduce((items: Array<Router>, path: string) => {
    const value = moduleFiles(path)
    items.push(value.default)
    return items
  }, [])

export default combineRoutes(modules)
