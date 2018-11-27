function addFavorite() {   //收藏
  let url = window.location;
  let title = document.title;
  let ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf("360se") > -1) {
    alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
  } else if (ua.indexOf("msie 8") > -1) {
    window.external.AddToFavoritesBar(url, title); //IE8
  } else if (document.all) {
    try{
     window.external.addFavorite(url, title);
    }catch(e){
     alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
    }
  } else if (window.sidebar) {
    window.sidebar.addPanel(title, url, "");
  } else {
    alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
  }
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