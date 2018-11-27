const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const indexRouter = require('./NavGationWeb-server/routes/index')
const fs = require('fs')
const app = express()
app.locals.pretty = true
const sqlite = require('sqlite')
const dbPromise = sqlite.open("./data/NavGationWeb.db", {Promise})
const schedule = require("node-schedule")
const  scheduleCronstyle = ()=>{
    schedule.scheduleJob('2 2 0 * * *',()=>{
        let ary = ["hotSpor", "startArticle", 
                   "digitalCurrency", "technicalArticle", 
                   "mediaSection", "expert", 
                   "platform", "agency",
                   "mining", "wallet", "community"]
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        ary.forEach(item => {
          db.run(`INSERT INTO click_${item} (date, clickSums) VALUES (?,?)`, 
                      `${year}-${month}-${day}`, 0)
        })
        
    })
}

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(cors())
app.use(express.json()) //解析json请求数据
app.use(express.urlencoded({ extended: false }))  //解析URL参数
app.use(cookieParser('pppasdqwkmcworpw'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'NavGationWeb-server')))
app.use('/upload', express.static(path.join(__dirname, 'upload')))

app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})



app.use(session({
  secret:"NavigationWeb-Server",
  saveUninitialized: false,
  resave : true,
  cookie : {
        maxAge : 1000 * 60, // 设置 session 的有效时间，单位毫秒
  },
}))

app.use('/', indexRouter)


app.get('*', async function(req, res, next) {      
  res.sendFile(path.join(__dirname, './NavGationWeb-server/index.html'))
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

;
(async () => {
  global.db = await dbPromise
  scheduleCronstyle() //定时任务
  app.listen(9090, () => console.log("9090端口监听成功！"))
})()


module.exports = app



