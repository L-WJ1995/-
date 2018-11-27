const hotSpor = {
  template:`
    <div class='hotSpor' @click='submitType'>
      <img src="./pictures/201709111005582622.jpg" alt="">
      <ul>
        <li v-for='link in links' :key = 'link.id'>
          <a :href="link.url" target="_blank" subSymbol='true'>
            <span v-text='link.title' subSymbol='true'></span>
          </a>
        </li> 
      </ul>
    </div>
  `,
  async created() {
    let res = await axios('/NavGetData/hotSpor/0/11')
    this.links = res.data.data
    this.$store.commit('setShow_status')
  },
  data(){
    return {
      links:[],
      typeName:'hotSpor',
    }
  },
  computed:{

  },
  methods:{
    submitType: function(e) { 
      if (e.target.getAttribute('subSymbol') === 'true') this.$emit('submitType', e, this.typeName)  
    },
  },
}

const platform = {
  template:`
      <article @click='submitType'>
        <div>
          <img class='modeIMG' src="./pictures/platform-night.png" alt="">
          <span>平台推荐</span>
        </div>
        <table>
          <tr>
            <td><a href="https://www.binance.com" target="_blank" subSymbol='true'><img src="./pictures/biAn.png" alt="" subSymbol='true'></a></td>
            <td><a href="https://www.huobi.com" target="_blank" subSymbol='true'><img  class='modeIMG' src="./pictures/Huobi-night.png" alt="" subSymbol='true'></a></td>
            <td><a href="https://www.gate.io" target="_blank" subSymbol='true'><img src="./pictures/gateIo.png" alt="" subSymbol='true'></a></td>
            <td><a href="https://www.okex.com" target="_blank" subSymbol='true'><img  class='modeIMG' src="./pictures/OKEX-night.png" alt="" subSymbol='true'></a></td>
            <td><a href="https://www.zb.cn/" target="_blank" subSymbol='true'><img  class='modeIMG' style="margin-left: -8px;" src="./pictures/ZB-night.png" alt="" subSymbol='true'></a></td>
          </tr>
          <tr>
            <td><a href=" https://www.bitmex.com/ " target="_blank" subSymbol='true'><img src="./pictures/BitMex.png" alt="" subSymbol='true'> <span subSymbol='true'>BitMex</span></a></td>
            <td><a href=" https://www.bithumb.com/" target="_blank" subSymbol='true'><img src="./pictures/Bithumb.png" alt="" subSymbol='true'> <span subSymbol='true'>Bithumb</span></a></td>
            <td><a href="https://www.bitfinex.com/" target="_blank" subSymbol='true'><img src="./pictures/Bitflnex.png" alt="" subSymbol='true'> <span subSymbol='true'>Bitflnex</span></a></td>
            <td><a href="https://hitbtc.com/" target="_blank" subSymbol='true'><img src="./pictures/HitBTC.png" alt="" subSymbol='true'> <span subSymbol='true'>HitBTC</span></a></td>
            <td><a href="https://www.bit-z.com/" target="_blank" subSymbol='true'><img src="./pictures/Bit-Z.png" alt="" subSymbol='true'> <span subSymbol='true'>Bit-Z</span></a></td>
          </tr>
          <tr>
            <td><a href=" https://www.bibox.com/" target="_blank" subSymbol='true'><img src="./pictures/Bibox.png" alt="" subSymbol='true'> <span subSymbol='true'>Bibox</span></a></td>
            <td><a href=" https://www.digifinex.com/" target="_blank" subSymbol='true'><img src="./pictures/DigiFinex.png" alt="" subSymbol='true'> <span subSymbol='true'>DigiFinex</span></a></td>
            <td><a href=" https://upbit.com/home" target="_blank" subSymbol='true'><img src="./pictures/Upbit.png" alt="" subSymbol='true'> <span subSymbol='true'>Upbit</span></a></td>
            <td><a href="https://www.idax.pro/#/" target="_blank" subSymbol='true'><img src="./pictures/IDAX.png" alt="" subSymbol='true'> <span subSymbol='true'>IDAX</span></a></td>
            <td><a href="https://www.coinw.me/" target="_blank" subSymbol='true'><img src="./pictures/BIY_.png" alt="" subSymbol='true'> <span subSymbol='true'>币赢国际站</span></a></td>
          </tr>
          <tr>
            <td><a href="https://hb.top/" target="_blank" subSymbol='true'><img src="./pictures/HBI_.png" alt="" subSymbol='true'> <span subSymbol='true'>汇币网</span></a></td>
            <td><a href="https://pro.coinbase.com/" target="_blank" subSymbol='true'><img src="./pictures/Coinbase Pro.png" alt="" subSymbol='true'> <span subSymbol='true'>Coinbase Pro</span></a></td>
            <td><a href="https://www.icoinbay.com/" target="_blank" subSymbol='true'><img src="./pictures/iCoinbay.png" alt="" subSymbol='true'> <span subSymbol='true'>iCoinbay</span></a></td>
            <td><a href="https://www.kraken.com/" target="_blank" subSymbol='true'><img src="./pictures/Kw.png" alt="" subSymbol='true'> <span subSymbol='true'>K网</span></a></td>
            <td><a href="https://www.bcex.top/" target="_blank" subSymbol='true'><img src="./pictures/BCEX.png" alt="" subSymbol='true'> <span subSymbol='true'>BCEX</span></a></td>
          </tr>
        </table>
      </article>
    `,
    data(){
      return {
        typeName:'platform',
      }
    },
    async created() {

    },
    computed:{

    },
    methods:{
      submitType: function(e) {
        if (e.target.getAttribute('subSymbol') === 'true') this.$emit('submitType', e, this.typeName) 
      },
    },
}

