  const Login = { 
    template:`
      <div id="loginBox" v-cloak>
        <div class="container">
          <form  class="form-horizontal  col-sm-3" id="form" action="/registerORlogin" method="post">
            <div class="form-group">
              <label class="col-sm-2 control-label" for="username">帐号 </label>
              <div class="col-sm-10">
                <input class="form-control" type="text" name="username" autofocus="autofocus" autocomplete="off" placeholder="请输入用户名" id="username" v-model='username'>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label" for="password">密码 </label>
              <div class="col-sm-10">
                <input class="form-control" type="password" name="password" placeholder="请输入密码" id="password" autocomplete="off" v-model='password'>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label" for="captcha">验证码</label>
              <div class="col-sm-10">
                <input class="form-control" style="width:calc(100% - 90px);display:inline-block; vertical-align: middle;" type="text" name="captcha" placeholder="请输入验证码" id="captcha" autocomplete="off" v-model='captcha'>
                <span id="captcha_img" style="width:80px; display:inline-block;cursor:pointer; height:35px; margin-left:10px" @click="getCaptcha"></span>
              </div>
            </div>
            <div class="form-group " id="bottom">
              <div class="col-sm-offset-2 col-sm-10">
                <div class="checkbox" style="float:right">
                  <label>
                    <input id="keepLogin" v-model='keepLogin' type="checkbox" tabindex="-1">保持登录
                  </label>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-offset-2 col-sm-10">
                <button class="btn btn-success active btn-block" type="submit" name="SignIn" @click.prevent.self="startLogin" :disabled="buttonStatus">Sign In</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    `,
    data(){
      return {
        username:'',
        password:'',
        captcha:'',
        keepLogin:'',
        buttonStatus:false,
      }
    },
    async created() {
      let status = await getLogin.bind(this)()
      if (status) return this.$router.push('/home');
      getCaptcha()
    },
    computed:{

    },
    methods:{
      getCaptcha:getCaptcha,
      startLogin:async function(){
        let self = this 
        this.buttonStatus = true        
        let userData = {username:this.username,
                        password:this.password,
                        captcha:this.captcha,
                        keepLogin:this.keepLogin}
        let res = await logIn(userData, self)
        if (res && res.data ) res_status(res.data, self)
        this.buttonStatus = false
      },
    },
  }

  const modalBox ={
    template:`
      <div>
        <button class="btn btn-primary" style="display:none" type="button" data-toggle="modal" data-target=".bs-example-modal-sm"></button>
        <div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
          <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h3 class="modal-title" id="gridSystemModalLabel"><span v-text='text.title'></span></h3>
              </div>
              <div class="modal-body" style="font-size:18px; text-indent:20px;"><span v-text='text.text'></span></div>
              <div class="modal-footer">
                <button :class="text.class" type="button" data-dismiss="modal">close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,                                              
    computed:{
      text() {
        return this.$store.state.modalText
      },
    },
  }

  const Home = { 
    template:`
      <el-container style="height:100vh">
        <el-aside width="auto" :class='classObj.offORon'>
          <ul class='aside-ul-Box' @click.stop='liClick($event)'>
            <li :style='styleObj.hotSpor' :class='classObj.offORon' name='hotSpor'>热点新闻</li>
            <li :style='styleObj.startArticle' :class='classObj.offORon' name='startArticle'>入门系列</li>
            <li :style='styleObj.digitalCurrency' :class='classObj.offORon' name='digitalCurrency'>数字货币</li>
            <li :style='styleObj.technicalArticle' :class='classObj.offORon' name='technicalArticle'>技术文章</li>
            <li :style='styleObj.mediaSection' :class='classObj.offORon' name='mediaSection'>媒体版块</li>
            <li :style='styleObj.expert' :class='classObj.offORon' name='expert'>专家说</li>
          </ul>
          <ul class='aside-ul-Box' @click.stop='liClick($event)'>
            <li :style='styleObj.clickBox' :class='classObj.offORon' name='clickBox'>点击数查看</li>
          </ul> 
        </el-aside>
        <el-container :class='classObj.offORon'>
          <el-header style='position:relative'>
            <div class='arrows_dir' style='position:absolute;display:flex;align-items:center;height:100%'>
              <el-button :class='classObj.arr' style="font-size: 28px;padding: 0;width: 35px;height: 35px;border-radius: 17.5px;text-align: center;" @click.stop='setCollapse'>
                <i class='el-icon-arrow-right'></i>
              </el-button>
            </div> 
          </el-header>
          <el-main>
            <router-view :key='key'></router-view>
          </el-main>
        </el-container>
      </el-container>
    `,
    data() {
      return {
        isCollapse: false,
      }
    },
    computed:{
      classObj: function() {
        return this.isCollapse ? {offORon:{off:!this.isCollapse, on:this.isCollapse},arr:{off:!this.isCollapse, on:this.isCollapse}} 
                               : {offORon:{off:!this.isCollapse, on:this.isCollapse},arr:{off:!this.isCollapse, on:this.isCollapse}}
      },
      styleObj: function() {
        return this.$store.state.currentOption
      },
      key(){
        return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date()
      },
    },
    methods: {
      setCollapse() {
        this.isCollapse = !this.isCollapse
      },
      liClick(e){
        this.$store.commit('setTableBoxShow')
        setTimeout(() => this.$store.commit('setTableBoxShow'), 300)
        this.$router.push(`/home/${e.target.getAttribute('name')}`)
      },
    }
  }


  const TableBox = {
    template:`
    <transition name="TableBox">
      <div style='line-height:0;' v-if='TableBoxShow' >
        <div style="height: 50px; display: flex; align-items: center; background-color:rgba(0,0,0,.2);padding:0 10px;">
          <div class='FeatBox' style='display:flex'>
            <el-input v-model="searchText" placeholder="查询的标题(名字)"></el-input>
            <el-button type="primary" @click.native='search'>查询</el-button>
            <el-button type="primary" @click.native='isVisible = !isVisible'>新增</el-button>
            <el-button type="info" v-if='isSearch' @click.native='clearSearch'>清空查询</el-button>
          </div>
        </div>
        <el-table 
        ref="multipleTable" 
        :data="NavData" 
        :default-sort="{prop: 'id', order: 'descending'}"
        tooltip-effect="dark" 
        style="width: 100%" 
        v-loading="isLoadingTable" 
        element-loading-text="获取中..."
        @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="35">
          </el-table-column>
          <el-table-column
            sortable
            prop="id"
            label="ID"
            width="70">
          </el-table-column>
          <el-table-column
            sortable
            prop="UpdateTime"
            label="Update Time"
            width="150">
          </el-table-column>
          <el-table-column
            v-if='isDigitalCurrency'
            prop="icoPath"
            label="icon"
            width="60">
            <template slot-scope="scope">
              <img :src="'../' + scope.row.icoPath" class="head_pic" style='width:30px;height:30px'/>
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="title"
            width="230">
          </el-table-column>
          <el-table-column
            prop="url"
            label="URL"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            v-if='isExpert'
            prop="text"
            label="text"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作" width='170' >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="upDataRow(scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click.native.prevent="deleteRow(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <div class='deleteBOX'>
            <el-button type="danger" @click.native.prevent='deleteAll()' :disabled='isSub || multipleSelection.length <= 0 '>批量删除</el-button>
            <el-button type="success" @click.native.prevent='toggleSelection(NavData)' :disabled='NavData.length <= 0'>反选</el-button>
          </div>
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400, 500]"
            :page-size="100"
            @size-change='setSize'
            @current-change='setPage'
            layout="total, sizes, prev, pager, next, jumper"
            :total="count">
          </el-pagination>
        </div>
        <el-dialog
          :title='$store.state.currentOption.current + (upDataRow_status ?  "编辑" : "新增")'
          :visible.sync="isVisible"
          width="30%"
          @closed='dialogClosed'
          center>
          <table>
            <tr v-for='val in $store.state.currentOption.FieldNames'>
              <td>
                <span v-text=val></span>
              </td>
              <td v-if='val==="icon"'>
                <el-upload
                  class="icon-uploader"
                  action="/AcceptData"
                  :data='{name:"digitalCurrency_icon"}'
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="Addinput.icon" :src="Addinput.icon" class="icon__">
                  <i v-else class="el-icon-plus icon-uploader-icon"></i>
                </el-upload>
              </td>
              <td v-else-if='val === "img"'>
                <el-upload
                  class="expert-uploader"
                  action="/AcceptData"
                  :data='{name:"expert_img"}'
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="Addinput.img" :src="Addinput.img" class="expert__">
                  <i v-else class="el-icon-plus expert-uploader-icon"></i>
                </el-upload>
              </td>
              <td v-else-if='val === "text"'>               
                <el-input
                  type="textarea"
                  :rows="5"
                  placeholder="请输入段落内容"
                  v-model="Addinput.text">
                </el-input>
              </td>
              <td v-else>
                <el-input v-model="Addinput[val]" :placeholder="'请输入内容' + val"></el-input>
              </td>
            </tr>
          </table>
          <span slot="footer" class="dialog-footer">
            <div
                element-loading-text="提交中..."
                element-loading-background="rgba(29, 29, 29, 1)"
                v-loading="isLoading">
                <el-button @click="isVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitData" >
                  确 定
              </el-button>
            </div>
          </span>
        </el-dialog>
      </div>
    </transition>
    `,
    mounted(){
      this.getData()
    },
    data() {
      let Addinput = {}
      this.$store.state.currentOption.FieldNames.forEach((item) => Addinput[item] = "")
      return {
        isSub:false,
        count: 0,
        NavData: [],
        isLoading:false,
        isLoadingTable:true,
        Addinput:Addinput,
        isVisible:false,
        searchText:'',
        currentPage:1,
        multipleSelection: [],
        file:"",
        Num_Pieces:100,
        upDataRow_status:false,
        isSearch:false,
      }
    },

    methods: {
      getData() {
        this.isLoadingTable = true
        let start = (this.currentPage - 1) * this.Num_Pieces
        setTimeout(() => {
          axios(`/GetData/${this.$store.state.currentOption.current}/${start}/${this.Num_Pieces}`).then(res => {
            this.count = res.data.count['count(id)']
            this.NavData = res.data.data
            this.isLoadingTable = false
          })
        },600)
      },
      upDataRow(row){
        let key = Object.keys(row)
        for (let key_ of key) {
          let str
          switch (key_){
            case 'url':
              str = 'URL'
              break;
            case 'icoPath':
              str = 'icon'
              break;
            case 'imgPath':
              str = 'img'
              break;
            default:
              str = key_
          }
          this.Addinput[str] = (key_ === 'icoPath' || key_ === 'imgPath') ? '../' + row[key_] : row[key_]
        }
        this.upDataRow_status = true
        this.isVisible = true
      },
      search(){
        if (this.searchText === '') this.$message.error('搜索条件不能为空！');
        else {
          this.isSearch = true
          searchData.bind(this)()
        }
      },
      clearSearch(){
        this.searchText = ''
        this.isSearch = false
        this.getData()
      },
      setSize(num){
        this.Num_Pieces = num
        if (this.isSearch) this.search()
        else this.getData()
      },
      setPage(num){
        this.currentPage = num
        if (this.isSearch) this.search()
        else this.getData()
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      deleteRow(Row) {
        deleteDate.bind(this)(Row)
      },
      deleteAll(){
        this.isSub = true
        this.$confirm('确认删除所有选中记录吗？', '危险操作', {
          type: 'warning'
        }).then(() => {
            deleteAllDate.bind(this)()
          }, () => this.isSub = false)
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像s图片大小不能超过 2MB!');
        }
        switch(this.$store.state.currentOption.current) {
          case 'digitalCurrency':
            this.Addinput.icon = URL.createObjectURL(file);
            break
          case 'expert':
            this.Addinput.img = URL.createObjectURL(file);
            break
        }
        this.file = file
        return false
        /*return isJPG && isLt2M;*/
      },
      dialogClosed(){
        this.upDataRow_status = false 
        let Addinput = {}
        this.$store.state.currentOption.FieldNames.forEach((item) => Addinput[item] = "")  
        this.Addinput = Addinput
        this.file = ''
      },
      submitData:function() {submitData.bind(this)()},
    },
    computed: {
      isExpert: function() {
        return this.$store.state.currentOption.expert !== ''
      },
      isDigitalCurrency: function() {
        return this.$store.state.currentOption.digitalCurrency !== ''
      },
      TableBoxShow: function() {
        return this.$store.state.TableBoxShow
      },
    },
  }

  const clickBox = {
    template:`
    <transition name="TableBox">
      <div style='line-height:0;' v-if='clickBoxShow' id='clickBox'>
        <div style="height: 50px; display: flex; align-items: center; background-color:rgba(0,0,0,.2);padding:0 10px;">
          <div class='FeatBox' style='display:flex'>
            <el-input v-model="searchText" placeholder="查询日期" disabled></el-input>
            <el-button type="primary" @click.native='search' disabled>查询</el-button>
            <el-button type="info" v-if='isSearch' @click.native='clearSearch'>清空查询</el-button>
          </div>
        </div>
        <el-table
          :default-sort="{prop: 'id', order: 'descending'}"
          tooltip-effect="dark" 
          v-loading="isLoadingTable" 
          element-loading-text="获取中..."
          :data="ClickData"
          style="width: 100%">
          <el-table-column
            prop="section"
            label="版块"
            width="230">
          </el-table-column>
          <el-table-column
            prop="clickSums"
            label="点击量"
            width="180">
          </el-table-column>
          <el-table-column
            prop=""
            label="">
          </el-table-column>
          <el-table-column label="操作" width='170' >
            <template slot-scope="scope">
              <el-button
                size="mini" type="warning"
                @click='lookEveryDay_click(scope.row.section)'
                >查看每日记录</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          top='10vh'
          title='各版块每日点击量'
          :visible.sync="isVisible"
          width="90%"
          @closed='dialogClosed'
          center>
          <el-table
            v-loading="isLoading"
            element-loading-text="获取中..."
            :data="clickData"
            :default-sort = "{prop: 'date', order: 'descending'}"
            style="width: 100%">
            <el-table-column
              v-for='item in clickColumn'
              :prop='item.prop'
              :label='toClickChinseName(item.label)'
              :key='item.prop'
              style='text-align:left'
              :sortable='item.prop === "date"'
              >
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              :current-page="currentPage"
              :page-sizes="[100, 200, 300, 400, 500]"
              :page-size="100"
              @size-change='setSize'
              @current-change='setPage'
              layout="total, sizes, prev, pager, next, jumper"
              :total="count">
            </el-pagination>
          </div>
        </el-dialog>
      </div>
    </transition>
    `,
    mounted(){
      this.getClickData()
    },
    data(){
      return{
        searchText:'',
        isSearch:false,
        ClickData:[],
        isLoadingTable:true,
        isLoading:true,
        count:0,
        currentPage:1,
        Num_Pieces:100,
        isVisible:false,
        clickColumn:[],
        clickData:[],
        currentSection:'',
      }
    },
    methods:{
      getClickData() {
        this.isLoadingTable = true
        let start = (this.currentPage - 1) * this.Num_Pieces
        setTimeout(() => {
          axios(`/GetClickData/sum/one/${start}/${this.Num_Pieces}`).then(res => {
            this.count = res.data.count
            this.ClickData = res.data.data
            this.isLoadingTable = false
          })
        },600)
      },
      clearSearch(){
        this.searchText = ''
        this.isSearch = false
        this.getClickData()
      },
      search(){
/*        if (this.searchText === '') this.$message.error('搜索条件不能为空！');
        else {
          this.isSearch = true
          searchData.bind(this)()
        }*/
      },
      setSize(num){
        this.Num_Pieces = num
        if (this.isSearch) this.search()
        else this.lookEveryDay_click(this.currentSection)
      },
      setPage(num){
        this.currentPage = num
        if (this.isSearch) this.search()
        else this.lookEveryDay_click(this.currentSection)
      },
      lookEveryDay_click(section){
        this.isVisible = true
        this.currentSection = section
        let type = toClickEngName(section)
        this.isLoading = true
        let start = (this.currentPage - 1) * this.Num_Pieces
        setTimeout(() => {
          axios(`/GetClickData/${type}/all/${start}/${this.Num_Pieces}`).then(res => {
            this.count = res.data.count
            this.clickData = res.data.datas.clickData
            this.clickColumn = [{prop:'date', label:'日期'}]
            res.data.datas.sections.forEach(item => {
              this.clickColumn.push({prop:item, label:item})
            })
            this.isLoading = false
          })
        },600)
      },
      toClickChinseName:toClickChinseName,
      dialogClosed(){
        this.currentSection = '',
        this.clickColumn = []
        this.clickData = []
      },
    },
    computed:{
      clickBoxShow: function() {
        return this.$store.state.TableBoxShow
      },
    },
  }
