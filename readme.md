## To solve the callback

> Email：vmto@qq.com

```bash
import Vue from 'vue'
import vAjax from 'v-ajax';

Vue.use(vAjax);
```

```bash
data() {
  return {
    apiData:{
      url:'http://api.xxx.com/v1',
      appid:123,
      sign:'abc',
      type:1,
      curPage:1
    }
  }
}
```
```bash
mounted() {
  this.$ajax({
    'type':'GET',
    'url':this.apiData.url,
    'dataType':'jsonp',
    'jsonp':'jsonpcallback',
    'data':{
      'appid' : this.apiData.appid,
      'sign' : this.apiData.sign,
      'type' : this.apiData.type,
      'page' : this.apiData.curPage
    },
    success:function(res){
      console.log(res);
      _this.$nextTick(function () {
        _iScroll.refresh();
      });
    },
    error:function(err){
      console.log(err);
    }
  })
};
```