const agency = {
  template:`
    <article @click='submitType'>
      <div>
        <img  class='modeIMG' src="./pictures/agency-night.png" alt="">
        <span>投资机构</span>
      </div>
      <table>
        <tr>
          <td><a href="http://www.linear.vc/" target="_blank" subSymbol='true'><img src="./pictures/XXziben_.png" alt="" subSymbol='true'> <span subSymbol='true'>线性资本</span></a></td>
          <td><a href="http://www.ventureslab.com/index-cn.html" target="_blank" subSymbol='true'><img src="./pictures/chuangyegongchang_.png" alt="" subSymbol='true'> <span subSymbol='true'>创业工场</span></a></td>
          <td><a href="http://www.rootscap.com/" target="_blank" subSymbol='true'><img src="./pictures/qiY_.png" alt="" subSymbol='true'> <span subSymbol='true'>起源资本</span></a></td>
          <td><a href="http://www.apluscap.com/" target="_blank" subSymbol='true'><img src="./pictures/hongtai_.png" alt="" subSymbol='true'> <span subSymbol='true'>洪泰资本控股</span></a></td>
          <td><a href="http://cn.idgcapital.com/" target="_blank" subSymbol='true'><img src="./pictures/IDG.png" alt="" subSymbol='true'> <span subSymbol='true'>IDG资本</span></a></td>
        </tr>
        <tr>
          <td><a href="http://www.danhuacap.com/" target="_blank" subSymbol='true'><img src="./pictures/danHUA_.png" alt="" subSymbol='true'> <span subSymbol='true'>丹华资本</span></a></td>
          <td><a href="http://www.qfvc.cn/" target="_blank" subSymbol='true'><img src="./pictures/qifu_.png" alt="" subSymbol='true'> <span subSymbol='true'>启赋资本</span></a></td>
          <td><a href="https://www.sequoiacap.com/china/" target="_blank" subSymbol='true'><img src="./pictures/hongshan_.png" alt="" subSymbol='true'> <span subSymbol='true'>红杉资本中国基金</span></a></td>
          <td><a href="http://www.nodecap.com/" target="_blank" subSymbol='true'><img src="./pictures/jiedian_.png" alt="" subSymbol='true'> <span subSymbol='true'>节点资本</span></a></td>
          <td><a href="http://www.preangelfund.cn/" target="_blank" subSymbol='true'><img src="./pictures/PreAngle.png" alt="" subSymbol='true'> <span subSymbol='true'>PreAngle</span></a></td>
        </tr>
      </table>
    </article>
    `,
    data(){
      return {
        typeName:'agency',
      }
    },
    async created() {

    },
    computed:{

    },
    methods:{
      submitType: function(e) {
        if (e.target.getAttribute('subSymbol') === 'true') this.$emit('submitType', e, this.typeName) 
      },
    },
}

