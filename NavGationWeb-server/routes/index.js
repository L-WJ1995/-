const express = require('express')
const path = require('path')
const svgCaptcha = require('svg-captcha')
const fs = require('fs')
const router = express.Router()
const upload = require('./PictureSave.js')()

router.get('/LoginStatus', function(req, res, next) {      //登录中转
  if (req.signedCookies.LoginStatus) res.json({loginStatus:true})
  else res.json({loginStatus:false})
})

router.get('/captcha', function(req, res, next) {   //发送验证码
  let captcha = svgCaptcha.createMathExpr({noise:3, color:true, height:33.9, width:80,})
  req.session.captcha = captcha.text.toUpperCase()
  req.session.latsCaptchaTime = Date.now()
  console.log(req.session.captcha)
  console.log(req.session.latsCaptchaTime)
  res.type('svg')
  res.json({status:200, result:captcha.data, msg:"验证码"})
})

router.post('/logIn', async (req, res, next) => {     //管理员登录
  req.session.latsCaptchaTime = req.session.latsCaptchaTime || Date.now()
  if (Date.now() - req.session.latsCaptchaTime > 180000)  {
    console.log("验证码超时")
    return res.json({status:201, type:req.body.type, msg:"验证码超时"})
  }
  if (req.body.captcha !== req.session.captcha) {
    console.log("验证码错误")
    return res.json({status:202, type:req.body.type, msg:"验证码错误"})
  }

  let cookieConfig = req.body.keepLogin 
                    ? {maxAge: 60 * 1000 * 24 * 60 * 30, httpOnly: true, signed: true} 
                    : {httpOnly: true, signed: true}
                    
  if (req.body.username !== '1' || req.body.password !== '1') {
    return res.json({status:203, type:req.body.type, msg:"用户名或密码错误"})
  } else {
    res.cookie('LoginStatus', true, cookieConfig)
    req.session.login = true
    res.json({status:100, type:req.body.type, msg:"登陆成功"})
  }
})

router.post('/AcceptData', upload.single('file'), async function(req, res, next) {   //版块数据上传(数据修改)
  if (!req.signedCookies.LoginStatus) return res.json({loginStatus:false})
  let time = new Date().toLocaleString()
  let field, data 
  switch(req.body.type) {
    case 'hotSpor':
    case 'startArticle':
    case 'technicalArticle':
    case 'mediaSection':
      field = ['title', 'url', 'UpdateTime']
      if (req.body.upDataRow_status) {
        await db.run(`UPDATE ${req.body.type} SET ${field.join(" = ? ,")} = ? WHERE id = ?`,
                      req.body.title+'', req.body.URL+'', time+'', req.body.id - 0)
        data = await db.get(`SELECT * FROM ${req.body.type} WHERE id = ${req.body.id - 0}`)
      } else {
        await db.run(`INSERT INTO ${req.body.type} (${field.join()}) VALUES (?,?,?)`, 
                      req.body.title+'', req.body.URL+'', time+'')
        data = await db.get(`SELECT * FROM ${req.body.type} ORDER BY id DESC LIMIT 1`)
      }
      break;
    case 'digitalCurrency':
      field = ['title', 'url', 'UpdateTime', 'icoPath']
      if (req.body.upDataRow_status) {
        await db.run(`UPDATE ${req.body.type} SET ${field.join(" = ? ,")} = ? WHERE id = ?`,
                      req.body.title+'', req.body.URL+'', time+'', req.file ? req.file.path+'' : req.body.icon.slice(3), req.body.id - 0)
        data = await db.get(`SELECT * FROM ${req.body.type} WHERE id = ${req.body.id - 0}`)
      } else {
        await db.run(`INSERT INTO ${req.body.type} (${field.join()}) VALUES (?,?,?,?)`, 
                      req.body.title+'', req.body.URL+'', time+'', req.file.path+'')
        data = await db.get(`SELECT * FROM ${req.body.type} ORDER BY id DESC LIMIT 1`)  
      }
      break;
    case 'expert': 
      field = ['title', 'url', 'UpdateTime', 'imgPath', 'text']
      if (req.body.upDataRow_status) {
        await db.run(`UPDATE ${req.body.type} SET ${field.join(" = ? ,")} = ? WHERE id = ?`,
          req.body.title+'', req.body.URL+'', time+'', req.file ? req.file.path+'' : req.body.img.slice(3), req.body.text+'', req.body.id - 0)
        data = await db.get(`SELECT * FROM ${req.body.type} WHERE id = ${req.body.id - 0}`)
      } else {
        await db.run(`INSERT INTO ${req.body.type} (${field.join()}) VALUES (?,?,?,?,?)`, 
                      req.body.title+'', req.body.URL+'', time+'', req.file.path+'', req.body.text+'')
        data = await db.get(`SELECT * FROM ${req.body.type} ORDER BY id DESC LIMIT 1`)
      }
      break;
  } 
  let str = req.body.upDataRow_status ? "数据修改成功!" : "数据提交成功"
  res.json({status:2000,msg:str,data})
})

