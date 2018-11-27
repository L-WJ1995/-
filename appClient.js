const createError = require('http-errors')
const express = require('express')
const path = require('path')
const app = express()
const sqlite = require('sqlite')
const indexRouter = require('./NavGationWeb-server/routes/index')
const dbPromise = sqlite.open("./data/NavGationWeb.db", {Promise})

app.use(express.json()) //解析json请求数据
app.use(express.urlencoded({ extended: false }))  //解析URL参数
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'NavGationWeb-client')))
app.use('/upload', express.static(path.join(__dirname, 'upload')))

app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})

app.use('/', indexRouter)

app.get('*', async function(req, res, next) {      
  res.sendFile(path.join(__dirname, './NavGationWeb-client/index.html'))
})

;(async () => {
  global.db = await dbPromise
  app.listen(8080, () => console.log("8080端口监听成功！"))
})()


module.exports = app