const mining = {
  template:`
    <article @click='submitType'>
      <div>
        <img  class='modeIMG' src="./pictures/mining-night.png" alt="">
        <span>矿业</span>
      </div>
      <table>
        <tr>
          <td>矿池 <span class="arrow-left"></span></td>
          <td><a href="https://eth.ethfans.org/#/" target="_blank" subSymbol='true'><img src="./pictures/XINGhuo_.png" alt="" subSymbol='true'> <span subSymbol='true'>星火矿池</span></a></td>
          <td><a href="https://pool.btcc.com/" target="_blank" subSymbol='true'><img src="./pictures/Gchi_.png" alt="" subSymbol='true'> <span subSymbol='true'>国池</span></a></td>
          <td><a href="https://antpool.com/" target="_blank" subSymbol='true'><img src="./pictures/MAyi_.png" alt="" subSymbol='true'> <span subSymbol='true'>蚂蚁矿池</span></a></td>
          <td><a href=" https://www.f2pool.com/" target="_blank" subSymbol='true'><img src="./pictures/F2Pool.png" alt="" subSymbol='true'> <span subSymbol='true'>F2Pool鱼池</span></a></td>
        </tr>
        <tr>
          <td>矿机 <span class="arrow-left"></span></td>
          <td><a href="https://canaan.io/ " target="_blank" subSymbol='true'><img src="./pictures/Avalon_miner.png" alt="" subSymbol='true'> <span subSymbol='true'>阿瓦隆矿机</span></a></td>
          <td><a href="https://pandaminer.com/" target="_blank" subSymbol='true'><img src="./pictures/Panda_miner.png" alt="" subSymbol='true'> <span subSymbol='true'>熊猫矿机</span></a></td>
          <td><a href="https://www.fengwo.com/ " target="_blank" subSymbol='true'><img src="./pictures/fengwo_.png" alt="" subSymbol='true'> <span subSymbol='true'>蜂窝矿机</span></a></td>
        </tr>
        <tr>
          <td>算力 <span class="arrow-left"></span></td>
          <td><a href="https://www.suanlibao.com/ " target="_blank" subSymbol='true'><img src="./pictures/SliB_.png" alt="" subSymbol='true'> <span subSymbol='true'>算力宝</span></a></td>
          <td><a href="https://www.hashnest.com/ " target="_blank" subSymbol='true'><img src="./pictures/SliC_.png" alt="" subSymbol='true'> <span subSymbol='true'>算力巢</span></a></td>
          <td><a href="https://oxbtc.com/" target="_blank" subSymbol='true'><img src="./pictures/NBT_.png" alt="" subSymbol='true'> <span subSymbol='true'>牛比特</span></a></td>
        </tr>
      </table>
    </article>
    `,
    data(){
      return {
        typeName:'mining',
      }
    },
    async created() {

    },
    computed:{

    },
    methods:{
      submitType: function(e) {
        if (e.target.getAttribute('subSymbol') === 'true') this.$emit('submitType', e, this.typeName) 
      },
    },
}