router.post('/DeleteData',  async function(req, res, next) {   //版块数据删除
  if (!req.signedCookies.LoginStatus) return res.json({loginStatus:false})
  let str = ''
  req.body.DelDate.forEach((item, index) => {
    if (index !== req.body.DelDate.length - 1) str += `id = ${item.id} OR `
    else  str += `id = ${item.id}`
  })
  await db.run(`DELETE FROM ${req.body.type} WHERE ${str}`) //这里就不确认真的删除了
  for(let item of req.body.DelDate) {
    for(let Path of item.Path) {
      if (Path) {
        let path = './' + Path.replace('/\\/g', '/')
        fs.unlink(path, () => console.log(path + '已删除'))
      }
    }
  }
  res.json({status:2001,msg:'版块数据删除成功'})
})

router.post('/subClick',  async function(req, res, next) {   //点击数据提交
  db.run(`UPDATE  clickBox SET clickSums = clickSums + 1 WHERE section = ?`, req.body.type[1])
  let id = await db.get(`SELECT id FROM click_${req.body.type[0]} ORDER BY id DESC LIMIT 1`)
  db.run(`UPDATE click_${req.body.type[0]} SET clickSums = clickSums + 1 WHERE id = ?`, id.id - 0)
  res.json({msg:'点击成功'})
})


router.get('/GetData/:type/:start/:num',  async function(req, res, next) {   //版块数据请求
  let datas = await Promise.all([db.get(`SELECT count(id) FROM ${req.params.type}`),
                                 db.all(`SELECT * FROM ${req.params.type} ORDER BY id DESC LIMIT ${req.params.num} OFFSET ${req.params.start}`)
                               ])
  res.json({status:2001,msg:'版块数据获取结果',count:datas[0], data:datas[1]})
})

router.get('/NavGetData/:type/:start/:num',  async function(req, res, next) {   //前端版块数据请求
  let datas = await db.all(`SELECT * FROM ${req.params.type} LIMIT ${req.params.num} OFFSET ${req.params.start}`)        
  res.json({status:2001,msg:'版块数据获取结果', data:datas})
})

router.get('/SearchData/:type/:title/:start/:num',  async function(req, res, next) {   //版块数据查询
  let datas = await db.all(`SELECT * FROM ${req.params.type} WHERE title like '%${req.params.title}%' COLLATE NOCASE ORDER BY id DESC `)
  data = datas.slice(req.params.start, (req.params.start - 0) + (req.params.num - 0))
  res.json({status:2001,msg:'版块数据查询结果', count:datas.length, data})
})

router.get('/GetClickData/:type/:section/:start/:num',  async function(req, res, next) {   //点击数据查询
  let datas
  if (req.params.type === 'sum') {
    datas = await db.all(`SELECT * FROM clickBox`)
    res.json({status:2002,msg:'点击数获取结果', count:datas.length, data:[...datas]})
  } else {
    let ary 
    if (req.params.section === 'all') {
      ary = ["hotSpor", "startArticle", 
             "digitalCurrency", "technicalArticle", 
             "mediaSection", "expert", 
             "platform", "agency",
             "mining", "wallet", "community"]
      ary.unshift(req.params.type)
      for (let i = 1; i < ary.length; i++) {
        if (ary[i] === req.params.type) {
          ary.splice(i, 1)
          break
        }
      }
    } else ary = req.params.types.split('-')
    datas = await Promise.all(ary.map(item => {
      return db.all(`SELECT * FROM click_${item} ORDER BY id DESC LIMIT ${req.params.num} OFFSET ${req.params.start}`)
    }))
    let data = []
    datas[0].forEach((item, index) => {
      let obj = {}
      obj.date = item.date
      datas.forEach((ite, ind) => {
        obj[ary[ind]] = ite[index].clickSums
      })
      data.push(obj)
    })
    res.json({status:2002,msg:'点击数获取结果', count:data.length, datas:{sections:ary, clickData:data}})
  }
})



router.get('/logOut', (req, res, next) => {  //退出登录
  req.session.login = false
  res.clearCookie('userID')
  res.json({status:100})
})


function user_error(req, res){
  req.session.login = false
  res.clearCookie('userID')
  res.redirect('/')
}

module.exports = router
