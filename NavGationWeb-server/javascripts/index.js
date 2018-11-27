function getLogin() {
  return axios.get('/LoginStatus').then((res) => {
    this.$store.commit('setLoginStatus', res.data.loginStatus)
    return res.data.loginStatus
  })
}


function getCaptcha() {
  axios('/captcha').then((res) => $("#captcha_img").empty().append(res.data.result))
}


function logIn(userData, self) {
  if (!input_judge(userData, self)) return
  return axios({
    method:'post',
    url:'/logIn',
    data:{
      username:userData.username + "",
      password:userData.password + "",
      captcha:userData.captcha.toUpperCase() + "",
      keepLogin:userData.keepLogin,
      type:"logIn",
    }
  })
}

function input_judge(userData, self) {
  if (userData.username != "" && userData.password != "" && userData.captcha != "") return true 
  let modelObj = {title:'错误！', text:'', class:{"btn":true,
                                            "btn-block":true,
                                            "btn-warning":true,
                                            "btn-success":false,}
      }
 self.captcha = ""
 if (userData.username === "" || userData.password === "") modelObj.text = '用户名或密码不能为空！'
 else modelObj.text = '验证码不能为空！'
 self.$store.commit('setModalText', modelObj)
 modal_status()
 return false 
}

function res_status(data, self) {
  if ('loginStatus' in data) {
    self.dialogClosed()
    self.$message({
      showClose: true,
      duration:1000,
      message: '未登录,无法操作！',
      type: 'error',
    });
    setTimeout(() => {
      self.$store.commit('setLoginStatus', data.loginStatus)
      self.$router.push('/')    
    },1000)
    return
  }
  let modelObj = {title:'', text:'', class:{"btn":true,
                                            "btn-block":true,
                                            "btn-warning":true,
                                            "btn-success":false,}
      }
  switch(data.status) {
    case 100: {
      modelObj.title = modelObj.text = '登陆成功！'
      modelObj.class = {"btn":true, "btn-block":true, "btn-warning":false, "btn-success":true,}
      self.$store.commit('setLoginStatus', true)
      self.$router.push('/home')
      self.password = self.captcha = ""
      break
    }

    case 201: {
      getCaptcha()
      modelObj.title = '登陆失败！' 
      modelObj.text = '验证码超时！'
      self.password = self.captcha = ""
      break
    }

    case 202: {
      getCaptcha()
      modelObj.title = '登陆失败！' 
      modelObj.text = '验证码错误！'
      self.password = self.captcha = ""
      break
    }

    case 203: {
      modelObj.title = '登陆失败！' 
      modelObj.text = '用户名或密码错误！'
      self.username = self.password = self.captcha = ""
      break
    }    

    case 2000: {
      self.isLoading = false
      self.$message({
        showClose: true,
        duration:3000,
        message: data.msg,
        type: 'success',
      });
      if (self.upDataRow_status) {
        for (let i = 0; i < self.NavData.length; i++) {
          if (self.NavData[i].id === data.data.id) {
            self.NavData.splice(i, 1, data.data)
            self.isVisible = false
            break
          }
        }
      } else {
        self.count += 1
        self.NavData.push(data.data)
      }
      self.dialogClosed()
      return
    }   

    case 2001: {
      self.$message({
        showClose: true,
        duration:3000,
        message: '删除成功！',
        type: 'success',
      });
      self.multipleSelection = []
      self.isSub = false
      self.getData()
      return
    }  
  }

  self.$store.commit('setModalText', modelObj)
  $(".bs-example-modal-sm").modal("show")
  modal_status()
}






function modal_status() {
  $(".bs-example-modal-sm").modal("show")
  let modal_ID = setTimeout(() => {
    $(".bs-example-modal-sm").modal("hide")
  }, 1000)
  $(".bs-example-modal-sm").on("hidden.bs.modal", () => {
    clearTimeout(modal_ID)
    $(".bs-example-modal-sm").off("hidden.bs.modal")
  })
}



function submitData() {
  let self = this
  if (!submitData_judge.bind(this)()) {
    this.$message({
      showClose: true,
      duration:2000,
      message: '有选项未填写,请填写完整再次提交！',
      type: 'error',
    });
  } else {
    this.isLoading = true
    let keys = [...Object.keys(this.Addinput)]
    let subObj = { method:'post', url:'/AcceptData', }
    let data = new FormData()
    keys.forEach(item => data.append(item, this.Addinput[item]))
    data.append('type',this.$store.state.currentOption.current)
    if (this.upDataRow_status) data.append('upDataRow_status', true)
    if (this.file) data.append('file', this.file)
    subObj.data = data
    subObj.headers =  {'Content-Type': 'multipart/form-data'}
    axios(subObj).then(res => {
      if (res && res.data ) res_status(res.data, self)
    })
  }
}


function submitData_judge(){
  let ary = [...Object.values(this.Addinput)]
  for (let val of ary) if (val === '') return false
  return true
}

function deleteDate(Row) {
  let self = this
  axios({
    method:'post',
    url:'/DeleteData',
    data:{
      DelDate:[{id:Row.id,Path:[Row.icoPath,Row.imgPath]}],
      type:this.$store.state.currentOption.current,
    }
  }).then(res => {
     if (res && res.data )  res_status(res.data, self)
  })
}

function deleteAllDate() {
  let self = this
  let ary = []
  this.multipleSelection.forEach(item => ary.push({id:item.id,Path:[item.icoPath,item.imgPath]}))
  axios({
    method:'post',
    url:'/DeleteData',
    data:{
      DelDate:ary,
      type:this.$store.state.currentOption.current,
    }
  }).then(res => {
     if (res && res.data)  res_status(res.data, self)
  })
}

function searchData() {
  let self = this
  this.isLoading = true
  let start = (this.currentPage - 1) * this.Num_Pieces
  axios(`/SearchData/${this.$store.state.currentOption.current}/${this.searchText}/${start}/${this.Num_Pieces}`).then(res => {
      this.count = res.data.count
      this.NavData = res.data.data
      this.isLoadingTable = false
  })
}

function toClickEngName(name) {
  switch (name){
    case '热点版块':
      return 'hotSpor'
    case '入门版块':
      return 'startArticle'
    case '数字货币版块':
      return 'digitalCurrency'
    case '技术版块':
      return 'technicalArticle'
    case '媒体版块':
      return 'mediaSection'
    case '专家说版块':
      return 'expert'
    case '平台推荐版块':
      return 'platform'
    case '投资机构版块':
      return 'agency'
    case '矿业版块':
      return 'mining'
    case '钱包版块':
      return 'wallet'
    case '交流社区版块':
      return 'community'
  }
  return name
}

function toClickChinseName(name) {
  switch (name){
    case 'hotSpor':
      return '热点版块'
    case 'startArticle':
      return '入门版块'
    case 'digitalCurrency':
      return '数字货币版块'
    case 'technicalArticle':
      return '技术版块'
    case 'mediaSection':
      return '媒体版块'
    case 'expert':
      return '专家说版块'
    case 'platform':
      return '平台推荐版块'
    case 'agency':
      return '投资机构版块'
    case 'mining':
      return '矿业版块'
    case 'wallet':
      return '钱包版块'
    case 'community':
      return '交流社区版块'
  }
  return name
}