const wallet = {
  template:`
    <article @click='submitType'>
      <div>
        <img  class='modeIMG' src="./pictures/wallet-night.png" alt="">
        <span>钱包</span>
      </div>
      <table>
        <tr>
          <td><a href="http://bitpie.com/ " target="_blank" subSymbol='true'><img src="./pictures/bit_pai.png" alt="" subSymbol='true'> <span subSymbol='true'>比特派</span></a></td>
          <td><a href="https://www.kcash.com/" target="_blank" subSymbol='true'><img src="./pictures/Kcash.png" alt="" subSymbol='true'> <span subSymbol='true'>Kcash</span></a></td>
          <td><a href="https://www.tokenxx.com/ " target="_blank" subSymbol='true'><img src="./pictures/TOKEN++.png" alt="" subSymbol='true'> <span subSymbol='true'>TOKEN++</span></a></td>
          <td><a href="https://www.atoken.com/ " target="_blank" subSymbol='true'><img src="./pictures/Atoken.png" alt="" subSymbol='true'> <span subSymbol='true'>AToken</span></a></td>
          <td><a href="https://token.im/ " target="_blank" subSymbol='true'><img src="./pictures/imToken.png" alt="" subSymbol='true'> <span subSymbol='true'>imToken</span></a></td>
        </tr>
        <tr>
          <td><a href="https://www.circle.com/cn/ " target="_blank" subSymbol='true'><img src="./pictures/Circle.png" alt="" subSymbol='true'> <span subSymbol='true'>Circle</span></a></td>
          <td><a href="https://bitpay.com/" target="_blank" subSymbol='true'><img src="./pictures/BITPAY.png" alt="" subSymbol='true'> <span subSymbol='true'>BITPAY</span></a></td>
          <td><a href="https://po.im/#/home" target="_blank" subSymbol='true'><img src="./pictures/POIM.png" alt="" subSymbol='true'> <span subSymbol='true'>PO.IM</span></a></td>
          <td><a href="https://www.epay.com/" target="_blank" subSymbol='true'><img src="./pictures/Epay.png" alt="" subSymbol='true'> <span subSymbol='true'>Epay</span></a></td>
          <td><a href="https://www.blockchain.com/" target="_blank" subSymbol='true'><img src="./pictures/Blockchain.png" alt="" subSymbol='true'> <span subSymbol='true'>Blockchain</span></a></td>
        </tr>
        <tr>
          <td><a href="https://litecoin.org/cn/" target="_blank" subSymbol='true'><img src="./pictures/LTC_.png" alt="" subSymbol='true'> <span>莱特币</span></a></td>
          <td><a href="https://www.ethereum.org/" target="_blank" subSymbol='true'><img src="./pictures/ETH_.png" alt="" subSymbol='true'> <span>以太坊</span></a></td>
          <td><a href="https://qtumeco.io/wallet" target="_blank" subSymbol='true'><img src="./pictures/Qtum_.png" alt="" subSymbol='true'> <span>量子链</span></a></td>
          <td><a href="https://neo.org/client" target="_blank" subSymbol='true'><img src="./pictures/NEO.png" alt="" subSymbol='true'> <span>NEO</span></a></td>
          <td><a href="https://bitcoin.org/en/choose-your-wallet" target="_blank" subSymbol='true'><img src="./pictures/BTC_.png" alt="" subSymbol='true'> <span>比特币</span></a></td>
        </tr>
        <tr>
          <td><a href="https://ripple.com/" target="_blank" subSymbol='true'><img src="./pictures/rip_.png" alt="" target="_blank" subSymbol='true'> <span subSymbol='true'>瑞波币</span></a></td>
          <td><a href="https://bitshares.org/" target="_blank" subSymbol='true'><img src="./pictures/BT_gu.png" alt="" subSymbol='true'> <span subSymbol='true'>比特股</span></a></td>
          <td><a href="https://thenagacoin.com/" target="_blank" subSymbol='true'><img src="./pictures/NGC.png" alt="" subSymbol='true'> <span subSymbol='true'>NGC</span></a></td>
          <td><a href="https://www.bityuan.com/wallet" target="_blank" subSymbol='true'><img src="./pictures/BT_yuan.png" alt="" subSymbol='true'> <span subSymbol='true'>比特元钱包</span></a></td>
          <td><a href="https://www.gxb.io/" target="_blank" subSymbol='true'><img src="./pictures/GXS_.png" alt="" subSymbol='true'> <span subSymbol='true'>公信宝</span></a></td>
        </tr>
        <tr>
          <td><a href="https://www.cmcmbc.com/zh-cn/safe-wallet/" target="_blank" subSymbol='true'><img src="./pictures/SafeWallet.png" alt="" subSymbol='true'> <span subSymbol='true'>SafeWallet</span></a></td>
          <td><a href="https://qbao.fund/#/" target="_blank" subSymbol='true'><img src="./pictures/Qbao Network.png" alt="" subSymbol='true'> <span subSymbol='true'>Qbao Network</span></a></td>
          <td><a href=" https://spectrocoin.com/en/bitcoin-wallet.html" target="_blank" subSymbol='true'><img src="./pictures/Spectrocoin.png" alt="" subSymbol='true'> <span subSymbol='true'>Spectrocoin</span></a></td>
          <td><a href="https://www.coldlar.com/" target="_blank" subSymbol='true'><img src="./pictures/KU_.png" alt="" subSymbol='true'> <span subSymbol='true'>库神</span></a></td>
          <td><a href="https://www.bitcoin.com/" target="_blank" subSymbol='true'><img src="./pictures/Bitcoin.png" alt="" subSymbol='true'> <span subSymbol='true'>Bitcoin.com</span></a></td>
        </tr>
      </table>
    </article>
    `,
    data(){
      return {
        typeName:'wallet',
      }
    },
    async created() {

    },
    computed:{

    },
    methods:{
      submitType: function(e) {
        if (e.target.getAttribute('subSymbol') === 'true') this.$emit('submitType', e, this.typeName) 
      },
    },
}

const community = {
  template:`
    <article @click='submitType'>
      <div>
        <img  class='modeIMG' src="./pictures/community-night.png" alt="">
        <span>交流社区</span>
      </div>
      <table>
        <tr>
          <td><a href="http://www.8btc.com/" target="_blank" subSymbol='true'><img src="./pictures/Babbitt.png" alt="" subSymbol='true'> <span subSymbol='true'>巴比特</span></a></td>
          <td><a href="https://beechat.io/?siteLanguage=zh" target="_blank" subSymbol='true'><img src="./pictures/BeeChat.png" alt="" subSymbol='true'> <span subSymbol='true'>BeeChat</span></a></td>
          <td><a href="https://t.me/baicgroup" target="_blank" subSymbol='true'><img src="./pictures/BAIC.png" alt="" subSymbol='true'> <span>BAIC</span subSymbol='true'></a></td>
          <td><a href="https://t.me/Oceanchain_Official " target="_blank" subSymbol='true'><img src="./pictures/OC.png" alt="" subSymbol='true'> <span subSymbol='true'>OC</span></a></td>
          <td><a href="https://t.me/enginechainegcc " target="_blank" subSymbol='true'><img src="./pictures/EGCC.png" alt="" subSymbol='true'> <span subSymbol='true'>EGCC</span></a></td>
        </tr>
        <tr>
          <td><a href="https://t.me/epcteam " target="_blank" subSymbol='true'><img src="./pictures/EPC.png" alt="" subSymbol='true'> <span subSymbol='true'>EPC</span></a></td>
          <td><a href="https://t.me/BIYONGOfficial003 " target="_blank" subSymbol='true'><img src="./pictures/BYONG_.png" alt="" subSymbol='true'> <span subSymbol='true'>币用</span></a></td>
          <td><a href="https://t.me/laiteb" target="_blank" subSymbol='true'><img src="./pictures/LTC.png" alt="" subSymbol='true'> <span subSymbol='true'>LTC</span></a></td>
          <td><a href="https://t.me/ethgroup" target="_blank" subSymbol='true'><img src="./pictures/ETH.png" alt="" subSymbol='true'> <span subSymbol='true'>ETH</span></a></td>
        </tr>
      </table>
    </article>
    `,
    data(){
      return {
        typeName:'community',
      }
    },
    async created() {

    },
    computed:{

    },
    methods:{
      submitType: function(e) {
        if (e.target.getAttribute('subSymbol') === 'true') this.$emit('submitType', e, this.typeName) 
      },
    },
}

const expert = {
  template:`
  <article @click='submitType'>
    <div>
      <img  class='modeIMG' src="./pictures/expert.png" alt="">
      <span>专家说</span>
    </div>
    <div  class="ExpertSection">
      <ul>
        <li v-for='link in links' :key='link.id'>
          <a :href="link.url" target="_blank" subSymbol='true'>
            <div subSymbol='true'><img :src="'/' + link.imgPath" alt="" subSymbol='true'>
            </div>
            <div subSymbol='true'>
              <h2 v-text='link.title' subSymbol='true'></h2>
              <span v-text='link.text' subSymbol='true'></span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </article>
    `,
    async created() {
      let res = await axios('/NavGetData/expert/0/2')
      this.links = res.data.data
      this.$store.commit('setShow_status')
    },
    data(){
      return {
        links:[],
        typeName:'expert',
      }
    },
    computed:{

    },
    methods:{
      submitType: function(e) {
        if (e.target.getAttribute('subSymbol') === 'true') this.$emit('submitType', e, this.typeName) 
      },
    },
}

const startArticle = {
  template:`
    <div @click='submitType'>
      <span>基础入门</span>
      <ul>
        <li v-for='link in links' :key='link.id'>
          <a :href="link.url" target="_blank" subSymbol='true'><span v-text='link.title' subSymbol='true'></span></a> 
        </li>
      </ul>
    </div>
    `,
  components:{

  },
  async created() {
    let res = await axios('/NavGetData/startArticle/0/10')
    this.links = res.data.data
    this.$store.commit('setShow_status')
  },
  data(){
    return {
      links:[],
      typeName:'startArticle',
    }
  },
  computed:{

  },
  methods:{
    submitType: function(e) {
      if (e.target.getAttribute('subSymbol') === 'true') this.$emit('submitType', e, this.typeName) 
    },
  },
}

const digitalCurrency = {
  template:`
    <div @click='submitType'>
      <span>数字货币</span>
      <ul>
        <li v-for='link in links' :key='link.id'>
          <a :href="link.url" target="_blank" subSymbol='true'> <img :src="'/' + link.icoPath" alt=""  subSymbol='true'/><span v-text='link.title' subSymbol='true'></span></a> 
        </li>
      </ul>
    </div>
    `,
    async created() {
      let res = await axios('/NavGetData/digitalCurrency/0/10')
      this.links = res.data.data
      this.$store.commit('setShow_status')
    },
    data(){
      return {
        links:[],
        typeName:'digitalCurrency',
      }
    },
    computed:{

    },
    methods:{
      submitType: function(e) {
        if (e.target.getAttribute('subSymbol') === 'true') this.$emit('submitType', e, this.typeName) 
      },
    },
}

const technicalArticle = {
  template:`
    <div @click='submitType'>
      <span>技术原理</span>
      <ul>
        <li v-for='link in links' :key='link.id'>
          <a :href="link.url" target="_blank" subSymbol='true'><span v-text='link.title' subSymbol='true'></span></a> 
        </li>
      </ul>
    </div>
    `,
  async created() {
    let res = await axios('/NavGetData/technicalArticle/0/10')
    this.links = res.data.data
    this.$store.commit('setShow_status')
  },
  data(){
    return {
      links:[],
      typeName:'technicalArticle',
    }
  },
  computed:{

  },
  methods:{
    submitType: function(e) {
      if (e.target.getAttribute('subSymbol') === 'true') this.$emit('submitType', e, this.typeName) 
    },
  },
}

const mediaSection = {
  template:`
    <div @click='submitType'>
      <span>媒体</span>
      <ul>
        <li v-for='link in links' :key='link.id'>
          <a :href="link.url" target="_blank" subSymbol='true'><span v-text='link.title' subSymbol='true'></span></a> 
        </li>
      </ul>
    </div>
    `,
  async created() {
    let res = await axios('/NavGetData/mediaSection/0/10')
    this.links = res.data.data
    this.$store.commit('setShow_status')
  },
  data(){
    return {
      links:[],
      typeName:'mediaSection',
    }
  },
  computed:{

  },
  methods:{
    submitType: function(e) {
      if (e.target.getAttribute('subSymbol') === 'true') this.$emit('submitType', e, this.typeName) 
    },
  },
}



const navHeader = {
  template:`
    <div>
      <img src="./pictures/logo-03.png" alt="">
      <div>
        <a href="javascript:;" onclick="addFavorite()"><span>收藏本站</span></a>
        <a style="margin-left:8px" href=""><span>关于我们</span></a>
      </div>
    </div>
    `,
  components:{

  },
  data(){
    return {

    }
  },
  async created() {

  },
  computed:{

  },
  methods:{

  },
}
const navMain = {
  template:`
    <div class="contentBox">
      <hotSpor @submitType='submitType'></hotSpor>
      <section>
        <div>
          <platform  @submitType='submitType'></platform>
          <agency  @submitType='submitType'></agency>
          <mining  @submitType='submitType'></mining>
          <wallet  @submitType='submitType'></wallet>
          <community  @submitType='submitType'></community>
          <expert  @submitType='submitType'></expert>
        </div>
        <aside>
          <startArticle  @submitType='submitType'></startArticle>
          <digitalCurrency  @submitType='submitType'></digitalCurrency>
          <technicalArticle  @submitType='submitType'></technicalArticle>
          <mediaSection  @submitType='submitType'></mediaSection>
        </aside>
      </section>
    </div>
  `,
  components:{
    hotSpor,
    platform,
    agency,
    mining,
    wallet,
    community,
    expert,
    startArticle,
    digitalCurrency,
    technicalArticle,
    mediaSection,
  },
  data(){
    return {

    }
  },
  async created() {

  },
  computed:{

  },
  methods:{
    submitType: function(e, typeName) {
      axios({
          method:'post',
          url:'/subClick',
          data:{
            type:[typeName, toClickChinseName(typeName)],
          }
      })
    },
  },

}



const navFooter = {
  template:`
    <div>
      <img src="./pictures/logo-03.png" alt="">
    </div>
    `,
    data(){
      return {
      }
    },
    async created() {

    },
    computed:{

    },
    methods:{

    },
}

